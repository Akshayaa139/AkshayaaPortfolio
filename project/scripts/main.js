// Main JavaScript functionality
class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupProjectFilters();
        this.setupContactForm();
        this.setupCounters();
        this.setupCursor();
        this.initAOS();
    }

    // Navigation functionality
    setupNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navClose = document.getElementById('nav-close');
        const navLinks = document.querySelectorAll('.nav__link');

        // Toggle mobile menu
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.add('show-menu');
            });
        }

        if (navClose) {
            navClose.addEventListener('click', () => {
                navMenu.classList.remove('show-menu');
            });
        }

        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show-menu');
            });
        });

        // Active navigation highlighting
        this.updateActiveNav();
        window.addEventListener('scroll', () => this.updateActiveNav());
    }

    updateActiveNav() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav__link');
        const scrollPosition = window.scrollY + 100;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Scroll effects
    setupScrollEffects() {
        // Progress bar
        const progressBar = document.querySelector('.progress-bar');
        
        window.addEventListener('scroll', () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.scrollY;
            const progress = (scrolled / documentHeight) * 100;
            
            if (progressBar) {
                progressBar.style.width = `${progress}%`;
            }
        });

        // Header background on scroll
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(248, 249, 250, 0.95)';
            } else {
                header.style.background = 'rgba(248, 249, 250, 0.8)';
            }
        });
    }

    // Project filters
    setupProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active filter button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'all' || category.includes(filter)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Contact form
    setupContactForm() {
        const form = document.getElementById('contact-form');
        const inputs = form.querySelectorAll('.form-input');

        // Add placeholder for floating labels
        inputs.forEach(input => {
            input.setAttribute('placeholder', ' ');
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (this.validateForm(data)) {
                await this.submitForm(data);
            }
        });
    }

    validateForm(data) {
        const errors = {};
        
        // Name validation
        if (!data.name || data.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters long';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            errors.email = 'Please enter a valid email address';
        }

        // Subject validation
        if (!data.subject || data.subject.trim().length < 5) {
            errors.subject = 'Subject must be at least 5 characters long';
        }

        // Message validation
        if (!data.message || data.message.trim().length < 10) {
            errors.message = 'Message must be at least 10 characters long';
        }

        // Display errors
        this.displayFormErrors(errors);
        
        return Object.keys(errors).length === 0;
    }

    displayFormErrors(errors) {
        // Clear previous errors
        document.querySelectorAll('.form-error').forEach(error => {
            error.textContent = '';
            error.classList.remove('show');
        });

        // Show new errors
        Object.keys(errors).forEach(field => {
            const errorElement = document.getElementById(`${field}-error`);
            if (errorElement) {
                errorElement.textContent = errors[field];
                errorElement.classList.add('show');
            }
        });
    }

    async submitForm(data) {
        const submitBtn = document.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success message
            this.showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            document.getElementById('contact-form').reset();
        } catch (error) {
            this.showMessage('Something went wrong. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    }

    showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message--${type}`;
        messageDiv.textContent = message;
        
        // Style the message
        Object.assign(messageDiv.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 2rem',
            borderRadius: '0.5rem',
            color: 'white',
            background: type === 'success' ? '#10b981' : '#ef4444',
            zIndex: '9999',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        document.body.appendChild(messageDiv);

        // Animate in
        requestAnimationFrame(() => {
            messageDiv.style.transform = 'translateX(0)';
        });

        // Remove after 5 seconds
        setTimeout(() => {
            messageDiv.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        }, 5000);
    }

    // Animated counters
    setupCounters() {
        const counters = document.querySelectorAll('[data-counter]');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-counter'));
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);

            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }

    // Custom cursor
    setupCursor() {
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
            return;
        }

        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let followerX = 0;
        let followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Animate cursor
        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.3;
            cursorY += (mouseY - cursorY) * 0.3;
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;

            if (cursor) {
                cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
            }
            
            if (cursorFollower) {
                cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
            }

            requestAnimationFrame(animateCursor);
        };

        animateCursor();

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .achievement-card');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (cursor) cursor.style.transform += ' scale(1.5)';
                if (cursorFollower) cursorFollower.style.transform += ' scale(1.5)';
            });
            
            element.addEventListener('mouseleave', () => {
                if (cursor) cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
                if (cursorFollower) cursorFollower.style.transform = cursorFollower.style.transform.replace(' scale(1.5)', '');
            });
        });
    }

    // Initialize AOS (Animate On Scroll)
    initAOS() {
        // Custom AOS implementation
        const animatedElements = document.querySelectorAll('[data-aos]');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, observerOptions);

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Utility functions
    throttle(func, wait) {
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
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = 'Come back! 👋 - Akshayaa Prakash';
    } else {
        document.title = 'Akshayaa Prakash - Software Engineer';
    }
});

// Handle keyboard navigation
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu.classList.contains('show-menu')) {
            navMenu.classList.remove('show-menu');
        }
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Performance monitoring
const perfObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
            console.log('Navigation timing:', entry.toJSON());
        }
    }
});

try {
    perfObserver.observe({ entryTypes: ['navigation'] });
} catch (e) {
    // Browser doesn't support this API
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});