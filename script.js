/**
 * Kairos Nexus Global - Interactive Features
 * Premium Landing Page JavaScript
 */

(function () {
  'use strict';

  // ===================================
  // COUNTDOWN TIMER
  // ===================================

  const LAUNCH_DATE = new Date('January 15, 2026 00:00:00 GMT-0600').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = LAUNCH_DATE - now;

    if (distance < 0) {
      // Launch has happened
      document.getElementById('days').textContent = '000';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update DOM with padded values
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.textContent = String(days).padStart(3, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  // Initialize countdown
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ===================================
  // TYPEWRITER ANIMATION
  // ===================================

  function typeWriter(elementId, text, speed, callback) {
    const element = document.getElementById(elementId);
    if (!element) {
      if (callback) callback();
      return;
    }

    let i = 0;
    element.textContent = '';

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else if (callback) {
        callback();
      }
    }

    type();
  }

  function startTypewriterSequence() {
    const cursor = document.querySelector('.cursor');

    // Type line 1: "Where Opportunity"
    typeWriter('typewriter-line1', 'Where Opportunity', 60, function () {
      // Type line 2: "Meets "
      typeWriter('typewriter-line2', 'Meets ', 60, function () {
        // Type line 3: "Ambition"
        typeWriter('typewriter-line3', 'Ambition', 80, function () {
          // Hide cursor after typing complete
          setTimeout(() => {
            if (cursor) cursor.classList.add('hidden');
          }, 2000);
        });
      });
    });
  }

  // Start typewriter when page loads
  window.addEventListener('load', function () {
    // Small delay to let page render first
    setTimeout(startTypewriterSequence, 500);
  });

  // ===================================
  // THEME TOGGLE (Dark/Light Mode)
  // ===================================

  const themeToggle = document.getElementById('themeToggle');
  const mobileThemeToggle = document.getElementById('mobileThemeToggle');
  const htmlElement = document.documentElement;

  // Check for saved theme preference or default to system preference
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem('kairos-theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  // Apply theme
  function setTheme(theme) {
    if (theme === 'light') {
      htmlElement.setAttribute('data-theme', 'light');
    } else {
      htmlElement.removeAttribute('data-theme');
    }
    localStorage.setItem('kairos-theme', theme);
  }

  // Toggle theme
  function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  // Initialize theme
  setTheme(getPreferredTheme());

  // Add event listeners
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', toggleTheme);
  }

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('kairos-theme')) {
      setTheme(e.matches ? 'light' : 'dark');
    }
  });

  // ===================================
  // STICKY NAVIGATION
  // ===================================

  const navbar = document.getElementById('navbar');
  let lastScrollY = window.scrollY;

  function handleScroll() {
    const currentScrollY = window.scrollY;

    // Add/remove scrolled class for background
    if (currentScrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ===================================
  // MOBILE MENU
  // ===================================

  const menuToggle = document.getElementById('menuToggle');
  const menuClose = document.getElementById('menuClose');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMobileMenu() {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', openMobileMenu);
  }

  if (menuClose) {
    menuClose.addEventListener('click', closeMobileMenu);
  }

  // Close menu when clicking a link
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // ===================================
  // SCROLL ANIMATIONS
  // ===================================

  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optionally unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));

  // ===================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ===================================

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Skip if it's just "#"
      if (href === '#') return;

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===================================
  // DIGIT FLIP ANIMATION (subtle pulse)
  // ===================================

  let prevValues = {
    days: '',
    hours: '',
    minutes: '',
    seconds: ''
  };

  function addFlipAnimation() {
    ['days', 'hours', 'minutes', 'seconds'].forEach(unit => {
      const el = document.getElementById(unit);
      if (el && el.textContent !== prevValues[unit]) {
        el.style.transform = 'scale(1.05)';
        setTimeout(() => {
          el.style.transform = 'scale(1)';
        }, 150);
        prevValues[unit] = el.textContent;
      }
    });
  }

  // Run flip animation check every second
  setInterval(addFlipAnimation, 1000);

  // ===================================
  // BUTTON RIPPLE EFFECT
  // ===================================

  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
      // Only add ripple if clicking on external link
      if (this.getAttribute('href') && this.getAttribute('href').startsWith('http')) {
        return; // Let the browser handle the navigation
      }
    });
  });

  // ===================================
  // PARALLAX SUBTLE EFFECT FOR HERO
  // ===================================

  const hero = document.querySelector('.hero');

  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent) {
          heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
          heroContent.style.opacity = 1 - (scrolled * 0.001);
        }
      }
    }, { passive: true });
  }

  // ===================================
  // PRELOADER (optional - runs on load)
  // ===================================

  window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger initial animations for hero elements
    const heroElements = document.querySelectorAll('.hero .animate-on-scroll');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 100);
    });
  });

  // ===================================
  // CONSOLE BRANDING
  // ===================================

  console.log(
    '%c KAIROS NEXUS GLOBAL ',
    'background: linear-gradient(135deg, #DE028E, #2C3177); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;'
  );
  console.log('%c Where Opportunity Meets Ambition', 'color: #DE028E; font-size: 14px;');
  console.log('%c Launching January 15, 2026', 'color: #888; font-size: 12px;');

})();
