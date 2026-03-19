/**
 * CHAKRATEK — Portfolio Scripts
 * Author: Senior Frontend Engineer
 * Handles: Card entrance animations, hover effects, nav behaviour
 */

(function () {
  'use strict';

  /* ============================================================
     CARD ENTRANCE ANIMATION (IntersectionObserver)
     Cards fade + slide up as they enter the viewport,
     staggered by their data-index attribute.
     ============================================================ */
  function initCardAnimations() {
    const cards = document.querySelectorAll('.card');

    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target;
            const index = parseInt(card.getAttribute('data-index'), 10) || 0;

            // Stagger delay: 80ms per card index
            const delay = index * 80;

            setTimeout(() => {
              card.classList.add('is-visible');
            }, delay);

            // Stop observing once visible
            observer.unobserve(card);
          }
        });
      },
      {
        threshold: 0.08,         // Trigger when 8% of card is visible
        rootMargin: '0px 0px -40px 0px', // Slightly below viewport fold
      }
    );

    cards.forEach((card) => observer.observe(card));
  }

  /* ============================================================
     NAV SCROLL BEHAVIOUR
     Adds a subtle shadow to the nav on scroll.
     ============================================================ */
  function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 10) {
            nav.style.boxShadow = '0 1px 16px rgba(0,0,0,0.07)';
          } else {
            nav.style.boxShadow = 'none';
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /* ============================================================
     CARD CLICK — Navigate to placeholder project page
     Cards are <a> tags, so this is mostly enhancement:
     add a quick visual press effect.
     ============================================================ */
  function initCardPress() {
    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => {
      card.addEventListener('mousedown', () => {
        card.style.transform = 'scale(0.985)';
      });

      card.addEventListener('mouseup', () => {
        card.style.transform = '';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ============================================================
     BADGE PULSE — Subtle attention pulse on the Framer badge
     ============================================================ */
  function initBadgePulse() {
    const badge = document.querySelector('.badge');
    if (!badge) return;

    // Pulse after 3 seconds, once
    setTimeout(() => {
      badge.style.transition = 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease';
      badge.style.boxShadow = '0 0 0 4px rgba(0,0,0,0.12)';

      setTimeout(() => {
        badge.style.boxShadow = '';
      }, 600);
    }, 3000);
  }

  /* ============================================================
     LAZY IMAGE — Enhance native loading="lazy" with a fade-in
     ============================================================ */
  function initImageFadeIn() {
    const images = document.querySelectorAll('.card__image');

    images.forEach((img) => {
      // If already loaded (cached)
      if (img.complete) {
        img.style.opacity = '1';
        return;
      }

      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease';

      img.addEventListener('load', () => {
        img.style.opacity = '1';
      });

      img.addEventListener('error', () => {
        // Fallback: show a neutral placeholder colour
        img.closest('.card__image-wrap').style.backgroundColor = '#2a2a2a';
        img.style.display = 'none';
      });
    });
  }

  /* ============================================================
     INIT — Run everything on DOMContentLoaded
     ============================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    initCardAnimations();
    initNavScroll();
    initCardPress();
    initBadgePulse();
    initImageFadeIn();
  });

})();
