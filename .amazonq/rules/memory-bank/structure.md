# SILVI Project Structure

## Directory Organization

### Root Structure
```
SILVI.CLOTHING/
├── .amazonq/rules/memory-bank/     # Documentation and rules
├── indian-pincodes-database-master/ # Geographic data (auxiliary)
└── SILVI/                          # Main application directory
```

### Core Application (SILVI/)
```
SILVI/
├── index.html           # Homepage with hero section and featured collections
├── products.html        # Product catalog and category browsing
├── product-detail.html  # Individual product information pages
├── checkout.html        # Payment processing and order completion
├── brand.html          # Company heritage and story
├── styles.css          # Custom styling and design system
├── main.js             # Core application logic and state management
└── script.js           # UI interactions and dynamic behaviors
```

## Component Architecture

### Page Hierarchy
- **Homepage (index.html)**: Entry point with brand introduction, featured collections, and new arrivals
- **Product Pages**: Catalog browsing and detailed product views
- **Brand Story**: Heritage and craftsmanship narrative
- **Checkout Flow**: Shopping cart to payment completion

### Core Components
- **Navigation System**: Fixed header with brand logo, menu, and cart access
- **Product Display**: Grid layouts with hover effects and category filtering
- **Shopping Cart**: Sidebar panel with real-time updates and wishlist integration
- **Payment Integration**: Razorpay checkout system for secure transactions

### Design System
- **Color Palette**: CSS custom properties for sage green, champagne beige, pearl white
- **Typography**: Luxury font hierarchy using Playfair Display and Inter
- **Layout Framework**: Tailwind CSS for responsive design
- **Animation Library**: Anime.js for smooth transitions and effects

## Data Flow Architecture
- **State Management**: Centralized store in main.js for cart, products, and user data
- **Event Handling**: Modular event listeners for user interactions
- **API Integration**: External services for payments and potential backend connectivity
- **Local Storage**: Client-side persistence for cart and user preferences

## External Dependencies
- **Tailwind CSS**: Utility-first styling framework
- **Anime.js**: Animation library for smooth effects
- **Typed.js**: Typewriter effect for hero section
- **Splide.js**: Carousel functionality for product displays
- **Razorpay**: Payment gateway integration