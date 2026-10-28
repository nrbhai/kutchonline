/**
 * MyKutch.org - Index/Home Page Script
 * Custom eye-catching interactive multi-depth parallax for the luxury collage hero
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('MyKutch Home Page fully loaded with premium visual micro-interactions.');

    const hero = document.querySelector('.hero');
    const blob1 = document.querySelector('.blob-1');
    const blob2 = document.querySelector('.blob-2');
    const mainPortal = document.querySelector('.main-portal');
    const floatingCard = document.querySelector('.floating-craft-card');
    const geoTag = document.querySelector('.geo-coord-tag');
    const heroText = document.querySelector('.hero-content');

    if (hero) {
        let isMoving = false;
        
        hero.addEventListener('mousemove', (e) => {
            // Disable parallax on mobile viewports for optimal performance and touch-screen safety
            if (window.innerWidth < 1024) return;

            if (!isMoving) {
                window.requestAnimationFrame(() => {
                    const { clientX, clientY } = e;
                    const rect = hero.getBoundingClientRect();
                    
                    // Normalize mouse position relative to hero viewport center (-1 to 1)
                    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
                    const y = ((clientY - rect.top) / rect.height) * 2 - 1;
                    
                    // Layer 1: Ambient background glows (wide responsive shifts)
                    if (blob1) blob1.style.transform = `translate(${x * 35}px, ${y * 35}px)`;
                    if (blob2) blob2.style.transform = `translate(${x * -30}px, ${y * -30}px)`;
                    
                    // Layer 2: Main Arched Portal (steady architectural shift)
                    if (mainPortal) {
                        mainPortal.style.transform = `translate(${x * 12}px, ${y * 12}px)`;
                    }
                    
                    // Layer 3: Floating Crafts Card (Foreground, high-response shift in opposite direction)
                    if (floatingCard) {
                        floatingCard.style.transform = `rotate(-3deg) translate(${x * -25}px, ${y * -25}px) scale(1.02)`;
                    }
                    
                    // Layer 4: Fine-line GPS tag (Subtle shift)
                    if (geoTag) {
                        geoTag.style.transform = `translate(${x * 18}px, ${y * 18}px)`;
                    }

                    // Layer 5: Hero text (Almost stationary for premium readability)
                    if (heroText) {
                        heroText.style.transform = `translate(${x * 6}px, ${y * 6}px)`;
                    }
                    
                    isMoving = false;
                });
                isMoving = true;
            }
        }, { passive: true });

        // Smooth reset when cursor leaves the hero area
        hero.addEventListener('mouseleave', () => {
            window.requestAnimationFrame(() => {
                if (blob1) blob1.style.transform = 'translate(0px, 0px)';
                if (blob2) blob2.style.transform = 'translate(0px, 0px)';
                if (mainPortal) mainPortal.style.transform = 'translate(0px, 0px)';
                if (floatingCard) floatingCard.style.transform = 'rotate(-3deg) translate(0px, 0px) scale(1)';
                if (geoTag) geoTag.style.transform = 'translate(0px, 0px)';
                if (heroText) heroText.style.transform = 'translate(0px, 0px)';
            });
        });
    }
});
