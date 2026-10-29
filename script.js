// WhatsApp number: country code first, digits only
const WHATSAPP_NUMBER = "9779841649644";

// Mobile menu
const navLinks = document.getElementById('navLinks');
document.getElementById('menuBtn').addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Dark mode (remembered)
const themeBtn = document.getElementById('themeBtn');
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  themeBtn.textContent = t === 'dark' ? '☀️' : '🌙';
}
let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) {}
applyTheme(saved || 'light');
themeBtn.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Quote form -> opens WhatsApp with a prefilled message
document.getElementById('quoteForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;
  const qty = document.getElementById('qty').value.trim();
  const details = document.getElementById('message').value.trim();
  const out = document.getElementById('formMsg');

  if (!name || !phone) { out.className = 'msg error'; out.textContent = 'Please enter your name and phone number.'; return; }

  const text =
    `Hello Press Pathivara,%0A` +
    `Name: ${encodeURIComponent(name)}%0A` +
    `Phone: ${encodeURIComponent(phone)}%0A` +
    `Service: ${encodeURIComponent(service)}%0A` +
    (qty ? `Quantity: ${encodeURIComponent(qty)}%0A` : '') +
    (details ? `Details: ${encodeURIComponent(details)}` : '');

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  out.className = 'msg ok';
  out.textContent = 'Opening WhatsApp with your request...';
});

document.getElementById('year').textContent = new Date().getFullYear();
