/* ==========================================
   BIVOX - Premium Agency Website Logic
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Preloader
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    if (preloader) {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
      
      // Initialize AOS when loaded
      if (typeof AOS !== 'undefined') {
        AOS.init({
          duration: 1000,
          easing: 'ease-out-cubic',
          once: true,
          offset: 100
        });
      }
      
      // Setup GSAP animations on load
      if (typeof gsap !== 'undefined') {
        // Hero entrance animations
        gsap.from('.hero-logo-box', { opacity: 0, y: -20, duration: 0.8, delay: 0.2 });
        gsap.from('.hero-title span', { opacity: 0, y: 30, duration: 1, stagger: 0.2, delay: 0.4 });
        gsap.from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.8, delay: 0.8 });
        gsap.from('.hero-actions', { opacity: 0, y: 20, duration: 0.8, delay: 1.0 });
        gsap.from('.hero-visuals', { opacity: 0, scale: 0.9, duration: 1.2, delay: 0.6 });
      }
    }
  });

  // Backup preloader hide (in case load event fires early or fails)
  setTimeout(() => {
    if (preloader && preloader.style.opacity !== '0') {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
      if (typeof AOS !== 'undefined') AOS.init({ duration: 1000, once: true });
    }
  }, 2500);

  // 2. Scroll Progress Bar
  const scrollProgress = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScroll > 0) {
      const percentage = (window.scrollY / totalScroll) * 100;
      scrollProgress.style.width = `${percentage}%`;
    }
  });

  // 3. Custom Cursor (Interactive Desktop Experience)
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.custom-cursor-dot');
  
  if (cursor && cursorDot) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Instant positioning for dot
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });
    
    // Smooth inertia for trailing cursor ring
    const animateCursor = () => {
      const delay = 8; // delay factor
      cursorX += (mouseX - cursorX) / delay;
      cursorY += (mouseY - cursorY) / delay;
      
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      
      requestAnimationFrame(animateCursor);
    };
    animateCursor();
    
    // Add hover styles to cursor
    const hoverElements = document.querySelectorAll('a, button, .btn, .filter-btn, .faq-header, .hero-logo-box, .industry-card, .why-card, .portfolio-item');
    hoverElements.forEach(elem => {
      elem.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
      });
      elem.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
      });
    });
  }

  // 4. Header Scroll State
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 5. Mobile Hamburger Navigation
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // 6. Button Ripple Effect
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', function (e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // 7. Process Timeline Integration
  const timelineSteps = document.querySelectorAll('.timeline-step');
  const timelineProgress = document.querySelector('.timeline-progress');
  
  if (timelineSteps.length > 0 && timelineProgress) {
    // Initial active state progress calculation
    const updateTimeline = (activeIndex) => {
      const totalSteps = timelineSteps.length;
      const progressPercent = (activeIndex / (totalSteps - 1)) * 100;
      timelineProgress.style.width = `${progressPercent}%`;
      
      timelineSteps.forEach((step, idx) => {
        if (idx <= activeIndex) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
        }
      });
    };
    
    // Click behavior
    timelineSteps.forEach((step, index) => {
      step.addEventListener('click', () => {
        updateTimeline(index);
      });
    });
    
    // Set step 01 active initially
    updateTimeline(0);
  }

  // 8. Portfolio Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Active status swap
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
          // Reset styling transitions
          item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 400);
          }
        });
      });
    });
  }

  // 9. FAQ Accordion Accordance
  const faqHeaders = document.querySelectorAll('.faq-header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      const body = parent.querySelector('.faq-body');
      const isActive = parent.classList.contains('active');
      
      // Close other accordion items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-body').style.maxHeight = null;
      });
      
      if (!isActive) {
        parent.classList.add('active');
        body.style.maxHeight = `${body.scrollHeight}px`;
      }
    });
  });

  // 10. Floating Interactive Mouse Parallax (Hero visuals only on desktop)
  const hero = document.getElementById('hero');
  const cardWeb = document.querySelector('.card-web-mockup');
  const cardMobile = document.querySelector('.card-mobile-mockup');
  const floatBadge = document.querySelector('.card-float-badge');
  
  if (hero && window.innerWidth > 991) {
    hero.addEventListener('mousemove', (e) => {
      const strength = 30;
      const moveX = (e.clientX - window.innerWidth / 2) / strength;
      const moveY = (e.clientY - window.innerHeight / 2) / strength;
      
      if (cardWeb) cardWeb.style.transform = `translate(${moveX * 0.8}px, ${moveY * 0.8}px) rotate(0.5deg)`;
      if (cardMobile) cardMobile.style.transform = `translate(${moveX * -0.5}px, ${moveY * -0.5}px) rotate(-1deg)`;
      if (floatBadge) floatBadge.style.transform = `translate(${moveX * 1.2}px, ${moveY * 1.2}px)`;
    });
    
    hero.addEventListener('mouseleave', () => {
      if (cardWeb) cardWeb.style.transform = '';
      if (cardMobile) cardMobile.style.transform = '';
      if (floatBadge) floatBadge.style.transform = '';
    });
  }

  // 11. Contact Form Submission simulation
  const contactForm = document.getElementById('bivox-contact-form');
  const feedbackMsg = document.getElementById('form-feedback');
  
  if (contactForm && feedbackMsg) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple verification
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const phone = document.getElementById('form-phone').value.trim();
      const message = document.getElementById('form-message').value.trim();
      
      if (!name || !email || !message) {
        feedbackMsg.className = 'form-feedback error';
        feedbackMsg.textContent = 'Please fill out all required fields.';
        return;
      }
      
      // Simulate API submit
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending Message...';
      
      setTimeout(() => {
        feedbackMsg.className = 'form-feedback success';
        feedbackMsg.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon.';
        contactForm.reset();
        
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          feedbackMsg.style.display = 'none';
        }, 5000);
      }, 1500);
    });
  }

  // 12. Scroll To Top Visibility & Action
  const scrollToTop = document.getElementById('scroll-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTop.classList.add('active');
    } else {
      scrollToTop.classList.remove('active');
    }
  });

  if (scrollToTop) {
    scrollToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 13. Floating WhatsApp Message Generation
  const whatsappBtn = document.querySelector('.floating-whatsapp');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const number = '919000000000'; // Placeholder agency WhatsApp contact details
      const text = encodeURIComponent("Hello BIVOX! I am interested in start planning a digital project with you. Can we discuss?");
      window.open(`https://wa.me/${number}?text=${text}`, '_blank');
    });
  }

  // 14. Project Case Study Modal Logic
  const modal = document.getElementById('project-modal');
  const modalTrigger = document.querySelector('.portfolio-item-trigger[data-project="apex-crm"]');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const modalCtaClose = document.querySelector('.close-modal-cta');

  if (modal && modalTrigger) {
    // Open modal
    modalTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Stop background scrolling
    });

    // Close modal function
    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Restore background scrolling
    };

    // Close on click of close button
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }

    // Close on click of CTA button
    if (modalCtaClose) {
      modalCtaClose.addEventListener('click', closeModal);
    }

    // Close on click outside the card
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }
});
