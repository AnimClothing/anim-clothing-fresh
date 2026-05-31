/* ============================================
   ANIM CLOTHING — Main Page
   ============================================ */

let currentCatTab = 'all';

// --- Hero Slider ---
function setupHeroSlider() {
  const slides = qsa('.slide');
  const dotsContainer = qs('#sliderDots');
  let current = 0;
  let interval;

  if (!slides.length || !dotsContainer) return;

  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    slides.forEach(s => s.classList.remove('active'));
    qsa('span', dotsContainer).forEach(d => d.classList.remove('active'));
    slides[index].classList.add('active');
    dotsContainer.children[index].classList.add('active');
    current = index;
    resetInterval();
  }

  function next() { goTo((current + 1) % slides.length); }

  function resetInterval() { clearInterval(interval); interval = setInterval(next, 5000); }

  interval = setInterval(next, 5000);
}

// --- Navbar ---
function setupNavbar() {
  const nav = qs('#navbar');

  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  const links = qsa('.nav-links a');
  const sections = qsa('section[id]');
  window.addEventListener('scroll', () => {
    let current = 'hero';
    sections.forEach(sec => {
      const top = sec.offsetTop - 150;
      if (window.scrollY >= top) current = sec.id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });
}

// --- Mobile Menu ---
function setupMobileMenu() {
  const hamburger = qs('#hamburger');
  const overlay = qs('#mobileOverlay');
  if (!hamburger || !overlay) return;
  const links = qsa('.mobile-links a');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    overlay.classList.toggle('open');
    document.body.style.overflow = overlay.classList.contains('open') ? 'hidden' : '';
  });

  links.forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('active');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// --- Categories ---
function renderCategoryTabs() {
  const tabs = qsa('.cat-tab');
  tabs.forEach(t => {
    t.addEventListener('click', () => {
      tabs.forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      currentCatTab = t.dataset.cat;
      renderCategoryCards(currentCatTab);
    });
  });
}

function renderCategoryCards(type) {
  const catGrid = qs('#categoryGrid');
  if (!catGrid) return;

  const filtered = type === 'all' ? categories : categories.filter(c => c.type === type);

   const catPageMap = {
      oversized: 'oversized-tees.html',
      polo: 'polo-shirts.html',
      'denim-shirt': 'denim-shirts.html',
      formal: 'formal-shirts.html',
      cargo: 'cargo-pants.html',
      jeans: 'denim-jeans.html',
      trousers: 'trousers.html'
    };
   catGrid.innerHTML = filtered.map((cat, i) => {
      // Generate image path based on category ID
      const imagePath = `assets/images/${cat.id}-card.jpg`;
      const pageUrl = catPageMap[cat.id] || `collection.html?cat=${cat.id}`;
      return `
        <a href="${pageUrl}" class="cat-card reveal" data-category="${cat.id}">
         <div class="cat-card-bg">
           <img src="${imagePath}" alt="${cat.name}" onerror="this.onerror=null;this.src='assets/images/default-card.jpg'">
         </div>
         <div class="cat-card-content">
           <h3>${cat.name}</h3>
           <p>${cat.desc}</p>
         </div>
       </a>
     `;
   }).join('');

  setTimeout(() => setupScrollReveal(), 50);
}

// --- Newsletter ---
function setupNewsletter() {
  const form = qs('#newsletterForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('input');
    if (input.value.trim()) {
      showToast('Subscribed! Welcome to the crew.');
      input.value = '';
    }
  });
}

// --- Scroll Reveal ---
function setupScrollReveal() {
  const els = qsa('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
}

// --- Counter ---
function setupCounter() {
  const counters = qsa('.stat-number');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        animateCounter(el, parseInt(el.dataset.count));
        observer.unobserve(el);
      }
    });
  }, { threshold: .5 });
  counters.forEach(c => observer.observe(c));
}

function animateCounter(el, target) {
  let current = 0;
  const step = Math.ceil(target / 40);
  const interval = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(interval); }
    el.textContent = current + (target === 99 ? '%' : '+');
  }, 30);
}

