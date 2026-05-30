/* ============================================
   ANIM CLOTHING — Product Page
   ============================================ */

// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get('id')) || 1;

// Find product data
let product = null;
for (const p of products) {
  if (p.id === productId) {
    product = p;
    break;
  }
}

// Find category data
let category = null;
for (const c of categories) {
  if (c.id === product.category) {
    category = c;
    break;
  }
}

// Initialize product page
function initProductPage() {
  if (!product) {
    window.location.href = 'index.html';
    return;
  }
  
  // Set page title
  document.title = `ANIM CLOTHING — ${product.name}`;
  
  // Update product info
  updateProductInfo();
  
  // Setup image gallery
  setupProductGallery();
  
  // Setup color options
  setupColorOptions();
  
  // Setup size options
  setupSizeOptions();
  
  // Setup buttons
  setupButtons();
  
  // Setup related products
  setupRelatedProducts();
  
  // Initialize shared components
  initSharedComponents();
}

// Update product information
function updateProductInfo() {
  const titleEl = document.getElementById('productTitle');
  const descEl = document.getElementById('productDescription');
  const priceEl = document.getElementById('productPrice');
  
  if (titleEl) titleEl.textContent = product.name;
  if (descEl) descEl.textContent = `Premium ${product.name.toLowerCase()} from ANIM CLOTHING. Crafted with quality materials and attention to detail.`;
  if (priceEl) priceEl.textContent = `Rs. ${product.price.toLocaleString('en-PK')}`;
}

// Setup product image gallery
function setupProductGallery() {
  const mainImageEl = document.getElementById('mainProductImage');
  const thumbnailsContainer = document.querySelector('.product-thumbnails');
  
  if (!mainImageEl || !thumbnailsContainer) return;
  
  // For now, we'll use the same image for all thumbnails
  // In a real implementation, you would have multiple images per product
  const mainImagePath = `assets/images/${product.category}-${product.id}-main.jpg`;
  const thumbnailPaths = [
    `assets/images/${product.category}-${product.id}-1.jpg`,
    `assets/images/${product.category}-${product.id}-2.jpg`,
    `assets/images/${product.category}-${product.id}-3.jpg`,
    `assets/images/${product.category}-${product.id}-4.jpg`
  ];
  
  // Set main image
  mainImageEl.src = mainImagePath;
  mainImageEl.onerror = () => {
    mainImageEl.src = `assets/images/${product.category}-${product.id}.jpg`;
    mainImageEl.onerror = () => {
      mainImageEl.src = 'assets/images/default.jpg';
    };
  };
  
  // Create thumbnails
  thumbnailPaths.forEach((path, index) => {
    const thumbImg = document.createElement('img');
    thumbImg.src = path;
    thumbImg.alt = `${product.name} view ${index + 1}`;
    thumbImg.classList.add('thumbnail');
    
    thumbImg.onerror = () => {
      thumbImg.src = `assets/images/${product.category}-${product.id}.jpg`;
      thumbImg.onerror = () => {
        thumbImg.src = 'assets/images/default.jpg';
      };
    };
    
    thumbImg.addEventListener('click', () => {
      mainImageEl.src = thumbImg.src;
      // Update active thumbnail
      document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
      thumbImg.classList.add('active');
    });
    
    thumbnailsContainer.appendChild(thumbImg);
  });
  
  // Set first thumbnail as active by default
  const firstThumb = thumbnailsContainer.querySelector('.thumbnail');
  if (firstThumb) firstThumb.classList.add('active');
}

// Setup color options (mock data for now)
function setupColorOptions() {
  const colorOptionsContainer = document.getElementById('colorOptions');
  if (!colorOptionsContainer) return;
  
  // Mock color options - in real implementation, these would come from product data
  const colors = [
    { name: 'Black', code: '#000000' },
    { name: 'White', code: '#FFFFFF' },
    { name: 'Navy Blue', code: '#000080' },
    { name: 'Olive Green', code: '#808000' }
  ];
  
  colors.forEach(color => {
    const colorSwatch = document.createElement('div');
    colorSwatch.classList.add('color-swatch');
    colorSwatch.style.backgroundColor = color.code;
    colorSwatch.title = color.name;
    colorSwatch.dataset.colorCode = color.code;
    colorSwatch.dataset.colorName = color.name;
    
    colorSwatch.addEventListener('click', () => {
      // Update active color
      document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
      colorSwatch.classList.add('active');
      
      // In a real implementation, this would update product images based on selected color
      // For now, we'll just show a toast
      showToast(`Selected color: ${color.name}`);
    });
    
    colorOptionsContainer.appendChild(colorSwatch);
  });
  
  // Set first color as active by default
  const firstColor = colorOptionsContainer.querySelector('.color-swatch');
  if (firstColor) firstColor.classList.add('active');
}

