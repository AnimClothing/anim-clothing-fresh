/* ============================================
   ANIM CLOTHING — Checkout Page
   ============================================ */

// ============================================================
// FormSubmit Config — https://formsubmit.co
// Orders are emailed to you when a customer checks out.
// ============================================================
const FORM_SUBMIT_EMAIL = 'animclothing.official@gmail.com'; // Change this to your email

function renderCheckoutSummary() {
  const container = document.getElementById('checkoutItems');
  const subtotalEl = document.getElementById('checkoutSubtotal');
  const totalEl = document.getElementById('checkoutTotal');

  if (!container) return;

  if (!cart || cart.length === 0) {
    container.innerHTML = '<div class="checkout-empty"><i class="fas fa-shopping-bag"></i><p>Your cart is empty.</p><a href="index.html" class="btn btn-outline">Start Shopping</a></div>';
    if (subtotalEl) subtotalEl.textContent = 'Rs. 0';
    if (totalEl) totalEl.textContent = 'Rs. 0';
    return;
  }

  const fmt = (n) => 'Rs. ' + n.toLocaleString('en-PK');
  let subtotal = 0;

  container.innerHTML = cart.map(item => {
    const p = products.find(pr => pr.id === item.id);
    if (!p) return '';
    subtotal += p.price * item.qty;
    return `
      <div class="checkout-item">
        <div class="checkout-item-icon"><i class="fas ${p.icon}"></i></div>
        <div class="checkout-item-info">
          <div class="checkout-item-name">${p.name}</div>
          <div class="checkout-item-price">${fmt(p.price)}</div>
        </div>
        <div class="checkout-item-qty">x${item.qty}</div>
        <div class="checkout-item-total">${fmt(p.price * item.qty)}</div>
      </div>
    `;
  }).join('');

  if (subtotalEl) subtotalEl.textContent = fmt(subtotal);
  if (totalEl) totalEl.textContent = fmt(subtotal);
}

function submitOrder(e) {
  e.preventDefault();

  const btn = document.getElementById('placeOrderBtn');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Placing Order...';
  }

  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const city = document.getElementById('custCity').value.trim();
  const address = document.getElementById('custAddress').value.trim();
  const notes = document.getElementById('custNotes').value.trim();

  if (!name || !phone || !city || !address) {
    showToast('Please fill in all required fields.');
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-check"></i> Place Order';
    }
    return;
  }

  const items = cart.map(item => {
    const p = products.find(pr => pr.id === item.id);
    return p ? { id: item.id, name: p.name, qty: item.qty, price: p.price } : null;
  }).filter(Boolean);

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const orderId = 'ANIM-' + Date.now().toString(36).toUpperCase();
  const date = new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' });
  const itemsStr = items.map(i => i.name + ' x' + i.qty + ' (Rs.' + i.price.toLocaleString('en-PK') + ')').join('\n');

  // Send to FormSubmit AJAX API
  fetch('https://formsubmit.co/ajax/' + FORM_SUBMIT_EMAIL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      _subject: 'New Order: ' + orderId,
      _template: 'table',
      'Order ID': orderId,
      'Date': date,
      'Customer Name': name,
      'Phone': phone,
      'City': city,
      'Address': address,
      'Notes': notes || 'None',
      'Items': itemsStr,
      'Total': 'Rs. ' + total.toLocaleString('en-PK'),
      'Status': 'Pending'
    })
  }).catch(function() {});

  // Clear cart
  cart = [];
  saveCart();
  updateCartUI();

  // Show confirmation
  document.getElementById('checkoutLayout').style.display = 'none';
  document.getElementById('checkoutConfirmation').style.display = 'block';
  document.getElementById('confirmOrderId').textContent = orderId;

  showToast('Order placed! Your Order ID: ' + orderId);
}

document.addEventListener('DOMContentLoaded', () => {
  renderCheckoutSummary();
  updateCartUI();
  setupSharedSidebars();
  setupBackToTop();

  const form = document.getElementById('checkoutForm');
  if (form) form.addEventListener('submit', submitOrder);
});

function setupBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
