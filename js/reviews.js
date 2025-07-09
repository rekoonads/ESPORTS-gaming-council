/**
 * Reviews Page JavaScript
 * Handles filtering, sorting, and dynamic content for the reviews page
 */

class ReviewsPage {
    constructor() {
        this.reviews = [];
        this.filteredReviews = [];
        this.currentPage = 1;
        this.reviewsPerPage = 12;
        this.currentView = 'grid';
        
        this.init();
        this.bindEvents();
        this.loadReviews();
    }

    init() {
        // Get DOM elements
        this.reviewsGrid = document.getElementById('reviewsGrid');
        this.loadMoreBtn = document.getElementById('loadMoreReviews');
        this.categoryFilter = document.getElementById('categoryFilter');
        this.platformFilter = document.getElementById('platformFilter');
        this.scoreFilter = document.getElementById('scoreFilter');
        this.sortBy = document.getElementById('sortBy');
        this.viewBtns = document.querySelectorAll('.view-btn');
    }

    bindEvents() {
        // Filter and sort event listeners
        if (this.categoryFilter) {
            this.categoryFilter.addEventListener('change', this.applyFilters.bind(this));
        }
        
        if (this.platformFilter) {
            this.platformFilter.addEventListener('change', this.applyFilters.bind(this));
        }
        
        if (this.scoreFilter) {
            this.scoreFilter.addEventListener('change', this.applyFilters.bind(this));
        }
        
        if (this.sortBy) {
            this.sortBy.addEventListener('change', this.applySorting.bind(this));
        }

        // View switching
        this.viewBtns.forEach(btn => {
            btn.addEventListener('click', this.switchView.bind(this));
        });

        // Load more button
        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', this.loadMoreReviews.bind(this));
        }
    }

    loadReviews() {
        // Mock review data - in a real app, this would come from an API
        this.reviews = [
            {
                id: 1,
                title: "Cyberpunk Adventure: Neon Dreams",
                category: "games",
                platforms: ["pc", "ps5", "xbox"],
                score: 9.2,
                image: "assets/images/review-1.jpg",
                excerpt: "A masterpiece of storytelling and visual design that sets new standards for the genre.",
                author: "John Davis",
                date: "2025-01-07",
                readTime: "8 min read"
            },
            {
                id: 2,
                title: "Fantasy Quest: Realm of Legends",
                category: "games",
                platforms: ["pc", "switch"],
                score: 8.7,
                image: "assets/images/review-2.jpg",
                excerpt: "An epic adventure that delivers solid gameplay despite some technical issues.",
                author: "Emma Wilson",
                date: "2025-01-06",
                readTime: "12 min read"
            },
            {
                id: 3,
                title: "Galactic Warriors: The Movie",
                category: "movies",
                platforms: ["theaters", "streaming"],
                score: 7.8,
                image: "assets/images/review-3.jpg",
                excerpt: "A visually stunning adaptation that stays true to the beloved game series.",
                author: "Robert Kim",
                date: "2025-01-05",
                readTime: "6 min read"
            },
            {
                id: 4,
                title: "Space Explorer: Genesis",
                category: "games",
                platforms: ["pc", "ps5", "xbox"],
                score: 9.0,
                image: "assets/images/upcoming-1.jpg",
                excerpt: "Revolutionary space exploration mechanics that redefine the genre.",
                author: "Sarah Chen",
                date: "2025-01-04",
                readTime: "10 min read"
            },
            {
                id: 5,
                title: "Medieval Kingdoms: War",
                category: "games",
                platforms: ["pc", "switch"],
                score: 8.3,
                image: "assets/images/upcoming-2.jpg",
                excerpt: "Strategic warfare meets compelling storytelling in this medieval epic.",
                author: "Mike Rodriguez",
                date: "2025-01-03",
                readTime: "9 min read"
            },
            {
                id: 6,
                title: "Tech Titans: The Rise of AI",
                category: "tech",
                platforms: ["documentary"],
                score: 8.9,
                image: "assets/images/news-2.jpg",
                excerpt: "An insightful look into the future of artificial intelligence and its impact.",
                author: "Lisa Park",
                date: "2025-01-02",
                readTime: "7 min read"
            },
            {
                id: 7,
                title: "Next-Gen Console Showdown",
                category: "tech",
                platforms: ["ps5", "xbox"],
                score: 9.1,
                image: "assets/images/news-1.jpg",
                excerpt: "Comprehensive comparison of the latest gaming consoles and their capabilities.",
                author: "Alex Chen",
                date: "2025-01-01",
                readTime: "15 min read"
            },
            {
                id: 8,
                title: "Superhero Chronicles: Season 3",
                category: "tv",
                platforms: ["streaming"],
                score: 8.5,
                image: "assets/images/news-3.jpg",
                excerpt: "The third season delivers epic storylines and character development.",
                author: "Emma Wilson",
                date: "2024-12-30",
                readTime: "11 min read"
            }
        ];

        this.filteredReviews = [...this.reviews];
        this.renderReviews();
    }

    applyFilters() {
        const categoryValue = this.categoryFilter?.value || 'all';
        const platformValue = this.platformFilter?.value || 'all';
        const scoreValue = this.scoreFilter?.value || 'all';

        this.filteredReviews = this.reviews.filter(review => {
            // Category filter
            if (categoryValue !== 'all' && review.category !== categoryValue) {
                return false;
            }

            // Platform filter
            if (platformValue !== 'all' && !review.platforms.includes(platformValue)) {
                return false;
            }

            // Score filter
            if (scoreValue !== 'all') {
                const score = review.score;
                switch (scoreValue) {
                    case '9-10':
                        if (score < 9) return false;
                        break;
                    case '8-9':
                        if (score < 8 || score >= 9) return false;
                        break;
                    case '7-8':
                        if (score < 7 || score >= 8) return false;
                        break;
                    case '6-7':
                        if (score < 6 || score >= 7) return false;
                        break;
                    case '0-6':
                        if (score >= 6) return false;
                        break;
                }
            }

            return true;
        });

        this.applySorting();
        this.currentPage = 1;
        this.renderReviews();
    }

    applySorting() {
        const sortValue = this.sortBy?.value || 'newest';

        this.filteredReviews.sort((a, b) => {
            switch (sortValue) {
                case 'newest':
                    return new Date(b.date) - new Date(a.date);
                case 'oldest':
                    return new Date(a.date) - new Date(b.date);
                case 'score-high':
                    return b.score - a.score;
                case 'score-low':
                    return a.score - b.score;
                case 'title':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });
    }

    switchView(e) {
        const viewType = e.target.closest('.view-btn').dataset.view;
        
        // Update active button
        this.viewBtns.forEach(btn => btn.classList.remove('active'));
        e.target.closest('.view-btn').classList.add('active');
        
        // Update view
        this.currentView = viewType;
        
        // Apply view class to grid
        if (this.reviewsGrid) {
            this.reviewsGrid.className = `reviews-grid ${viewType === 'list' ? 'list-view' : ''}`;
        }
    }

    renderReviews() {
        if (!this.reviewsGrid) return;

        const startIndex = 0;
        const endIndex = this.currentPage * this.reviewsPerPage;
        const reviewsToShow = this.filteredReviews.slice(startIndex, endIndex);

        if (this.currentPage === 1) {
            this.reviewsGrid.innerHTML = '';
        }

        reviewsToShow.forEach((review, index) => {
            if (index >= (this.currentPage - 1) * this.reviewsPerPage) {
                const reviewCard = this.createReviewCard(review);
                this.reviewsGrid.appendChild(reviewCard);
            }
        });

        // Update load more button
        if (this.loadMoreBtn) {
            if (endIndex >= this.filteredReviews.length) {
                this.loadMoreBtn.style.display = 'none';
            } else {
                this.loadMoreBtn.style.display = 'block';
            }
        }

        // Update results count
        this.updateResultsCount();
    }

    createReviewCard(review) {
        const card = document.createElement('div');
        card.className = 'review-card fade-in';
        
        const stars = this.generateStarRating(review.score);
        const platforms = review.platforms.slice(0, 3).map(platform => 
            `<span>${this.formatPlatform(platform)}</span>`
        ).join('');

        card.innerHTML = `
            <div class="review-image">
                <img src="${review.image}" alt="${review.title}" loading="lazy">
                <div class="score-badge">${review.score}</div>
            </div>
            <div class="review-content">
                <span class="category">${this.formatCategory(review.category)}</span>
                <h3>${review.title}</h3>
                <p>${review.excerpt}</p>
                <div class="platforms">
                    ${platforms}
                </div>
                <div class="review-meta">
                    <div class="rating-stars">${stars}</div>
                    <span class="read-time">${review.readTime}</span>
                </div>
                <div class="review-meta">
                    <span class="reviewer">By ${review.author}</span>
                    <span class="date">${this.formatDate(review.date)}</span>
                </div>
            </div>
        `;

        // Add click handler
        card.addEventListener('click', () => {
            this.openReview(review);
        });

        return card;
    }

    generateStarRating(score) {
        const fullStars = Math.floor(score / 2);
        const halfStar = (score % 2) >= 1;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        let stars = '';
        
        // Full stars
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        // Half star
        if (halfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }

        return stars;
    }

    formatCategory(category) {
        const categories = {
            'games': 'Games',
            'movies': 'Movies',
            'tv': 'TV Shows',
            'tech': 'Technology',
            'comics': 'Comics'
        };
        return categories[category] || category;
    }

    formatPlatform(platform) {
        const platforms = {
            'pc': 'PC',
            'ps5': 'PS5',
            'xbox': 'Xbox',
            'switch': 'Switch',
            'mobile': 'Mobile',
            'theaters': 'Theaters',
            'streaming': 'Streaming',
            'documentary': 'Documentary'
        };
        return platforms[platform] || platform;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            return 'Yesterday';
        } else if (diffDays < 7) {
            return `${diffDays} days ago`;
        } else if (diffDays < 30) {
            const weeks = Math.floor(diffDays / 7);
            return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
        } else {
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
        }
    }

    loadMoreReviews() {
        this.currentPage++;
        this.renderReviews();
        
        // Smooth scroll to new content
        setTimeout(() => {
            const newCards = this.reviewsGrid.querySelectorAll('.review-card');
            if (newCards.length > 0) {
                const lastCard = newCards[newCards.length - 1];
                lastCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    }

    updateResultsCount() {
        // Find or create results count element
        let resultsCount = document.querySelector('.results-count');
        if (!resultsCount) {
            resultsCount = document.createElement('div');
            resultsCount.className = 'results-count';
            
            const controlsSection = document.querySelector('.reviews-controls');
            if (controlsSection) {
                controlsSection.appendChild(resultsCount);
            }
        }

        const showing = Math.min(this.currentPage * this.reviewsPerPage, this.filteredReviews.length);
        resultsCount.innerHTML = `
            <p>Showing ${showing} of ${this.filteredReviews.length} reviews</p>
        `;
    }

    openReview(review) {
        // In a real application, this would navigate to the full review page
        console.log('Opening review:', review.title);
        
        // Show toast notification for demo
        if (window.gameHub) {
            window.gameHub.showToast(`Opening: ${review.title}`, 'info');
        }
    }

    // Public method to search reviews
    searchReviews(query) {
        if (!query) {
            this.filteredReviews = [...this.reviews];
        } else {
            this.filteredReviews = this.reviews.filter(review => 
                review.title.toLowerCase().includes(query.toLowerCase()) ||
                review.excerpt.toLowerCase().includes(query.toLowerCase()) ||
                review.author.toLowerCase().includes(query.toLowerCase())
            );
        }
        
        this.currentPage = 1;
        this.renderReviews();
    }
}

// Enhanced search functionality for reviews page
class ReviewsSearch {
    constructor(reviewsPage) {
        this.reviewsPage = reviewsPage;
        this.searchInput = document.querySelector('.search-box input');
        this.init();
    }

    init() {
        if (this.searchInput) {
            // Override the placeholder for reviews page
            this.searchInput.placeholder = 'Search reviews, games, movies...';
            
            // Add custom search functionality
            this.searchInput.addEventListener('input', this.debounce(this.handleSearch.bind(this), 300));
        }
    }

    handleSearch(e) {
        const query = e.target.value.trim();
        this.reviewsPage.searchReviews(query);
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on reviews page
    if (document.querySelector('.reviews-page')) {
        window.reviewsPage = new ReviewsPage();
        window.reviewsSearch = new ReviewsSearch(window.reviewsPage);
        
        console.log('Reviews page initialized successfully');
    }
});

// Add CSS for results count
const reviewsStyles = `
.results-count {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #e5e5e5;
}

.results-count p {
    color: #666;
    font-size: 0.9rem;
    margin: 0;
}

.review-card {
    cursor: pointer;
    transition: all 0.3s ease;
}

.review-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
    .results-count {
        text-align: center;
    }
}
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = reviewsStyles;
document.head.appendChild(styleSheet);