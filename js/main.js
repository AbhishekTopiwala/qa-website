// ================================================
// QA Learning Hub - Enhanced JavaScript
// Optimized & Feature-Rich
// ================================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ================== MOBILE NAVIGATION ==================
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      // Prevent body scroll when menu is open
      if (navMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (navMenu.classList.contains('active') && 
          !navMenu.contains(e.target) && 
          !hamburger.contains(e.target)) {
        navMenu.classList.remove('active');
        body.style.overflow = '';
      }
    });
  }
  
  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        body.style.overflow = '';
      }
    });
  });
  
  // ================== ACTIVE NAV HIGHLIGHT ==================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
  
  // ================== ACCORDION FUNCTIONALITY ==================
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const accordionItem = this.parentElement;
      const isActive = accordionItem.classList.contains('active');
      
      // Close all accordion items
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
      });
      
      // Open clicked item if it wasn't active
      if (!isActive) {
        accordionItem.classList.add('active');
      }
    });
  });
  
  // ================== TAB FUNCTIONALITY ==================
  const tabButtons = document.querySelectorAll('.tab-button');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      
      // Add active class to clicked button and corresponding content
      this.classList.add('active');
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
  
  // ================== SMOOTH SCROLL ==================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  // ================== BACK TO TOP BUTTON ==================
  // Create back to top button
  const backToTopBtn = document.createElement('button');
  backToTopBtn.innerHTML = '↑';
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTopBtn);
  
  // Show/hide back to top button with throttling
  let isScrolling = false;
  
  function throttle(func, delay) {
    if (!isScrolling) {
      isScrolling = true;
      setTimeout(() => {
        func();
        isScrolling = false;
      }, delay);
    }
  }
  
  function handleBackToTopVisibility() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }
  
  window.addEventListener('scroll', () => {
    throttle(handleBackToTopVisibility, 100);
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // ================== SCROLL ANIMATIONS ==================
  // Fade in elements on scroll (performance optimized)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe cards, roadmap levels, and other elements
  document.querySelectorAll('.card, .roadmap-level, .bug-example').forEach(el => {
    observer.observe(el);
  });
  
  // ================== ENHANCED CARD INTERACTIONS ==================
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    // Add ripple effect on click
    card.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(37, 99, 235, 0.3);
        width: 100px;
        height: 100px;
        margin-top: -50px;
        margin-left: -50px;
        animation: ripple 0.6s;
        pointer-events: none;
      `;
      
      const rect = this.getBoundingClientRect();
      ripple.style.left = e.clientX - rect.left + 'px';
      ripple.style.top = e.clientY - rect.top + 'px';
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Add ripple animation to CSS dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      0% {
        transform: scale(0);
        opacity: 1;
      }
      100% {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    .card {
      position: relative;
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);
  
  // ================== PERFORMANCE OPTIMIZATION ==================
  // Debounce function for resize events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // Handle window resize with debouncing
  const handleResize = debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768 && navMenu && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      body.style.overflow = '';
    }
  }, 250);
  
  window.addEventListener('resize', handleResize);
  
  // ================== KEYBOARD ACCESSIBILITY ==================
  // Add keyboard navigation for accordion
  accordionHeaders.forEach(header => {
    header.setAttribute('role', 'button');
    header.setAttribute('tabindex', '0');
    
    header.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
  
  // Tab buttons keyboard navigation
  tabButtons.forEach(button => {
    button.setAttribute('role', 'tab');
    
    button.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const buttons = Array.from(tabButtons);
        const currentIndex = buttons.indexOf(this);
        let nextIndex;
        
        if (e.key === 'Arrow Right') {
          nextIndex = (currentIndex + 1) % buttons.length;
        } else {
          nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        }
        
        buttons[nextIndex].click();
        buttons[nextIndex].focus();
      }
    });
  });
  
  // ================== LOADING OPTIMIZATION ==================
  // Mark page as fully loaded for any CSS transitions
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });
  
  // ================== SCROLL PROGRESS INDICATOR (OPTIONAL) ==================
  // Add reading progress bar for long pages
  if (document.body.scrollHeight > window.innerHeight * 2) {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #2563eb 0%, #10b981 100%);
      width: 0%;
      z-index: 10000;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
      throttle(() => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
      }, 50);
    });
  }
  
  // ================== CONSOLE MESSAGE ==================
  console.log('%c🚀 QA Learning Hub', 'color: #2563eb; font-size: 20px; font-weight: bold;');
  console.log('%cBuilt with ❤️ for aspiring QA professionals', 'color: #10b981; font-size: 14px;');
  
});
