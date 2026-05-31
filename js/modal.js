/* ============================================
   ANIM CLOTHING — Product Detail Modal
   ============================================ */

let currentModalImage = 0;
let currentModalId = null;

function stringHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

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
  price.textContent = `Rs. ${detail.price.toLocaleString('en-PK')}`;
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
    this.style.display = 'none';
    this.parentElement.insertAdjacentHTML('beforeend',
      `<div class="modal-image-placeholder"><i class="fas fa-${getIconForCategory(detail.category)}"></i></div>`);
  };
  imagesContainer.appendChild(mainImg);

  // Nav buttons
  imagesContainer.insertAdjacentHTML('beforeend', `
    <button class="modal-image-nav prev" onclick="modalPrevImage()"><i class="fas fa-chevron-left"></i></button>
    <button class="modal-image-nav next" onclick="modalNextImage()"><i class="fas fa-chevron-right"></i></button>
  `);

  // Thumbnails
  let thumbsContainer = document.getElementById('modalThumbnails');
  if (!thumbsContainer) {
    thumbsContainer = document.createElement('div');
    thumbsContainer.id = 'modalThumbnails';
    thumbsContainer.className = 'modal-thumbnails';
    imagesContainer.parentElement.appendChild(thumbsContainer);
  }
  thumbsContainer.innerHTML = detail.images.map((img, i) =>
    `<div class="modal-thumb ${i === 0 ? 'active' : ''}" onclick="modalGoToImage(${i})">
       <img src="${img}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:6px;" onerror="this.style.display='none';this.parentElement.innerHTML='<i class=&quot;fas fa-image&quot; style=&quot;font-size:1.2rem&quot;></i>'">
     </div>`
  ).join('');

  // Colors
  const colorsContainer = document.getElementById('modalColors');
  if (colorsContainer) {
    colorsContainer.innerHTML = '<label>Color</label><div class="color-options">' +
      detail.colors.map((c, i) => {
        // Generate a hash-based color per name
        const hue = stringHash(c) % 360;
        return `<div class="color-group">
          <div class="color-option ${i === 0 ? 'selected' : ''}"
               style="background:hsl(${hue},40%,40%)"
               title="${c}"
               onclick="selectColor(this, '${c.replace(/'/g, "\\'")}')"></div>
          <span class="color-label">${c}</span>
        </div>`;
      }).join('') + '</div>';
  }

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
function modalNextImage() {
  const detail = productDetails[currentModalId];
  if (!detail) return;
  currentModalImage = (currentModalImage + 1) % detail.images.length;
  updateModalImage();
}

function modalPrevImage() {
  const detail = productDetails[currentModalId];
  if (!detail) return;
  currentModalImage = (currentModalImage - 1 + detail.images.length) % detail.images.length;
  updateModalImage();
}

function modalGoToImage(i) {
  currentModalImage = i;
  updateModalImage();
}

function updateModalImage() {
  const detail = productDetails[currentModalId];
  if (!detail) return;

  const main = document.querySelector('.modal-image-main');
  if (main) {
    main.src = detail.images[currentModalImage];
    main.alt = detail.name;
  }

  const thumbs = document.querySelectorAll('.modal-thumb');
  thumbs.forEach((t, i) => t.classList.toggle('active', i === currentModalImage));
}

function selectColor(el, colorName) {
  document.querySelectorAll('.color-option').forEach(c => c.classList.remove('selected'));
  if (el) el.classList.add('selected');
  // In a real app, this would change the product image set
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
    'Oversized Tees': 'tshirt',
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