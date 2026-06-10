/* ============================================
   ANIM CLOTHING — Product Detail Modal
   ============================================ */

let currentModalImage = 0;
let currentModalId = null;

function openModal(id) {
  const detail = productDetails[id];
  if (!detail) return;
  currentModalId = id;
  currentModalImage = 0;

  const overlay = document.getElementById('productModalOverlay');
  const title = document.getElementById('modalTitle');
  const category = document.getElementById('modalCategory');
  const price = document.getElementById('modalPrice');
  const desc = document.getElementById('modalDescription');
  const imagesContainer = document.getElementById('modalImages');
  const stockBadge = document.getElementById('modalStockBadge');

  // Title
  title.textContent = detail.name;
  category.textContent = detail.category;
  price.innerHTML = detail.originalPrice
    ? `<span class="original-price">Rs. ${detail.originalPrice.toLocaleString('en-PK')}</span> Rs. ${detail.price.toLocaleString('en-PK')}`
    : `Rs. ${detail.price.toLocaleString('en-PK')}`;
  desc.textContent = detail.description;

  // Stock
  if (stockBadge) {
    stockBadge.className = 'stock-badge ' + (detail.inStock ? 'in-stock' : 'out-of-stock');
    stockBadge.textContent = detail.inStock ? 'In Stock' : 'Out of Stock';
  }

  // Images
  imagesContainer.innerHTML = '';
  const mainImg = document.createElement('img');
  mainImg.className = 'modal-image-main';
  mainImg.src = detail.images[0];
  mainImg.alt = detail.name;
  mainImg.onerror = function() {
    const p = this.parentElement;
    if (p.querySelector('.modal-image-placeholder')) return;
    this.style.display = 'none';
    p.insertAdjacentHTML('beforeend',
      `<div class="modal-image-placeholder"><i class="fas fa-${getIconForCategory(detail.category)}"></i></div>`);
  };
  imagesContainer.appendChild(mainImg);

  // Nav buttons
  imagesContainer.insertAdjacentHTML('beforeend', `
    <button class="modal-image-nav prev" onclick="modalPrevImage()"><i class="fas fa-chevron-left"></i></button>
    <button class="modal-image-nav next" onclick="modalNextImage()"><i class="fas fa-chevron-right"></i></button>
  `);

  // Sizes
  const sizesContainer = document.getElementById('modalSizes');
  if (sizesContainer) {
    const available = detail.sizes || [];
    sizesContainer.innerHTML = '<label>Size</label><div class="size-options">' +
      available.map((s, i) => {
        const unavailable = !detail.inStock || (detail.unavailableSizes && detail.unavailableSizes.includes(s));
        return `<button class="size-option ${i === 0 && detail.inStock ? 'selected' : ''} ${unavailable ? 'unavailable' : ''}"
                onclick="${unavailable ? '' : `selectSize(this, '${s}')`}"
                ${unavailable ? 'disabled' : ''}>${s}</button>`;
      }).join('') + '</div>';
  }

  // Details
  const detailsContainer = document.getElementById('modalDetails');
  if (detailsContainer) {
    detailsContainer.innerHTML = `
      <div class="modal-detail-item"><span>Material</span><span>${detail.material || '—'}</span></div>
      <div class="modal-detail-item"><span>Care</span><span>${detail.care || '—'}</span></div>
    `;
  }

  // Generate action buttons dynamically
  const actionsContainer = document.querySelector('.modal-actions');
  if (actionsContainer) {
    actionsContainer.innerHTML = detail.inStock ? `
      <button class="btn btn-primary" id="modalAddToCartBtn">
        <i class="fas fa-shopping-bag"></i> Add to Cart
      </button>
      <button class="btn btn-buy-now" id="modalBuyNowBtn">
        <i class="fas fa-bolt"></i> Buy Now
      </button>
      <button class="wishlist-btn ${wishlist.includes(id) ? 'wishlisted' : ''}" id="modalWishlistBtn">
        <i class="${wishlist.includes(id) ? 'fas' : 'far'} fa-heart"></i>
      </button>
    ` : `
      <button class="btn btn-primary" id="modalAddToCartBtn" disabled style="opacity:.5">
        <i class="fas fa-exclamation-circle"></i> Notify Me
      </button>
      <button class="wishlist-btn ${wishlist.includes(id) ? 'wishlisted' : ''}" id="modalWishlistBtn">
        <i class="${wishlist.includes(id) ? 'fas' : 'far'} fa-heart"></i>
      </button>
    `;

    document.getElementById('modalAddToCartBtn').onclick = () => {
      if (detail.inStock) {
        addToCart(id);
        closeModal();
        showToast('Added to cart!');
      } else {
        showToast('Coming soon! We\'ll notify you.');
      }
    };

    const buyNowBtn = document.getElementById('modalBuyNowBtn');
    if (buyNowBtn) {
      buyNowBtn.onclick = () => {
        addToCart(id);
        closeModal();
        document.getElementById('cartSidebar')?.classList.add('open');
        document.getElementById('cartOverlay')?.classList.add('open');
        document.body.style.overflow = 'hidden';
        showToast('Added to cart!');
      };
    }

    document.getElementById('modalWishlistBtn').onclick = () => {
      toggleWishlist(id);
      openModal(id);
    };
  }

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('productModalOverlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Navigation
let modalAnimating = false;

function modalNextImage() {
  if (modalAnimating) return;
  const detail = productDetails[currentModalId];
  if (!detail) return;
  currentModalImage = (currentModalImage + 1) % detail.images.length;
  updateModalImage(1);
}

function modalPrevImage() {
  if (modalAnimating) return;
  const detail = productDetails[currentModalId];
  if (!detail) return;
  currentModalImage = (currentModalImage - 1 + detail.images.length) % detail.images.length;
  updateModalImage(-1);
}

function updateModalImage(dir) {
  const detail = productDetails[currentModalId];
  if (!detail) return;

  const container = document.getElementById('modalImages');
  if (!container) return;
  container.querySelectorAll('.modal-image-placeholder').forEach(el => el.remove());

  let oldImg = container.querySelector('.modal-image-main');

  if (!dir || !oldImg) {
    if (oldImg) {
      oldImg.src = detail.images[currentModalImage];
      oldImg.alt = detail.name;
    }
    return;
  }

  modalAnimating = true;

  const newImg = oldImg.cloneNode();
  newImg.src = detail.images[currentModalImage];
  newImg.alt = detail.name;

  newImg.onload = function() {
    newImg.style.animation = dir === 1 ? 'slideInRight 0.3s ease' : 'slideInLeft 0.3s ease';
    container.insertBefore(newImg, oldImg);
    oldImg.style.animation = dir === 1 ? 'slideOutLeft 0.3s ease' : 'slideOutRight 0.3s ease';

    const cleanup = function() {
      if (oldImg && oldImg.parentNode) oldImg.remove();
      modalAnimating = false;
    };
    oldImg.addEventListener('animationend', cleanup, { once: true });
  };

  if (newImg.complete) newImg.onload();
}

function selectSize(el, size) {
  document.querySelectorAll('.size-option').forEach(c => {
    c.classList.remove('selected');
    c.disabled = false;
  });
  if (el) {
    el.classList.add('selected');
    el.disabled = true;
  }
}

function getIconForCategory(cat) {
  const map = {
    'Tees': 'tshirt',
    'Polo Shirts': 'gem',
    'Denim Shirts': 'jacket',
    'Formal Shirts': 'briefcase',
    'Cargo Pants': 'bag-shopping',
    'Denim Jeans': 'vest',
    'Trousers': 'user-tie'
  };
  return map[cat] || 'shirt';
}

// Close on overlay click
document.addEventListener('click', e => {
  if (e.target.id === 'productModalOverlay') closeModal();
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});