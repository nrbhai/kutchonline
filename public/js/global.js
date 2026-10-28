/**
 * MyKutch.org - Global Core Script
 * Shared behaviors for all pages
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Menu ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        if (!navLinks.id) {
            navLinks.id = 'primary-nav';
        }
        mobileToggle.setAttribute('aria-controls', navLinks.id);
        mobileToggle.setAttribute('aria-expanded', 'false');
        navLinks.setAttribute('aria-hidden', 'true');

        const updateMenuState = (isOpen) => {
            mobileToggle.setAttribute('aria-expanded', String(isOpen));
            navLinks.setAttribute('aria-hidden', String(!isOpen));
            mobileToggle.innerText = isOpen ? '✕' : '☰';
        };

        mobileToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            updateMenuState(isOpen);
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                updateMenuState(false);
            });
        });

        // Close menu on Escape
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                updateMenuState(false);
                mobileToggle.focus();
            }
        });
    }

    // --- Dark Mode State & Toggle ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');
    const html = document.documentElement;

    // Check saved theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    updateDarkModeIcon(currentTheme);

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const activeTheme = html.getAttribute('data-theme');
            const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateDarkModeIcon(newTheme);
        });
    }

    function updateDarkModeIcon(theme) {
        if (darkModeIcon) {
            darkModeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    // --- Staggered Reveal Animation ---
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsIntersectionObserver = 'IntersectionObserver' in window;

    if (!prefersReducedMotion && supportsIntersectionObserver) {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal, .card, .section-title, .essential-item, .diversity-card, .craft-card').forEach((el, index) => {
            if (el.classList.contains('card') || el.classList.contains('diversity-card') || el.classList.contains('craft-card')) {
                el.dataset.delay = (index % 3) * 120;
            }
            el.classList.add('reveal');
            observer.observe(el);
        });
    } else {
        document.querySelectorAll('.reveal, .card, .section-title, .essential-item, .diversity-card, .craft-card').forEach((el) => {
            el.classList.add('active');
        });
    }

    // --- Smooth Scroll (with fallback) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: prefersReducedMotion ? 'auto' : 'smooth'
                    });
                }
            }
        });
    });

    // --- Dynamic Logo & Footer Setup ---
    const path = window.location.pathname;
    const isRoot = !path.includes('/destinations/') && !path.includes('/crafts/') && !path.includes('/hidden-gems/');
    const assetPrefix = isRoot ? 'assets/' : '../assets/';
    const pagePrefix = isRoot ? '' : '../';
    const newLogo = `${assetPrefix}images/newlogo.png`;
    const absoluteLogo = `${window.location.origin}/assets/images/newlogo.png`;

    // Deduplicate Nav Lists if redundant
    const navLists = Array.from(document.querySelectorAll('.nav-links'));
    const primaryNav = document.querySelector('nav .nav-links') || navLists[0];
    navLists.forEach((nav) => {
        if (nav !== primaryNav) {
            nav.remove();
        }
    });

    // Deduplicate multiple footer elements
    const footerBlocks = Array.from(document.querySelectorAll('footer.footer-main'));
    if (footerBlocks.length > 1) {
        footerBlocks.forEach((footer, index) => {
            if (index !== footerBlocks.length - 1) {
                footer.remove();
            }
        });
    }

    // Update navbar images
    document.querySelectorAll('img.nav-logo, img[src*="/logo.png"], img[src*="logo.png"]').forEach((img) => {
        img.src = newLogo;
    });

    // Social & SEO head tag logos
    document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]').forEach((meta) => {
        if ((meta.content || '').includes('logo.png')) {
            meta.content = absoluteLogo;
        }
    });

    document.querySelectorAll('link[rel*="icon"]').forEach((link) => {
        if ((link.href || '').includes('logo.png')) {
            link.href = absoluteLogo;
        }
    });

    // Render footer layout dynamically
    const footer = document.querySelector('footer.footer-main');
    if (footer) {
        footer.innerHTML = `
            <div class="container">
                <img src="${newLogo}" alt="" class="footer-watermark-bg"/>
                <div class="footer-inner">
                    <div class="footer-brand">
                        <img alt="MyKutch.org" class="footer-logo" src="${newLogo}"/>
                        <p class="footer-tagline">Beyond the endless White Rann lies a land of hidden caves, pristine seashores, and sacred hills. Discover the untold stories of Kutch.</p>
                    </div>
                    
                    <div class="footer-links">
                        <h4 data-i18n="footer.quick_links">Quick Links</h4>
                        <ul>
                            <li><a href="${pagePrefix}geography.html" data-i18n="nav.geography">Geography</a></li>
                            <li><a href="${pagePrefix}crafts.html" data-i18n="nav.crafts">Crafts</a></li>
                            <li><a href="${pagePrefix}distance-matrix.html" data-i18n="nav.distance">Distance Matrix</a></li>
                            <li><a href="${pagePrefix}landscapes.html" data-i18n="nav.landscapes">Landscapes</a></li>
                            <li><a href="${pagePrefix}bookings.html" data-i18n="nav.bookings">Bookings</a></li>
                            <li><a href="${pagePrefix}about.html" data-i18n="nav.about">About</a></li>
                        </ul>
                    </div>

                    <div class="footer-contact">
                        <div class="footer-contact-item">
                            <span data-i18n="footer.contact_label">Contact:</span>
                            <a href="tel:9825034580">+91 98250 34580</a>
                        </div>
                        <div class="footer-contact-item">
                            <span data-i18n="footer.email_label">Email:</span>
                            <a href="mailto:info@mykutch.org">info@mykutch.org</a>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <span data-i18n="footer.developed_by">Developed with Love for Kutch by MyKutch.org team</span>
                </div>
            </div>
        `;
    }

    // --- Lightbox Gallery System ---
    const galleryItems = document.querySelectorAll(`
        .photo-card img, 
        .card-img-wrapper img, 
        .attraction-img-wrapper img, 
        .craft-img,
        .attraction-card img,
        .card img
    `);
    
    if (galleryItems.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-modal', 'true');
        lightbox.innerHTML = `
            <button class="lightbox-close" aria-label="Close Viewer">&times;</button>
            <img class="lightbox-content" src="" alt="Full size gallery image">
            <div class="lightbox-caption"></div>
        `;
        document.body.appendChild(lightbox);

        const lightboxImg = lightbox.querySelector('.lightbox-content');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        const closeBtn = lightbox.querySelector('.lightbox-close');

        const openLightbox = (imgSrc, alt, caption) => {
            lightboxImg.src = imgSrc;
            lightboxImg.alt = alt;
            lightboxCaption.textContent = caption;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => { 
                if (!lightbox.classList.contains('active')) lightboxImg.src = ''; 
            }, 300);
        };

        galleryItems.forEach(img => {
            img.addEventListener('click', (e) => {
                if (img.closest('a')) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                const parent = img.closest('.photo-card, .card, .attraction-card, .craft-card');
                const caption = parent?.querySelector('figcaption, h3, .attraction-title, .card-title')?.textContent || img.alt || 'Gallery Image';
                openLightbox(img.src, img.alt, caption.trim());
            });
        });

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // --- Header Shrink Scroll Behavior ---
    const nav = document.querySelector('nav');
    if (nav) {
        let ticking = false;
        const updateNav = () => {
            const scrolled = window.scrollY > 50;
            nav.classList.toggle('scrolled', scrolled);
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateNav);
                ticking = true;
            }
        }, { passive: true });
    }

    // --- Preloader hiding hook ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
    }
});

// --- Gallery Image Decoders Fallback ---
const applyGalleryImageFallbacks = () => {
    document.querySelectorAll('.gallery-grid img').forEach((img) => {
        if (img.dataset.galleryFallbackBound === 'true') {
            return;
        }

        img.dataset.galleryFallbackBound = 'true';
        img.addEventListener('error', () => {
            const wrapper = document.createElement('div');
            wrapper.style.display = 'flex';
            wrapper.style.alignItems = 'center';
            wrapper.style.justifyContent = 'center';
            wrapper.style.minHeight = '180px';
            wrapper.style.borderRadius = '0.75rem';
            wrapper.style.background = '#f3f4f6';
            wrapper.style.color = '#6b7280';
            wrapper.style.fontSize = '0.9rem';
            wrapper.textContent = 'Image unavailable on this device';

            if (img.parentNode) {
                img.parentNode.insertBefore(wrapper, img);
                img.remove();
            }
        }, { once: true });
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyGalleryImageFallbacks);
} else {
    applyGalleryImageFallbacks();
}
