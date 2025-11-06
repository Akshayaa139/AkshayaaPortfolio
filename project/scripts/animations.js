// Advanced Animation System
class AnimationController {
    constructor() {
        this.observers = new Map();
        this.animations = new Map();
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupLoadingAnimations();
        this.setupMicroInteractions();
    }

    // Scroll-triggered animations
    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-animate]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });

        this.observers.set('scroll', observer);
    }

    triggerAnimation(element) {
        const animationType = element.getAttribute('data-animate');
        const delay = parseInt(element.getAttribute('data-delay')) || 0;
        const duration = parseInt(element.getAttribute('data-duration')) || 600;

        setTimeout(() => {
            element.classList.add('animated', `animate-${animationType}`);
            element.style.animationDuration = `${duration}ms`;
        }, delay);
    }

    // Hover animations
    setupHoverAnimations() {
        const hoverElements = document.querySelectorAll('[data-hover]');
        
        hoverElements.forEach(element => {
            const hoverType = element.getAttribute('data-hover');
            
            element.addEventListener('mouseenter', () => {
                this.applyHoverEffect(element, hoverType, true);
            });
            
            element.addEventListener('mouseleave', () => {
                this.applyHoverEffect(element, hoverType, false);
            });
        });
    }

    applyHoverEffect(element, type, isEntering) {
        switch (type) {
            case 'lift':
                element.style.transform = isEntering ? 'translateY(-10px)' : 'translateY(0)';
                break;
            case 'scale':
                element.style.transform = isEntering ? 'scale(1.05)' : 'scale(1)';
                break;
            case 'rotate':
                element.style.transform = isEntering ? 'rotate(5deg)' : 'rotate(0deg)';
                break;
            case 'glow':
                element.style.boxShadow = isEntering ? 
                    '0 0 30px rgba(0, 0, 0, 0.3)' : 
                    '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                break;
        }
    }

    // Loading animations
    setupLoadingAnimations() {
        // Stagger animations for lists
        this.staggerListItems();
        
        // Page load animations
        this.setupPageLoadAnimations();
    }

    staggerListItems() {
        const lists = document.querySelectorAll('[data-stagger]');
        
        lists.forEach(list => {
            const items = list.children;
            const delay = parseInt(list.getAttribute('data-stagger')) || 100;
            
            Array.from(items).forEach((item, index) => {
                item.style.animationDelay = `${index * delay}ms`;
                item.classList.add('stagger-item');
            });
        });
    }

    setupPageLoadAnimations() {
        // Hero section entrance
        const heroElements = document.querySelectorAll('.hero [data-entrance]');
        
        heroElements.forEach((element, index) => {
            const delay = index * 200;
            setTimeout(() => {
                element.classList.add('entrance-animate');
            }, delay);
        });
    }

    // Micro-interactions
    setupMicroInteractions() {
        this.setupButtonInteractions();
        this.setupCardInteractions();
        this.setupFormInteractions();
    }

    setupButtonInteractions() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            // Ripple effect
            button.addEventListener('click', (e) => {
                this.createRipple(e, button);
            });

            // Magnetic effect
            button.addEventListener('mousemove', (e) => {
                this.applyMagneticEffect(e, button);
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }

    createRipple(e, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        Object.assign(ripple.style, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            transform: 'scale(0)',
            left: `${x}px`,
            top: `${y}px`,
            pointerEvents: 'none',
            zIndex: '1000'
        });

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        // Animate ripple
        ripple.animate([
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(2)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        }).onfinish = () => {
            ripple.remove();
        };
    }

    applyMagneticEffect(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const strength = 0.2;
        const moveX = x * strength;
        const moveY = y * strength;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }

    setupCardInteractions() {
        const cards = document.querySelectorAll('.project-card, .achievement-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateCardEntry(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateCardExit(card);
            });
        });
    }

    animateCardEntry(card) {
        const elements = card.querySelectorAll('.project-card__title, .project-card__description, .tech-tag');
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
            }, index * 50);
        });
    }

    animateCardExit(card) {
        const elements = card.querySelectorAll('.project-card__title, .project-card__description, .tech-tag');
        
        elements.forEach(element => {
            element.style.transform = 'translateY(5px)';
            element.style.opacity = '0.8';
        });
    }

    setupFormInteractions() {
        const formInputs = document.querySelectorAll('.form-input');
        
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
            
            input.addEventListener('input', () => {
                this.validateInput(input);
            });
        });
    }

    validateInput(input) {
        const value = input.value.trim();
        const type = input.type;
        let isValid = true;

        switch (type) {
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                break;
            case 'text':
                isValid = value.length >= 2;
                break;
            default:
                isValid = value.length > 0;
        }

        // Visual feedback
        if (isValid) {
            input.classList.remove('error');
            input.classList.add('valid');
        } else {
            input.classList.remove('valid');
            input.classList.add('error');
        }
    }
}

