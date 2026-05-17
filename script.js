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

  // ── Tab Navigation ──────────────────────────
  const tabBtns  = Array.from(document.querySelectorAll('.tab-btn'));
  const panels   = Array.from(document.querySelectorAll('.tab-panel'));
  const inkBar   = document.getElementById('tabInk');

  function moveInk(btn) {
    const navRect = btn.closest('.tab-nav').getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    inkBar.style.left  = (btnRect.left - navRect.left) + 'px';
    inkBar.style.width = btnRect.width + 'px';
  }

  function activateTab(tabId) {
    tabBtns.forEach(b => {
      const active = b.dataset.tab === tabId;
      b.classList.toggle('active', active);
      b.setAttribute('aria-selected', active);
    });

    panels.forEach(p => {
      if (p.dataset.panel === tabId) {
        p.removeAttribute('hidden');
      } else {
        p.setAttribute('hidden', '');
      }
    });

    const activeBtn = tabBtns.find(b => b.dataset.tab === tabId);
    if (activeBtn) moveInk(activeBtn);

    // Scroll content back to top on tab switch
    window.scrollTo({ top: document.querySelector('.tab-nav').offsetTop, behavior: 'smooth' });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => activateTab(btn.dataset.tab));
  });

  // ── Expandable post bodies ──────────────────
  document.querySelectorAll('.post-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const expand = btn.previousElementSibling; // the .post-expand div
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        expand.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = 'Read →';
      } else {
        expand.removeAttribute('hidden');
        btn.setAttribute('aria-expanded', 'true');
        btn.textContent = 'Close ↑';
      }
    });
  });

  // ── Works cited toggles ─────────────────────
  document.querySelectorAll('.works-cited-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.nextElementSibling; // the .works-cited div
      const isOpen  = btn.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        section.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = 'Works Cited ↓';
      } else {
        section.removeAttribute('hidden');
        btn.setAttribute('aria-expanded', 'true');
        btn.textContent = 'Works Cited ↑';
      }
    });
  });

  // Set initial ink position after layout
  requestAnimationFrame(() => {
    const initial = tabBtns.find(b => b.classList.contains('active'));
    if (initial) moveInk(initial);
  });

  // Re-position ink on resize
  window.addEventListener('resize', () => {
    const active = tabBtns.find(b => b.classList.contains('active'));
    if (active) moveInk(active);
  });

  // ── Footer year ────────────────────────────
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();