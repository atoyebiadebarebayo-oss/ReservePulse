// --- STATE MANAGEMENT ---
let reservations = JSON.parse(localStorage.getItem('reservepulse_bookings')) || [];

// --- DOM ELEMENTS ---
const reservationForm = document.getElementById('reservation-form');
const resDateInput = document.getElementById('res-date');
const themeToggleBtn = document.getElementById('theme-toggle-btn');

const viewBookingsBtn = document.getElementById('view-bookings-btn');
const bookingsModal = document.getElementById('bookings-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const bookingsList = document.getElementById('bookings-list');
const bookingCount = document.getElementById('booking-count');

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  initDateDefault();
  initTheme();
  updateBookingsUI();
});

function initDateDefault() {
  const today = new Date().toISOString().split('T')[0];
  resDateInput.value = today;
  resDateInput.min = today;
}

// --- THEME SWITCHER ---
function initTheme() {
  if (localStorage.getItem('reservepulse_theme') === 'light') {
    document.body.classList.add('light-mode');
    themeToggleBtn.querySelector('i').className = 'fa-solid fa-moon';
  } else {
    themeToggleBtn.querySelector('i').className = 'fa-solid fa-sun';
  }
}

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  localStorage.setItem('reservepulse_theme', isLight ? 'light' : 'dark');
  themeToggleBtn.querySelector('i').className = isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
});

// --- FORM SUBMISSION & WHATSAPP ROUTER ---
reservationForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('guest-name').value.trim();
  const phone = document.getElementById('guest-phone').value.trim();
  const count = document.getElementById('guest-count').value;
  const date = document.getElementById('res-date').value;
  const time = document.getElementById('res-time').value;
  const type = document.getElementById('res-type').value;
  const requests = document.getElementById('special-requests').value.trim() || 'None';

  const newBooking = {
    id: Date.now().toString(),
    name,
    phone,
    count,
    date,
    time,
    type,
    requests,
    createdAt: new Date().toLocaleDateString()
  };

  reservations.unshift(newBooking);
  localStorage.setItem('reservepulse_bookings', JSON.stringify(reservations));
  updateBookingsUI();

  // Route to WhatsApp (07040416469 -> International format: 2347040416469)
  const targetPhone = '2347040416469';
  
  let msg = `🍷 *NEW TABLE RESERVATION — Ade Bistro*\n`;
  msg += `👤 *Guest Name*: ${name}\n`;
  msg += `📱 *Contact*: ${phone}\n`;
  msg += `👥 *Guests*: ${count}\n`;
  msg += `📅 *Date*: ${date}\n`;
  msg += `⏰ *Time Slot*: ${time}\n`;
  msg += `✨ *Experience*: ${type}\n`;
  msg += `📝 *Special Requests*: ${requests}\n\n`;
  msg += `Please confirm my reservation slot!`;

  const encoded = encodeURIComponent(msg);
  window.open(`https://wa.me/${targetPhone}?text=${encoded}`, '_blank');
  
  reservationForm.reset();
  initDateDefault();
});

// --- UI UPDATES ---
function updateBookingsUI() {
  bookingCount.innerText = reservations.length;

  if (reservations.length === 0) {
    bookingsList.innerHTML = `<p class="empty-msg">No active reservations stored yet.</p>`;
    return;
  }

  bookingsList.innerHTML = '';
  reservations.forEach(res => {
    const el = document.createElement('div');
    el.className = 'booking-item';
    el.innerHTML = `
      <div>
        <strong>${escapeHTML(res.name)} (${res.count})</strong>
        <span>${res.date} at ${res.time} • ${escapeHTML(res.type)}</span>
      </div>
      <button class="btn-icon" style="color: #ef4444;" onclick="deleteBooking('${res.id}')">
        <i class="fa-solid fa-trash"></i>
      </button>
    `;
    bookingsList.appendChild(el);
  });
}

window.deleteBooking = function(id) {
  reservations = reservations.filter(r => r.id !== id);
  localStorage.setItem('reservepulse_bookings', JSON.stringify(reservations));
  updateBookingsUI();
};

// --- MODAL CONTROLS ---
viewBookingsBtn.addEventListener('click', () => bookingsModal.classList.add('active'));
closeModalBtn.addEventListener('click', () => bookingsModal.classList.remove('active'));
window.addEventListener('click', (e) => {
  if (e.target === bookingsModal) bookingsModal.classList.remove('active');
});

// --- UTILITIES ---
function escapeHTML(str) {
  return str ? str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  ) : '';
}