/**
 * GameHub Main JavaScript File
 * Handles all interactive functionality for the website
 */

class GameHub {
    constructor() {
        this.init();
        this.bindEvents();
        this.setupAnimations();
    }

    init() {
        // Initialize mobile menu
        this.mobileMenuToggle = document.getElementById('menuToggle');
        this.mobileMenu = document.querySelector('.main-nav');
        
        // Initialize filter functionality
        this.filterTabs = document.querySelectorAll('.tab-btn');
        this.newsCards = document.querySelectorAll('.news-card');
        
        // Initialize search functionality
        this.searchInput = document.querySelector('.search-box input');
        this.searchButton = document.querySelector('.search-box button');
        
        // Initialize load more functionality
        this.loadMoreBtn = document.querySelector('.load-more-btn');
        
        // Track current page for infinite scroll
        this.currentPage = 1;
        this.isLoading = false;
        
        // Initialize intersection observer for animations
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            { threshold: 0.1 }
        );
        
        // Setup region selector
        this.regionSelector = document.getElementById('region');
        
        // Initialize video players
        this.setupVideoPlayers();
        
        // Setup smooth scrolling
        this.setupSmoothScrolling();
        
        // Setup keyboard navigation
        this.setupKeyboardNavigation();
        
        console.log('GameHub initialized successfully');
    }

    bindEvents() {
        // Mobile menu toggle
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
        }

        // Filter tabs
        this.filterTabs.forEach(tab => {
            tab.addEventListener('click', this.handleFilterClick.bind(this));
        });

        // Search functionality
        if (this.searchInput) {
            this.searchInput.addEventListener('input', this.debounce(this.handleSearch.bind(this), 300));
            this.searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.performSearch();
                }
            });
        }

        if (this.searchButton) {
            this.searchButton.addEventListener('click', this.performSearch.bind(this));
        }

        // Load more button
        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', this.loadMoreContent.bind(this));
        }

        // Region selector
        if (this.regionSelector) {
            this.regionSelector.addEventListener('change', this.handleRegionChange.bind(this));
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.mobileMenuToggle?.contains(e.target) && 
                !this.mobileMenu?.contains(e.target) && 
                this.mobileMenu?.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });

        // Handle window resize
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));

        // Handle scroll for infinite loading
        window.addEventListener('scroll', this.debounce(this.handleScroll.bind(this), 100));

        // Card click handlers
        this.setupCardClickHandlers();

        // Social media sharing
        this.setupSocialSharing();
    }

    toggleMobileMenu() {
        if (this.mobileMenu) {
            this.mobileMenu.classList.toggle('active');
            this.mobileMenuToggle.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = this.mobileMenuToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                span.style.transform = this.mobileMenu.classList.contains('active') 
                    ? this.getMenuAnimation(index) 
                    : 'none';
            });

            // Prevent body scroll when menu is open
            document.body.style.overflow = this.mobileMenu.classList.contains('active') ? 'hidden' : '';
        }
    }

    closeMobileMenu() {
        if (this.mobileMenu?.classList.contains('active')) {
            this.mobileMenu.classList.remove('active');
            this.mobileMenuToggle?.classList.remove('active');
            
            const spans = this.mobileMenuToggle?.querySelectorAll('span');
            spans?.forEach(span => {
                span.style.transform = 'none';
            });

            document.body.style.overflow = '';
        }
    }

    getMenuAnimation(index) {
        const animations = [
            'rotate(45deg) translate(5px, 5px)',
            'opacity: 0',
            'rotate(-45deg) translate(7px, -6px)'
        ];
        return animations[index] || 'none';
    }

    handleFilterClick(e) {
        const clickedTab = e.target;
        const filter = clickedTab.dataset.filter;

        // Update active tab
        this.filterTabs.forEach(tab => tab.classList.remove('active'));
        clickedTab.classList.add('active');

        // Filter news cards
        this.filterNewsCards(filter);
    }

    filterNewsCards(filter) {
        this.newsCards.forEach(card => {
            const category = card.dataset.category;
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    }

    handleSearch(e) {
        const query = e.target.value.toLowerCase();
        
        if (query.length > 2) {
            this.showSearchSuggestions(query);
        } else {
            this.hideSearchSuggestions();
        }
    }

    performSearch() {
        const query = this.searchInput?.value.trim();
        
        if (query) {
            // Show loading state
            this.searchButton.innerHTML = '<div class="loading"></div>';
            
            // Simulate search API call
            setTimeout(() => {
                this.displaySearchResults(query);
                this.searchButton.innerHTML = '<i class="fas fa-search"></i>';
            }, 1000);
        }
    }

    showSearchSuggestions(query) {
        // Create suggestions dropdown if it doesn't exist
        let suggestionsBox = document.querySelector('.search-suggestions');
        
        if (!suggestionsBox) {
            suggestionsBox = document.createElement('div');
            suggestionsBox.className = 'search-suggestions';
            this.searchInput.parentNode.appendChild(suggestionsBox);
        }

        // Mock suggestions based on query
        const suggestions = this.generateSuggestions(query);
        
        suggestionsBox.innerHTML = suggestions.map(suggestion => 
            `<div class="suggestion-item" data-query="${suggestion}">
                <i class="fas fa-search"></i>
                <span>${suggestion}</span>
            </div>`
        ).join('');

        suggestionsBox.style.display = 'block';

        // Add click handlers for suggestions
        suggestionsBox.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                this.searchInput.value = item.dataset.query;
                this.performSearch();
                this.hideSearchSuggestions();
            });
        });
    }

    hideSearchSuggestions() {
        const suggestionsBox = document.querySelector('.search-suggestions');
        if (suggestionsBox) {
            suggestionsBox.style.display = 'none';
        }
    }

    generateSuggestions(query) {
        const allSuggestions = [
            'Stellar Odyssey 2 review',
            'PlayStation 5 games',
            'Xbox Series X news',
            'Nintendo Switch releases',
            'PC gaming hardware',
            'Mobile games 2025',
            'Esports tournaments',
            'Gaming news today',
            'Movie reviews',
            'TV show previews'
        ];

        return allSuggestions
            .filter(suggestion => suggestion.toLowerCase().includes(query))
            .slice(0, 5);
    }

    displaySearchResults(query) {
        // In a real application, this would make an API call
        console.log(`Searching for: ${query}`);
        
        // Show toast notification
        this.showToast(`Searching for "${query}"...`);
    }

    loadMoreContent() {
        if (this.isLoading) return;

        this.isLoading = true;
        this.loadMoreBtn.innerHTML = '<div class="loading"></div> Loading...';

        // Simulate API call
        setTimeout(() => {
            this.appendNewContent();
            this.isLoading = false;
            this.loadMoreBtn.innerHTML = 'Load More Stories';
            this.currentPage++;
        }, 1500);
    }

    appendNewContent() {
        const newsGrid = document.querySelector('.news-grid');
        const newItems = this.generateMockNewsItems();

        newItems.forEach(item => {
            const newsCard = this.createNewsCard(item);
            newsGrid.appendChild(newsCard);
            this.observer.observe(newsCard);
        });
    }

    generateMockNewsItems() {
        const mockItems = [
            {
                category: 'gaming',
                title: 'New RPG Takes Fantasy Gaming to the Next Level',
                excerpt: 'Revolutionary mechanics and stunning visuals make this a must-play.',
                author: 'Gaming Team',
                time: '2 hours ago',
                comments: '142',
                image: 'assets/images/news-mock-1.jpg'
            },
            {
                category: 'tech',
                title: 'Revolutionary VR Headset Announced at Tech Conference',
                excerpt: 'Next-generation VR technology promises unprecedented immersion.',
                author: 'Tech Reporter',
                time: '3 hours ago',
                comments: '89',
                image: 'assets/images/news-mock-2.jpg'
            }
        ];

        return mockItems;
    }

    createNewsCard(item) {
        const card = document.createElement('article');
        card.className = 'news-card fade-in';
        card.dataset.category = item.category;
        
        card.innerHTML = `
            <div class="news-image">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
            </div>
            <div class="news-content">
                <span class="category">${item.category}</span>
                <h3>${item.title}</h3>
                <p>${item.excerpt}</p>
                <div class="news-meta">
                    <span class="author">By ${item.author}</span>
                    <span class="time">${item.time}</span>
                    <span class="comments">${item.comments} comments</span>
                </div>
            </div>
        `;

        return card;
    }

    handleRegionChange(e) {
        const selectedRegion = e.target.value;
        
        // Show loading toast
        this.showToast(`Switching to ${selectedRegion} region...`);
        
        // In a real application, this would reload content for the selected region
        setTimeout(() => {
            this.showToast(`Content updated for ${selectedRegion}`, 'success');
        }, 1000);
    }

    setupAnimations() {
        // Observe elements for scroll-triggered animations
        const animatedElements = document.querySelectorAll('.news-card, .review-card, .video-card, .sidebar-widget');
        
        animatedElements.forEach(element => {
            this.observer.observe(element);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                this.observer.unobserve(entry.target);
            }
        });
    }

    setupVideoPlayers() {
        const videoCards = document.querySelectorAll('.video-card');
        
        videoCards.forEach(card => {
            const playButton = card.querySelector('.play-overlay');
            
            if (playButton) {
                playButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.playVideo(card);
                });
            }
        });
    }

    playVideo(videoCard) {
        // In a real application, this would open a video player modal
        const title = videoCard.querySelector('h3').textContent;
        this.showToast(`Playing: ${title}`, 'info');
        
        // Simulate video playing
        console.log('Playing video:', title);
    }

    setupCardClickHandlers() {
        const allCards = document.querySelectorAll('.news-card, .review-card, .video-card');
        
        allCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Don't trigger if clicking on a button or link
                if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('button, a')) {
                    return;
                }
                
                this.openCardDetails(card);
            });
        });
    }

    openCardDetails(card) {
        const title = card.querySelector('h3').textContent;
        this.showToast(`Opening: ${title}`, 'info');
        
        // In a real application, this would navigate to the full article/review/video
        console.log('Opening card:', title);
    }

    setupSocialSharing() {
        const socialLinks = document.querySelectorAll('.social-link, .footer-social a');
        
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const platform = this.getSocialPlatform(link);
                this.shareContent(platform);
            });
        });
    }

    getSocialPlatform(link) {
        const href = link.href || '';
        const classes = link.className || '';
        
        if (href.includes('twitter') || classes.includes('twitter')) return 'Twitter';
        if (href.includes('facebook') || classes.includes('facebook')) return 'Facebook';
        if (href.includes('instagram') || classes.includes('instagram')) return 'Instagram';
        if (href.includes('youtube') || classes.includes('youtube')) return 'YouTube';
        if (href.includes('twitch') || classes.includes('twitch')) return 'Twitch';
        
        return 'Social Media';
    }

    shareContent(platform) {
        this.showToast(`Opening ${platform}...`, 'info');
        
        // In a real application, this would open the actual social media links
        console.log(`Sharing on ${platform}`);
    }

    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Escape key to close mobile menu
            if (e.key === 'Escape' && this.mobileMenu?.classList.contains('active')) {
                this.closeMobileMenu();
            }
            
            // Ctrl/Cmd + K to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.searchInput?.focus();
            }
        });
    }

    handleResize() {
        // Close mobile menu on desktop
        if (window.innerWidth > 768 && this.mobileMenu?.classList.contains('active')) {
            this.closeMobileMenu();
        }
    }

    handleScroll() {
        // Infinite scroll implementation
        if (this.shouldLoadMore()) {
            this.loadMoreContent();
        }
        
        // Update header on scroll
        this.updateHeaderOnScroll();
    }

    shouldLoadMore() {
        if (this.isLoading) return false;
        
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        
        return scrollTop + clientHeight >= scrollHeight - 1000;
    }

    updateHeaderOnScroll() {
        const header = document.querySelector('.header');
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    showToast(message, type = 'info') {
        // Remove existing toasts
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Create new toast
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${this.getToastIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(toast);

        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);

        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    getToastIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || icons.info;
    }

    // Utility function for debouncing
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

    // Utility function for throttling
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Dark mode toggle functionality
class DarkModeToggle {
    constructor() {
        this.isDark = this.getStoredTheme() === 'dark' || 
                     (!this.getStoredTheme() && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        this.init();
    }

    init() {
        this.applyTheme();
        this.createToggleButton();
        this.bindEvents();
    }

    createToggleButton() {
        const toggle = document.createElement('button');
        toggle.className = 'dark-mode-toggle';
        toggle.innerHTML = `<i class="fas fa-${this.isDark ? 'sun' : 'moon'}"></i>`;
        toggle.setAttribute('aria-label', 'Toggle dark mode');
        
        const headerActions = document.querySelector('.header-actions');
        headerActions?.insertBefore(toggle, headerActions.firstChild);
        
        this.toggleButton = toggle;
    }

    bindEvents() {
        this.toggleButton?.addEventListener('click', this.toggle.bind(this));
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!this.getStoredTheme()) {
                this.isDark = e.matches;
                this.applyTheme();
                this.updateButton();
            }
        });
    }

    toggle() {
        this.isDark = !this.isDark;
        this.applyTheme();
        this.updateButton();
        this.storeTheme();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
    }

    updateButton() {
        if (this.toggleButton) {
            this.toggleButton.innerHTML = `<i class="fas fa-${this.isDark ? 'sun' : 'moon'}"></i>`;
        }
    }

    storeTheme() {
        localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    }

    getStoredTheme() {
        return localStorage.getItem('theme');
    }
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }

    init() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            this.measurePageLoad();
        });

        // Monitor Core Web Vitals
        this.measureCoreWebVitals();
    }

    measurePageLoad() {
        const navigation = performance.getEntriesByType('navigation')[0];
        
        this.metrics.pageLoad = {
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
            totalTime: navigation.loadEventEnd - navigation.fetchStart
        };

        console.log('Page Load Metrics:', this.metrics.pageLoad);
    }

    measureCoreWebVitals() {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            this.metrics.lcp = lastEntry.startTime;
            console.log('LCP:', this.metrics.lcp);
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
                this.metrics.fid = entry.processingStart - entry.startTime;
                console.log('FID:', this.metrics.fid);
            });
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            });
            this.metrics.cls = clsValue;
            console.log('CLS:', this.metrics.cls);
        }).observe({ entryTypes: ['layout-shift'] });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main GameHub functionality
    window.gameHub = new GameHub();
    
    // Initialize dark mode toggle
    window.darkModeToggle = new DarkModeToggle();
    
    // Initialize performance monitoring
    window.performanceMonitor = new PerformanceMonitor();
    
    console.log('All GameHub modules initialized successfully');
});

// Add CSS for dynamic elements
const dynamicStyles = `
.toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 16px 20px;
    background: #333;
    color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    transform: translateY(100px);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 10000;
    max-width: 400px;
}

.toast.show {
    transform: translateY(0);
    opacity: 1;
}

.toast-content {
    display: flex;
    align-items: center;
    gap: 10px;
}

.toast-success { background: #10b981; }
.toast-error { background: #ef4444; }
.toast-warning { background: #f59e0b; }
.toast-info { background: #3b82f6; }

.search-suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    border: 1px solid #e5e5e5;
    z-index: 1000;
    display: none;
}

.suggestion-item {
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.suggestion-item:hover {
    background: #f5f5f5;
}

.suggestion-item:first-child {
    border-radius: 8px 8px 0 0;
}

.suggestion-item:last-child {
    border-radius: 0 0 8px 8px;
}

.dark-mode-toggle {
    background: none;
    border: none;
    color: #333;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    transition: all 0.3s;
}

.dark-mode-toggle:hover {
    background: #f5f5f5;
}

.header.scrolled {
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
    .toast {
        bottom: 10px;
        right: 10px;
        left: 10px;
        max-width: none;
    }
}
`;

// Inject dynamic styles
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);