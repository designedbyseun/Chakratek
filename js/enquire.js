/**
 * CHAKRATEK — Enquire Page Scripts
 * Handles: form validation, submission UX, select state, animations
 */

(function () {
  'use strict';

  /* ============================================================
     DOM REFERENCES
     ============================================================ */
  const form        = document.getElementById('enquireForm');
  const submitBtn   = form ? form.querySelector('.form__submit') : null;

  /* ============================================================
     SELECT: colour the placeholder option differently
     ============================================================ */
  function initSelectState() {
    const selects = document.querySelectorAll('.form__select');

    selects.forEach((sel) => {
      // Set initial colour based on value
      updateSelectColor(sel);

      sel.addEventListener('change', () => updateSelectColor(sel));
    });
  }

  function updateSelectColor(sel) {
    if (sel.value) {
      sel.classList.add('has-value');
    } else {
      sel.classList.remove('has-value');
    }
  }

  /* ============================================================
     VALIDATION HELPERS
     ============================================================ */

  /**
   * Show an error message beneath a field.
   * @param {HTMLElement} field  - The input/select/textarea
   * @param {string}      msg    - Error text
   */
  function showError(field, msg) {
    field.classList.add('has-error');
    const errEl = field.parentElement.querySelector('.form__error');
    if (errEl) {
      errEl.textContent = msg;
      errEl.classList.add('is-visible');
    }
  }

  /**
   * Clear error state from a field.
   * @param {HTMLElement} field
   */
  function clearError(field) {
    field.classList.remove('has-error');
    const errEl = field.parentElement.querySelector('.form__error');
    if (errEl) {
      errEl.textContent = '';
      errEl.classList.remove('is-visible');
    }
  }

  /** Basic email format check */
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  /**
   * Validate the entire form.
   * Returns true if valid, false otherwise.
   */
  function validateForm() {
    let isValid = true;

    const nameField    = document.getElementById('name');
    const emailField   = document.getElementById('email');
    const serviceField = document.getElementById('service');
    const detailsField = document.getElementById('details');

    // Name
    if (!nameField.value.trim()) {
      showError(nameField, 'Please enter your name.');
      isValid = false;
    } else {
      clearError(nameField);
    }

    // Email
    if (!emailField.value.trim()) {
      showError(emailField, 'Please enter your email address.');
      isValid = false;
    } else if (!isValidEmail(emailField.value)) {
      showError(emailField, 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearError(emailField);
    }

    // Service
    if (!serviceField.value) {
      showError(serviceField, 'Please select a service.');
      isValid = false;
    } else {
      clearError(serviceField);
    }

    // Project Details
    if (!detailsField.value.trim()) {
      showError(detailsField, 'Please tell us about your project.');
      isValid = false;
    } else if (detailsField.value.trim().length < 20) {
      showError(detailsField, 'Please provide at least 20 characters.');
      isValid = false;
    } else {
      clearError(detailsField);
    }

    return isValid;
  }

  /* ============================================================
     LIVE VALIDATION — clear errors as user types/changes
     ============================================================ */
  function initLiveValidation() {
    const fields = form.querySelectorAll('.form__input, .form__select, .form__textarea');

    fields.forEach((field) => {
      const events = field.tagName === 'SELECT' ? ['change'] : ['input', 'blur'];

      events.forEach((evt) => {
        field.addEventListener(evt, () => {
          if (field.classList.contains('has-error')) {
            clearError(field);
          }
        });
      });
    });
  }

  /* ============================================================
     FORM SUBMISSION
     Simulates an async submit (swap with real fetch/XHR).
     ============================================================ */
  function initFormSubmit() {
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validateForm()) return;

      // Show loading state
      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;

      // Use FormSubmit's AJAX endpoint
      const formData = new FormData(form);

      fetch("https://formsubmit.co/ajax/ayomide@chakratek.co.uk", {
        method: "POST",
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        const submitText = submitBtn.querySelector('.form__submit-text');
        submitBtn.classList.remove('is-loading');
        submitBtn.classList.add('is-success');
        if (submitText) {
          submitText.textContent = 'Message Sent';
        }
        // Keep button disabled on success, then reset after 3s
        setTimeout(() => {
          form.reset();
          
          submitBtn.classList.remove('is-success');
          submitBtn.disabled = false;
          submitText.textContent = 'Submit';
        }, 3000);
      })
      .catch(error => {
        const submitText = submitBtn.querySelector('.form__submit-text');
        submitBtn.classList.remove('is-loading');
        submitBtn.classList.add('is-error');
        if (submitText) {
          submitText.textContent = 'Error';
        }
        console.error('Error:', error);

        // Reset button after a delay so user can try again
        setTimeout(() => {
          submitBtn.classList.remove('is-error');
          submitBtn.disabled = false;
          if (submitText) {
            submitText.textContent = 'Submit';
          }
        }, 3000);
      });
    });
  }

  /* ============================================================
     NAV SCROLL SHADOW
     ============================================================ */
  function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          nav.style.boxShadow = window.scrollY > 10
            ? '0 1px 16px rgba(0,0,0,0.07)'
            : 'none';
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /* ============================================================
     TEXTAREA: auto-grow as user types
     ============================================================ */
  function initAutoGrow() {
    const textarea = document.getElementById('details');
    if (!textarea) return;

    textarea.addEventListener('input', () => {
      // Reset height so shrinkage works
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    });
  }

  /* ============================================================
     INIT
     ============================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    initSelectState();
    initLiveValidation();
    initFormSubmit();
    initNavScroll();
    initAutoGrow();
  });

})();
