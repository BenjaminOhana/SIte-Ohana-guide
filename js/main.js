/**
 * Ohana Guide - Main JavaScript
...
    console.log('✅ Ohana Guide initialized successfully');
 * Handles animations, interactions, and scroll behaviors
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // GSAP & ScrollTrigger Setup
    // ==========================================
    gsap.registerPlugin(ScrollTrigger);

    // ==========================================
    // Scroll to Top on Page Load/Refresh
    // ==========================================
    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // ==========================================
    // HERO HEIGHT FIX (Mobile 'Dezoom' / Jump)
    // ==========================================
    const hero = document.querySelector('.hero');
    let lastWidth = window.innerWidth;

    const setHeroHeight = () => {
        // Fix the height to the initial viewport height (ignoring address bar resize)
        if (hero) {
            hero.style.minHeight = `${window.innerHeight}px`;
        }
    };

    // Initial set
    setHeroHeight();

    // Smart Resize (Only update height if width changes - ignores address bar toggle)
    window.addEventListener('resize', () => {
        const currentWidth = window.innerWidth;
        if (currentWidth !== lastWidth) {
            lastWidth = currentWidth;
            setHeroHeight();
            ScrollTrigger.refresh(); // Refresh scroll positions on true resize
        }
    });

    // ==========================================
    // HERO Subtle Zoom & Parallax Effect
    // ==========================================
    const heroBg = document.querySelector('.hero-bg');

    if (heroBg && window.innerWidth >= 768) {
        // Subtle zoom effect (1 -> 1.08) as user scrolls past hero
        gsap.to(heroBg, {
            scale: 1.08,
            ease: 'none',
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.8 // Smooth scrubbing
            }
        });

        // Subtle parallax (background moves slower than scroll)
        gsap.to(heroBg, {
            y: '15%', // Moves down 15% of its height
            ease: 'none',
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.5
            }
        });
    }

    // ==========================================
    // Header Scroll Effect
    // ==========================================
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });

    // ==========================================
    // Mobile Menu Toggle
    // ==========================================
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileToggle && mobileMenu) {
        // Toggle menu
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent document click from closing immediately
            mobileMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active'); // Animate hamburger if needed
        });

        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') &&
                !mobileMenu.contains(e.target) &&
                !mobileToggle.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }

    // ==========================================
    // Smooth Scroll for Anchor Links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Guard against empty '#' which would crash querySelector
            if (!href || href === '#') {
                e.preventDefault();
                return;
            }
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==========================================
    // GSAP Animations
    // ==========================================

    // Hero Animations - TEMPORARILY DISABLED FOR DEBUGGING
    /*
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power2.out' } });
    
    heroTimeline
        .from('.hero-badge', { 
            opacity: 0, 
            y: 20, 
            duration: 0.6,
            delay: 0.2 
        })
        .from('.hero-title', { 
            opacity: 0, 
            y: 30, 
            duration: 0.8 
        }, '-=0.3')
        .from('.hero-subtitle', { 
            opacity: 0, 
            y: 20, 
            duration: 0.6 
        }, '-=0.4')
        .from('.hero-cta', { 
            opacity: 0, 
            y: 20, 
            duration: 0.6 
        }, '-=0.3')
        .from('.hero-note', { 
            opacity: 0, 
            duration: 0.5 
        }, '-=0.2')
        .from('.scroll-indicator', { 
            opacity: 0, 
            duration: 0.5 
        }, '-=0.2');
    */

    // Section Headers Animations
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none none' // Once and stay
            },
            opacity: 0,
            y: 20, // Subtle movement
            duration: 1.0, // Slower, more elegant
            ease: 'power3.out'
        });
    });

    // Target Section Image Animation (Reveal with scale)
    const targetImage = document.querySelector('.target-image-wrapper');
    if (targetImage) {
        gsap.from(targetImage, {
            scrollTrigger: {
                trigger: targetImage,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            scale: 0.95,
            y: 30,
            duration: 1.0,
            ease: 'power3.out'
        });
    }



    // Feature Cards Animations
    gsap.utils.toArray('.feature-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 24, // 24px grid alignment
            duration: 0.8,
            delay: index * 0.1, // Keep stagger
            ease: 'power3.out'
        });
    });

    // Pain Points Animations (Apple Style)
    gsap.utils.toArray('.pain-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%', // Appear slightly later for drama
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 20, // Very subtle lift
            duration: 0.9, // Smooth entry
            delay: index * 0.1, // Staggered ripple
            ease: 'power3.out'
        });
    });

    // Pricing Cards Animations
    gsap.utils.toArray('.pricing-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 24,
            scale: 0.98, // Very subtle scale
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });

    // CTA Card Animation - Removed to fix GSAP warning
    // .cta-card no longer exists in DOM

    // ==========================================
    // Intersection Observer for CSS Animations
    // (Fallback if GSAP doesn't load)
    // ==========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Exclude elements that are already handled by GSAP (feature-card, pricing-card, pain-item, etc.)
    // This prevents double-animation fighting
    document.querySelectorAll('.fade-up:not(.feature-card):not(.pain-item):not(.testimonial-card)').forEach(el => {
        observer.observe(el);
    });

    // ==========================================
    // Performance: Reduce motion for users who prefer it
    // ==========================================
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.globalTimeline.timeScale(0);
        document.querySelectorAll('.fade-up').forEach(el => {
            el.classList.add('visible');
        });
    }

    // ==========================================
    // Video Modal Logic
    // ==========================================
    // ==========================================
    // Video Modal Logic (Local File)
    // ==========================================
    const modal = document.getElementById('videoModal');
    const openBtn = document.getElementById('openDemo');
    const closeBtn = document.querySelector('.modal-close');
    const backdrop = document.querySelector('.modal-backdrop');
    const video = document.getElementById('demoVideo');
    const modalContent = document.querySelector('.modal-content');

    if (openBtn && modal) {
        openBtn.addEventListener('click', () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling

            if (video) {
                video.currentTime = 0;
                video.play().catch(e => console.log('Autoplay prevented:', e));

                // Check if video is vertical
                if (video.videoHeight > video.videoWidth) {
                    modalContent.classList.add('vertical');
                }
            }
        });

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';

            if (video) {
                video.pause();
            }
        };

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (backdrop) backdrop.addEventListener('click', closeModal);

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // ==========================================
    // FAQ Accordion
    // ==========================================
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');

            // Close other items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Toggle current
            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // ==========================================
    // Mobile Sticky CTA - Smart Show/Hide
    // ==========================================
    // ==========================================
    // Mobile Sticky CTA - Optimized with IntersectionObserver
    // ==========================================
    const mobileStickyCtaBar = document.getElementById('mobileStickyCtaBar');

    if (mobileStickyCtaBar && window.innerWidth <= 767) {
        const hero = document.getElementById('hero');
        const footer = document.querySelector('footer');

        // We'll track visibility of Hero and Footer
        let isHeroVisible = true;
        let isFooterVisible = false;

        const updateCtaVisibility = () => {
            // Show CTA only if Hero is NOT visible AND Footer is NOT visible
            // AND we are not at the very top (scrolled past hero)
            if (!isHeroVisible && !isFooterVisible) {
                mobileStickyCtaBar.classList.add('visible');
            } else {
                mobileStickyCtaBar.classList.remove('visible');
            }
        };

        const stickyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.target.id === 'hero') {
                    isHeroVisible = entry.isIntersecting;
                } else if (entry.target.tagName === 'FOOTER') {
                    isFooterVisible = entry.isIntersecting;
                }
            });
            updateCtaVisibility();
        }, {
            root: null,
            threshold: 0 // Trigger as soon as 1px is visible/hidden
        });

        if (hero) stickyObserver.observe(hero);
        if (footer) stickyObserver.observe(footer);
    }

    console.log('✅ GuideBnB initialized successfully');
});
