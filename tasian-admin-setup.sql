-- TASIAN Admin dashboard setup
-- Run this once in Supabase SQL Editor while signed in as project owner.
-- This script does NOT use or expose the service_role key.

-- 1) Make sure RLS is enabled on the tables used by the dashboard.
alter table public.user_roles enable row level security;
alter table public.products enable row level security;
alter table public.categories enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.profiles enable row level security;

-- 2) The signed-in user may read their own role. Admin check is performed by
-- the existing SECURITY DEFINER public.is_admin() function.
drop policy if exists "Users read own role" on public.user_roles;
create policy "Users read own role" on public.user_roles
for select to authenticated
using (user_id = (select auth.uid()));

-- 3) Admin product/category management. Keep any existing public active-product
-- and public category-read policies intact.
drop policy if exists "Admin manages products" on public.products;
create policy "Admin manages products" on public.products
for all to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

drop policy if exists "Admin manages categories" on public.categories;
create policy "Admin manages categories" on public.categories
for all to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

-- 4) Admin can view and update orders and their line items.
drop policy if exists "Admin manages orders" on public.orders;
create policy "Admin manages orders" on public.orders
for all to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

drop policy if exists "Admin manages order items" on public.order_items;
create policy "Admin manages order items" on public.order_items
for all to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

-- 5) Admin can read customer profile rows. Customers' existing own-profile
-- policies are not removed.
drop policy if exists "Admin reads profiles" on public.profiles;
create policy "Admin reads profiles" on public.profiles
for select to authenticated
using ((select public.is_admin()));

-- 6) Create a public-read image bucket. Upload/write/delete remain admin-only.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 5242880,
        array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public reads TASIAN product images" on storage.objects;
create policy "Public reads TASIAN product images" on storage.objects
for select to public
using (bucket_id = 'product-images');

drop policy if exists "Admin uploads TASIAN product images" on storage.objects;
create policy "Admin uploads TASIAN product images" on storage.objects
for insert to authenticated
with check (bucket_id = 'product-images' and (select public.is_admin()));

drop policy if exists "Admin updates TASIAN product images" on storage.objects;
create policy "Admin updates TASIAN product images" on storage.objects
for update to authenticated
using (bucket_id = 'product-images' and (select public.is_admin()))
with check (bucket_id = 'product-images' and (select public.is_admin()));

drop policy if exists "Admin deletes TASIAN product images" on storage.objects;
create policy "Admin deletes TASIAN product images" on storage.objects
for delete to authenticated
using (bucket_id = 'product-images' and (select public.is_admin()));

-- Note: order_items and orders are readable/manageable by admins only in this
-- migration. If customers need order history or checkout, add separate owner
-- policies after validating the site's checkout flow.
