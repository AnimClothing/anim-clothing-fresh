/* ============================================
   ANIM CLOTHING — Collection Page
   ============================================ */

// Get params from URL
const params = new URLSearchParams(window.location.search);
const catId = params.get('cat');

let filteredProducts = [];

function getFilteredProducts() {
  if (catId) {
    // Filter by category
    return products.filter(p => p.category === catId);
  }
  return [];
}

function getPageTitle() {
  if (catId) {
    const category = categories.find(c => c.id === catId);
    if (category) {
      document.title = `ANIM — ${category.name}`;
      return { title: category.name, desc: category.desc };
    }
  }
  return { title: 'Collection', desc: '' };
}

// --- Render ---
function renderCollection() {
  const info = getPageTitle();
  if (info.title === 'Collection') {
    document.title = 'ANIM — Collection Not Found';
  }

  // Update hero text
  const tag = qs('#collTag');
  const title = qs('#collTitle');
  const desc = qs('#collDesc');
  if (tag) tag.textContent = info.title;
  if (title) title.textContent = info.title;
  if (desc) desc.textContent = info.desc;

  // Products
  const grid = qs('#collectionGrid');
  if (!grid) return;

  filteredProducts = getFilteredProducts();

  if (filteredProducts.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:80px 20px;">
        <i class="fas fa-box-open" style="font-size:4rem;color:var(--text-dim);display:block;margin-bottom:20px;"></i>
        <h3 style="font-size:1.5rem;color:var(--text-muted);margin-bottom:8px;">No products found</h3>
        <p style="color:var(--text-dim);">Check back soon for new arrivals in this collection.</p>
      </div>
    `;
    return;
  }

    grid.innerHTML = filteredProducts.map((p, i) => {
      const inWishlist = wishlist.includes(p.id);
      // Generate image path based on category and product ID
      const imagePath = `assets/images/${p.category}-${p.id}.jpg`;
      return `
        <a href="product.html?id=${p.id}" class="collection-card-link" style="animation-delay:${i * 60}ms; display: block; text-decoration: none;">
          <div class="collection-card">
            <div class="collection-card-image">
              <img src="${imagePath}" alt="${p.name}" onerror="this.src='assets/images/default.jpg'">
            </div>
            <div class="collection-card-body">
              <h3>${p.name}</h3>
              <span class="collection-card-price">Rs. ${p.price.toLocaleString('en-PK')}</span>
              <div class="collection-card-actions">
                <button class="btn btn-primary add-cart-btn" data-id="${p.id}" onclick="event.stopPropagation(); addToCart(${p.id});">
                  <i class="fas fa-shopping-bag"></i> Add to Cart
                </button>
                <button class="wishlist-btn ${inWishlist ? 'wishlisted' : ''}" data-id="${p.id}" onclick="event.stopPropagation(); toggleWishlist(${p.id});" aria-label="Wishlist">
                  <i class="${inWishlist ? 'fas' : 'far'} fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
        </a>
      `;
    }).join('');

  // Attach events
  qsa('.add-cart-btn', grid).forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(parseInt(btn.dataset.id));
    });
  });
  qsa('.wishlist-btn', grid).forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleWishlist(parseInt(btn.dataset.id));
    });
  });
}

// --- Init ---
function init() {
  renderCollection();
  updateCartUI();
  updateWishlistUI();
  setupSharedSidebars();

  // Navbar scroll
  const nav = qs('#navbar');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', init);
