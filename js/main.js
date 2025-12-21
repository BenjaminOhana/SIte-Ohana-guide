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
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // ==========================================
    // Smooth Scroll for Anchor Links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
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
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // Feature Cards Animations
    gsap.utils.toArray('.feature-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 40,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });

    // Pricing Cards Animations
    gsap.utils.toArray('.pricing-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            scale: 0.95,
            duration: 0.7,
            delay: index * 0.15,
            ease: 'power2.out'
        });
    });

    // CTA Card Animation
    gsap.from('.cta-card', {
        scrollTrigger: {
            trigger: '.cta-card',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out'
    });

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

    document.querySelectorAll('.fade-up').forEach(el => {
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
            if (video) video.pause();
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
    const mobileStickyCtaBar = document.getElementById('mobileStickyCtaBar');

    if (mobileStickyCtaBar && window.innerWidth <= 767) {
        // Elements that contain CTAs - when visible, hide the sticky bar
        const ctaElements = document.querySelectorAll('.hero-cta, .offer-section .btn-primary, .story-section .btn-outline, .mobile-menu-cta');
        const heroSection = document.getElementById('hero');

        let hasScrolledPastHero = false;
        let anyCtaVisible = false;

        // Observer for CTA visibility
        const ctaObserver = new IntersectionObserver((entries) => {
            anyCtaVisible = entries.some(entry => entry.isIntersecting);
            updateStickyVisibility();
        }, { threshold: 0.3 });

        // Observer for hero section (only show after scrolling past hero)
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                hasScrolledPastHero = !entry.isIntersecting;
                updateStickyVisibility();
            });
        }, { threshold: 0 });

        function updateStickyVisibility() {
            if (hasScrolledPastHero && !anyCtaVisible) {
                mobileStickyCtaBar.classList.add('visible');
                mobileStickyCtaBar.classList.remove('hidden');
            } else {
                mobileStickyCtaBar.classList.remove('visible');
                mobileStickyCtaBar.classList.add('hidden');
            }
        }

        // Observe all CTAs
        ctaElements.forEach(cta => ctaObserver.observe(cta));

        // Observe hero section
        if (heroSection) {
            heroObserver.observe(heroSection);
        }
    }

    console.log('✅ GuideBnB initialized successfully');
});
