// Particle System for Hero Section
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.particleCount = this.getParticleCount();
        this.animationId = null;
        
        this.init();
        this.setupResizeHandler();
    }

    getParticleCount() {
        const width = window.innerWidth;
        if (width < 768) return 30;
        if (width < 1024) return 50;
        return 80;
    }

    init() {
        this.createParticles();
        this.animate();
    }

    createParticles() {
        this.container.innerHTML = '';
        this.particles = [];

        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = {
            element: document.createElement('div'),
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.1,
            life: 1,
            decay: Math.random() * 0.005 + 0.001
        };

        // Style the particle
        Object.assign(particle.element.style, {
            position: 'absolute',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `rgba(255, 255, 255, ${particle.opacity})`,
            borderRadius: '50%',
            pointerEvents: 'none',
            transform: `translate(${particle.x}px, ${particle.y}px)`,
            boxShadow: `0 0 ${particle.size * 2}px rgba(255, 255, 255, ${particle.opacity * 0.5})`
        });

        this.container.appendChild(particle.element);
        this.particles.push(particle);
    }

    updateParticle(particle) {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Update life
        particle.life -= particle.decay;

        // Boundary conditions
        if (particle.x < 0 || particle.x > window.innerWidth ||
            particle.y < 0 || particle.y > window.innerHeight ||
            particle.life <= 0) {
            this.resetParticle(particle);
        }

        // Apply transform
        particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
        particle.element.style.opacity = particle.life * particle.opacity;
    }

    resetParticle(particle) {
        particle.x = Math.random() * window.innerWidth;
        particle.y = Math.random() * window.innerHeight;
        particle.vx = (Math.random() - 0.5) * 0.5;
        particle.vy = (Math.random() - 0.5) * 0.5;
        particle.life = 1;
        particle.opacity = Math.random() * 0.5 + 0.1;
    }

    animate() {
        this.particles.forEach(particle => {
            this.updateParticle(particle);
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    setupResizeHandler() {
        const resizeHandler = this.debounce(() => {
            const newParticleCount = this.getParticleCount();
            
            if (newParticleCount !== this.particleCount) {
                this.particleCount = newParticleCount;
                this.createParticles();
            }
        }, 250);

        window.addEventListener('resize', resizeHandler);
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

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.container.innerHTML = '';
        this.particles = [];
    }
}

// Floating Elements Animation
class FloatingElements {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        this.createFloatingElements();
        this.animate();
    }

    createFloatingElements() {
        const containers = document.querySelectorAll('.hero, .about, .projects');
        
        containers.forEach(container => {
            for (let i = 0; i < 5; i++) {
                this.createFloatingElement(container);
            }
        });
    }

    createFloatingElement(container) {
        const element = document.createElement('div');
        const size = Math.random() * 100 + 50;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;

        Object.assign(element.style, {
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
            borderRadius: '50%',
            top: `${y}%`,
            left: `${x}%`,
            pointerEvents: 'none',
            zIndex: '1',
            animation: `float ${duration}s ease-in-out infinite ${delay}s`,
            filter: 'blur(1px)'
        });

        container.style.position = 'relative';
        container.appendChild(element);
        this.elements.push(element);
    }

    animate() {
        this.elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const containerRect = element.parentElement.getBoundingClientRect();
            
            // Add mouse interaction
            document.addEventListener('mousemove', (e) => {
                const mouseX = e.clientX;
                const mouseY = e.clientY;
                const elementCenterX = rect.left + rect.width / 2;
                const elementCenterY = rect.top + rect.height / 2;
                
                const distance = Math.sqrt(
                    Math.pow(mouseX - elementCenterX, 2) + 
                    Math.pow(mouseY - elementCenterY, 2)
                );
                
                if (distance < 200) {
                    const force = (200 - distance) / 200;
                    const angle = Math.atan2(elementCenterY - mouseY, elementCenterX - mouseX);
                    const moveX = Math.cos(angle) * force * 30;
                    const moveY = Math.sin(angle) * force * 30;
                    
                    element.style.transform = `translate(${moveX}px, ${moveY}px)`;
                } else {
                    element.style.transform = 'translate(0, 0)';
                }
            });
        });
    }
}

// Parallax Effect
class ParallaxEffect {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        this.setupParallaxElements();
        this.bindScrollHandler();
    }

    setupParallaxElements() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
            this.elements.push({
                element,
                speed,
                initialTop: element.getBoundingClientRect().top + window.pageYOffset
            });
        });
    }

    bindScrollHandler() {
        const scrollHandler = this.throttle(() => {
            this.updateParallax();
        }, 16);

        window.addEventListener('scroll', scrollHandler);
    }

    updateParallax() {
        const scrollTop = window.pageYOffset;
        
        this.elements.forEach(({ element, speed, initialTop }) => {
            const elementTop = initialTop - scrollTop;
            const yPos = -(scrollTop - initialTop) * speed;
            
            // Only apply parallax if element is visible
            if (elementTop < window.innerHeight && elementTop > -element.offsetHeight) {
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
    }

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
}

// Text Reveal Animation
class TextReveal {
    constructor() {
        this.init();
    }

    init() {
        this.setupTextReveal();
    }

    setupTextReveal() {
        const textElements = document.querySelectorAll('[data-text-reveal]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.revealText(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        textElements.forEach(element => {
            this.prepareTextReveal(element);
            observer.observe(element);
        });
    }

    prepareTextReveal(element) {
        const text = element.textContent;
        const characters = text.split('');
        
        element.innerHTML = characters
            .map(char => `<span class="char" style="opacity: 0; transform: translateY(50px); transition: all 0.5s ease;">${char === ' ' ? '&nbsp;' : char}</span>`)
            .join('');
    }

    revealText(element) {
        const chars = element.querySelectorAll('.char');
        
        chars.forEach((char, index) => {
            setTimeout(() => {
                char.style.opacity = '1';
                char.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }
}

// Magnetic Effect
class MagneticEffect {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        this.setupMagneticElements();
    }

    setupMagneticElements() {
        const magneticElements = document.querySelectorAll('.btn, .social-link, .project-card');
        
        magneticElements.forEach(element => {
            this.bindMagneticEffect(element);
        });
    }

    bindMagneticEffect(element) {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const strength = 0.3;
            const moveX = x * strength;
            const moveY = y * strength;
            
            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    }
}

// Initialize effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system
    const particleContainer = document.querySelector('.hero__particles');
    if (particleContainer) {
        new ParticleSystem(particleContainer);
    }

    // Initialize floating elements
    new FloatingElements();

    // Initialize parallax effect
    new ParallaxEffect();

    // Initialize text reveal
    new TextReveal();

    // Initialize magnetic effect
    new MagneticEffect();
});

// Performance optimization: Reduce particles on mobile
const mediaQuery = window.matchMedia('(max-width: 768px)');
const handleMediaQuery = (e) => {
    const particleContainer = document.querySelector('.hero__particles');
    if (particleContainer) {
        // Reduce particle count on mobile for better performance
        if (e.matches) {
            particleContainer.style.opacity = '0.5';
        } else {
            particleContainer.style.opacity = '1';
        }
    }
};

mediaQuery.addListener(handleMediaQuery);
handleMediaQuery(mediaQuery);