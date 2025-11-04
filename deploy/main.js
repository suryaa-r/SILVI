// User Data Collection
const userData = {
    sessionId: Date.now() + Math.random().toString(36).substr(2, 9),
    visitTime: new Date().toISOString(),
    userAgent: navigator.userAgent,
    screenSize: `${screen.width}x${screen.height}`,
    
    collectData(event, data = {}) {
        const eventData = {
            sessionId: this.sessionId,
            timestamp: new Date().toISOString(),
            event: event,
            url: window.location.href,
            ...data
        };
        
        // Store locally
        let analytics = JSON.parse(localStorage.getItem('silvi_analytics') || '[]');
        analytics.push(eventData);
        localStorage.setItem('silvi_analytics', JSON.stringify(analytics));
        
        // Send to server (replace with your endpoint)
        // fetch('/api/analytics', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(eventData)
        // });
        
        console.log('User Event:', eventData);
    }
};

// SILVI Store Management
const store = {
    products: [
        { id: 1, name: "Silk Evening Gown", price: 299, category: "traditional", image: "https://images.unsplash.com/photo-1566479179817-c0ae8e5b4e8e?w=400" },
        { id: 2, name: "Designer Blazer", price: 189, category: "western", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400" },
        { id: 3, name: "Embroidered Saree", price: 249, category: "traditional", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400" },
        { id: 4, name: "Luxury Lehenga", price: 399, category: "traditional", image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400" },
        { id: 5, name: "Luxury Cocktail Dress", price: 675, category: "western", image: "https://kimi-web-img.moonshot.cn/img/www.oliviabottega.com/d08d7feadfba6f4c0cb9b959fbc935695a725cc2.jpg" },
        { id: 6, name: "Silk Anarkali", price: 199, category: "traditional", image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400" },
        { id: 7, name: "Cashmere Coat", price: 459, category: "western", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400" },
        { id: 8, name: "Pearl Necklace Set", price: 129, category: "western", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400" },
        { id: 9, name: "Cashmere Blend Sweater", price: 425, category: "western", image: "https://kimi-web-img.moonshot.cn/img/content.woolovers.com/61c3079205572af1fb3d9a12237f88890557fe15.jpg" },
        { id: 10, name: "Traditional Dupatta", price: 89, category: "traditional", image: "https://images.unsplash.com/photo-1583391733981-24c8d6d4e4b2?w=400" },
        { id: 11, name: "Designer Handbag", price: 345, category: "western", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
        { id: 12, name: "Embellished Kurta", price: 179, category: "traditional", image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400" }
    ],
    cart: JSON.parse(localStorage.getItem('silvi_cart') || '[]'),
    
    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        
        const existingItem = this.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        
        // Collect user data
        userData.collectData('add_to_cart', {
            productId: productId,
            productName: product.name,
            productPrice: product.price,
            category: product.category
        });
        
        this.updateCart();
        this.showNotification(`Added ${product.name} to cart`);
    },
    
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCart();
    },
    
    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.updateCart();
            }
        }
    },
    
    updateCart() {
        localStorage.setItem('silvi_cart', JSON.stringify(this.cart));
        this.renderCart();
        this.updateCartCount();
    },
    
    updateCartCount() {
        const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? 'flex' : 'none';
        }
    },
    
    renderCart() {
        const cartItems = document.querySelector('.cart-items');
        const cartTotal = document.querySelector('.cart-total');
        
        if (this.cart.length === 0) {
            cartItems.innerHTML = `
                <div class="p-6 text-center text-gray-500">
                    <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9"></path>
                    </svg>
                    <p>Your cart is empty</p>
                </div>
            `;
            cartTotal.textContent = '$0.00';
            return;
        }
        
        cartItems.innerHTML = this.cart.map(item => `
            <div class="p-4 border-b border-gray-200">
                <div class="flex items-center space-x-4">
                    <a href="product-detail.html?id=${item.id}">
                        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity">
                    </a>
                    <div class="flex-1">
                        <h4 class="font-semibold text-gray-900">${item.name}</h4>
                        <p class="text-green-800 font-bold">$${item.price}</p>
                        <div class="flex items-center space-x-2 mt-2">
                            <button onclick="store.updateQuantity(${item.id}, ${item.quantity - 1})" class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">-</button>
                            <span class="px-3 py-1 bg-gray-100 rounded">${item.quantity}</span>
                            <button onclick="store.updateQuantity(${item.id}, ${item.quantity + 1})" class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">+</button>
                        </div>
                    </div>
                    <button onclick="store.removeFromCart(${item.id})" class="text-red-500 hover:text-red-700">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');
        
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `₹${total.toFixed(2)}`;
    },
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-800 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>${message}</span>
            </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.remove('translate-x-full'), 100);
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    },
    
    addToWishlist(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        
        let wishlist = JSON.parse(localStorage.getItem('silvi_wishlist') || '[]');
        const exists = wishlist.find(item => item.id === productId);
        
        if (exists) {
            wishlist = wishlist.filter(item => item.id !== productId);
            this.showNotification('Removed from wishlist');
        } else {
            wishlist.push(product);
            this.showNotification('Added to wishlist');
        }
        
        localStorage.setItem('silvi_wishlist', JSON.stringify(wishlist));
        this.updateWishlistCount();
    },
    
    updateWishlistCount() {
        const wishlist = JSON.parse(localStorage.getItem('silvi_wishlist') || '[]');
        const count = wishlist.length;
        const wishlistCount = document.querySelector('.wishlist-count');
        if (wishlistCount) {
            wishlistCount.textContent = count;
            wishlistCount.style.display = count > 0 ? 'flex' : 'none';
        }
    }
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typewriter effect
    if (typeof Typed !== 'undefined') {
        new Typed('.hero-typewriter', {
            strings: ['Luxury Redefined', 'Timeless Elegance', 'Artisanal Excellence', 'Sustainable Fashion'],
            typeSpeed: 80,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
    
    // Initialize scroll animations
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });
    
    scrollElements.forEach(el => observer.observe(el));
    
    // Cart functionality
    const cartToggle = document.querySelector('.cart-toggle');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartClose = document.querySelector('.cart-close');
    
    cartToggle?.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    cartClose?.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (cartSidebar && !cartSidebar.contains(e.target) && cartToggle && !cartToggle.contains(e.target)) {
            cartSidebar.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Newsletter form
    const newsletterForm = document.querySelector('form');
    newsletterForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        if (email) {
            // Collect email for marketing
            userData.collectData('newsletter_signup', { email: email });
            
            // Store email separately for marketing
            let emails = JSON.parse(localStorage.getItem('silvi_emails') || '[]');
            if (!emails.includes(email)) {
                emails.push(email);
                localStorage.setItem('silvi_emails', JSON.stringify(emails));
            }
            
            store.showNotification('Thank you for subscribing!');
            e.target.reset();
        }
    });
    
    // Checkout functionality
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn?.addEventListener('click', () => {
        if (store.cart.length === 0) {
            store.showNotification('Your cart is empty!');
            return;
        }
        
        window.location.href = 'checkout.html';
    });
    
    // Search functionality
    document.querySelector('.search-toggle').addEventListener('click', function() {
        alert('Search clicked! Type silk, dress, or traditional');
        
        const query = prompt('Search for products (try: silk, dress, traditional):');
        if (query) {
            const matches = store.products.filter(p => 
                p.name.toLowerCase().includes(query.toLowerCase()) || 
                p.category.toLowerCase().includes(query.toLowerCase())
            );
            
            if (matches.length > 0) {
                const result = matches.map(p => p.name + ' - ₹' + p.price).join('\n');
                alert('Found ' + matches.length + ' products:\n\n' + result);
            } else {
                alert('No products found for: ' + query);
            }
        }
    });
    
    // Login/Register functionality
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');
    
    loginBtn?.addEventListener('click', () => {
        const modal = createModal('Login', `
            <form class="space-y-4">
                <input type="email" placeholder="Email" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" required>
                <input type="password" placeholder="Password" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" required>
                <button type="submit" class="w-full btn-luxury text-white py-2 rounded-lg">Login</button>
            </form>
        `);
        
        modal.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            store.showNotification('Login successful!');
            document.body.removeChild(modal);
        });
    });
    
    registerBtn?.addEventListener('click', () => {
        const modal = createModal('Sign Up', `
            <form class="space-y-4">
                <input type="text" placeholder="Full Name" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" required>
                <input type="email" placeholder="Email" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" required>
                <input type="password" placeholder="Password" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" required>
                <button type="submit" class="w-full btn-luxury text-white py-2 rounded-lg">Sign Up</button>
            </form>
        `);
        
        modal.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            store.showNotification('Account created successfully!');
            document.body.removeChild(modal);
        });
    });
    
    // Mobile menu functionality
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'md:hidden p-2 hover:bg-gray-100 rounded-full';
    mobileMenuBtn.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
    `;
    
    const navContainer = document.querySelector('nav .max-w-7xl');
    navContainer?.appendChild(mobileMenuBtn);
    
    mobileMenuBtn.addEventListener('click', () => {
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'fixed inset-0 bg-white z-50 p-6';
        mobileMenu.innerHTML = `
            <div class="flex justify-between items-center mb-8">
                <div class="luxury-font text-2xl font-bold gradient-text">SILVI</div>
                <button class="mobile-close p-2">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <nav class="space-y-6">
                <a href="index.html" class="block text-xl text-gray-800 hover:text-green-800">Home</a>
                <a href="products.html" class="block text-xl text-gray-800 hover:text-green-800">Collections</a>
                <a href="#" class="block text-xl text-gray-800 hover:text-green-800">Heritage</a>
                <a href="#" class="block text-xl text-gray-800 hover:text-green-800">Contact</a>
            </nav>
        `;
        
        document.body.appendChild(mobileMenu);
        
        mobileMenu.querySelector('.mobile-close').addEventListener('click', () => {
            document.body.removeChild(mobileMenu);
        });
    });
    
    // Wishlist toggle functionality
    const wishlistToggle = document.querySelector('.wishlist-toggle');
    wishlistToggle?.addEventListener('click', () => {
        const wishlist = JSON.parse(localStorage.getItem('silvi_wishlist') || '[]');
        
        const modal = createModal('My Wishlist', `
            <div class="space-y-4 max-h-96 overflow-y-auto">
                ${wishlist.length === 0 ? 
                    '<p class="text-center text-gray-500 py-8">Your wishlist is empty</p>' :
                    wishlist.map(item => `
                        <div class="flex items-center space-x-4 p-4 border rounded-lg">
                            <a href="product-detail.html?id=${item.id}">
                                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity">
                            </a>
                            <div class="flex-1">
                                <h4 class="font-semibold">${item.name}</h4>
                                <p class="text-green-800 font-bold">$${item.price}</p>
                            </div>
                            <div class="flex space-x-2">
                                <button onclick="store.addToCart(${item.id})" class="btn-luxury text-white px-3 py-1 rounded text-sm">Add to Cart</button>
                                <button onclick="store.addToWishlist(${item.id}); location.reload()" class="text-red-500 hover:text-red-700">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    `).join('')
                }
            </div>
        `);
    });
    
    // Track page visit
    userData.collectData('page_visit', {
        page: 'home',
        referrer: document.referrer
    });
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            if (maxScroll % 25 === 0) { // Track at 25%, 50%, 75%, 100%
                userData.collectData('scroll_depth', { percent: maxScroll });
            }
        }
    });
    
    // Initialize store
    store.updateCart();
    store.updateWishlistCount();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Modal creation helper
function createModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div class="flex justify-between items-center mb-6">
                <h2 class="luxury-font text-2xl font-bold gradient-text">${title}</h2>
                <button class="modal-close text-gray-500 hover:text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            ${content}
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    return modal;
}