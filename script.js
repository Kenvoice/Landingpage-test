// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
});

// Smooth Scrolling for Navigation Links
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

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animation on Scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .about-text, .hero-content');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initial setup for animation
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .about-text');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Contact Form Handler (if needed for future implementation)
function handleContactForm(event) {
    event.preventDefault();
    // Add form handling logic here
    alert('Vielen Dank für Ihre Nachricht! Ich melde mich bald bei Ihnen.');
}

// Stats Counter Animation
function animateStats() {
    const stats = document.querySelectorAll('.stat h4');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + (stat.textContent.includes('%') ? '%' : '+');
                clearInterval(timer);
            } else {
                stat.textContent = Math.ceil(current) + (stat.textContent.includes('%') ? '%' : '+');
            }
        }, 20);
    });
}

// Trigger stats animation when section is visible
const aboutSection = document.querySelector('.about');
let statsAnimated = false;

function checkStatsAnimation() {
    if (!statsAnimated && aboutSection) {
        const aboutTop = aboutSection.getBoundingClientRect().top;
        if (aboutTop < window.innerHeight - 200) {
            animateStats();
            statsAnimated = true;
        }
    }
}

window.addEventListener('scroll', checkStatsAnimation);
window.addEventListener('load', checkStatsAnimation);