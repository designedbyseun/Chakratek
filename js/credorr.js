/**
 * CHAKRATEK — Credorr Case Study
 * script.js
 *
 * Handles: scroll-triggered reveals, nav shadow,
 *          meta stagger, lazy image fade-in
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
     GENERIC SCROLL REVEAL
     Adds .is-visible to .showcase, .overview, .meta__item
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
     IMAGE LAZY FADE-IN
     Once a <img> inside .showcase / hero loads, reveal it.
     ============================================================ */
  function initImageFade() {
    const images = document.querySelectorAll(
      '.showcase__image, .hero__image'
    );

    images.forEach((img) => {
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add('is-loaded');
        return;
      }

      img.addEventListener('load', () => img.classList.add('is-loaded'));

      img.addEventListener('error', () => {
        img.style.opacity = '0.12';
        img.style.filter  = 'grayscale(1)';
      });
    });
  }

  /* ============================================================
     BADGE — subtle pulse after 2.5s
     ============================================================ */
  function initBadgePulse() {
    const badge = document.querySelector('.badge');
    if (!badge) return;

    setTimeout(() => {
      badge.style.transition = 'box-shadow 0.35s ease, opacity 0.18s ease, transform 0.18s ease';
      badge.style.boxShadow  = '0 0 0 5px rgba(0,0,0,0.10)';
      setTimeout(() => { badge.style.boxShadow = ''; }, 550);
    }, 2500);
  }

  /* ============================================================
     INIT
     ============================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    initNavScroll();
    initScrollReveal();
    initImageFade();
    initBadgePulse();
  });

})();
