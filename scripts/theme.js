// Theme Management
class ThemeManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.loadSavedTheme();
        this.watchSystemTheme();
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle.querySelector('.theme-toggle__icon');

        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Update icon based on current theme
        this.updateThemeIcon();
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        this.setTheme(newTheme);
        this.saveTheme(newTheme);
        this.updateThemeIcon();
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            const meta = document.createElement('meta');
            meta.name = 'theme-color';
            document.head.appendChild(meta);
        }
        
        const themeColor = theme === 'dark' ? '#111827' : '#f8f9fa';
        document.querySelector('meta[name="theme-color"]').setAttribute('content', themeColor);
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('themechange', { 
            detail: { theme } 
        }));
    }

    updateThemeIcon() {
        const themeIcon = document.querySelector('.theme-toggle__icon');
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (themeIcon) {
            themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
        }
    }

    saveTheme(theme) {
        try {
            localStorage.setItem('portfolio-theme', theme);
        } catch (e) {
            console.warn('Unable to save theme preference:', e);
        }
    }

    loadSavedTheme() {
        try {
            const savedTheme = localStorage.getItem('portfolio-theme');
            if (savedTheme) {
                this.setTheme(savedTheme);
                return;
            }
        } catch (e) {
            console.warn('Unable to load theme preference:', e);
        }

        // Default to system preference
        this.setTheme(this.getSystemTheme());
    }

    getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    watchSystemTheme() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            mediaQuery.addEventListener('change', (e) => {
                // Only update if user hasn't manually set a preference
                if (!localStorage.getItem('portfolio-theme')) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                    this.updateThemeIcon();
                }
            });
        }
    }
}

// Enhanced theme transitions
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    
    // Add smooth transition class after page load
    setTimeout(() => {
        document.body.classList.add('theme-transitions');
    }, 100);
});

// Listen for theme changes to update specific elements
window.addEventListener('themechange', (e) => {
    const { theme } = e.detail;
    
    // Update header background based on theme
    const header = document.querySelector('.header');
    if (header) {
        if (theme === 'dark') {
            header.style.background = 'rgba(17, 24, 39, 0.8)';
        } else {
            header.style.background = 'rgba(248, 249, 250, 0.8)';
        }
    }
    
    // Update any other theme-specific elements
    updateCodeBlocks(theme);
    updateCharts(theme);
});

function updateCodeBlocks(theme) {
    const codeBlocks = document.querySelectorAll('pre, code');
    codeBlocks.forEach(block => {
        if (theme === 'dark') {
            block.style.background = '#1f2937';
            block.style.color = '#f9fafb';
        } else {
            block.style.background = '#f3f4f6';
            block.style.color = '#111827';
        }
    });
}

function updateCharts(theme) {
    // Update any charts or graphs based on theme
    const charts = document.querySelectorAll('.chart, .graph');
    charts.forEach(chart => {
        // Update chart colors based on theme
        chart.setAttribute('data-theme', theme);
    });
}

// CSS for theme transitions
const style = document.createElement('style');
style.textContent = `
    .theme-transitions * {
        transition: background-color 0.3s ease, 
                   color 0.3s ease, 
                   border-color 0.3s ease,
                   box-shadow 0.3s ease !important;
    }
    
    .theme-transitions *:before,
    .theme-transitions *:after {
        transition: background-color 0.3s ease, 
                   color 0.3s ease, 
                   border-color 0.3s ease,
                   box-shadow 0.3s ease !important;
    }
`;
document.head.appendChild(style);