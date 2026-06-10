-- ═══════════════════════════════════════════════════════
--  Mayen's Touch — Add new products (June 2026)
--  Run this in the Supabase SQL Editor if you already
--  executed schema.sql and the products table exists.
-- ═══════════════════════════════════════════════════════

INSERT INTO products (id, title, code, price, image, image_hover, href) VALUES
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