// --- Reviews Slider ---
function setupReviewsSlider() {
  const reviewsTrack = document.querySelector('.reviews-track');
  if (!reviewsTrack) return;

  // Sample review data with Pakistani names
  const reviews = [
    {
      name: "Ayesha Khan",
      rating: 5,
      text: "The quality of these oversized tees is incredible! Soft, durable, and true to size. Have bought 3 already and will definitely be back for more.",
      date: "March 2026"
    },
    {
      name: "Ahmed Malik",
      rating: 4,
      text: "Great fit and excellent material. The polo shirts hold their shape well after multiple washes. Customer service was also very helpful.",
      date: "February 2026"
    },
    {
      name: "Fatima Ali",
      rating: 5,
      text: "Love the denim jacket! Perfect weight for spring/fall layering. Gets compliments every time I wear it. Worth every penny.",
      date: "January 2026"
    },
    {
      name: "Bilal Hassan",
      rating: 5,
      text: "First time buying formal shirts online and I'm impressed. The fit is perfect and the fabric feels luxurious. Will be a repeat customer.",
      date: "March 2026"
    },
    {
      name: "Zara Ahmed",
      rating: 4,
      text: "The cargo pants are exactly what I was looking for - functional yet stylish. Plenty of pockets and comfortable for all-day wear.",
      date: "February 2026"
    },
    {
      name: "Omar Siddiqui",
      rating: 5,
      text: "Excellent quality across all products. The attention to detail in stitching and fabric selection is impressive. Highly recommend ANIM CLOTHING!",
      date: "March 2026"
    }
  ];

  // Create review cards
  reviewsTrack.innerHTML = reviews.map((review, index) => `
    <div class="review-card">
      <div class="review-header">
        <h3>${review.name}</h3>
        <div class="review-rating">
          ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
        </div>
        <span class="review-date">${review.date}</span>
      </div>
      <p class="review-text">${review.text}</p>
    </div>
  `).join('');

  // Auto-scroll functionality
  let autoScrollInterval;
  const scrollAmount = 300; // Approximate width of one card including gap
  const scrollDelay = 5000; // 5 seconds between auto-scrolls
  
  const startAutoScroll = () => {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
    autoScrollInterval = setInterval(() => {
      // Scroll smoothly to the next position
      reviewsTrack.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
      
      // Check if we've reached the end and reset to beginning
      setTimeout(() => {
        if (reviewsTrack.scrollLeft >= (reviewsTrack.scrollWidth - reviewsTrack.clientWidth)) {
          // Smoothly scroll back to beginning
          reviewsTrack.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
        }
      }, scrollDelay);
    }, scrollDelay);
  };
  
  // Pause auto-scroll when user interacts
  const stopAutoScroll = () => {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      autoScrollInterval = null;
    }
  };
  
  // Restart auto-scroll after user interaction
  const restartAutoScroll = () => {
    stopAutoScroll();
    // Wait a bit before restarting to let user finish their interaction
    setTimeout(() => {
      startAutoScroll();
    }, 10000); // Wait 10 seconds before restarting auto-scroll
  };
  
  // Start auto-scroll when user stops interacting for a while
  let scrollTimeout;
  
  const onUserScroll = () => {
    stopAutoScroll();
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      startAutoScroll();
    }, 8000); // Restart auto-scroll after 8 seconds of inactivity
  };
  
  // Add event listeners for user interaction
  reviewsTrack.addEventListener('scroll', onUserScroll);
  reviewsTrack.addEventListener('wheel', onUserScroll);
  reviewsTrack.addEventListener('touchstart', onUserScroll);
  reviewsTrack.addEventListener('mousedown', onUserScroll);
  
  // Start auto-scroll initially
  startAutoScroll();
}

// --- Search Toggle ---
const searchBtn = qs('#searchToggle');
searchBtn?.addEventListener('click', () => showToast('Search coming soon!'));

// --- Init ---
function init() {
  setupHeroSlider();
  renderCategoryTabs();
  renderCategoryCards('all');
  setupNavbar();
  setupMobileMenu();
  setupSharedSidebars();
  updateCartUI();
  updateWishlistUI();
  setupNewsletter();
  setupScrollReveal();
  setupCounter();
  setupReviewsSlider();
  setupBackToTop();
}

function togglePolicy(id) {
  const section = document.getElementById(id);
  if (!section) return;
  section.classList.toggle('policy-collapsed');
  if (!section.classList.contains('policy-collapsed')) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function setupBackToTop() {
  const btn = qs('#backToTop');
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

document.addEventListener('DOMContentLoaded', init);
