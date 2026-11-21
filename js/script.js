const TASIAN_LOCAL_PRODUCTS = [{"slug": "amber", "title": "ادوپرفیوم آمبر", "type": "men", "desc": "رایحه گرم و کهربایی", "price": "۲,۴۵۰,۰۰۰"}, {"slug": "noir", "title": "ادوپرفیوم نوآر", "type": "men", "desc": "رایحه عمیق و چوبی", "price": "۲,۶۵۰,۰۰۰"}, {"slug": "legend", "title": "ادوپرفیوم لجند", "type": "men", "desc": "رایحه آروماتیک و ماندگار", "price": "۲,۸۰۰,۰۰۰"}, {"slug": "icon", "title": "ادوپرفیوم آیکون", "type": "men", "desc": "رایحه مدرن و ادویه‌ای", "price": "۲,۷۵۰,۰۰۰"}, {"slug": "sauvage", "title": "ادوپرفیوم ساواج", "type": "men", "desc": "رایحه خنک و پرانرژی", "price": "۲,۹۰۰,۰۰۰"}, {"slug": "rose", "title": "ادوپرفیوم رز", "type": "women", "desc": "رایحه لطیف و گلی", "price": "۲,۸۹۰,۰۰۰"}, {"slug": "belle", "title": "ادوپرفیوم بل", "type": "women", "desc": "رایحه شیرین و لطیف", "price": "۲,۷۰۰,۰۰۰"}, {"slug": "flora", "title": "ادوپرفیوم فلورا", "type": "women", "desc": "رایحه گل‌های سفید", "price": "۲,۸۵۰,۰۰۰"}, {"slug": "diva", "title": "ادوپرفیوم دیوا", "type": "women", "desc": "رایحه گرم و دلنشین", "price": "۳,۰۰۰,۰۰۰"}, {"slug": "charm", "title": "ادوپرفیوم چارم", "type": "women", "desc": "رایحه ظریف و پودری", "price": "۲,۹۵۰,۰۰۰"}, {"slug": "blanche", "title": "ادوپرفیوم بلانش", "type": "unisex", "desc": "رایحه خنک و تمیز", "price": "۳,۱۰۰,۰۰۰"}, {"slug": "harmony", "title": "ادوپرفیوم هارمونی", "type": "unisex", "desc": "رایحه متعادل و آرام", "price": "۲,۹۵۰,۰۰۰"}, {"slug": "zenith", "title": "ادوپرفیوم زنیت", "type": "unisex", "desc": "رایحه شفاف و مدرن", "price": "۳,۲۰۰,۰۰۰"}, {"slug": "equilibrium", "title": "ادوپرفیوم اکویلیبریم", "type": "unisex", "desc": "رایحه سبز و چوبی", "price": "۳,۱۵۰,۰۰۰"}, {"slug": "pure", "title": "ادوپرفیوم پیور", "type": "unisex", "desc": "رایحه مینیمال و پاکیزه", "price": "۲,۸۰۰,۰۰۰"}, {"slug": "wood", "title": "عطر جیبی وود", "type": "pocket", "desc": "رایحه چوبی و گرم", "price": "۴۹۰,۰۰۰"}, {"slug": "pocket-rose", "title": "عطر جیبی رز", "type": "pocket", "desc": "رایحه گلی و ملایم", "price": "۴۹۰,۰۰۰"}, {"slug": "pocket-blue", "title": "عطر جیبی بلو", "type": "pocket", "desc": "رایحه خنک و دریایی", "price": "۴۹۰,۰۰۰"}, {"slug": "pocket-pure", "title": "عطر جیبی پیور", "type": "pocket", "desc": "رایحه تمیز و سبک", "price": "۴۹۰,۰۰۰"}, {"slug": "pocket-green", "title": "عطر جیبی گرین", "type": "pocket", "desc": "رایحه سبز و تازه", "price": "۴۹۰,۰۰۰"}, {"slug": "royal", "title": "ادوپرفیوم رویال", "type": "special", "desc": "رایحه فاخر و گرم", "price": "۴,۲۰۰,۰۰۰"}, {"slug": "empire", "title": "ادوپرفیوم امپایر", "type": "special", "desc": "رایحه قدرتمند و عمیق", "price": "۴,۵۰۰,۰۰۰"}, {"slug": "prestige", "title": "ادوپرفیوم پرستیژ", "type": "special", "desc": "رایحه لوکس و پیچیده", "price": "۴,۸۰۰,۰۰۰"}, {"slug": "opera", "title": "ادوپرفیوم اپرا", "type": "special", "desc": "رایحه شرقی و اغواگر", "price": "۴,۶۰۰,۰۰۰"}, {"slug": "diamond", "title": "ادوپرفیوم دایموند", "type": "special", "desc": "رایحه درخشان و خاص", "price": "۵,۰۰۰,۰۰۰"}];
const TASIAN_TYPES = {men:'men',women:'women',unisex:'unisex',pocket:'pocket',special:'special'};
const CART_KEY = 'tasianCartItems';
let tasianProducts = TASIAN_LOCAL_PRODUCTS.map(p => ({...p, priceNumber:Number(p.price.replaceAll(',',''))}));
let cartItems = JSON.parse(localStorage.getItem(CART_KEY) || '{}');

