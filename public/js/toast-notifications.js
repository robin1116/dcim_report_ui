/**
 * Toast Notification System
 */
window.ToastNotifications = {
    container: null,
    toastCount: 0,

    init() {
        // Create container if it doesn't exist
        if (!document.getElementById('toast-container')) {
            const container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
            container.style.zIndex = '1055';
            document.body.appendChild(container);
        }
        this.container = document.getElementById('toast-container');
    },

    show(message, type = 'info', duration = 5000) {
        this.init();
        
        const toastId = 'toast-' + (++this.toastCount);
        const toast = this.createToast(toastId, message, type);
        
        this.container.appendChild(toast);
        
        // Initialize Bootstrap toast
        const bsToast = new bootstrap.Toast(toast, {
            autohide: duration > 0,
            delay: duration
        });
        
        // Add entrance animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Show toast
        bsToast.show();
        
        // Remove from DOM after hide
        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
        });
        
        return bsToast;
    },

    createToast(id, message, type) {
        const toast = document.createElement('div');
        toast.id = id;
        toast.className = `toast modern-toast toast-${type}`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');

        const config = this.getTypeConfig(type);
        
        toast.innerHTML = `
            <div class="toast-header">
                <div class="toast-icon">
                    <i class="${config.icon}"></i>
                </div>
                <strong class="me-auto toast-title">${config.title}</strong>
                <button type="button" class="btn-close btn-close-modern" data-bs-dismiss="toast" aria-label="Close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="toast-body">
                ${this.escapeHtml(message)}
            </div>
        `;

        return toast;
    },

    getTypeConfig(type) {
        const configs = {
            success: {
                title: '성공',
                icon: 'fas fa-check-circle'
            },
            error: {
                title: '오류',
                icon: 'fas fa-exclamation-circle'
            },
            warning: {
                title: '경고',
                icon: 'fas fa-exclamation-triangle'
            },
            info: {
                title: '정보',
                icon: 'fas fa-info-circle'
            }
        };

        return configs[type] || configs.info;
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    // Convenience methods
    success(message, duration = 5000) {
        return this.show(message, 'success', duration);
    },

    error(message, duration = 7000) {
        return this.show(message, 'error', duration);
    },

    warning(message, duration = 6000) {
        return this.show(message, 'warning', duration);
    },

    info(message, duration = 5000) {
        return this.show(message, 'info', duration);
    },

    // Show persistent toast (doesn't auto-hide)
    persistent(message, type = 'info') {
        return this.show(message, type, 0);
    }
};

// Add toast styles
const toastStyles = `
<style>
.modern-toast {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    box-shadow: 0 8px 32px var(--shadow-medium);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    margin-bottom: 1rem;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s ease;
    max-width: 350px;
    min-width: 300px;
}

.modern-toast.show {
    opacity: 1;
    transform: translateX(0);
}

.modern-toast .toast-header {
    background: transparent;
    border-bottom: 1px solid var(--border-color);
    padding: 1rem 1rem 0.75rem;
    border-radius: 12px 12px 0 0;
}

.modern-toast .toast-body {
    padding: 0.75rem 1rem 1rem;
    color: var(--text-primary);
    line-height: 1.5;
}

.toast-icon {
    width: 24px;
    height: 24px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.75rem;
    font-size: 0.9rem;
}

.toast-success .toast-icon {
    background: rgba(25, 135, 84, 0.1);
    color: var(--success-color);
}

.toast-error .toast-icon {
    background: rgba(220, 53, 69, 0.1);
    color: var(--danger-color);
}

.toast-warning .toast-icon {
    background: rgba(255, 193, 7, 0.1);
    color: var(--warning-color);
}

.toast-info .toast-icon {
    background: rgba(13, 202, 240, 0.1);
    color: var(--info-color);
}

.toast-title {
    font-weight: 600;
    color: var(--text-primary);
    font-size: 0.9rem;
}

.btn-close-modern {
    background: none;
    border: none;
    color: var(--text-muted);
    padding: 0.25rem;
    border-radius: 4px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
}

.btn-close-modern:hover {
    background: var(--bg-secondary);
    color: var(--text-primary);
}

.btn-close-modern i {
    font-size: 0.75rem;
}

/* Toast border colors */
.toast-success {
    border-left: 4px solid var(--success-color);
}

.toast-error {
    border-left: 4px solid var(--danger-color);
}

.toast-warning {
    border-left: 4px solid var(--warning-color);
}

.toast-info {
    border-left: 4px solid var(--info-color);
}

/* Animation for mobile */
@media (max-width: 576px) {
    .modern-toast {
        min-width: 280px;
        max-width: calc(100vw - 2rem);
    }
}
</style>
`;

// Inject styles
if (!document.getElementById('toast-styles')) {
    const styleSheet = document.createElement('div');
    styleSheet.id = 'toast-styles';
    styleSheet.innerHTML = toastStyles;
    document.head.appendChild(styleSheet);
}
