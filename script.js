document.addEventListener('DOMContentLoaded', () => {
    console.log("Script loaded");

    // Page transition effect
    const pageTransition = document.querySelector('.page-transition');
    
    // On page load, fade out the transition layer
    if (pageTransition) {
        setTimeout(() => {
            pageTransition.classList.add('fade-out');
        }, 100);
    }

    // Add transition on navigation
    document.addEventListener('click', (e) => {
        const target = e.target;
        
        // If clicked element is a link to another page in our site
        if (target.tagName === 'A' && 
            target.href.includes(window.location.hostname) && 
            !target.href.includes('#') && 
            !target.getAttribute('target')) {
            
            e.preventDefault();
            const targetHref = target.href;
            
            // Activate transition
            pageTransition.classList.add('active');
            
            // Navigate after transition completes
            setTimeout(() => {
                window.location.href = targetHref;
            }, 400);
        }
    });

    // Scroll to top button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        // Show button when page is scrolled down
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when button is clicked
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Highlight the active navigation item
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const pathMap = {
        'index.html': 'nav-home',
        'about.html': 'nav-about',
        'portfolio.html': 'nav-portfolio',
        'contact.html': 'nav-contact'
    };
    const currentNavItemId = pathMap[currentPath];
    if (currentNavItemId) {
        document.querySelectorAll('.nav-elements a').forEach(item => {
            item.classList.remove('active');
        });
        const currentNavItem = document.getElementById(currentNavItemId);
        if (currentNavItem) {
            currentNavItem.classList.add('active');
        }

        // Mobile navigation highlight
        const mobileNavItemId = `${currentNavItemId}-mobile`;
        document.querySelectorAll('.mobile-nav-elements a').forEach(item => {
            item.classList.remove('active');
        });
        const currentMobileNavItem = document.getElementById(mobileNavItemId);
        if (currentMobileNavItem) {
            currentMobileNavItem.classList.add('active');
        }
    }

    // Change about section image for mobile view
    const aboutPic = document.querySelector('.about-pic');
    if (aboutPic) {
        const originalPicSrc = 'images/about-pic.png';
        const mobilePicSrc = 'images/mobile-about-pic.png';
        /**  
         * Updates the About section image based on viewport width  
         * Desktop: Uses the standard landscape image  
         * Mobile: Uses a specially cropped portrait image for better mobile display  
         */ 
        function updateAboutPic() {
            if (window.innerWidth <= 750) {
                aboutPic.src = mobilePicSrc;
            } else {
                aboutPic.src = originalPicSrc;
            }
        }
        updateAboutPic();
        window.addEventListener('resize', updateAboutPic);
    }

    // Validate contact form and show confirmation message
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            if (email === "" || subject === "" || message === "") {
                alert("Please fill in all fields.");
                return;
            }
            if (!validateEmail(email)) {
                alert("Please enter a valid email address.");
                return;
            }
            fetch(this.action, {
                method: this.method,
                body: new FormData(this),
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    successMessage.style.display = 'block';
                    contactForm.reset();
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                } else {
                    alert('Failed to send message. Please try again later.');
                }
            }).catch(error => {
                alert('Failed to send message. Please try again later.');
            });
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Toggle mobile navigation menu
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileNav = document.getElementById('mobileNav');
    const headerElement = document.querySelector('.header');

    function updateHeaderBlur() {
        if (!headerElement) return;
        const atTop = window.scrollY === 0;
        const menuOpen = mobileNav && mobileNav.classList.contains('active');
        if (!atTop || menuOpen) {
            headerElement.classList.add('blur');
        } else {
            headerElement.classList.remove('blur');
        }
    }

    // Initial check after page loads
    updateHeaderBlur();

    // Update on scroll
    window.addEventListener('scroll', updateHeaderBlur);

    if (hamburgerMenu && mobileNav) {
        hamburgerMenu.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            updateHeaderBlur(); // Ensure header blur reflects menu state
        });
    }

    // Theme Switcher
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const currentTheme = localStorage.getItem('theme');

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
        
        // Update the logo image depending on theme
        const logoLightSrc = 'images/logo.png';
        const logoDarkSrc = 'images/darkLogo.png';
        document.querySelectorAll('.logo').forEach(logoImg => {
            logoImg.src = (theme === 'dark') ? logoDarkSrc : logoLightSrc;
            console.log('Logo updated to', logoImg.src);
        });
    }

    if (currentTheme) {
        // Respect previously chosen theme
        applyTheme(currentTheme);
    } else {
        // Detect system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');

        // Listen for changes in system preference IF user has not manually chosen a theme yet
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Only react if user hasn't overridden theme manually
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                applyTheme(newTheme);
            }
        });
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let theme = 'light';
            if (!document.body.classList.contains('dark-theme')) {
                theme = 'dark';
            }
            localStorage.setItem('theme', theme);
            applyTheme(theme);
        });
    }
});