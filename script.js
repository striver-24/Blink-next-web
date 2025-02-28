// Update copyright year
document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        return;
    }

    if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    lastScroll = currentScroll;
});

// Add animation on scroll for services
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// Add this to your existing script.js file
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    const waves = document.querySelectorAll('.wave, .wave-detail');
    let mouseTimeout;

    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { offsetWidth, offsetHeight } = hero;
        
        // Calculate mouse position percentage
        const xPos = (clientX / offsetWidth - 0.5) * 2;
        const yPos = (clientY / offsetHeight - 0.5) * 2;
        
        // Apply transform to each wave with different intensities
        waves.forEach((wave, index) => {
            const factor = (index + 1) * 2; // Reduced factor for subtler movement
            const scale = 1 + (Math.abs(xPos) + Math.abs(yPos)) * 0.05;
            
            wave.style.transform = `
                rotate(${xPos * factor}deg) 
                translateY(${yPos * factor}%) 
                translateX(${xPos * factor}%)
                scale(${scale})
            `;
        });

        // Clear existing timeout
        clearTimeout(mouseTimeout);
        
        // Set new timeout for smooth return
        mouseTimeout = setTimeout(() => {
            waves.forEach(wave => {
                wave.style.transform = 'rotate(0deg) translateY(0) translateX(0) scale(1)';
            });
        }, 1000);
    });

    // Smooth transitions
    waves.forEach(wave => {
        wave.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Add smooth transition for wave movement
document.querySelectorAll('.wave').forEach(wave => {
    wave.style.transition = 'transform 0.3s ease-out';
});

// Add this to your existing script.js
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animate button on submit
            const submitButton = this.querySelector('.submit-button');
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate form submission (replace with actual form submission)
            setTimeout(() => {
                submitButton.innerHTML = '<i class="fas fa-check"></i> Sent Successfully';
                submitButton.style.background = '#28a745';
                submitButton.style.borderColor = '#28a745';
                
                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    submitButton.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                    submitButton.style.background = 'transparent';
                    submitButton.style.borderColor = 'var(--barbie-pink)';
                }, 2000);
            }, 1500);
        });
    }
});

// Add smooth scroll functionality for contact links
document.addEventListener('DOMContentLoaded', function() {
    // Existing year update code...

    // Handle contact link clicks
    document.querySelectorAll('a[href*="#contact"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // If on a different page, store the hash and redirect
            if (!window.location.pathname.includes('index.html') && !window.location.pathname.endsWith('/')) {
                window.location.href = 'index.html#contact';
                return;
            }

            // If on index page, smooth scroll to contact section
            document.querySelector('#contact').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Add this to your existing script.js
document.addEventListener('DOMContentLoaded', function() {
    // Highlight current page in navigation
    const currentPage = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href').includes(currentPage)) {
            link.classList.add('active');
        }
    });
    
    // If on homepage
    if (currentPage === '/' || currentPage.includes('index.html')) {
        document.querySelector('a[href="index.html"]').classList.add('active');
    }
}); 