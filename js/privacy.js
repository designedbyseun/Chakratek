/**
 * CHAKRATEK — Privacy Policy
 * privacy.js
 *
 * Handles: nav scroll shadow, badge pulse
 */

(function () {
  'use strict';

  /* ============================================================
     NAV — shadow on scroll
     ============================================================ */
  function initNavScroll() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          nav.classList.toggle('is-scrolled', window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /* ============================================================
     BADGE PULSE — subtle ring after 2.5s
     ============================================================ */
  function initBadgePulse() {
    const badge = document.querySelector('.badge');
    if (!badge) return;

    setTimeout(() => {
      badge.style.transition =
        'box-shadow 0.35s ease, opacity 0.18s ease, transform 0.18s ease';
      badge.style.boxShadow = '0 0 0 5px rgba(0, 0, 0, 0.10)';
      setTimeout(() => {
        badge.style.boxShadow = '';
      }, 550);
    }, 2500);
  }

  /* ============================================================
     INIT
     ============================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    initNavScroll();
    initBadgePulse();
  });

})();
