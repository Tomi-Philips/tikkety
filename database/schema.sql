-- =========================================
-- DROP EXISTING TABLES (CLEAN SLATE RESET)
-- =========================================

drop table if exists ticket_scans cascade;
drop table if exists tickets cascade;
drop table if exists order_items cascade;
drop table if exists orders cascade;
drop table if exists ticket_types cascade;
drop table if exists events cascade;
drop table if exists profiles cascade;



-- =========================================
-- ENABLE UUID EXTENSION
-- =========================================

create extension if not exists "uuid-ossp";



-- =========================================
-- PROFILES TABLE
-- =========================================

create table profiles (
  id uuid references auth.users(id) on delete cascade primary key,

  full_name text not null,

  username text unique,

  avatar_url text,

  role text not null default 'user'
    check (role in ('user', 'organizer', 'admin')),

  created_at timestamptz default now()
);



-- =========================================
-- EVENTS TABLE
-- =========================================

create table events (
  id uuid default uuid_generate_v4() primary key,

  organizer_id uuid references profiles(id) on delete cascade not null,

  title text not null,

  slug text unique not null,

  description text,

  location text not null,

  banner_url text,

  category text,

  event_date timestamptz not null,

  ticket_sale_start timestamptz,

  ticket_sale_end timestamptz,

  status text not null default 'draft'
    check (status in ('draft', 'published', 'cancelled', 'completed')),

  is_location_hidden boolean default false,

  created_at timestamptz default now(),

  updated_at timestamptz default now()
);



-- =========================================
-- TICKET TYPES TABLE
-- =========================================

create table ticket_types (
  id uuid default uuid_generate_v4() primary key,

  event_id uuid references events(id) on delete cascade not null,

  name text not null,

  description text,

  price numeric(10,2) not null default 0,

  quantity integer not null check (quantity >= 0),

  sold integer default 0 check (sold >= 0 and sold <= quantity),

  admission_limit integer default 1 check (admission_limit > 0),

  max_per_order integer default 10 check (max_per_order > 0),

  sale_start timestamptz,

  sale_end timestamptz,

  is_active boolean default true,

  created_at timestamptz default now()
);



-- =========================================
-- ORDERS TABLE
-- =========================================

create table orders (
  id uuid default uuid_generate_v4() primary key,

  buyer_id uuid references profiles(id) on delete cascade not null,

  total_amount numeric(10,2) not null,

  currency text not null default 'NGN',

  payment_status text default 'pending'
    check (payment_status in ('pending', 'paid', 'failed')),

  payment_method text
    check (payment_method in ('paystack', 'flutterwave', 'bank_transfer', 'cash', 'complimentary')),

  payment_reference text,

  created_at timestamptz default now()
);



-- =========================================
-- ORDER ITEMS TABLE
-- =========================================

create table order_items (
  id uuid default uuid_generate_v4() primary key,

  order_id uuid references orders(id) on delete cascade not null,

  ticket_type_id uuid references ticket_types(id) on delete cascade not null,

  quantity integer not null check (quantity > 0),

  unit_price numeric(10,2) not null,

  subtotal numeric(10,2) not null,

  created_at timestamptz default now()
);



-- =========================================
-- TICKETS TABLE
-- =========================================

create table tickets (
  id uuid default uuid_generate_v4() primary key,

  order_id uuid references orders(id) on delete cascade not null,

  event_id uuid references events(id) on delete cascade not null,

  ticket_type_id uuid references ticket_types(id) on delete cascade not null,

  user_id uuid references profiles(id) on delete cascade not null,

  qr_code text unique not null,

  admission_limit integer default 1 check (admission_limit > 0),

  admissions_used integer default 0 check (admissions_used >= 0 and admissions_used <= admission_limit),

  status text default 'valid'
    check (status in ('valid', 'partial', 'used', 'cancelled')),

  purchased_at timestamptz default now()
);



-- =========================================
-- TICKET SCANS TABLE
-- =========================================

create table ticket_scans (
  id uuid default uuid_generate_v4() primary key,

  ticket_id uuid references tickets(id) on delete cascade not null,

  scanned_by uuid references profiles(id) on delete set null,

  scan_result text not null
    check (scan_result in ('approved', 'rejected', 'duplicate', 'expired')),

  scanned_at timestamptz default now()
);