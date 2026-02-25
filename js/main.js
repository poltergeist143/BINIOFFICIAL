/**
 * Main JavaScript File
 * Handles animations, menu toggle, lightbox, and gallery filtering
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.add('scrolled'); // we'll keep it active or customize it
            if (window.scrollY < 5) header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navList.classList.toggle('active');
            document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
        });
    }

    // 3. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-fade-in-up');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // 4. Lightbox Setup
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const triggers = document.querySelectorAll('.lightbox-trigger');

    if (lightbox && triggers.length > 0) {
        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const imgSrc = trigger.getAttribute('src');
                const imgAlt = trigger.getAttribute('alt');

                // Find title if available in the DOM structure
                const parent = trigger.closest('.portfolio-item');
                let title = imgAlt;
                if (parent) {
                    const titleEl = parent.querySelector('.portfolio-title');
                    if (titleEl) title = titleEl.textContent;
                }

                lightboxImg.src = imgSrc;
                lightboxCaption.textContent = title;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // stop scrolling
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                lightboxImg.src = '';
            }, 300);
        };

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Escape key check
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // 5. Gallery Filtering (for portfolio.html)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.portfolio-item');

    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');

                    if (filterValue === 'all' || category === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
});
