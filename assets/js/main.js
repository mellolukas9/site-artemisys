// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== MOBILE MENU =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  navToggle.setAttribute('aria-expanded', isOpen);
  // Animate hamburger → X
  const spans = navToggle.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ===== SCROLL FADE ANIMATIONS =====
const fadeEls = document.querySelectorAll(
  '.feature-card, .case-card, .step, .testimonial-card, .about-content, .about-visual, .contact-item, .section-header'
);

fadeEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 80 * (entry.target.dataset.delay || 0));
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

// Stagger siblings
document.querySelectorAll('.features-grid, .cases-track, .testimonials-grid, .steps-container').forEach(parent => {
  parent.querySelectorAll('.fade-up').forEach((child, i) => {
    child.dataset.delay = i;
  });
});

fadeEls.forEach(el => observer.observe(el));

// ===== CONTACT FORM → WHATSAPP =====
const WA_NUMBER = '5521990366370';

const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const company = document.getElementById('company').value.trim();
  const message = document.getElementById('message').value.trim();

  let text = `Olá! Vim pelo site da Artemisys.\n\n`;
  text += `*Nome:* ${name}\n`;
  if (company) text += `*Empresa:* ${company}\n`;
  text += `\n*Mensagem:*\n${message}`;

  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener');
});

// ===== CASES CAROUSEL =====
const casesTrack = document.getElementById('casesTrack');
const casesPrev = document.querySelector('.cases-btn-prev');
const casesNext = document.querySelector('.cases-btn-next');

if (casesTrack && casesPrev && casesNext) {
  const scrollBy = () => {
    const card = casesTrack.querySelector('.case-card');
    return card ? card.offsetWidth + 20 : 340;
  };
  casesPrev.addEventListener('click', () => casesTrack.scrollBy({ left: -scrollBy(), behavior: 'smooth' }));
  casesNext.addEventListener('click', () => casesTrack.scrollBy({ left: scrollBy(), behavior: 'smooth' }));
}

// ===== SMOOTH ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinkItems.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--text)' : '';
  });
});
