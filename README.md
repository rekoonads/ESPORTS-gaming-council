# GameHub - Gaming & Entertainment News Website

A comprehensive gaming and entertainment news website inspired by IGN's layout and functionality, built with modern web technologies.

## 🎮 Features

### Core Functionality
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, modern interface with smooth animations and transitions
- **Interactive Navigation**: Dropdown menus, mobile hamburger menu, and smooth scrolling
- **Search Functionality**: Real-time search with suggestions and filtering
- **Dynamic Content**: Infinite scroll, load more content, and filtering systems
- **Dark Mode**: Automatic dark mode support based on user preference

### Pages & Sections
- **Homepage**: Hero section, latest news, reviews, videos, and trending content
- **Reviews Page**: Comprehensive review system with filtering, sorting, and grid/list views
- **News Section**: Latest gaming and entertainment news with category filtering
- **Videos Section**: Video content with play overlays and metadata
- **Entertainment**: Movies, TV shows, anime, tech, and comics coverage

### Interactive Elements
- **Mobile Menu**: Animated hamburger menu for mobile devices
- **Filter & Sort**: Advanced filtering by category, platform, score, and date
- **View Switching**: Toggle between grid and list views for content
- **Toast Notifications**: User feedback for actions and interactions
- **Smooth Animations**: Scroll-triggered animations and hover effects
- **Social Sharing**: Social media integration and sharing capabilities

## 🛠️ Technologies Used

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern CSS with Grid, Flexbox, and custom properties
- **JavaScript (ES6+)**: Modular JavaScript with classes and modern features
- **Font Awesome**: Icon library for UI elements
- **Google Fonts**: Inter font family for typography
- **SVG**: Custom logo and graphics

## 📁 Project Structure

```
gamehub/
├── index.html                 # Homepage
├── reviews.html              # Reviews page
├── generate-placeholders.html # Image generation tool
├── README.md                 # This file
├── styles/
│   ├── main.css              # Main stylesheet
│   └── responsive.css        # Responsive design styles
├── js/
│   ├── main.js               # Core JavaScript functionality
│   └── reviews.js            # Reviews page specific JavaScript
└── assets/
    └── images/
        └── logo.svg           # GameHub logo
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Web server (optional, for local development)

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. For placeholder images, open `generate-placeholders.html` and download the generated images to `assets/images/`

### Development Setup
For local development with a web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: 767px and below
- **Small Mobile**: 480px and below

## 🎨 Design Features

### Color Scheme
- **Primary**: #00d4ff (GameHub Blue)
- **Secondary**: #0066cc (Darker Blue)
- **Dark**: #1a1a1a (Almost Black)
- **Light**: #f8f9fa (Light Gray)
- **Text**: #333 (Dark Gray)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800
- **Responsive Typography**: Scales appropriately across devices

### Animations
- **Fade In**: Scroll-triggered content animations
- **Hover Effects**: Smooth transitions on interactive elements
- **Loading States**: Spinner animations for dynamic content
- **Mobile Menu**: Animated hamburger menu transformation

## 🔧 JavaScript Modules

### GameHub Class (`main.js`)
- Mobile menu functionality
- Search and filtering
- Infinite scroll
- Toast notifications
- Keyboard navigation
- Performance monitoring

### ReviewsPage Class (`reviews.js`)
- Review filtering and sorting
- Grid/list view switching
- Dynamic content loading
- Search functionality
- Star rating generation

### Additional Features
- **Dark Mode Toggle**: Automatic theme switching
- **Performance Monitor**: Core Web Vitals tracking
- **Accessibility**: ARIA labels and keyboard navigation

## 🎯 Key Features Explained

### News Filtering
- Filter by category (Gaming, Tech, Entertainment)
- Real-time filtering with smooth animations
- Preserve scroll position during filtering

### Review System
- 10-point scoring system
- Star rating display
- Platform compatibility indicators
- Pros and cons sections
- Read time estimates

### Search Functionality
- Auto-complete suggestions
- Search across titles, content, and authors
- Debounced input for performance
- Clear visual feedback

### Mobile Experience
- Touch-friendly interface
- Optimized navigation
- Responsive images
- Fast loading times

## 🔍 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile Safari**: 14+
- **Chrome Mobile**: 90+

## 🚀 Performance Features

- **Lazy Loading**: Images load as needed
- **Intersection Observer**: Efficient scroll animations
- **Debounced Events**: Optimized search and resize handlers
- **CSS Grid & Flexbox**: Efficient layouts
- **Minification Ready**: Clean, production-ready code

## 📧 Contact & Support

This is a demonstration project showcasing modern web development techniques and responsive design principles inspired by professional gaming news websites.

## 📝 License

This project is for educational and demonstration purposes. The design is inspired by IGN but is completely original implementation.

---

**Note**: This project uses placeholder content and images. In a production environment, you would integrate with a real CMS or API for dynamic content management.