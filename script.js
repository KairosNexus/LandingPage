/**
 * Kairos Nexus Global - Interactive Features
 * Premium Landing Page JavaScript
 * @version 2.0.0
 * @author Kairos Nexus Global
 * @license Proprietary
 */

(function () {
  'use strict';

  // ===================================
  // CONFIGURATION
  // ===================================

  /**
   * Application configuration constants
   * @readonly
   */
  const CONFIG = Object.freeze({
    // Launch date for countdown timer
    LAUNCH_DATE: new Date('January 15, 2026 00:00:00 GMT-0600'),

    // Typewriter animation settings
    TYPEWRITER: {
      SPEED_NORMAL: 60,
      SPEED_SLOW: 80,
      CURSOR_HIDE_DELAY: 2000,
      START_DELAY: 500
    },

    // Scroll behavior settings
    SCROLL: {
      THRESHOLD: 50,
      THROTTLE_MS: 16 // ~60fps
    },

    // Storage keys
    STORAGE: {
      THEME_KEY: 'kairos-theme'
    },

    // Intersection observer settings
    OBSERVER: {
      ROOT_MARGIN: '0px 0px -100px 0px',
      THRESHOLD: 0.1
    }
  });

  // ===================================
  // UTILITY FUNCTIONS
  // ===================================

  /**
   * Safely query a DOM element
   * @param {string} selector - CSS selector
   * @param {Element} [context=document] - Context to search within
   * @returns {Element|null} The found element or null
   */
  function $(selector, context = document) {
    try {
      return context.querySelector(selector);
    } catch (error) {
      console.error(`[Kairos] Failed to select: ${selector}`, error);
      return null;
    }
  }

  /**
   * Safely query multiple DOM elements
   * @param {string} selector - CSS selector
   * @param {Element} [context=document] - Context to search within
   * @returns {NodeListOf<Element>} The found elements
   */
  function $$(selector, context = document) {
    try {
      return context.querySelectorAll(selector);
    } catch (error) {
      console.error(`[Kairos] Failed to select all: ${selector}`, error);
      return [];
    }
  }

  /**
   * Throttle function execution
   * @param {Function} func - Function to throttle
   * @param {number} limit - Minimum time between calls in ms
   * @returns {Function} Throttled function
   */
  function throttle(func, limit) {
    let inThrottle = false;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => { inThrottle = false; }, limit);
      }
    };
  }

  /**
   * Debounce function execution
   * @param {Function} func - Function to debounce
   * @param {number} wait - Time to wait in ms
   * @returns {Function} Debounced function
   */
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  /**
   * Check if an element exists
   * @param {Element|null} element - Element to check
   * @returns {boolean} True if element exists
   */
  function exists(element) {
    return element !== null && element !== undefined;
  }

  /**
   * Pad a number with leading zeros
   * @param {number} num - Number to pad
   * @param {number} [length=2] - Desired length
   * @returns {string} Padded string
   */
  function padNumber(num, length = 2) {
    return String(num).padStart(length, '0');
  }

  // ===================================
  // FEATURE DETECTION
  // ===================================

  /**
   * Browser feature support flags
   * @readonly
   */
  const SUPPORTS = Object.freeze({
    intersectionObserver: 'IntersectionObserver' in window,
    localStorage: (() => {
      try {
        const test = '__kairos_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch (e) {
        return false;
      }
    })(),
    matchMedia: 'matchMedia' in window,
    reducedMotion: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  });

  // ===================================
  // COUNTDOWN TIMER MODULE
  // ===================================

  /**
   * Countdown timer controller
   */
  const CountdownTimer = {
    elements: {
      days: null,
      hours: null,
      minutes: null,
      seconds: null
    },
    intervalId: null,
    prevValues: { days: '', hours: '', minutes: '', seconds: '' },

    /**
     * Initialize the countdown timer
     */
    init() {
      this.elements = {
        days: $('#days'),
        hours: $('#hours'),
        minutes: $('#minutes'),
        seconds: $('#seconds')
      };

      if (!Object.values(this.elements).every(exists)) {
        console.warn('[Kairos] Countdown elements not found');
        return;
      }

      this.update();
      this.intervalId = setInterval(() => this.update(), 1000);
    },

    /**
     * Update countdown display
     */
    update() {
      const now = Date.now();
      const distance = CONFIG.LAUNCH_DATE.getTime() - now;

      if (distance < 0) {
        this.displayTime(0, 0, 0, 0);
        if (this.intervalId) {
          clearInterval(this.intervalId);
          this.intervalId = null;
        }
        this.showLaunchButtons();
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.displayTime(days, hours, minutes, seconds);
    },

    /**
     * Display time values with animation
     * @param {number} days 
     * @param {number} hours 
     * @param {number} minutes 
     * @param {number} seconds 
     */
    displayTime(days, hours, minutes, seconds) {
      const values = {
        days: padNumber(days, 3),
        hours: padNumber(hours),
        minutes: padNumber(minutes),
        seconds: padNumber(seconds)
      };

      Object.entries(values).forEach(([unit, value]) => {
        const el = this.elements[unit];
        if (el && el.textContent !== value) {
          el.textContent = value;

          // Subtle scale animation (skip if reduced motion)
          if (!SUPPORTS.reducedMotion) {
            el.style.transform = 'scale(1.05)';
            setTimeout(() => { el.style.transform = 'scale(1)'; }, 150);
          }
        }
      });
    },

    /**
     * Clean up timer
     */
    destroy() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },

    /**
     * Show launch buttons and hide waitlist form
     */
    showLaunchButtons() {
      const waitlistForm = $('#waitlistForm');
      const launchButtons = $('#launchButtons');
      const countdownWrapper = $('.countdown-wrapper');
      const heroBadge = $('.hero-badge');

      if (waitlistForm) waitlistForm.style.display = 'none';
      if (launchButtons) launchButtons.style.display = 'flex';
      if (countdownWrapper) countdownWrapper.style.display = 'none';

      // Update hero badge to show launched status
      if (heroBadge) {
        heroBadge.innerHTML = '<span class="dot"></span> We Have Launched!';
      }
    }
  };

  // ===================================
  // WAITLIST FORM MODULE
  // ===================================

  /**
   * Waitlist form handler
   */
  const WaitlistForm = {
    form: null,
    emailInput: null,
    successMessage: null,
    submitButton: null,
    honeypotField: null,

    /**
     * Initialize waitlist form
     */
    init() {
      this.form = $('#heroWaitlistForm');
      this.emailInput = $('#waitlistEmail');
      this.successMessage = $('#waitlistSuccess');
      this.submitButton = this.form?.querySelector('button[type="submit"]');
      this.honeypotField = $('#websiteHoneypot');

      if (!this.form) return;

      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    },

    /**
     * Handle form submission
     * @param {Event} e - Submit event
     */
    async handleSubmit(e) {
      e.preventDefault();

      // Bot detection: if honeypot field is filled, silently reject
      if (this.honeypotField?.value) {
        console.warn('[Kairos] Bot detected via honeypot');
        // Show fake success to not alert the bot
        if (this.form && this.successMessage) {
          this.form.style.display = 'none';
          this.successMessage.style.display = 'flex';
        }
        return;
      }

      const email = this.emailInput?.value?.trim();
      if (!email) return;

      // Disable button and show loading state
      if (this.submitButton) {
        this.submitButton.disabled = true;
        this.submitButton.innerHTML = 'Joining...';
      }

      try {
        const response = await fetch('https://api-stage.kairosng.com/api/v1/default/waitlist', {
          method: 'POST',
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Show success message
        if (this.form && this.successMessage) {
          this.form.style.display = 'none';
          this.successMessage.style.display = 'flex';
        }

        // Store in localStorage to remember submission
        if (SUPPORTS.localStorage) {
          localStorage.setItem('kairos-waitlist-email', email);
        }

        console.log('[Kairos] Waitlist signup successful:', email);
      } catch (error) {
        console.error('[Kairos] Waitlist signup failed:', error);

        // Re-enable button and show error
        if (this.submitButton) {
          this.submitButton.disabled = false;
          this.submitButton.innerHTML = `
            Join Waitlist
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          `;
        }

        // Show error to user
        alert('Failed to join waitlist. Please try again.');
      }
    }
  };

  // ===================================
  // TYPEWRITER MODULE
  // ===================================

  /**
   * Typewriter animation controller
   */
  const Typewriter = {
    cursor: null,

    /**
     * Initialize typewriter effect
     */
    init() {
      this.cursor = $('.cursor');

      // Skip animation if user prefers reduced motion
      if (SUPPORTS.reducedMotion) {
        this.showAllText();
        return;
      }

      setTimeout(() => this.startSequence(), CONFIG.TYPEWRITER.START_DELAY);
    },

    /**
     * Type text into an element
     * @param {string} elementId - ID of element to type into
     * @param {string} text - Text to type
     * @param {number} speed - Typing speed in ms
     * @returns {Promise<void>}
     */
    type(elementId, text, speed) {
      return new Promise((resolve) => {
        const element = $(`#${elementId}`);
        if (!element) {
          resolve();
          return;
        }

        let i = 0;
        element.textContent = '';

        const typeChar = () => {
          if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, speed);
          } else {
            resolve();
          }
        };

        typeChar();
      });
    },

    /**
     * Start the typewriter sequence
     */
    async startSequence() {
      try {
        await this.type('typewriter-line1', 'Where Opportunity', CONFIG.TYPEWRITER.SPEED_NORMAL);
        await this.type('typewriter-line2', 'Meets ', CONFIG.TYPEWRITER.SPEED_NORMAL);
        await this.type('typewriter-line3', 'Ambition', CONFIG.TYPEWRITER.SPEED_SLOW);

        // Hide cursor after completion
        setTimeout(() => {
          if (this.cursor) {
            this.cursor.classList.add('hidden');
          }
        }, CONFIG.TYPEWRITER.CURSOR_HIDE_DELAY);
      } catch (error) {
        console.error('[Kairos] Typewriter error:', error);
        this.showAllText();
      }
    },

    /**
     * Show all text immediately (for reduced motion or error fallback)
     */
    showAllText() {
      const texts = [
        ['typewriter-line1', 'Where Opportunity'],
        ['typewriter-line2', 'Meets '],
        ['typewriter-line3', 'Ambition']
      ];

      texts.forEach(([id, text]) => {
        const el = $(`#${id}`);
        if (el) el.textContent = text;
      });

      if (this.cursor) {
        this.cursor.classList.add('hidden');
      }
    }
  };

  // ===================================
  // THEME CONTROLLER MODULE
  // ===================================

  /**
   * Theme (dark/light mode) controller
   */
  const ThemeController = {
    htmlElement: document.documentElement,
    toggleButtons: [],

    /**
     * Initialize theme controller
     */
    init() {
      this.toggleButtons = [
        $('#themeToggle'),
        $('#mobileThemeToggle')
      ].filter(exists);

      // Apply saved or preferred theme
      this.setTheme(this.getPreferredTheme());

      // Add event listeners
      this.toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => this.toggle());
      });

      // Listen for system preference changes
      if (SUPPORTS.matchMedia) {
        window.matchMedia('(prefers-color-scheme: light)')
          .addEventListener('change', (e) => {
            if (!this.getSavedTheme()) {
              this.setTheme(e.matches ? 'light' : 'dark');
            }
          });
      }
    },

    /**
     * Get the user's preferred theme
     * @returns {'light' | 'dark'}
     */
    getPreferredTheme() {
      const saved = this.getSavedTheme();
      if (saved) return saved;

      if (SUPPORTS.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      }

      return 'dark';
    },

    /**
     * Get saved theme from storage
     * @returns {string|null}
     */
    getSavedTheme() {
      if (!SUPPORTS.localStorage) return null;
      return localStorage.getItem(CONFIG.STORAGE.THEME_KEY);
    },

    /**
     * Set the current theme
     * @param {'light' | 'dark'} theme
     */
    setTheme(theme) {
      if (theme === 'light') {
        this.htmlElement.setAttribute('data-theme', 'light');
      } else {
        this.htmlElement.removeAttribute('data-theme');
      }

      if (SUPPORTS.localStorage) {
        localStorage.setItem(CONFIG.STORAGE.THEME_KEY, theme);
      }
    },

    /**
     * Toggle between light and dark themes
     */
    toggle() {
      const current = this.htmlElement.getAttribute('data-theme');
      this.setTheme(current === 'light' ? 'dark' : 'light');
    }
  };

  // ===================================
  // NAVIGATION MODULE
  // ===================================

  /**
   * Navigation controller (sticky nav, mobile menu)
   */
  const Navigation = {
    navbar: null,
    mobileMenu: null,
    menuToggle: null,
    menuClose: null,
    mobileLinks: [],

    /**
     * Initialize navigation
     */
    init() {
      this.navbar = $('#navbar');
      this.mobileMenu = $('#mobileMenu');
      this.menuToggle = $('#menuToggle');
      this.menuClose = $('#menuClose');
      this.mobileLinks = $$('.mobile-link');

      this.initStickyNav();
      this.initMobileMenu();
      this.initSmoothScroll();
    },

    /**
     * Initialize sticky navigation behavior
     */
    initStickyNav() {
      if (!this.navbar) return;

      const handleScroll = throttle(() => {
        if (window.scrollY > CONFIG.SCROLL.THRESHOLD) {
          this.navbar.classList.add('scrolled');
        } else {
          this.navbar.classList.remove('scrolled');
        }
      }, CONFIG.SCROLL.THROTTLE_MS);

      window.addEventListener('scroll', handleScroll, { passive: true });
    },

    /**
     * Initialize mobile menu
     */
    initMobileMenu() {
      if (this.menuToggle) {
        this.menuToggle.addEventListener('click', () => this.openMobileMenu());
      }

      if (this.menuClose) {
        this.menuClose.addEventListener('click', () => this.closeMobileMenu());
      }

      this.mobileLinks.forEach(link => {
        link.addEventListener('click', () => this.closeMobileMenu());
      });

      // Close on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.mobileMenu?.classList.contains('active')) {
          this.closeMobileMenu();
        }
      });
    },

    /**
     * Open mobile menu
     */
    openMobileMenu() {
      if (this.mobileMenu) {
        this.mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus first link for accessibility
        const firstLink = this.mobileMenu.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    },

    /**
     * Close mobile menu
     */
    closeMobileMenu() {
      if (this.mobileMenu) {
        this.mobileMenu.classList.remove('active');
        document.body.style.overflow = '';

        // Return focus to menu toggle
        if (this.menuToggle) this.menuToggle.focus();
      }
    },

    /**
     * Initialize smooth scrolling for anchor links
     */
    initSmoothScroll() {
      $$('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const href = anchor.getAttribute('href');
          if (href === '#') return;

          const target = $(href);
          if (target) {
            e.preventDefault();
            const navbarHeight = this.navbar?.offsetHeight ?? 0;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;

            window.scrollTo({
              top: targetPosition,
              behavior: SUPPORTS.reducedMotion ? 'auto' : 'smooth'
            });
          }
        });
      });
    }
  };

  // ===================================
  // SCROLL ANIMATIONS MODULE
  // ===================================

  /**
   * Scroll-triggered animations controller
   */
  const ScrollAnimations = {
    observer: null,

    /**
     * Initialize scroll animations
     */
    init() {
      if (!SUPPORTS.intersectionObserver) {
        // Fallback: show all elements immediately
        $$('.animate-on-scroll').forEach(el => el.classList.add('visible'));
        return;
      }

      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        {
          root: null,
          rootMargin: CONFIG.OBSERVER.ROOT_MARGIN,
          threshold: CONFIG.OBSERVER.THRESHOLD
        }
      );

      $$('.animate-on-scroll').forEach(el => this.observer.observe(el));
    },

    /**
     * Clean up observer
     */
    destroy() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
    }
  };

  // ===================================
  // PARALLAX MODULE
  // ===================================

  /**
   * Subtle parallax effect for hero section
   */
  const Parallax = {
    hero: null,
    heroContent: null,
    rafId: null,

    /**
     * Initialize parallax effect
     */
    init() {
      // Skip if reduced motion preferred
      if (SUPPORTS.reducedMotion) return;

      this.hero = $('.hero');
      this.heroContent = this.hero?.querySelector('.hero-content');

      if (!this.heroContent) return;

      const handleScroll = throttle(() => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
          requestAnimationFrame(() => {
            this.heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
            this.heroContent.style.opacity = Math.max(0, 1 - (scrolled * 0.001));
          });
        }
      }, CONFIG.SCROLL.THROTTLE_MS);

      window.addEventListener('scroll', handleScroll, { passive: true });
    }
  };

  // ===================================
  // INITIALIZATION
  // ===================================

  /**
   * Application initialization
   */
  function init() {
    try {
      // Initialize all modules
      CountdownTimer.init();
      WaitlistForm.init();
      ThemeController.init();
      Navigation.init();
      ScrollAnimations.init();
      Parallax.init();

      // Typewriter starts on window load
      window.addEventListener('load', () => {
        Typewriter.init();
        document.body.classList.add('loaded');

        // Trigger hero animations
        $$('.hero .animate-on-scroll').forEach((el, index) => {
          setTimeout(() => el.classList.add('visible'), index * 100);
        });
      });

      // Console branding
      if (typeof console !== 'undefined' && console.log) {
        console.log(
          '%c KAIROS NEXUS GLOBAL ',
          'background: linear-gradient(135deg, #DE028E, #2C3177); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;'
        );
        console.log('%c Where Opportunity Meets Ambition', 'color: #DE028E; font-size: 14px;');
        console.log('%c Launching January 15, 2026', 'color: #888; font-size: 12px;');
      }
    } catch (error) {
      console.error('[Kairos] Initialization error:', error);
    }
  }

  // Start the application
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
