// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Update ARIA attributes for accessibility
        const isExpanded = navMenu.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
        hamburger.setAttribute('aria-label', isExpanded ? 'Menü schließen' : 'Menü öffnen');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Menü öffnen');
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

// Contact Form Validation and Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmission);
        
        // Real-time validation
        const requiredFields = ['name', 'email', 'message', 'privacy'];
        requiredFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field) {
                field.addEventListener('blur', () => validateField(fieldName));
                field.addEventListener('input', () => clearError(fieldName));
            }
        });
    }
});

function validateField(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    if (!field || !errorElement) return true;
    
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldName) {
        case 'name':
            if (!field.value.trim()) {
                errorMessage = 'Name ist erforderlich.';
                isValid = false;
            } else if (field.value.trim().length < 2) {
                errorMessage = 'Name muss mindestens 2 Zeichen lang sein.';
                isValid = false;
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!field.value.trim()) {
                errorMessage = 'E-Mail-Adresse ist erforderlich.';
                isValid = false;
            } else if (!emailRegex.test(field.value.trim())) {
                errorMessage = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
                isValid = false;
            }
            break;
            
        case 'message':
            if (!field.value.trim()) {
                errorMessage = 'Nachricht ist erforderlich.';
                isValid = false;
            } else if (field.value.trim().length < 10) {
                errorMessage = 'Nachricht muss mindestens 10 Zeichen lang sein.';
                isValid = false;
            }
            break;
            
        case 'privacy':
            if (!field.checked) {
                errorMessage = 'Sie müssen der Datenschutzerklärung zustimmen.';
                isValid = false;
            }
            break;
    }
    
    if (isValid) {
        field.classList.remove('error');
        errorElement.textContent = '';
    } else {
        field.classList.add('error');
        errorElement.textContent = errorMessage;
    }
    
    return isValid;
}

function clearError(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    if (field && errorElement && field.value.trim()) {
        field.classList.remove('error');
        errorElement.textContent = '';
    }
}

function handleContactFormSubmission(event) {
    event.preventDefault();
    
    // Validate all required fields
    const requiredFields = ['name', 'email', 'message', 'privacy'];
    let isFormValid = true;
    
    requiredFields.forEach(fieldName => {
        if (!validateField(fieldName)) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        // Scroll to first error
        const firstError = document.querySelector('.error-message:not(:empty)');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }
    
    // Show loading state
    const submitBtn = event.target.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnSpinner = submitBtn.querySelector('.btn-spinner');
    
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnSpinner.style.display = 'block';
    
    // Simulate form submission (in real implementation, this would send to a server)
    setTimeout(() => {
        // Reset loading state
        submitBtn.disabled = false;
        btnText.style.display = 'block';
        btnSpinner.style.display = 'none';
        
        // Show success message
        alert('Vielen Dank für Ihre Nachricht! Ich melde mich innerhalb von 24 Stunden bei Ihnen.');
        
        // Reset form
        event.target.reset();
        
        // Clear any remaining error states
        requiredFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            const errorElement = document.getElementById(`${fieldName}-error`);
            if (field && errorElement) {
                field.classList.remove('error');
                errorElement.textContent = '';
            }
        });
    }, 2000);
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