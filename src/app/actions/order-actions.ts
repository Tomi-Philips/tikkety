'use server';

import { createClient } from "@/lib/supabase/server";

export async function createPendingOrderAction(
  ticketTypeId: string,
  quantity: number,
  fullName: string
) {
  const supabase = await createClient();

  // 1. Authenticate user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("You must be signed in to purchase tickets.");
  }

  // 2. Fetch ticket type and verify availability
  const { data: ticketType, error: ttError } = await supabase
    .from("ticket_types")
    .select("*, events(*)")
    .eq("id", ticketTypeId)
    .single();

  if (ttError || !ticketType) {
    throw new Error("Ticket type not found.");
  }

  if (!ticketType.is_active) {
    throw new Error("This ticket type is no longer active.");
  }

  const remaining = ticketType.quantity - (ticketType.sold || 0);
  if (remaining < quantity) {
    throw new Error(`Insufficient tickets available. Only ${remaining} tickets left.`);
  }

  // 3. Update the buyer's full name in their profile if needed
  await supabase
    .from("profiles")
    .update({ full_name: fullName })
    .eq("id", user.id);

  // 4. Create pending order record
  const totalAmount = ticketType.price * quantity;
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      buyer_id: user.id,
      total_amount: totalAmount,
      currency: "NGN",
      payment_status: "pending",
      payment_method: "paystack" // default mock gateway provider
    })
    .select()
    .single();

  if (orderError || !order) {
    throw new Error(orderError?.message || "Failed to create pending order.");
  }

  // 5. Create order item record
  const { error: itemError } = await supabase
    .from("order_items")
    .insert({
      order_id: order.id,
      ticket_type_id: ticketTypeId,
      quantity: quantity,
      unit_price: ticketType.price,
      subtotal: totalAmount
    });

  if (itemError) {
    // Delete order on item insert failure (cleanup)
    await supabase.from("orders").delete().eq("id", order.id);
    throw new Error("Failed to create order items.");
  }

  return order.id;
}

export async function processPaymentAction(
  orderId: string,
  paymentMethod: string,
  paymentReference: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("complete_order_payment", {
    p_order_id: orderId,
    p_payment_method: paymentMethod,
    p_payment_reference: paymentReference
  });

  if (error) {
    throw new Error(error.message || "Failed to finalize transaction and generate tickets.");
  }

  return { success: true };
}
