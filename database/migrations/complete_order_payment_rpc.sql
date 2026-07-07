-- ========================================================
-- RPC FUNCTION: COMPLETE ORDER PAYMENT & GENERATE TICKETS
-- ========================================================

CREATE OR REPLACE FUNCTION public.complete_order_payment(
  p_order_id UUID,
  p_payment_method TEXT,
  p_payment_reference TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER -- Runs with db owner bypass privileges
SET search_path = public
AS $$
DECLARE
  v_buyer_id UUID;
  v_order_status TEXT;
  v_item RECORD;
  v_qr_code TEXT;
BEGIN
  -- 1. Fetch order details & check ownership and current status
  SELECT buyer_id, payment_status 
  INTO v_buyer_id, v_order_status
  FROM orders
  WHERE id = p_order_id;

  -- Verify order exists
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Order not found';
  END IF;

  -- Ensure order belongs to current authenticated user
  IF v_buyer_id <> auth.uid() THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  -- If already paid, do nothing and return true
  IF v_order_status = 'paid' THEN
    RETURN TRUE;
  END IF;

  -- 2. Update order status to paid
  UPDATE orders
  SET payment_status = 'paid',
      payment_method = p_payment_method,
      payment_reference = p_payment_reference
  WHERE id = p_order_id;

  -- 3. Loop through order items, update sold inventory, and generate tickets
  FOR v_item IN 
    SELECT ticket_type_id, quantity, unit_price
    FROM order_items
    WHERE order_id = p_order_id
  LOOP
    -- Verify inventory
    IF (SELECT quantity - sold FROM ticket_types WHERE id = v_item.ticket_type_id) < v_item.quantity THEN
      RAISE EXCEPTION 'Sold out or insufficient ticket availability';
    END IF;

    -- Update inventory (increment sold count)
    UPDATE ticket_types
    SET sold = sold + v_item.quantity
    WHERE id = v_item.ticket_type_id;

    -- Generate ticket records
    FOR i IN 1..v_item.quantity LOOP
      -- Create a unique QR code token
      -- Format: TK-ORDER_PREFIX-RANDOM_HEX
      v_qr_code := 'TK-' || UPPER(SUBSTRING(p_order_id::text FROM 1 FOR 4)) || '-' || UPPER(SUBSTRING(md5(random()::text) FROM 1 FOR 8));
      
      INSERT INTO tickets (
        order_id,
        event_id,
        ticket_type_id,
        user_id,
        qr_code,
        admission_limit,
        admissions_used,
        status,
        purchased_at
      ) VALUES (
        p_order_id,
        (SELECT event_id FROM ticket_types WHERE id = v_item.ticket_type_id),
        v_item.ticket_type_id,
        v_buyer_id,
        v_qr_code,
        (SELECT admission_limit FROM ticket_types WHERE id = v_item.ticket_type_id),
        0,
        'valid',
        NOW()
      );
    END LOOP;
  END LOOP;

  RETURN TRUE;
END;
$$;
