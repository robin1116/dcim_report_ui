/**
 * Common Admin Functions and Utilities
 */

// Global admin utilities
window.AdminUtils = {
    
    // API Base URL - in production this would be your Spring Boot backend
    apiBaseUrl: '/api',
    
    // Make API requests with error handling
    async apiRequest(endpoint, options = {}) {
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        };
        
        const finalOptions = { ...defaultOptions, ...options };
        
        try {
            const response = await fetch(`${this.apiBaseUrl}${endpoint}`, finalOptions);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API Request failed:', error);
            window.ToastNotifications?.show(`API 요청 실패: ${error.message}`, 'error');
            throw error;
        }
    },
    
    // Format date for display
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    },
    
    // Format datetime for display
    formatDateTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    },
    
    // Debounce function for search inputs
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
    },
    
    // Show loading state
    showLoading(element) {
        const loadingHtml = `
            <div class="loading-overlay">
                <div class="loading-spinner"></div>
            </div>
        `;
        $(element).css('position', 'relative').append(loadingHtml);
    },
    
    // Hide loading state
    hideLoading(element) {
        $(element).find('.loading-overlay').remove();
    },
    
    // Validate email format
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    // Validate phone format (Korean)
    isValidPhone(phone) {
        const phoneRegex = /^(\+82|0)(2|10|11|15|16|17|18|19|31|32|33|41|42|43|44|51|52|53|54|55|61|62|63|64)\d{7,8}$/;
        return phoneRegex.test(phone.replace(/[\s-]/g, ''));
    },
    
    // Copy to clipboard
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            window.ToastNotifications?.show('클립보드에 복사되었습니다.', 'success');
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            window.ToastNotifications?.show('클립보드 복사에 실패했습니다.', 'error');
        }
    },
    
    // Generate random ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    
    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },
    
    // Confirm dialog with modern styling
    async confirm(message, title = '확인') {
        return new Promise((resolve) => {
            const modalId = 'confirmModal' + this.generateId();
            const modalHtml = `
                <div class="modal fade" id="${modalId}" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content modern-card">
                            <div class="modal-header">
                                <h5 class="modal-title">${title}</h5>
                            </div>
                            <div class="modal-body">
                                <p class="mb-0">${this.escapeHtml(message)}</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary-modern" data-bs-dismiss="modal">취소</button>
                                <button type="button" class="btn btn-primary-modern confirm-yes">확인</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            $('body').append(modalHtml);
            const modal = new bootstrap.Modal(document.getElementById(modalId));
            
            $(`#${modalId} .confirm-yes`).click(() => {
                resolve(true);
                modal.hide();
            });
            
            $(`#${modalId}`).on('hidden.bs.modal', () => {
                $(`#${modalId}`).remove();
                resolve(false);
            });
            
            modal.show();
        });
    }
};

// Sidebar management
window.SidebarManager = {
    isCollapsed: false,
    
    init() {
        this.setupToggle();
        this.setupMobileOverlay();
        this.setupResponsive();
    },
    
    setupToggle() {
        $(document).on('click', '.sidebar-toggle', () => {
            this.toggle();
        });
    },
    
    toggle() {
        const sidebar = $('.sidebar');
        const mainContent = $('.main-content');
        
        this.isCollapsed = !this.isCollapsed;
        
        if (this.isCollapsed) {
            sidebar.addClass('collapsed');
            mainContent.addClass('expanded');
        } else {
            sidebar.removeClass('collapsed');
            mainContent.removeClass('expanded');
        }
        
        localStorage.setItem('sidebar-collapsed', this.isCollapsed);
    },
    
    setupMobileOverlay() {
        // Add overlay for mobile
        if (window.innerWidth <= 992) {
            $('body').append('<div class="sidebar-overlay"></div>');
            
            $(document).on('click', '.sidebar-overlay', () => {
                $('.sidebar').removeClass('show');
                $('.sidebar-overlay').removeClass('show');
            });
        }
    },
    
    setupResponsive() {
        // Load saved state
        const savedState = localStorage.getItem('sidebar-collapsed');
        if (savedState === 'true' && window.innerWidth > 992) {
            this.isCollapsed = true;
            $('.sidebar').addClass('collapsed');
            $('.main-content').addClass('expanded');
        }
        
        // Handle window resize
        $(window).on('resize', () => {
            if (window.innerWidth <= 992) {
                $('.sidebar').removeClass('collapsed');
                $('.main-content').removeClass('expanded');
            } else if (this.isCollapsed) {
                $('.sidebar').addClass('collapsed');
                $('.main-content').addClass('expanded');
            }
        });
    }
};

// DataTable default configuration
window.DataTableDefaults = {
    language: {
        "decimal": "",
        "emptyTable": "데이터가 없습니다",
        "info": "_START_ - _END_ / _TOTAL_",
        "infoEmpty": "0 - 0 / 0",
        "infoFiltered": "(전체 _MAX_건 중 검색결과)",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "_MENU_ 개씩 보기",
        "loadingRecords": "로딩 중...",
        "processing": "처리 중...",
        "search": "검색:",
        "zeroRecords": "검색 결과가 없습니다",
        "paginate": {
            "first": "첫 페이지",
            "last": "마지막 페이지",
            "next": "다음",
            "previous": "이전"
        }
    },
    pageLength: 10,
    lengthMenu: [[10, 25, 50, 100], [10, 25, 50, 100]],
    order: [],
    columnDefs: [
        { orderable: false, targets: -1 } // Disable sorting on last column (usually actions)
    ],
    dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>' +
         '<"row"<"col-sm-12"tr>>' +
         '<"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>',
    responsive: true,
    autoWidth: false
};

// Initialize when document is ready
$(document).ready(function() {
    // Initialize sidebar
    window.SidebarManager.init();
    
    // Set active navigation item based on current page
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    $(`.nav-link[href*="${currentPage}"]`).addClass('active');
    
    // Initialize tooltips
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    // Add smooth scrolling to anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 500);
        }
    });
    
    // Auto-hide alerts after 5 seconds
    $('.alert[data-auto-dismiss]').each(function() {
        const alert = this;
        setTimeout(() => {
            $(alert).fadeOut();
        }, 5000);
    });
});
