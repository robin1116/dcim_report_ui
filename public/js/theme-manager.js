/**
 * Theme Manager - Handles dark/light theme switching
 */
class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.themeKey = 'dcim-admin-theme';
        this.toggleBtn = null;
    }

    init() {
        this.loadSavedTheme();
        this.setupToggleButton();
        this.applyTheme();
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem(this.themeKey);
        if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
            this.currentTheme = savedTheme;
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.currentTheme = prefersDark ? 'dark' : 'light';
        }
    }

    setupToggleButton() {
        this.toggleBtn = document.getElementById('themeToggle');
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        this.saveTheme();
        this.animateToggle();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateToggleIcon();
        
        // Dispatch theme change event
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: this.currentTheme }
        }));
    }

    updateToggleIcon() {
        if (this.toggleBtn) {
            const icon = this.toggleBtn.querySelector('i');
            if (icon) {
                icon.className = this.currentTheme === 'light' 
                    ? 'fas fa-moon' 
                    : 'fas fa-sun';
            }
        }
    }

    animateToggle() {
        if (this.toggleBtn) {
            this.toggleBtn.style.transform = 'scale(0.8) rotate(180deg)';
            setTimeout(() => {
                this.toggleBtn.style.transform = 'scale(1) rotate(0deg)';
            }, 150);
        }
    }

    saveTheme() {
        localStorage.setItem(this.themeKey, this.currentTheme);
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    isDarkMode() {
        return this.currentTheme === 'dark';
    }

    // Listen for system theme changes
    watchSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem(this.themeKey)) {
                this.currentTheme = e.matches ? 'dark' : 'light';
                this.applyTheme();
            }
        });
    }
}

// Create global instance
window.ThemeManager = new ThemeManager();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.ThemeManager.init();
        window.ThemeManager.watchSystemTheme();
    });
} else {
    window.ThemeManager.init();
    window.ThemeManager.watchSystemTheme();
}
