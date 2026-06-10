-- ═══════════════════════════════════════════════════════
--  Mayen's Touch — Supabase Schema
--  Run this entire file in the Supabase SQL Editor
-- ═══════════════════════════════════════════════════════

-- ─── PRODUCTS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id           text PRIMARY KEY,
  title        text NOT NULL,
  code         text,
  price        text NOT NULL,
  image        text,
  image_hover  text,
  href         text,
  available    boolean DEFAULT true,
  created_at   timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);

INSERT INTO products (id, title, code, price, image, image_hover, href) VALUES
  ('dc-kaftan-navy',
   '[PRE_ORDER] Mayen's Touch Kaftan [Navy]', 'DC_SS26_KFT_N', 'N 112,200.00',
   'https://oddritualgolf.com/cdn/shop/files/ODD_Navy_Back.jpg?v=1778054735',
   'https://oddritualgolf.com/cdn/shop/files/ODD_Navy.jpg?v=1778054734',
   '/products/mayens-touch-kaftan-navy'),
  ('dc-kaftan-white',
   '[PRE_ORDER] Mayen's Touch Kaftan [White]', 'DC_SS26_KFT_W', 'N 301,200.00',
   'https://oddritualgolf.com/cdn/shop/files/ODD_WHITE_Back.jpg?v=1778056523',
   'https://oddritualgolf.com/cdn/shop/files/ODD_WHITE.jpg?v=1778056523',
   '/products/mayens-touch-kaftan-white'),
  ('dc-cord-cap-maroon',
   '[PRE_ORDER] Mayen's Touch Corduroy Cap [Maroon]', 'DC_SS26_COR_M', 'N 208,850.00',
   'https://oddritualgolf.com/cdn/shop/files/CORDCAP_Maroon_F_d09ad2d0-7205-410f-b261-6eaa0be55862.jpg?v=1778057661',
   'https://oddritualgolf.com/cdn/shop/files/CORDCAP_Maroon_S.jpg?v=1778057505',
   '/products/mayens-touch-corduroy-cap-maroon'),
  ('dc-monogram-tee-black',
   'DC Monogram Tee [Black]', 'DC_MNG_T_B', 'N 101,000.00',
   'https://oddritualgolf.com/cdn/shop/files/T_BLK_MNG_B.jpg?v=1769258644',
   'https://oddritualgolf.com/cdn/shop/files/DSC08485.jpg?v=1769261658',
   '/products/dc-monogram-tee-black'),
  ('dc-classic-tee-white',
   'Mayen's Touch Classic Tee [White]', 'DC_CLS_T_W', 'N 111,000.00',
   'https://oddritualgolf.com/cdn/shop/files/T_WHT_BRD_B.jpg?v=1769259626',
   'https://oddritualgolf.com/cdn/shop/files/DSC08398.jpg?v=1769262035',
   '/products/mayens-touch-classic-tee-white'),
  ('dc-cap-navy',
   'Mayen's Touch Cap [Navy]', 'DC_CAP_N', 'N 80,000.00',
   'https://oddritualgolf.com/cdn/shop/files/DSC08915_4734c6f8-8d31-4399-949f-8c4565a6f4fc.jpg?v=1769257141',
   'https://oddritualgolf.com/cdn/shop/files/DSC08353.jpg?v=1769260740',
   '/products/mayens-touch-cap-navy'),
  ('dc-monogram-cap',
   'DC Monogram Cap [White/Brown]', 'DC_MNG_CAP_WB', 'N 75,000.00',
   'https://oddritualgolf.com/cdn/shop/files/DSC08933.jpg?v=1769257752',
   'https://oddritualgolf.com/cdn/shop/files/DSC08829.jpg?v=1769261491',
   '/products/dc-monogram-cap-white-brown'),
  ('dc-kaftan-maroon',
   '[PRE_ORDER] Mayen's Touch Kaftan [Maroon]', 'DC_SS26_KFT_M', 'N 112,200.00',
   'https://oddritualgolf.com/cdn/shop/files/CORDCAP_Maroon_F_d09ad2d0-7205-410f-b261-6eaa0be55862.jpg?v=1778057661',
   'https://oddritualgolf.com/cdn/shop/files/ODD_Navy_Back.jpg?v=1778054735',
   '/products/mayens-touch-kaftan-maroon'),
  ('dc-kaftan-sage',
   '[PRE_ORDER] Mayen's Touch Kaftan [Sage]', 'DC_SS26_KFT_S', 'N 156,000.00',
   'https://oddritualgolf.com/cdn/shop/files/ODD_WHITE.jpg?v=1778056523',
   'https://oddritualgolf.com/cdn/shop/files/ODD_WHITE_Back.jpg?v=1778056523',
   '/products/mayens-touch-kaftan-sage'),
  ('dc-cord-cap-black',
   '[PRE_ORDER] Mayen's Touch Corduroy Cap [Black]', 'DC_SS26_COR_B', 'N 208,850.00',
   'https://oddritualgolf.com/cdn/shop/files/DSC08915_4734c6f8-8d31-4399-949f-8c4565a6f4fc.jpg?v=1769257141',
   'https://oddritualgolf.com/cdn/shop/files/CORDCAP_Maroon_S.jpg?v=1778057505',
   '/products/mayens-touch-corduroy-cap-black'),
  ('dc-monogram-tee-white',
   'DC Monogram Tee [White]', 'DC_MNG_T_W', 'N 101,000.00',
   'https://oddritualgolf.com/cdn/shop/files/T_WHT_BRD_B.jpg?v=1769259626',
   'https://oddritualgolf.com/cdn/shop/files/DSC08398.jpg?v=1769262035',
   '/products/dc-monogram-tee-white'),
  ('dc-classic-tee-black',
   'Mayen's Touch Classic Tee [Black]', 'DC_CLS_T_B', 'N 111,000.00',
   'https://oddritualgolf.com/cdn/shop/files/T_BLK_MNG_B.jpg?v=1769258644',
   'https://oddritualgolf.com/cdn/shop/files/DSC08485.jpg?v=1769261658',
   '/products/mayens-touch-classic-tee-black'),
  ('dc-bomber-jacket-black',
   '[PRE_ORDER] Mayen's Touch Bomber Jacket [Black]', 'DC_SS26_BMB_B', 'N 245,000.00',
   'https://oddritualgolf.com/cdn/shop/files/DSC08829.jpg?v=1769261491',
   'https://oddritualgolf.com/cdn/shop/files/DSC08933.jpg?v=1769257752',
   '/products/mayens-touch-bomber-jacket-black'),
  ('dc-monogram-hoodie-cream',
   'DC Monogram Hoodie [Cream]', 'DC_MNG_HD_C', 'N 135,000.00',
   'https://oddritualgolf.com/cdn/shop/files/DSC08353.jpg?v=1769260740',
   'https://oddritualgolf.com/cdn/shop/files/DSC08485.jpg?v=1769261658',
   '/products/dc-monogram-hoodie-cream')