// Scroll-triggered Counter Animation
class CounterAnimation {
    constructor() {
        this.counters = [];
        this.init();
    }

    init() {
        this.setupCounters();
    }

    setupCounters() {
        const counterElements = document.querySelectorAll('[data-counter]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        counterElements.forEach(element => {
            observer.observe(element);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-counter'));
        const duration = parseInt(element.getAttribute('data-duration')) || 2000;
        const start = parseInt(element.getAttribute('data-start')) || 0;
        
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (target - start) * easeOutQuart);
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
}

// Progress Bar Animation
class ProgressBarAnimation {
    constructor() {
        this.bars = [];
        this.init();
    }

    init() {
        this.setupProgressBars();
    }

    setupProgressBars() {
        const progressBars = document.querySelectorAll('[data-progress]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateProgressBar(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });

        progressBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    animateProgressBar(bar) {
        const progress = parseInt(bar.getAttribute('data-progress'));
        const duration = 1500;
        const startTime = performance.now();

        const updateProgress = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progressPercent = Math.min(elapsed / duration, 1);
            
            const easeOutCubic = 1 - Math.pow(1 - progressPercent, 3);
            const currentProgress = progress * easeOutCubic;
            
            bar.style.width = `${currentProgress}%`;
            
            if (progressPercent < 1) {
                requestAnimationFrame(updateProgress);
            }
        };
        
        requestAnimationFrame(updateProgress);
    }
}

// Loading Screen Animation
class LoadingScreen {
    constructor() {
        this.loadingElement = null;
        this.init();
    }

    init() {
        this.createLoadingScreen();
        this.startLoading();
    }

    createLoadingScreen() {
        this.loadingElement = document.createElement('div');
        this.loadingElement.className = 'loading-screen';
        
        this.loadingElement.innerHTML = `
            <div class="loading-content">
                <div class="loading-logo">
                    <span class="loading-text">Akshayaa</span>
                </div>
                <div class="loading-bar">
                    <div class="loading-progress"></div>
                </div>
            </div>
        `;

        // Styles
        Object.assign(this.loadingElement.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2d2d2d 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '9999',
            color: 'white'
        });

        document.body.appendChild(this.loadingElement);
    }

    startLoading() {
        const progressBar = this.loadingElement.querySelector('.loading-progress');
        let progress = 0;
        
        const updateProgress = () => {
            progress += Math.random() * 3;
            progressBar.style.width = `${Math.min(progress, 100)}%`;
            
            if (progress < 100) {
                setTimeout(updateProgress, 50);
            } else {
                this.finishLoading();
            }
        };

        updateProgress();
    }

    finishLoading() {
        setTimeout(() => {
            this.loadingElement.style.opacity = '0';
            this.loadingElement.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                if (this.loadingElement.parentNode) {
                    this.loadingElement.parentNode.removeChild(this.loadingElement);
                }
                
                // Trigger page entrance animations
                this.triggerPageEntrance();
            }, 500);
        }, 500);
    }

    triggerPageEntrance() {
        const elements = document.querySelectorAll('.hero__content > *');
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('entrance-animate');
            }, index * 200);
        });
    }
}

// Intersection Observer for various animations
class ScrollTrigger {
    constructor() {
        this.elements = new Map();
        this.init();
    }

    init() {
        this.setupObserver();
        this.registerElements();
    }

    setupObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const callback = this.elements.get(entry.target);
                if (callback && entry.isIntersecting) {
                    callback(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
    }

    registerElements() {
        // Register timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            this.elements.set(item, () => {
                setTimeout(() => {
                    item.classList.add('timeline-reveal');
                }, index * 200);
            });
            this.observer.observe(item);
        });

        // Register skill tags
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach((tag, index) => {
            this.elements.set(tag, () => {
                setTimeout(() => {
                    tag.classList.add('skill-reveal');
                }, index * 50);
            });
            this.observer.observe(tag);
        });

        // Register project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            this.elements.set(card, () => {
                setTimeout(() => {
                    card.classList.add('project-reveal');
                }, index * 150);
            });
            this.observer.observe(card);
        });
    }
}

// Text Animation Effects
class TextEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupTypewriter();
        this.setupTextSplit();
    }

    setupTypewriter() {
        const typewriterElements = document.querySelectorAll('[data-typewriter]');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            const speed = parseInt(element.getAttribute('data-speed')) || 100;
            
            element.textContent = '';
            element.style.borderRight = '2px solid currentColor';
            
            this.typeText(element, text, speed);
        });
    }

    typeText(element, text, speed) {
        let index = 0;
        
        const typeChar = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(typeChar, speed);
            } else {
                // Blinking cursor effect
                setInterval(() => {
                    element.style.borderRight = element.style.borderRight === 'none' ? 
                        '2px solid currentColor' : 'none';
                }, 500);
            }
        };
        
        typeChar();
    }

    setupTextSplit() {
        const splitElements = document.querySelectorAll('[data-split]');
        
        splitElements.forEach(element => {
            this.splitText(element);
        });
    }

    splitText(element) {
        const text = element.textContent;
        const splitType = element.getAttribute('data-split') || 'chars';
        
        let splitArray;
        
        switch (splitType) {
            case 'words':
                splitArray = text.split(' ');
                break;
            case 'lines':
                splitArray = text.split('\n');
                break;
            default: // chars
                splitArray = text.split('');
        }

        element.innerHTML = splitArray
            .map((item, index) => {
                const tag = splitType === 'words' ? 'span' : 'span';
                return `<${tag} class="split-${splitType}" style="animation-delay: ${index * 50}ms">${item === ' ' ? '&nbsp;' : item}</${tag}>`;
            })
            .join('');
    }
}

// Initialize animation system
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize loading screen on first visit
    if (!sessionStorage.getItem('visited')) {
        new LoadingScreen();
        sessionStorage.setItem('visited', 'true');
    }
    
    new AnimationController();
    new CounterAnimation();
    new ProgressBarAnimation();
    new ScrollTrigger();
    new TextEffects();
});

// Add CSS for loading screen
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    .loading-screen {
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .loading-content {
        text-align: center;
    }
    
    .loading-text {
        font-size: 3rem;
        font-weight: 700;
        background: linear-gradient(45deg, #ffffff, #e5e7eb);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: pulse 2s ease-in-out infinite;
    }
    
    .loading-bar {
        width: 200px;
        height: 4px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 2px;
        margin: 2rem auto 0;
        overflow: hidden;
    }
    
    .loading-progress {
        height: 100%;
        background: linear-gradient(90deg, #ffffff, #e5e7eb);
        border-radius: 2px;
        width: 0%;
        transition: width 0.3s ease;
    }
    
    .entrance-animate {
        animation: slideInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .timeline-reveal {
        animation: slideInLeft 0.6s ease-out;
    }
    
    .skill-reveal {
        animation: bounceIn 0.6s ease-out;
    }
    
    .project-reveal {
        animation: slideInUp 0.6s ease-out;
    }
    
    .stagger-item {
        animation: fadeInUp 0.6s ease-out both;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .split-chars,
    .split-words {
        display: inline-block;
        opacity: 0;
        animation: splitReveal 0.6s ease-out both;
    }
    
    @keyframes splitReveal {
        from {
            opacity: 0;
            transform: translateY(20px) rotateX(-90deg);
        }
        to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
        }
    }
`;

document.head.appendChild(loadingStyles);