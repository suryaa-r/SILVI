// Product data
const products = [
    {
        id: 1,
        name: "Silk Evening Gown",
        category: "western",
        price: 299,
        description: "Elegant silk evening gown perfect for special occasions",
        image: "https://images.unsplash.com/photo-1566479179817-c0ae8e5b4e8e?w=400&h=500&fit=crop",
        featured: true
    },
    {
        id: 2,
        name: "Designer Blazer",
        category: "western",
        price: 189,
        description: "Tailored blazer for the modern professional woman",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop"
    },
    {
        id: 3,
        name: "Embroidered Saree",
        category: "traditional",
        price: 249,
        description: "Handcrafted saree with intricate embroidery",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop"
    },
    {
        id: 4,
        name: "Luxury Lehenga",
        category: "traditional",
        price: 399,
        description: "Stunning lehenga for weddings and celebrations",
        image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=500&fit=crop",
        featured: true
    },
    {
        id: 5,
        name: "Cashmere Coat",
        category: "western",
        price: 459,
        description: "Premium cashmere coat for ultimate luxury",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=500&fit=crop"
    },
    {
        id: 6,
        name: "Silk Anarkali",
        category: "traditional",
        price: 199,
        description: "Flowing Anarkali dress in pure silk",
        image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=500&fit=crop"
    },
    {
        id: 7,
        name: "Pearl Necklace Set",
        category: "western",
        price: 129,
        description: "Elegant pearl jewelry set for sophisticated occasions",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop"
    },
    {
        id: 8,
        name: "Traditional Dupatta",
        category: "traditional",
        price: 89,
        description: "Handwoven dupatta with gold thread work",
        image: "https://images.unsplash.com/photo-1583391733981-24c8d6d4e4b2?w=400&h=500&fit=crop"
    }
];

// Cart functionality
let cart = [];
let wishlist = [];
let currentFilter = 'all';
let searchQuery = '';

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayProducts('all');
    setupEventListeners();
    animateLogo();
    setupScrollAnimations();
    loadCartFromStorage();
    loadWishlistFromStorage();
});

// Display products based on category and search
function displayProducts(category, search = '') {
    showLoading();
    currentFilter = category;
    searchQuery = search;
    
    setTimeout(() => {
        const productGrid = document.getElementById('product-grid');
        let filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
        
        if (search) {
            filteredProducts = filteredProducts.filter(p => 
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.description.toLowerCase().includes(search.toLowerCase())
            );
        }
        
        if (filteredProducts.length === 0) {
            productGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.5;"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            `;
        } else {
            productGrid.innerHTML = filteredProducts.map(product => `
                <div class="product-card slide-in">
                    <div class="product-image" style="background-image: url('${product.image}'); background-size: cover; background-position: center;">
                        <button class="wishlist-btn" onclick="toggleWishlist(${product.id})">
                            <i class="${wishlist.includes(product.id) ? 'fas' : 'far'} fa-heart"></i>
                        </button>
                        ${product.featured ? '<div class="featured-badge">Featured</div>' : ''}
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <div class="product-price">$${product.price}</div>
                        <button class="add-to-cart" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-bag"></i> Add to Cart
                        </button>
                    </div>
                </div>
            `).join('');
        }
        
        hideLoading();
    }, 500);
}

// Show loading spinner
function showLoading() {
    document.getElementById('loading-spinner').style.display = 'block';
    document.getElementById('product-grid').style.opacity = '0.5';
}

// Hide loading spinner
function hideLoading() {
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('product-grid').style.opacity = '1';
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            displayProducts(currentFilter, this.value);
        }, 300);
    });
}

// Wishlist functionality
function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        showNotification('Removed from wishlist', 'info');
    } else {
        wishlist.push(productId);
        showNotification('Added to wishlist', 'success');
    }
    
    saveWishlistToStorage();
    displayProducts(currentFilter, searchQuery);
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check' : 'fa-info'}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
        showNotification(`Updated ${product.name} quantity in cart`, 'success');
    } else {
        cart.push({ ...product, quantity: 1 });
        showNotification(`Added ${product.name} to cart`, 'success');
    }
    
    updateCartDisplay();
    updateCartCount();
    saveCartToStorage();
}

// Remove item from cart
function removeFromCart(productId) {
    const product = products.find(p => p.id === productId);
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    updateCartCount();
    saveCartToStorage();
    showNotification(`Removed ${product.name} from cart`, 'info');
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartSubtotal = document.getElementById('cart-subtotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #666;">
                <i class="fas fa-shopping-bag" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.3;"></i>
                <p>Your cart is empty</p>
                <p style="font-size: 0.9rem; margin-top: 10px;">Add some luxury items to get started</p>
            </div>
        `;
        cartTotal.textContent = '0';
        cartSubtotal.textContent = '0';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>Qty: ${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartSubtotal.textContent = subtotal.toFixed(2);
    cartTotal.textContent = subtotal.toFixed(2);
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartDisplay();
        updateCartCount();
        saveCartToStorage();
    }
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cart');
    cartSidebar.classList.toggle('open');
}

// Scroll to section
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            displayProducts(this.dataset.category, searchQuery);
        });
    });
    
    // Cart link
    document.querySelector('.cart-link').addEventListener('click', function(e) {
        e.preventDefault();
        toggleCart();
    });
    
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            showNotification('Thank you for subscribing!', 'success');
            this.reset();
        });
    }
    
    // Contact form
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            this.reset();
        });
    }
    
    // Setup search
    setupSearch();
    
    // Close cart when clicking outside
    document.addEventListener('click', function(e) {
        const cart = document.getElementById('cart');
        const cartLink = document.querySelector('.cart-link');
        
        if (!cart.contains(e.target) && !cartLink.contains(e.target) && cart.classList.contains('open')) {
            toggleCart();
        }
    });
}

// Animate logo
function animateLogo() {
    const logo = document.getElementById('logo');
    
    setInterval(() => {
        logo.style.transform = 'scale(1.02)';
        setTimeout(() => {
            logo.style.transform = 'scale(1)';
        }, 200);
    }, 3000);
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Local storage functions
function saveCartToStorage() {
    localStorage.setItem('silvi_cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('silvi_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
        updateCartCount();
    }
}

function saveWishlistToStorage() {
    localStorage.setItem('silvi_wishlist', JSON.stringify(wishlist));
}

function loadWishlistFromStorage() {
    const savedWishlist = localStorage.getItem('silvi_wishlist');
    if (savedWishlist) {
        wishlist = JSON.parse(savedWishlist);
    }
}

// Scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Enhanced checkout functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('checkout-btn') || e.target.closest('.checkout-btn')) {
        if (cart.length === 0) {
            showNotification('Your cart is empty!', 'info');
            return;
        }
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Simulate checkout process
        e.target.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        e.target.disabled = true;
        
        setTimeout(() => {
            showNotification(`Thank you for your purchase! Total: $${total.toFixed(2)}. Your luxury items will be delivered soon.`, 'success');
            
            // Clear cart after checkout
            cart = [];
            updateCartDisplay();
            updateCartCount();
            saveCartToStorage();
            toggleCart();
            
            // Reset button
            e.target.innerHTML = '<i class="fas fa-lock"></i> Secure Checkout';
            e.target.disabled = false;
        }, 2000);
    }
});