ON CONFLICT (id) DO NOTHING;


-- ─── CUSTOMERS ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS customers (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text NOT NULL,
  email       text UNIQUE NOT NULL,
  phone       text,
  source      text CHECK (source IN ('booking', 'order')),
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
-- No public access — populated only via triggers


-- ─── BOOKINGS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bookings (
  id                uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  service           text NOT NULL,
  service_duration  text,
  appointment_date  date NOT NULL,
  appointment_time  text NOT NULL,
  name              text NOT NULL,
  email             text NOT NULL,
  phone             text NOT NULL,
  measurements      jsonb,
  notes             text,
  status            text DEFAULT 'pending'
                    CHECK (status IN ('pending','confirmed','cancelled','completed')),
  created_at        timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert bookings" ON bookings FOR INSERT WITH CHECK (true);


-- ─── ORDERS ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id               uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name    text NOT NULL,
  customer_email   text NOT NULL,
  customer_phone   text NOT NULL,
  fulfillment      text DEFAULT 'delivery'
                   CHECK (fulfillment IN ('delivery','pickup')),
  address          text,
  city             text,
  state            text,
  payment_method   text CHECK (payment_method IN ('card','paystack','transfer')),
  subtotal         numeric NOT NULL,
  shipping         numeric DEFAULT 0,
  total            numeric NOT NULL,
  status           text DEFAULT 'pending'
                   CHECK (status IN ('pending','paid','processing','shipped','delivered','cancelled')),
  created_at       timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert orders" ON orders FOR INSERT WITH CHECK (true);


-- ─── ORDER ITEMS ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  id             uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id       uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id     text,
  product_title  text NOT NULL,
  product_code   text,
  price          numeric NOT NULL,
  quantity       integer NOT NULL CHECK (quantity > 0)
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert order_items" ON order_items FOR INSERT WITH CHECK (true);


-- ─── TRIGGER: customers from bookings ────────────────────
CREATE OR REPLACE FUNCTION upsert_customer_from_booking()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO customers (name, email, phone, source)
  VALUES (NEW.name, NEW.email, NEW.phone, 'booking')
  ON CONFLICT (email) DO UPDATE
    SET name       = EXCLUDED.name,
        phone      = COALESCE(EXCLUDED.phone, customers.phone),
        updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_booking_insert
  AFTER INSERT ON bookings
  FOR EACH ROW EXECUTE FUNCTION upsert_customer_from_booking();


-- ─── TRIGGER: customers from orders ──────────────────────
CREATE OR REPLACE FUNCTION upsert_customer_from_order()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO customers (name, email, phone, source)
  VALUES (NEW.customer_name, NEW.customer_email, NEW.customer_phone, 'order')
  ON CONFLICT (email) DO UPDATE
    SET name       = EXCLUDED.name,
        phone      = COALESCE(EXCLUDED.phone, customers.phone),
        updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_order_insert
  AFTER INSERT ON orders
  FOR EACH ROW EXECUTE FUNCTION upsert_customer_from_order();
