/* ==========================================================================
   KUTCH EXPLORER TRENDY HOMEPAGE INTERACTIVE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initHeaderScroll();
  initRegionFilters();
  initScrollReveals();
  initActiveNavHighlighting();
  initItineraryPlanner();
  initMobileMenu();
});

/**
 * 1. Scroll Progress Bar indicator
 */
function initScrollProgress() {
  const scrollBar = document.getElementById('scrollBar');
  if (!scrollBar) return;
  
  window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const scrollPercent = (window.scrollY / docHeight) * 100;
      scrollBar.style.width = `${scrollPercent}%`;
    }
  });
}

/**
 * 2. Sticky header state changes
 */
function initHeaderScroll() {
  const header = document.getElementById('navHeader');
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * 3. Filter tabs for Hidden Gems
 */
function initRegionFilters() {
  const tabBtns = document.querySelectorAll('.region-tab-btn');
  const regionBlocks = document.querySelectorAll('.region-view-block');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetRegion = btn.dataset.region;
      
      // Toggle active classes on tab buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Toggle active classes on content grids
      regionBlocks.forEach(block => {
        if (block.id === `region-${targetRegion}`) {
          block.classList.add('active');
        } else {
          block.classList.remove('active');
        }
      });
      
      // Force trigger reveal of visible elements in current tab
      setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
      }, 50);
    });
  });
}

/**
 * 4. Intersection Observer for Scroll Reveals
 */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  if (revealElements.length === 0) return;
  
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger entrance of visible elements
        setTimeout(() => {
          entry.target.classList.add('active');
        }, index * 80);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  revealElements.forEach(el => revealObserver.observe(el));
}

/**
 * 5. Active Nav Highlighting on Scroll
 */
function initActiveNavHighlighting() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a:not(.nav-cta-btn)');
  if (sections.length === 0 || navLinks.length === 0) return;
  
  const activeObserverOptions = {
    root: null,
    threshold: 0.35,
    rootMargin: '-80px 0px 0px 0px'
  };
  
  const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, activeObserverOptions);
  
  sections.forEach(sec => activeObserver.observe(sec));
}

/**
 * 6. Trip Itinerary Planner Form Submission Handling
 */
function initItineraryPlanner() {
  const form = document.getElementById('plannerForm');
  const successPanel = document.getElementById('plannerSuccess');
  
  if (!form || !successPanel) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Grab some form inputs
    const email = document.getElementById('plannerEmail').value;
    const region = document.getElementById('plannerRegion').value;
    const duration = document.getElementById('plannerDuration').value;
    
    // Simulate API/email submission and render response
    form.style.display = 'none';
    
    // Populate dynamic response details
    const successTitle = successPanel.querySelector('h3');
    const successText = successPanel.querySelector('p');
    
    if (successTitle) successTitle.textContent = "Khem Khem! Itinerary Configured!";
    if (successText) {
      successText.innerHTML = `Thank you! We've generated a custom <strong>${duration}</strong> itinerary focusing on the hidden sites of <strong>${region} Kutch</strong>. A detailed day-by-day plan has been sent to <strong>${email}</strong>.`;
    }
    
    successPanel.style.display = 'block';
    successPanel.classList.add('animate-fade-in');
  });
}

/**
 * 7. Mobile Navigation Toggle Menu
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileToggle');
  const menuList = document.getElementById('navMenu');
  
  if (!toggleBtn || !menuList) return;
  
  toggleBtn.addEventListener('click', () => {
    if (menuList.style.display === 'flex') {
      menuList.style.display = '';
      toggleBtn.innerHTML = '☰';
    } else {
      menuList.style.display = 'flex';
      menuList.style.flexDirection = 'column';
      menuList.style.position = 'absolute';
      menuList.style.top = '80px';
      menuList.style.left = '0';
      menuList.style.right = '0';
      menuList.style.background = 'rgba(7, 9, 14, 0.98)';
      menuList.style.borderBottom = '1px solid rgba(201, 147, 58, 0.2)';
      menuList.style.padding = '2rem';
      menuList.style.gap = '1.5rem';
      toggleBtn.innerHTML = '✕';
    }
  });
  
  // Collapse menu on clicking link
  const links = menuList.querySelectorAll('a');
  links.forEach(l => {
    l.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        menuList.style.display = '';
        toggleBtn.innerHTML = '☰';
      }
    });
  });
}
