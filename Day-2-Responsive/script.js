/* ═══════════════════════════════════════════════
   Bilal Portfolio — script.js
   ═══════════════════════════════════════════════ */

/* ─── 1. Smooth Scroll for all anchor links ─── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


/* ─── 2. Header shrink + active nav on scroll ─── */
const header = document.querySelector('header');
const sections = document.querySelectorAll('section[id], .hero');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  /* Shrink header after 50px */
  header.classList.toggle('scrolled', window.scrollY > 50);

  /* Highlight active nav link */
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.id || 'home';
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href').replace('#', '') || 'home';
    if (href === current || (current === '' && href === 'home')) {
      link.classList.add('active');
    }
  });
});

/* Inject matching CSS for scrolled header + active nav */
const styleTag = document.createElement('style');
styleTag.textContent = `
  header.scrolled {
    background: rgba(0, 0, 0, 0.85);
    padding: 10px 20px;
    transition: padding 0.3s ease, background 0.3s ease;
  }
  nav a.active {
    color: var(--secondary);
  }
  nav a.active::after {
    width: 100%;
  }
`;
document.head.appendChild(styleTag);


/* ─── 3. Typed-text effect in hero ─── */
const typedEl = document.querySelector('.hero p');
if (typedEl) {
  const phrases = [
    'I am a Frontend Developer',
    'I build Modern UIs',
    'I love React & CSS',
    'I turn Figma into Code',
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const current = phrases[phraseIndex];
    typedEl.textContent = deleting
      ? current.substring(0, charIndex--)
      : current.substring(0, charIndex++);

    let delay = deleting ? 50 : 90;

    if (!deleting && charIndex === current.length + 1) {
      delay = 1800;
      deleting = true;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }
  type();
}


/* ─── 4. Scroll-reveal animation ─── */
const revealStyle = document.createElement('style');
revealStyle.textContent = `
  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.65s ease, transform 0.65s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(revealStyle);

/* Mark elements to reveal */
document.querySelectorAll(
  '.about-text, .about-image, .project-card, .footer-container > div'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.1}s`;
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ─── 5. Hire Me button → scroll to contact (footer) ─── */
document.getElementById('btn')?.addEventListener('click', () => {
  document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
});


/* ─── 6. Contact Me button → mailto ─── */
document.getElementById('btn1')?.addEventListener('click', () => {
  window.location.href = 'mailto:bilal@example.com';
});


/* ─── 7. Download CV button ─── */
document.querySelector('.about-btn')?.addEventListener('click', () => {
  /* Replace 'cv.pdf' with the actual CV file path */
  const link = document.createElement('a');
  link.href = 'cv.pdf';
  link.download = 'Bilal_CV.pdf';
  link.click();
});


/* ─── 8. Back-to-top button ─── */
const topBtn = document.createElement('button');
topBtn.id = 'back-to-top';
topBtn.innerHTML = '&#8679;';
topBtn.title = 'Back to top';
document.body.appendChild(topBtn);

const topStyle = document.createElement('style');
topStyle.textContent = `
  #back-to-top {
    position: fixed;
    bottom: 30px;
    right: 28px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--secondary);
    color: white;
    border: none;
    font-size: 22px;
    cursor: pointer;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.3s ease, transform 0.3s ease, background 0.2s;
    z-index: 999;
    box-shadow: 0 4px 14px rgba(0,198,255,0.4);
    line-height: 1;
  }
  #back-to-top.show {
    opacity: 1;
    transform: translateY(0);
  }
  #back-to-top:hover {
    background: #00aee6;
    transform: translateY(-3px);
  }
`;
document.head.appendChild(topStyle);

window.addEventListener('scroll', () => {
  topBtn.classList.toggle('show', window.scrollY > 400);
});

topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ─── 9. Project card click ripple ─── */
document.querySelectorAll('.project-card').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute; border-radius:50%;
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top - size/2}px;
      background:rgba(0,198,255,0.18);
      transform:scale(0); animation:ripple 0.55s ease-out forwards;
      pointer-events:none;
    `;
    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    to { transform: scale(2.5); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);


/* ─── 10. Current year in footer ─── */
const yearEl = document.querySelector('.footer-bottom p');
if (yearEl) {
  yearEl.textContent = yearEl.textContent.replace(
    /\d{4}/,
    new Date().getFullYear()
  );
}