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
    if (hamburgerMenu && mobileNav) {
        hamburgerMenu.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
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
    }

    if (currentTheme) {
        applyTheme(currentTheme);
    } else { // Default to light theme if no preference saved
        applyTheme('light');
        // Optionally, you could also set the localStorage item here for the default
        // localStorage.setItem('theme', 'light'); 
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