function formatPrice(value) {
  return Number(value || 0).toLocaleString('fa-IR') + ' تومان';
}
function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  paintCart();
}
function paintCart() {
  const count = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  document.querySelectorAll('[data-cart-count]').forEach(el => el.textContent = count.toLocaleString('fa-IR'));
}
function showToast(message) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => el.classList.remove('show'), 2300);
}
function addCart(slug) {
  const card = window.event?.currentTarget?.closest('.product');
  const resolvedSlug = slug || card?.dataset.slug || TASIAN_LOCAL_PRODUCTS.find(p => p.title === card?.dataset.name)?.slug;
  if (!resolvedSlug) { showToast('محصول انتخاب‌شده پیدا نشد'); return; }
  cartItems[resolvedSlug] = (cartItems[resolvedSlug] || 0) + 1;
  saveCart();
  showToast('محصول به سبد خرید اضافه شد');
}
function changeCart(slug, delta) {
  cartItems[slug] = (cartItems[slug] || 0) + delta;
  if (cartItems[slug] <= 0) delete cartItems[slug];
  saveCart();
  renderCartPage();
}
function removeCart(slug) {
  delete cartItems[slug]; saveCart(); renderCartPage();
}
function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function productCard(p) {
  const image = `images/product-${p.slug}.jpg`;
  return `<article class="product" data-name="${escapeHtml(p.title)}" data-type="${p.type}" data-slug="${p.slug}">
    <a href="product.html?item=${encodeURIComponent(p.slug)}"><div class="productPhoto"><img src="${image}" alt="${escapeHtml(p.title)}" loading="lazy"><span class="tag">تاسیان</span></div></a>
    <div class="productInfo"><small>${escapeHtml(p.desc || 'از مجموعه عطرهای تاسیان')}</small><h3>${escapeHtml(p.title)}</h3>
    <div class="price">${formatPrice(p.priceNumber)}</div><button class="add" type="button" onclick="addCart('${p.slug}')">افزودن به سبد خرید</button></div></article>`;
}
async function loadProductsFromSupabase() {
  const cfg = window.TASIAN_SUPABASE;
  if (!cfg?.url || !cfg?.publishableKey) return;
  try {
    const response = await fetch(`${cfg.url}/rest/v1/products?select=id,name,slug,description,price,stock,is_active&is_active=eq.true&order=name.asc`, {
      headers: { apikey: cfg.publishableKey, Authorization: `Bearer ${cfg.publishableKey}` }
    });
    if (!response.ok) throw new Error(`Supabase HTTP ${response.status}`);
    const rows = await response.json();
    if (!Array.isArray(rows) || !rows.length) return;
    const localBySlug = new Map(TASIAN_LOCAL_PRODUCTS.map(p => [p.slug,p]));
    tasianProducts = rows.map(row => {
      const local = localBySlug.get(row.slug) || {};
      return {...local, id:row.id, slug:row.slug, title:local.title || row.name, desc:local.desc || row.description || '', priceNumber:Number(row.price || 0), type:local.type || 'unisex'};
    });
    const grid = document.querySelector('.productGrid[data-live-products]');
    if (grid) grid.innerHTML = tasianProducts.map(productCard).join('');
    updateProductDetail();
    renderCartPage();
    const status = document.querySelector('[data-db-status]');
    if (status) status.textContent = 'محصولات از دیتابیس دریافت شدند';
  } catch (error) {
    console.error('Tasian Supabase connection:', error);
    const status = document.querySelector('[data-db-status]');
    if (status) status.textContent = 'اتصال دیتابیس برقرار نشد؛ محصولات نمونه نمایش داده می‌شوند';
  }
}
function updateProductDetail() {
  const slug = new URLSearchParams(location.search).get('item');
  if (!slug) return;
  const p = tasianProducts.find(item => item.slug === slug);
  if (!p) return;
  const image = document.querySelector('[data-product-image]');
  const title = document.querySelector('[data-product-title]');
  const desc = document.querySelector('[data-product-desc]');
  const price = document.querySelector('[data-product-price]');
  if (image) { image.src = `images/product-${p.slug}.jpg`; image.alt = p.title; }
  if (title) title.textContent = p.title;
  if (desc) desc.textContent = p.desc || 'از مجموعه عطرهای تاسیان';
  if (price) price.textContent = formatPrice(p.priceNumber);
  const button = document.querySelector('[data-product-add]');
  if (button) button.onclick = () => addCart(p.slug);
}
function renderCartPage() {
  const host = document.querySelector('[data-cart-items]');
  if (!host) return;
  const selected = Object.entries(cartItems).map(([slug,qty]) => ({product:tasianProducts.find(p=>p.slug===slug) || TASIAN_LOCAL_PRODUCTS.find(p=>p.slug===slug), qty})).filter(x=>x.product);
  if (!selected.length) {
    host.innerHTML = '<div class="cart-empty"><strong>سبد خرید شما خالی است</strong><p>برای افزودن عطرهای دلخواهتان به فروشگاه بروید.</p><a class="cta" href="shop.html">ادامه خرید ←</a></div>';
    return;
  }
  const total = selected.reduce((sum,x)=>sum + (x.product.priceNumber || Number(x.product.price.replaceAll(',','')))*x.qty,0);
  host.innerHTML = `<div class="cart-list">${selected.map(x=>`<div class="cart-row" style="display:flex;align-items:center;gap:18px;padding:16px;border-bottom:1px solid #eadfce">
    <img src="images/product-${x.product.slug}.jpg" alt="" style="width:88px;height:100px;object-fit:cover;border-radius:14px">
    <div style="flex:1"><b>${escapeHtml(x.product.title)}</b><p>${formatPrice(x.product.priceNumber || Number(x.product.price.replaceAll(',','')) )}</p>
    <button type="button" onclick="changeCart('${x.product.slug}',-1)">−</button> ${x.qty.toLocaleString('fa-IR')} <button type="button" onclick="changeCart('${x.product.slug}',1)">+</button>
    <button type="button" onclick="removeCart('${x.product.slug}')">حذف</button></div></div>`).join('')}</div>
    <div style="padding:20px;text-align:left"><b>مجموع: ${formatPrice(total)}</b><p>ثبت سفارش آنلاین در مرحله بعد فعال می‌شود.</p></div>`;
}
document.addEventListener('DOMContentLoaded', () => {
  paintCart();
  const params = new URLSearchParams(location.search);
  const search = document.querySelector('[data-search]');
  const applyFilter = type => {
    document.querySelectorAll('.product[data-type]').forEach(p => p.style.display = type === 'all' || p.dataset.type === type ? '' : 'none');
    document.querySelectorAll('[data-filter]').forEach(b => b.classList.toggle('selected', b.dataset.filter === type));
  };
  if (params.get('type')) applyFilter(params.get('type'));
  document.querySelectorAll('[data-filter]').forEach(btn => btn.addEventListener('click', () => applyFilter(btn.dataset.filter)));
  if (search) search.addEventListener('input', e => {
    const q = e.target.value.trim();
    document.querySelectorAll('.product').forEach(p => p.style.display = (p.dataset.name || '').includes(q) ? '' : 'none');
  });
  updateProductDetail();
  renderCartPage();
  loadProductsFromSupabase();
});