// Setup size options (mock data for now)
function setupSizeOptions() {
  const sizeOptionsContainer = document.getElementById('sizeOptions');
  if (!sizeOptionsContainer) return;
  
  // Mock size options
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  
  sizes.forEach(size => {
    const sizeBtn = document.createElement('button');
    sizeBtn.classList.add('size-btn');
    sizeBtn.textContent = size;
    sizeBtn.dataset.size = size;
    
    sizeBtn.addEventListener('click', () => {
      // Update active size
      document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
      sizeBtn.classList.add('active');
      
      // Show toast for demo
      showToast(`Selected size: ${size}`);
    });
    
    sizeOptionsContainer.appendChild(sizeBtn);
  });
  
  // Set first size as active by default
  const firstSize = sizeOptionsContainer.querySelector('.size-btn');
  if (firstSize) firstSize.classList.add('active');
}

// Setup buttons
function setupButtons() {
  const addToCartBtn = document.getElementById('addToCartBtn');
  const buyNowBtn = document.getElementById('buyNowBtn');
  
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(product.id);
    });
  }
  
  if (buyNowBtn) {
    buyNowBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      // In a real implementation, this would go directly to checkout
      addToCart(product.id);
      showToast('Proceeding to checkout...');
    });
  }
}

// Setup related products
function setupRelatedProducts() {
  const relatedProductsGrid = document.getElementById('relatedProductsGrid');
  if (!relatedProductsGrid) return;
  
  // Get related products from same category (excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4); // Show up to 4 related products
  
  if (relatedProducts.length === 0) {
    relatedProductsGrid.innerHTML = `
      <div style="text-align: center; padding: 40px; color: var(--text-muted);">
        No related products found
      </div>
    `;
    return;
  }
  
  relatedProductsGrid.innerHTML = relatedProducts.map((p, i) => `
    <div class="related-product-card" style="animation-delay:${i * 60}ms">
      <div class="related-product-image">
        <img src="assets/images/${p.category}-${p.id}.jpg" alt="${p.name}" onerror="this.src='assets/images/default.jpg'">
      </div>
      <div class="related-product-info">
        <h3>${p.name}</h3>
        <span class="related-product-price">Rs. ${p.price.toLocaleString('en-PK')}</span>
      </div>
    </div>
  `).join('');
  
  // Add click handlers to related product cards
  document.querySelectorAll('.related-product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Prevent double handling if clicking buttons inside
      if (e.target.closest('.add-to-cart-btn') || e.target.closest('.wishlist-btn')) return;
      
      const productId = card.querySelector('.related-product-info h3') 
        ? Array.from(products).find(p => 
            card.querySelector('.related-product-info h3').textContent === p.name
          ).id : null;
      
      if (productId) {
        window.location.href = `product.html?id=${productId}`;
      }
    });
  });
}

// Initialize shared components (navbar, mobile menu, etc.)
function initSharedComponents() {
  // Reuse functions from main.js
  setupNavbar();
  setupMobileMenu();
  setupSharedSidebars();
  setupNewsletter();
  setupScrollReveal();
  setupCounter();
  updateCartUI();
  updateWishlistUI();
  setupBackToTop();
}

function setupBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Helper functions (copied from main.js for independence)
function qs(selector) {
  return document.querySelector(selector);
}

function qsa(selector) {
  return document.querySelectorAll(selector);
}

function showToast(message) {
  const toast = qs('#toast');
  const toastMessage = qs('#toastMessage');
  
  if (toast && toastMessage) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initProductPage);