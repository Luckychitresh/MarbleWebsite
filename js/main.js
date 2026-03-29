/* ============================================
   VERSATILE STONEX — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ========== PRELOADER ==========
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', function () {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
        }, 2200);
    });

    // Fallback to hide preloader after 4s
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }, 4000);

    // ========== AOS INIT ==========
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
        disable: window.innerWidth < 768 ? 'phone' : false
    });

    // ========== HERO SLIDER ==========
    const heroSwiper = new Swiper('.hero-slider', {
        loop: true,
        speed: 1200,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: '.hero-pagination',
            clickable: true,
        },
    });

    // ========== TESTIMONIALS SLIDER ==========
    const testimonialSwiper = new Swiper('.testimonials-slider', {
        loop: true,
        speed: 800,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.testimonial-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
        },
    });

    // ========== NAVBAR SCROLL EFFECT ==========
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    function handleNavScroll() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll(); // Initial check

    // ========== MOBILE NAV TOGGLE ==========
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    document.querySelectorAll('.nav-link, .nav-btn').forEach(link => {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ========== ACTIVE NAV LINK ON SCROLL ==========
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollPos = window.pageYOffset + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // ========== COUNTER ANIMATION ==========
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        const statsSection = document.querySelector('.hero-stats');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            countersAnimated = true;

            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
            });
        }
    }

    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Check on load

    // ========== PRODUCT FILTER (removed - using catalogue sections) ==========

    // ========== CATALOGUE TOGGLE ==========
    const gridLabels = {
        'marbleGrid': 'Marble',
        'graniteGrid': 'Granite',
        'onyxGrid': 'Onyx',
        'importedGrid': 'Imported'
    };

    document.querySelectorAll('.catalogue-toggle-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const grid = document.getElementById(targetId);
            const isExpanded = grid.classList.toggle('expanded');
            this.classList.toggle('expanded');
            const label = gridLabels[targetId] || 'Full';

            if (isExpanded) {
                this.innerHTML = 'Show Less ' + label + ' Collection <i class="fas fa-chevron-up"></i>';
            } else {
                this.innerHTML = 'View Full ' + label + ' Collection <i class="fas fa-chevron-down"></i>';
            }
        });
    });

    // ========== BACK TO TOP ==========
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ========== CONTACT FORM HANDLING ==========
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Simulate form submission
        submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = '<span>Sent Successfully!</span> <i class="fas fa-check"></i>';
            submitBtn.style.background = '#27ae60';

            // Reset form
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;

                // Show thank you message
                showNotification('Thank you! We will contact you within 24 hours.');
            }, 2000);
        }, 1500);
    });

    // Quick Quote Form
    const quickQuoteForm = document.querySelector('.quick-quote-form');
    if (quickQuoteForm) {
        quickQuoteForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';

            setTimeout(() => {
                submitBtn.innerHTML = 'Sent! <i class="fas fa-check"></i>';
                setTimeout(() => {
                    closeModal();
                    quickQuoteForm.reset();
                    submitBtn.innerHTML = 'Submit <i class="fas fa-arrow-right"></i>';
                    showNotification('Quote request received! We\'ll get back shortly.');
                }, 1500);
            }, 1200);
        });
    }

    // ========== MODAL ==========
    const modal = document.getElementById('quickQuoteModal');
    const modalClose = document.getElementById('modalClose');

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) closeModal();
        });
    }

    // ESC key closes modal
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
    });

    // ========== NOTIFICATION ==========
    function showNotification(message) {
        // Remove existing notification
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">&times;</button>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #1a1a1a;
            color: #fff;
            padding: 16px 24px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 0.9rem;
            z-index: 10001;
            box-shadow: 0 8px 30px rgba(0,0,0,0.3);
            border-left: 3px solid #c8a97e;
            animation: slideInRight 0.4s ease;
            max-width: 400px;
        `;

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        notification.querySelector('button').style.cssText = `
            background: none;
            border: none;
            color: #888;
            font-size: 1.2rem;
            cursor: pointer;
            margin-left: 12px;
        `;

        notification.querySelector('i').style.color = '#c8a97e';

        document.body.appendChild(notification);

        // Auto-remove after 5s
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.4s ease forwards';
                setTimeout(() => notification.remove(), 400);
            }
        }, 5000);
    }

    // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== PARALLAX EFFECT ON CTA ==========
    const ctaBg = document.querySelector('.cta-bg');

    if (ctaBg && window.innerWidth > 768) {
        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset;
            const ctaSection = ctaBg.closest('.cta-section');
            const sectionTop = ctaSection.offsetTop;
            const speed = 0.3;

            if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + ctaSection.offsetHeight) {
                const yPos = (scrolled - sectionTop) * speed;
                ctaBg.style.transform = `translateY(${yPos}px)`;
            }
        });
    }

    // ========== LAZY IMAGE LOADING ANIMATION ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px 50px 0px'
    };

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
                imageObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-img img, .project-card img').forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'scale(1.05)';
        img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        imageObserver.observe(img);
    });

    // ========== TYPED TEXT EFFECT (OPTIONAL) ==========
    // Subtle text reveal on hero section
    const heroTags = document.querySelectorAll('.hero-tag');
    heroTags.forEach(tag => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(10px)';
        setTimeout(() => {
            tag.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
        }, 500);
    });

    // ========== FORM INPUT ANIMATION ==========
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.querySelector('label')?.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            if (!this.value) {
                this.parentElement.querySelector('label')?.classList.remove('focused');
            }
        });
    });

    // ========== SMOOTH SCROLL FOR ALL ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });

    console.log('%c\u2b25 Versatile Stonex \u2014 Premium Marble Supplier & Exporter', 'color: #c8a97e; font-size: 14px; font-weight: bold; padding: 10px;');
});
