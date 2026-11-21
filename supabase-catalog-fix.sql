-- TASIAN catalog alignment: run once in Supabase SQL Editor
-- Align database slugs with the product image filenames and website links.
update public.products
set slug = case slug
  when 'amber-men' then 'amber'
  when 'noir' then 'noir'
  when 'legend' then 'legend'
  when 'icon' then 'icon'
  when 'sauvage' then 'sauvage'
  when 'rose' then 'rose'
  when 'belle' then 'belle'
  when 'flora' then 'flora'
  when 'diva' then 'diva'
  when 'charm' then 'charm'
  when 'blanche' then 'blanche'
  when 'harmony' then 'harmony'
  when 'zenith' then 'zenith'
  when 'equilibrium' then 'equilibrium'
  when 'pure' then 'pure'
  when 'wood-pocket' then 'wood'
  when 'rose-pocket' then 'pocket-rose'
  when 'blue-pocket' then 'pocket-blue'
  when 'pure-pocket' then 'pocket-pure'
  when 'green-pocket' then 'pocket-green'
  when 'royal' then 'royal'
  when 'empire' then 'empire'
  when 'prestige' then 'prestige'
  when 'opera' then 'opera'
  when 'diamond' then 'diamond'
  else slug end;

update public.products set price = case slug
  when 'amber' then 2450000
  when 'noir' then 2650000
  when 'legend' then 2800000
  when 'icon' then 2750000
  when 'sauvage' then 2900000
  when 'rose' then 2890000
  when 'belle' then 2700000
  when 'flora' then 2850000
  when 'diva' then 3000000
  when 'charm' then 2950000
  when 'blanche' then 3100000
  when 'harmony' then 2950000
  when 'zenith' then 3200000
  when 'equilibrium' then 3150000
  when 'pure' then 2800000
  when 'wood' then 490000
  when 'pocket-rose' then 490000
  when 'pocket-blue' then 490000
  when 'pocket-pure' then 490000
  when 'pocket-green' then 490000
  when 'royal' then 4200000
  when 'empire' then 4500000
  when 'prestige' then 4800000
  when 'opera' then 4600000
  when 'diamond' then 5000000
  else price end;

update public.categories set slug = 'special' where slug = 'luxury';
