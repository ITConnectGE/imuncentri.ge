// ===== Main JavaScript for imuncentri.ge =====

document.addEventListener('DOMContentLoaded', () => {
  // Scroll animations
  initScrollAnimations();
  // Header scroll effect
  initHeaderScroll();
  // Mobile menu
  initMobileMenu();
  // FAQ accordion
  initFAQ();
  // Smooth scroll for anchor links
  initSmoothScroll();
  // Counter animation
  initCounters();
  // Testimonial slider
  initTestimonialSlider();
});

// ===== Scroll Animations =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// ===== Header Scroll =====
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

// ===== Mobile Menu =====
function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const close = document.getElementById('mobile-menu-close');
  const overlay = document.getElementById('mobile-menu-overlay');

  if (!toggle || !menu) return;

  function openMenu() {
    menu.classList.add('open');
    if (overlay) overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('open');
    if (overlay) overlay.classList.add('hidden');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', openMenu);
  if (close) close.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// ===== FAQ Accordion =====
function initFAQ() {
  document.querySelectorAll('.faq-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const content = item.querySelector('.faq-content');
      const icon = button.querySelector('.faq-icon');
      const isOpen = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item').forEach(faq => {
        faq.classList.remove('active');
        faq.querySelector('.faq-content').style.maxHeight = null;
        const faqIcon = faq.querySelector('.faq-icon');
        if (faqIcon) faqIcon.style.transform = 'rotate(0deg)';
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ===== Counter Animation =====
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.counter);
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(start + (target - start) * eased);
          el.textContent = current.toLocaleString() + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          }
        }

        requestAnimationFrame(updateCounter);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

// ===== Testimonial Slider =====
function initTestimonialSlider() {
  const slider = document.getElementById('testimonial-slider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach(slide => {
      slide.classList.add('hidden');
      slide.classList.remove('block');
    });
    dots.forEach(dot => {
      dot.classList.remove('bg-primary');
      dot.classList.add('bg-gray-300');
    });

    slides[index].classList.remove('hidden');
    slides[index].classList.add('block');
    slides[index].style.animation = 'fadeIn 0.5s ease';
    if (dots[index]) {
      dots[index].classList.add('bg-primary');
      dots[index].classList.remove('bg-gray-300');
    }
    currentSlide = index;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });

  // Auto-play
  setInterval(() => {
    showSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  }, 6000);

  showSlide(0);
}

// ===== Utility: add bg-primary class for Tailwind =====
// This is handled via Tailwind classes in HTML
