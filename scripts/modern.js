// Modern Portfolio JavaScript

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initTheme();
        this.initLoadingScreen();
        this.initScrollAnimations();
        this.initNavigation();
        this.initMobileMenu();
        this.initCursor();
        this.initCounters();
        this.initParallax();
        this.initContactForm();
        this.initSmoothScrolling();
    }

    // Event Listeners Setup
    setupEventListeners() {
        window.addEventListener('DOMContentLoaded', () => {
            this.hideLoadingScreen();
        });

        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    // Loading Screen
    initLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        
        // Ensure minimal loading time but keep snappy UX
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 800);
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'auto';
            
            // Trigger initial animations
            setTimeout(() => {
                this.revealElements();
            }, 200);
        }
    }

    // Theme Management
    initTheme() {
        const themeToggle = document.getElementById('themeToggle');
        const savedTheme = localStorage.getItem('theme') || 'light';
        
        this.setTheme(savedTheme);
        
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                this.setTheme(newTheme);
                localStorage.setItem('theme', newTheme);
            });
        }
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update theme toggle button
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
        }
        
        // Update logo based on theme
        const logoImage = document.getElementById('logoImage');
        if (logoImage) {
            if (theme === 'dark') {
                logoImage.src = 'images/darkLogo.png';
                logoImage.alt = 'codernoel logo - dark mode';
            } else {
                logoImage.src = 'images/logo.png';
                logoImage.alt = 'codernoel logo - light mode';
            }
        }
        
        // Update theme color for browser tabs (Safari, Arc, etc.)
        const themeColorMeta = document.getElementById('themeColorMeta');
        if (themeColorMeta) {
            if (theme === 'dark') {
                themeColorMeta.setAttribute('content', '#0f172a');
            } else {
                themeColorMeta.setAttribute('content', '#f8fafc');
            }
        }
    }

    // Navigation
    initNavigation() {
        const nav = document.getElementById('nav');
        const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-link');
        
        // Handle scroll for nav background
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (nav) {
                if (currentScrollY > 100) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            }
            
            lastScrollY = currentScrollY;
        });
        
        // Update active nav link based on scroll position
        this.updateActiveNavLink();
        window.addEventListener('scroll', () => {
            this.updateActiveNavLink();
        });

        // Ensure first link has aria-current initially
        navLinks.forEach(link => link.removeAttribute('aria-current'));
        const homeLink = document.querySelector('.nav-link[data-section="hero"]');
        if (homeLink) homeLink.setAttribute('aria-current', 'page');
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[data-section], .mobile-menu-link[data-section]');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section.id;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
                if (link.classList.contains('nav-link')) {
                    link.setAttribute('aria-current', 'page');
                }
            }
        });
    }

    // Mobile Menu
    initMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
        
        if (mobileMenuToggle && mobileMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                const isActive = mobileMenu.classList.contains('active');
                
                if (isActive) {
                    this.closeMobileMenu();
                } else {
                    this.openMobileMenu();
                }
            });
            
            // Close menu when clicking on links
            mobileMenuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
            });
            
            // Close menu when clicking outside
            mobileMenu.addEventListener('click', (e) => {
                if (e.target === mobileMenu) {
                    this.closeMobileMenu();
                }
            });
        }
    }

    openMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        
        mobileMenu.classList.add('active');
        mobileMenuToggle.classList.add('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    closeMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        
        mobileMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = 'auto';
    }

    // Smooth Scrolling
    initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (!targetElement) return;

                e.preventDefault();
                
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    // Scroll Animations
    initScrollAnimations() {
        this.createScrollObserver();
    }

    createScrollObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Trigger counter animation if it's a stat number
                    if (entry.target.classList.contains('stat-number')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate on scroll
        const animatedElements = document.querySelectorAll('.section-header, .project-card, .skill-category, .stat-item, .contact-item');
        
        animatedElements.forEach(el => {
            el.classList.add('scroll-reveal');
            observer.observe(el);
        });
        
        // Observe stat numbers separately for counter animation and reset to 0
        const statNumbers = document.querySelectorAll('.stat-number[data-count]');
        statNumbers.forEach(statNumber => {
            observer.observe(statNumber);
            statNumber.textContent = '0';
        });
    }

    revealElements() {
        const heroElements = document.querySelectorAll('.hero-greeting, .hero-title, .hero-subtitle, .hero-cta, .hero-scroll-indicator, .hero-image-container');
        
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Counter Animation
    initCounters() {
        // Counters will be animated when they come into view via intersection observer
    }

    animateCounter(element) {
        // Prevent multiple animations on the same element
        if (element.hasAttribute('data-animated')) {
            return;
        }
        element.setAttribute('data-animated', 'true');
        
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const startTime = performance.now();
        
        // Set initial value to 0
        element.textContent = '0';
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * target);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target;
            }
        };
        
        requestAnimationFrame(animate);
    }

    // Parallax Effects
    initParallax() {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            floatingElements.forEach(element => {
                const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Custom Cursor
    initCursor() {
        if (window.innerWidth > 768) {
            const cursor = document.getElementById('cursor');
            const cursorDot = document.getElementById('cursorDot');
            
            if (cursor && cursorDot) {
                let mouseX = 0;
                let mouseY = 0;
                let cursorX = 0;
                let cursorY = 0;
                let dotX = 0;
                let dotY = 0;
                let isActive = false;
                let animationId = null;
                
                // Simplified mousemove without throttling for now
                document.addEventListener('mousemove', (e) => {
                    mouseX = e.clientX;
                    mouseY = e.clientY;
                    
                    if (!isActive) {
                        cursor.classList.add('active');
                        cursorDot.classList.add('active');
                        isActive = true;
                        
                        // Start animation loop
                        animateCursor();
                    }
                }, { passive: true });
                
                document.addEventListener('mouseleave', () => {
                    cursor.classList.remove('active');
                    cursorDot.classList.remove('active');
                    isActive = false;
                    
                    // Stop animation when not needed
                    if (animationId) {
                        cancelAnimationFrame(animationId);
                        animationId = null;
                    }
                });
                
                // Optimized hover effects with delegation
                let isHovering = false;
                
                document.addEventListener('mouseenter', (e) => {
                    if (e.target.matches('a, button, .project-card, .skill-tag')) {
                        cursor.classList.add('hover');
                        isHovering = true;
                    }
                }, true);
                
                document.addEventListener('mouseleave', (e) => {
                    if (e.target.matches('a, button, .project-card, .skill-tag')) {
                        cursor.classList.remove('hover');
                        isHovering = false;
                    }
                }, true);
                
                // Optimized cursor animation with GPU acceleration
                const animateCursor = () => {
                    // Use easing for smoother movement
                    const ease = 0.12;
                    const dotEase = 0.18;
                    
                    const oldCursorX = cursorX;
                    const oldCursorY = cursorY;
                    const oldDotX = dotX;
                    const oldDotY = dotY;
                    
                    cursorX += (mouseX - cursorX) * ease;
                    cursorY += (mouseY - cursorY) * ease;
                    dotX += (mouseX - dotX) * dotEase;
                    dotY += (mouseY - dotY) * dotEase;
                    
                    // Only update if there's significant movement
                    const threshold = 0.1;
                    if (Math.abs(cursorX - oldCursorX) > threshold || 
                        Math.abs(cursorY - oldCursorY) > threshold ||
                        Math.abs(dotX - oldDotX) > threshold ||
                        Math.abs(dotY - oldDotY) > threshold) {
                        
                        // Use transform for GPU acceleration
                        const scale = isHovering ? 1.4 : 1;
                        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%) scale(${scale})`;
                        cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
                    }
                    
                    // Only continue animation if cursor is active
                    if (isActive) {
                        animationId = requestAnimationFrame(animateCursor);
                    } else {
                        animationId = null;
                    }
                };
                
                // Initialize positions
                cursorX = mouseX;
                cursorY = mouseY;
                dotX = mouseX;
                dotY = mouseY;
            }
        }
    }

    // Contact Form
    initContactForm() {
        const contactForm = document.getElementById('contactForm');
        const formStatus = document.getElementById('formStatus');
        
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const submitButton = contactForm.querySelector('.form-submit');
                const formData = new FormData(contactForm);
                
                // Add loading state
                submitButton.classList.add('loading');
                submitButton.disabled = true;
                
                try {
                    const response = await fetch(contactForm.action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });
                    
                    if (response.ok) {
                        this.showFormStatus('success', 'Thank you! Your message has been sent successfully.');
                        contactForm.reset();
                    } else {
                        throw new Error('Network response was not ok');
                    }
                } catch (error) {
                    this.showFormStatus('error', 'Sorry, there was an error sending your message. Please try again.');
                } finally {
                    submitButton.classList.remove('loading');
                    submitButton.disabled = false;
                }
            });
        }
    }

    showFormStatus(type, message) {
        const formStatus = document.getElementById('formStatus');
        
        if (formStatus) {
            formStatus.className = `form-status ${type}`;
            formStatus.textContent = message;
            
            setTimeout(() => {
                formStatus.className = 'form-status';
                formStatus.textContent = '';
            }, 5000);
        }
    }

    // Scroll Handler
    handleScroll() {
        const scrollY = window.scrollY;
        
        // Update scroll indicator
        const scrollIndicator = document.querySelector('.hero-scroll-indicator');
        if (scrollIndicator) {
            const opacity = Math.max(0, 1 - scrollY / 300);
            scrollIndicator.style.opacity = opacity;
        }
        
        // Parallax effect for hero background
        const heroBgPattern = document.querySelector('.hero-bg-pattern');
        if (heroBgPattern) {
            heroBgPattern.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
    }

    // Resize Handler
    handleResize() {
        // Close mobile menu on resize
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
        
        // Reinitialize cursor on desktop
        if (window.innerWidth > 768) {
            this.initCursor();
        }
    }

    // Utility Methods
    debounce(func, wait) {
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

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Add copy-to-clipboard for thumbnail actions
(function initCopyLink(){
    document.addEventListener('click', async (e) => {
        const btn = e.target.closest('.js-copy-link');
        if (!btn) return;
        const url = btn.getAttribute('data-copy');
        if (!url) return;
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(url);
            } else {
                const temp = document.createElement('input');
                temp.value = url;
                document.body.appendChild(temp);
                temp.select();
                document.execCommand('copy');
                document.body.removeChild(temp);
            }
            const card = btn.closest('.project-image');
            const badge = card && card.querySelector('.copy-badge');
            if (badge) {
                badge.classList.add('visible');
                setTimeout(() => badge.classList.remove('visible'), 1600);
            }
        } catch (err) {
            console.warn('Copy failed', err);
        }
    });
})();

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Add some additional utility functions
const utils = {
    // Smooth scroll to element
    scrollToElement(elementId, offset = 80) {
        const element = document.getElementById(elementId);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    },
    
    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Generate random number between min and max
    random(min, max) {
        return Math.random() * (max - min) + min;
    },
    
    // Clamp number between min and max
    clamp(num, min, max) {
        return Math.min(Math.max(num, min), max);
    }
};

// Make utils available globally
window.portfolioUtils = utils;