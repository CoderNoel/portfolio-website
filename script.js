document.addEventListener('DOMContentLoaded', () => {
    console.log("Script loaded");

    /**
     * Highlights the active navigation item based on the current URL path.
     * This function is executed once the DOM is fully loaded.
     */
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    console.log("Current path:", currentPath);

    const pathMap = {
        'index.html': 'nav-home',
        'about.html': 'nav-about',
        'portfolio.html': 'nav-portfolio',
        'contact.html': 'nav-contact'
    };

    console.log("Path map:", pathMap);

    const currentNavItemId = pathMap[currentPath];
    console.log("Current nav item ID:", currentNavItemId);

    if (currentNavItemId) {
        document.querySelectorAll('.nav-elements a').forEach(item => {
            item.classList.remove('active');
        });
        const currentNavItem = document.getElementById(currentNavItemId);
        if (currentNavItem) {
            currentNavItem.classList.add('active');
            console.log("Added active class to:", currentNavItem);
        } else {
            console.log("Current nav item not found");
        }
    } else {
        console.log("Current path not in path map");
    }

    /**
     * Changes the icon to a white-themed version on hover.
     * Reverts to the original icon on mouse out.
     */
    const linkButtons = document.querySelectorAll('.link-button');
    linkButtons.forEach(button => {
        const link = button.querySelector('.github-link');
        const img = link.querySelector('.github-logo');
        const originalSrc = img.src;
        const whiteSrc = 'images/github-mark/github-mark-white.png'; // Path to the white icon

        button.addEventListener('mouseover', () => {
            img.style.opacity = 0; // Fade out the original image
            setTimeout(() => {
                img.src = whiteSrc; // Switch to the white icon
                img.style.opacity = 1; // Fade in the new image
            }, 250); // Adjust duration to sync with button's transition
        });

        button.addEventListener('mouseout', () => {
            img.style.opacity = 0; // Fade out the white image
            setTimeout(() => {
                img.src = originalSrc; // Switch back to the original icon
                img.style.opacity = 1; // Fade in the original image
            }, 250); // Adjust duration to sync with button's transition
        });
    });

    /**
     * Changes the about section image for mobile view.
     * Reverts to the original image on larger screens.
     */
    const aboutPic = document.querySelector('.about-pic');
    if (aboutPic) {
        const originalPicSrc = 'images/about-pic.png'; // Path to the original image
        const mobilePicSrc = 'images/mobile-about-pic.png'; // Path to the mobile image

        function updateAboutPic() {
            if (window.innerWidth <= 750) {
                aboutPic.src = mobilePicSrc;
            } else {
                aboutPic.src = originalPicSrc;
            }
        }

        // Initial check
        updateAboutPic();

        // Update on window resize
        window.addEventListener('resize', updateAboutPic);
    }

    /**
     * Validates the contact form and shows a confirmation message on successful submission.
     */
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            // Perform basic validation
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

            // Show confirmation message
            successMessage.style.display = 'block';

            // Reset the form
            contactForm.reset();

            // Hide the message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        });
    }

    function validateEmail(email) {
        // Basic email validation regex
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    /**
     * Toggles the mobile navigation menu visibility.
     */
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileNav = document.getElementById('mobileNav');

    if (hamburgerMenu && mobileNav) {
        hamburgerMenu.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
        });
    }
});
