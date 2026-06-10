/* ============================================
   ANIM CLOTHING — Shared Cart & Wishlist
   ============================================ */

let cart = JSON.parse(localStorage.getItem('anim_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('anim_wishlist')) || [];

// --- DOM helpers (safe if elements missing) ---
function qs(s, ctx = document) { return ctx.querySelector(s); }
function qsa(s, ctx = document) { return [...ctx.querySelectorAll(s)]; }

// --- Cart ---
function addToCart(id) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, qty: 1 });
  }
  saveCart();
  updateCartUI();
  showToast('Item added to cart!');
  animateCartCount();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCartUI();
}

function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('anim_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const total = cart.reduce((sum, item) => {
    const p = products.find(pr => pr.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  const cartCount = qs('#cartCount');
  const cartTotal = qs('#cartTotal');
  const cartItemCount = qs('#cartItemCount');
  const cartItems = qs('#cartItems');

  if (cartCount) {
    cartCount.textContent = count;
    cartCount.classList.toggle('show', count > 0);
  }
  if (cartItemCount) cartItemCount.textContent = `(${count})`;
  const totalStr = new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(total);
  if (cartTotal) cartTotal.textContent = totalStr;

  if (cartItems) {
    if (cart.length === 0) {
      cartItems.innerHTML = `
        <div class="cart-empty">
          <i class="fas fa-shopping-bag"></i>
          <p>Your bag is empty</p>
        </div>
      `;
    } else {
      cartItems.innerHTML = cart.map(item => {
        const p = products.find(pr => pr.id === item.id);
        if (!p) return '';
        const cat = categories.find(c => c.id === p.category);
        return `
          <div class="cart-item">
            <div class="cart-item-img">
              <i class="fas ${p.icon}"></i>
            </div>
            <div class="cart-item-info">
              <h4>${p.name}</h4>
              <p>${cat?.name || ''}</p>
              <div class="cart-item-price">Rs. ${p.price.toLocaleString('en-PK')}</div>
            </div>
            <div class="cart-item-actions">
              <button onclick="removeFromCart(${item.id})" aria-label="Remove"><i class="fas fa-trash-alt"></i></button>
              <div class="cart-item-qty">
                <button onclick="updateQty(${item.id}, -1)">−</button>
                <span>${item.qty}</span>
                <button onclick="updateQty(${item.id}, 1)">+</button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
  }
}

function animateCartCount() {
  const cartCount = qs('#cartCount');
  if (!cartCount) return;
  cartCount.style.transform = 'scale(1.3)';
  setTimeout(() => { cartCount.style.transform = ''; }, 300);
}

// --- Wishlist ---
function toggleWishlist(id) {
  const idx = wishlist.indexOf(id);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    showToast('Removed from wishlist');
  } else {
    wishlist.push(id);
    showToast('Added to wishlist!');
  }
  localStorage.setItem('anim_wishlist', JSON.stringify(wishlist));
  updateWishlistUI();
  // re-render product buttons if on collection page
  const container = qs('.collection-grid') || qs('#productGrid');
  if (container) updateWishlistButtons(container);
}

function updateWishlistUI() {
  const countEl = qs('#wishlistCount');
  const itemsEl = qs('#wishlistItems');
  if (countEl) countEl.textContent = `(${wishlist.length})`;
  if (itemsEl) {
    if (wishlist.length === 0) {
      itemsEl.innerHTML = `
        <div class="cart-empty">
          <i class="fas fa-heart"></i>
          <p>Your wishlist is empty</p>
        </div>
      `;
    } else {
      itemsEl.innerHTML = wishlist.map(id => {
        const p = products.find(pr => pr.id === id);
        if (!p) return '';
        return `
          <div class="cart-item">
            <div class="cart-item-img">
              <i class="fas ${p.icon}"></i>
            </div>
            <div class="cart-item-info">
              <h4>${p.name}</h4>
              <p>Rs. ${p.price.toLocaleString('en-PK')}</p>
            </div>
            <div class="cart-item-actions">
              <button onclick="addToCart(${p.id}); toggleWishlist(${p.id});" aria-label="Add to cart"><i class="fas fa-shopping-bag"></i></button>
              <button onclick="toggleWishlist(${p.id})" aria-label="Remove"><i class="fas fa-trash-alt"></i></button>
            </div>
          </div>
        `;
      }).join('');
    }
  }
}

function updateWishlistButtons(container) {
  qsa('.wishlist-btn', container).forEach(btn => {
    const id = parseInt(btn.dataset.id);
    const inWishlist = wishlist.includes(id);
    const icon = qs('i', btn);
    btn.classList.toggle('wishlisted', inWishlist);
    if (icon) icon.className = inWishlist ? 'fas fa-heart' : 'far fa-heart';
  });
}

// --- Toast ---
function showToast(msg) {
  const toast = qs('#toast');
  const toastMsg = qs('#toastMessage');
  if (!toast || !toastMsg) return;
  toastMsg.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 2600);
}

// --- Sidebars (shared) ---
function setupSharedSidebars() {
  const cartSidebar = qs('#cartSidebar');
  const cartOverlay = qs('#cartOverlay');
  const wishlistSidebar = qs('#wishlistSidebar');
  const wishlistOverlay = qs('#wishlistOverlay');

  const openCart = qs('#cartToggle');
  const closeCart = qs('#cartClose');
  const openWishlist = qs('#wishlistToggle');
  const closeWishlist = qs('#wishlistClose');

  if (openCart && cartSidebar && cartOverlay) {
    openCart.addEventListener('click', () => {
      cartSidebar.classList.add('open');
      cartOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    closeCart?.addEventListener('click', closeCartSidebar);
    cartOverlay.addEventListener('click', closeCartSidebar);
  }

  if (openWishlist && wishlistSidebar && wishlistOverlay) {
    openWishlist.addEventListener('click', () => {
      wishlistSidebar.classList.add('open');
      wishlistOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    closeWishlist?.addEventListener('click', closeWishlistSidebar);
    wishlistOverlay.addEventListener('click', closeWishlistSidebar);
  }

  // Checkout button redirect
  const checkoutBtn = qs('.checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
      }
      closeCartSidebar();
      window.location.href = 'checkout.html';
    });
  }

  function closeCartSidebar() {
    if (cartSidebar) cartSidebar.classList.remove('open');
    if (cartOverlay) cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function closeWishlistSidebar() {
    if (wishlistSidebar) wishlistSidebar.classList.remove('open');
    if (wishlistOverlay) wishlistOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}
