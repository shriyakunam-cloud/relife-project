// ── Navbar scroll effect ────────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Mobile menu ─────────────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── Scroll reveal ───────────────────────────────────────────────────────────
const revealTargets = [
  '#stats .stat-card',
  '#about .about-card',
  '#about .about-text',
  '#initiatives .initiative-card',
  '#greenroom .greenroom-text',
  '#greenroom .greenroom-visual',
  '#why .why-card',
  '#contact .contact-text',
  '#contact .contact-form',
];

revealTargets.forEach(sel => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.08}s`;
  });
});

const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Contact form (mailto fallback) ──────────────────────────────────────────
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name     = this.name.value.trim();
  const email    = this.email.value.trim();
  const interest = this.interest.value;
  const message  = this.message.value.trim();

  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nInterest: ${interest || 'Not specified'}\n\n${message}`
  );
  const subject = encodeURIComponent('ReLife Project Inquiry');

  window.location.href = `mailto:relifeproj@gmail.com?subject=${subject}&body=${body}`;

  const btn = this.querySelector('button[type="submit"]');
  btn.textContent = '✓ Message ready — check your email app!';
  btn.style.background = '#2d7a4f';
  btn.disabled = true;
});
