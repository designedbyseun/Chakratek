/**
 * CHAKRATEK — SportyReserve Case Study
 * SportyReserve.js
 *
 * Handles: nav scroll shadow, scroll-triggered section reveals,
 *          lazy image fade-in, badge pulse
 */

(function () {
  'use strict';

  /* ============================================================
     NAV — adds .is-scrolled shadow class on scroll
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
     SCROLL REVEAL
     Observes .showcase, .overview, and .meta__item elements.
     Adds .is-visible when they enter the viewport.
     ============================================================ */
  function initScrollReveal() {
    const targets = document.querySelectorAll(
      '.showcase, .overview, .meta__item'
    );

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    targets.forEach((el) => observer.observe(el));
  }

  /* ============================================================
     IMAGE FADE-IN
     Each showcase and hero image fades in once loaded.
     Handles both cached images (already .complete) and
     lazy-loaded images via the 'load' event.
     ============================================================ */
  function initImageFade() {
    const images = document.querySelectorAll(
      '.showcase__image, .hero__image'
    );

    images.forEach((img) => {
      // Already cached / loaded
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add('is-loaded');
        return;
      }

      img.addEventListener('load', () => {
        img.classList.add('is-loaded');
      });

      // Graceful error fallback — don't break the layout
      img.addEventListener('error', () => {
        img.style.opacity = '0.1';
        img.style.filter  = 'grayscale(1)';
      });
    });
  }

  /* ============================================================
     BADGE PULSE — subtle ring pulse after 2.5s
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
     INIT — run everything on DOMContentLoaded
     ============================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    initNavScroll();
    initScrollReveal();
    initImageFade();
    initBadgePulse();
  });

})();
