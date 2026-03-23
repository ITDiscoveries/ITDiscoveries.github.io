/* =============================================
   LA MIA ITALIA — Blog Script
   ============================================= */

(function () {
  "use strict";

  // ── Slideshow ──────────────────────────────
  const slides    = Array.from(document.querySelectorAll('.slide'));
  const dotsWrap  = document.getElementById('heroDots');
  const prevBtn   = document.getElementById('prevBtn');
  const nextBtn   = document.getElementById('nextBtn');
  let current     = 0;
  let timer;

  // Build dots
  slides.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = 'dot' + (i === 0 ? ' active' : '');
    btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    btn.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(btn);
  });

  const dots = () => Array.from(dotsWrap.querySelectorAll('.dot'));

  function goTo(n) {
    slides[current].classList.remove('active');
    dots()[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots()[current].classList.add('active');
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  if (slides.length > 1) {
    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));
    resetTimer();
  } else {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
  }

  // ── Hero collapse on scroll ─────────────────
  const hero    = document.getElementById('hero');
  const siteNav = document.getElementById('siteNav');

  // Threshold: collapse after scrolling 30% of hero height
  const COLLAPSE_THRESHOLD = () => window.innerHeight * 0.01;

  function onScroll() {
    const scrolled = window.scrollY;
    const threshold = COLLAPSE_THRESHOLD();

    // Parallax: move the slides faster than the scroll (1.4× speed)
    const PARALLAX_SPEED = 1.4;
    hero.style.transform = `translateY(-${scrolled * PARALLAX_SPEED}px)`;

    if (scrolled > threshold) {
      hero.classList.add('collapsed');
      siteNav.classList.add('visible');
    } else {
      hero.classList.remove('collapsed');
      siteNav.classList.remove('visible');
    }
}

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // ── Footer year ────────────────────────────
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Smooth-scroll nav links ─────────────────
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      // Account for sticky nav height
      const offset = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

})();
