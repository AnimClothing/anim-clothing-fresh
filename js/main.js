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

   catGrid.innerHTML = filtered.map((cat, i) => {
     // Generate image path based on category ID
     const imagePath = `assets/images/${cat.id}-card.jpg`;
     return `
       <a href="collection.html?cat=${cat.id}" class="cat-card reveal" data-category="${cat.id}">
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
}

document.addEventListener('DOMContentLoaded', init);
