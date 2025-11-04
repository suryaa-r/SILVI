# SILVI Development Guidelines

## Code Quality Standards

### JavaScript Conventions
- **ES6+ Features**: Use modern JavaScript syntax including arrow functions, template literals, and destructuring
- **Const/Let Usage**: Prefer `const` for immutable values, `let` for variables that change
- **Function Declarations**: Use both function declarations and arrow functions appropriately
- **Template Literals**: Use backticks for string interpolation and multi-line strings
- **Object Destructuring**: Extract properties from objects when accessing multiple properties

### Naming Conventions
- **Variables**: Use camelCase for variables and functions (`cartItems`, `updateCartDisplay`)
- **Constants**: Use camelCase for object properties and methods (`store.addToCart`)
- **CSS Classes**: Use kebab-case with BEM-like structure (`cart-sidebar`, `luxury-card`)
- **HTML IDs**: Use kebab-case for element IDs (`cart-items`, `product-grid`)
- **File Names**: Use kebab-case for HTML files (`product-detail.html`, `checkout.html`)

### Code Organization Patterns
- **Modular Structure**: Separate concerns between files (main.js for core logic, script.js for UI interactions)
- **Object-Oriented Approach**: Use object literals for organizing related functionality (`store` object)
- **Event-Driven Architecture**: Centralize event listeners in setup functions
- **State Management**: Use objects to maintain application state with localStorage persistence

## Structural Conventions

### HTML Structure
- **Semantic Elements**: Use appropriate HTML5 semantic tags (`<nav>`, `<section>`, `<footer>`)
- **Accessibility**: Include proper ARIA labels and semantic structure
- **Class Organization**: Apply multiple utility classes for styling (Tailwind CSS approach)
- **Data Attributes**: Use data attributes for JavaScript targeting (`data-category`)

### CSS Architecture
- **CSS Custom Properties**: Define color palette and design tokens in `:root`
- **Utility Classes**: Combine utility classes for responsive design
- **Component Classes**: Create reusable component classes (`.luxury-card`, `.btn-luxury`)
- **Animation Classes**: Separate animation definitions for reusability

### JavaScript Patterns
- **Module Pattern**: Organize code into logical modules and objects
- **Event Delegation**: Use event delegation for dynamic content
- **Local Storage Integration**: Persist user data with consistent naming (`silvi_cart`, `silvi_wishlist`)
- **Error Handling**: Implement graceful fallbacks for missing elements

## Implementation Standards

### State Management
```javascript
// Centralized store pattern
const store = {
    products: [...],
    cart: JSON.parse(localStorage.getItem('silvi_cart') || '[]'),
    
    addToCart(productId) {
        // Implementation with state updates
        this.updateCart();
    }
};
```

### Event Handling
```javascript
// Setup function pattern for event listeners
function setupEventListeners() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Event handling logic
        });
    });
}
```

### DOM Manipulation
```javascript
// Template literal approach for dynamic content
cartItems.innerHTML = this.cart.map(item => `
    <div class="cart-item">
        <h4>${item.name}</h4>
        <button onclick="store.removeFromCart(${item.id})">Remove</button>
    </div>
`).join('');
```

### Notification System
```javascript
// Consistent notification pattern
showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    // Animation and cleanup logic
}
```

## UI/UX Patterns

### Animation Standards
- **CSS Transitions**: Use consistent transition durations (0.3s for most interactions)
- **Transform Effects**: Apply hover effects with `translateY` and `scale` transforms
- **Loading States**: Implement loading spinners and disabled states during async operations
- **Scroll Animations**: Use Intersection Observer for scroll-triggered animations

### Responsive Design
- **Mobile-First**: Design for mobile devices first, then enhance for larger screens
- **Breakpoint Usage**: Use Tailwind CSS breakpoints (`md:`, `lg:`) for responsive behavior
- **Touch-Friendly**: Ensure interactive elements are appropriately sized for touch
- **Flexible Layouts**: Use CSS Grid and Flexbox for adaptive layouts

### User Feedback
- **Immediate Feedback**: Provide instant visual feedback for user actions
- **Success Messages**: Show confirmation messages for completed actions
- **Error Handling**: Display helpful error messages when operations fail
- **Loading Indicators**: Show progress during asynchronous operations

## Performance Considerations

### Code Efficiency
- **Event Listener Management**: Set up event listeners once during initialization
- **DOM Query Optimization**: Cache DOM elements when accessed multiple times
- **Debouncing**: Implement debouncing for search and input operations
- **Lazy Loading**: Defer loading of non-critical resources

### Memory Management
- **Local Storage**: Use localStorage for client-side data persistence
- **Event Cleanup**: Remove event listeners when elements are destroyed
- **Object References**: Avoid memory leaks by properly managing object references

This codebase demonstrates a well-structured approach to vanilla JavaScript development with modern practices, consistent patterns, and attention to user experience details.