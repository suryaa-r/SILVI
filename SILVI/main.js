// Email Service Functions
function sendVerificationEmail(email, name, code) {
    const emailData = {
        to: email,
        subject: 'Verify Your SILVI Account',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f9fa;">
                <div style="background: white; padding: 30px; border-radius: 10px; text-align: center;">
                    <h1 style="color: #9CAF88; font-size: 32px; margin-bottom: 20px;">SILVI</h1>
                    <h2 style="color: #333; margin-bottom: 20px;">Welcome ${name}!</h2>
                    <p style="color: #666; font-size: 16px; margin-bottom: 30px;">Please verify your email address to complete your registration.</p>
                    <div style="background: #f0f8f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #4A5D3A; margin: 0;">Your Verification Code:</h3>
                        <div style="font-size: 32px; font-weight: bold; color: #9CAF88; margin: 10px 0; letter-spacing: 3px;">${code}</div>
                    </div>
                    <p style="color: #666; font-size: 14px;">This code will expire in 10 minutes.</p>
                </div>
            </div>
        `
    };
    
    // Simulate email sending (replace with actual email service)
    console.log('Verification Email Sent:', emailData);
    alert(`Verification email sent to ${email}\nCode: ${code}`);
}

function sendWelcomeEmail(email, name) {
    const emailData = {
        to: email,
        subject: 'Welcome to SILVI - Your Luxury Fashion Journey Begins!',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f9fa;">
                <div style="background: white; padding: 30px; border-radius: 10px;">
                    <h1 style="color: #9CAF88; font-size: 32px; text-align: center; margin-bottom: 20px;">SILVI</h1>
                    <h2 style="color: #333; margin-bottom: 20px;">Welcome to the SILVI Family, ${name}!</h2>
                    <p style="color: #666; font-size: 16px; line-height: 1.6;">Thank you for joining SILVI, where luxury meets timeless elegance. Your account has been successfully created!</p>
                    <div style="background: linear-gradient(135deg, #9CAF88 0%, #4A5D3A 100%); padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                        <h3 style="color: white; margin: 0;">Exclusive Welcome Offer</h3>
                        <p style="color: white; margin: 10px 0;">Get 15% off on your first purchase!</p>
                        <div style="background: white; color: #4A5D3A; padding: 10px; border-radius: 5px; font-weight: bold; display: inline-block;">Code: WELCOME15</div>
                    </div>
                    <p style="color: #666; font-size: 16px; line-height: 1.6;">Explore our curated collections of premium women's clothing, crafted with artisanal precision and sustainable consciousness.</p>
                </div>
            </div>
        `
    };
    
    console.log('Welcome Email Sent:', emailData);
}

function sendThankYouEmail(email) {
    const emailData = {
        to: email,
        subject: 'Thank You for Subscribing to SILVI!',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f9fa;">
                <div style="background: white; padding: 30px; border-radius: 10px; text-align: center;">
                    <h1 style="color: #9CAF88; font-size: 32px; margin-bottom: 20px;">SILVI</h1>
                    <h2 style="color: #333; margin-bottom: 20px;">Thank You for Subscribing!</h2>
                    <p style="color: #666; font-size: 16px; margin-bottom: 30px;">Welcome to the SILVI family! You're now part of an exclusive community that appreciates luxury, elegance, and timeless fashion.</p>
                    <div style="background: linear-gradient(135deg, #9CAF88 0%, #4A5D3A 100%); padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: white; margin: 0 0 10px 0;">What to Expect:</h3>
                        <ul style="color: white; text-align: left; margin: 0; padding-left: 20px;">
                            <li>Early access to new collections</li>
                            <li>Exclusive discounts and offers</li>
                            <li>Style tips and fashion insights</li>
                            <li>VIP invitations to special events</li>
                        </ul>
                    </div>
                    <div style="background: #f0f8f0; padding: 15px; border-radius: 8px; margin: 20px 0;">
                        <p style="color: #4A5D3A; margin: 0; font-weight: bold;">Subscriber Special: 10% OFF</p>
                        <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">Use code: SUBSCRIBER10 on your next purchase</p>
                    </div>
                    <p style="color: #666; font-size: 14px;">Follow us on Instagram @silvi_silvers for daily style inspiration!</p>
                </div>
            </div>
        `
    };
    
    console.log('Thank You Email Sent:', emailData);
    
    // Show user confirmation
    setTimeout(() => {
        alert('Thank you email sent! Check your inbox for exclusive offers.');
    }, 1000);
}

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
    
    // Enhanced Newsletter form
    const newsletterForm = document.querySelector('form');
    newsletterForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        if (email) {
            // Show subscription options modal
            const modal = createModal('Complete Your Subscription', `
                <div class="space-y-4">
                    <p class="text-gray-600">Get exclusive access to:</p>
                    <div class="space-y-2">
                        <label class="flex items-center space-x-2">
                            <input type="checkbox" checked class="text-green-800" id="emailUpdates">
                            <span class="text-sm">Email updates on new collections</span>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input type="checkbox" class="text-green-800" id="smsOffers">
                            <span class="text-sm">SMS alerts for flash sales</span>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input type="checkbox" class="text-green-800" id="whatsappUpdates">
                            <span class="text-sm">WhatsApp updates (Enter mobile below)</span>
                        </label>
                    </div>
                    <input type="tel" id="subscriberPhone" placeholder="Mobile Number (Optional)" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800">
                    <button onclick="completeSubscription('${email}')" class="w-full btn-luxury text-white py-2 rounded-lg">Subscribe Now</button>
                </div>
            `);
            
            window.completeSubscription = function(email) {
                const subscriptionData = {
                    email: email,
                    emailUpdates: document.getElementById('emailUpdates').checked,
                    smsOffers: document.getElementById('smsOffers').checked,
                    whatsappUpdates: document.getElementById('whatsappUpdates').checked,
                    phone: document.getElementById('subscriberPhone').value
                };
                
                // Collect subscription data
                userData.collectData('newsletter_signup', subscriptionData);
                
                // Store email
                let emails = JSON.parse(localStorage.getItem('silvi_emails') || '[]');
                if (!emails.includes(email)) {
                    emails.push(email);
                    localStorage.setItem('silvi_emails', JSON.stringify(emails));
                }
                
                // Store subscription preferences
                let subscribers = JSON.parse(localStorage.getItem('silvi_subscribers') || '[]');
                subscribers.push(subscriptionData);
                localStorage.setItem('silvi_subscribers', JSON.stringify(subscribers));
                
                // Send automated thank you email
                sendThankYouEmail(email);
                
                store.showNotification('Successfully subscribed! Check your email for confirmation.');
                document.body.removeChild(modal);
            };
        }
        e.target.reset();
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
        const modal = createModal('Login with OTP', `
            <form class="space-y-4" id="loginForm">
                <div id="phoneStep">
                    <input type="tel" id="phoneNumber" placeholder="Enter Mobile Number" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" required>
                    <button type="button" onclick="sendOTP()" class="w-full btn-luxury text-white py-2 rounded-lg mt-2">Send OTP</button>
                </div>
                <div id="otpStep" class="hidden">
                    <input type="text" id="otpCode" placeholder="Enter 6-digit OTP" maxlength="6" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800">
                    <button type="button" onclick="verifyOTP()" class="w-full btn-luxury text-white py-2 rounded-lg mt-2">Verify OTP</button>
                    <p class="text-sm text-gray-500 mt-2">OTP sent to <span id="sentTo"></span></p>
                </div>
            </form>
        `);
        
        window.sendOTP = function() {
            const phone = document.getElementById('phoneNumber').value;
            if (phone.length < 10) {
                alert('Please enter valid mobile number');
                return;
            }
            
            // Generate random OTP
            window.currentOTP = Math.floor(100000 + Math.random() * 900000);
            
            // Simulate SMS (in real app, call SMS API)
            console.log('OTP sent:', window.currentOTP);
            alert(`OTP sent to ${phone}: ${window.currentOTP}`);
            
            document.getElementById('phoneStep').classList.add('hidden');
            document.getElementById('otpStep').classList.remove('hidden');
            document.getElementById('sentTo').textContent = phone;
            
            userData.collectData('otp_sent', { phone: phone });
        };
        
        window.verifyOTP = function() {
            const enteredOTP = document.getElementById('otpCode').value;
            if (enteredOTP == window.currentOTP) {
                userData.collectData('login_success', { phone: document.getElementById('phoneNumber').value });
                store.showNotification('Login successful!');
                document.body.removeChild(modal);
                
                // Update UI to show logged in state
                document.querySelector('.login-btn').textContent = 'Account';
            } else {
                alert('Invalid OTP. Please try again.');
            }
        };
    });
    
    registerBtn?.addEventListener('click', () => {
        const modal = createModal('Create Account', `
            <form class="space-y-4" id="signupForm">
                <input type="text" id="fullName" placeholder="Full Name" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" required>
                <input type="email" id="email" placeholder="Email Address" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" required>
                <input type="tel" id="mobile" placeholder="Mobile Number" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800" required>
                <div class="flex items-center space-x-2">
                    <input type="checkbox" id="newsletter" class="text-green-800">
                    <label for="newsletter" class="text-sm">Subscribe to newsletter for exclusive offers</label>
                </div>
                <div class="flex items-center space-x-2">
                    <input type="checkbox" id="whatsapp" class="text-green-800">
                    <label for="whatsapp" class="text-sm">Get updates on WhatsApp</label>
                </div>
                <button type="submit" class="w-full btn-luxury text-white py-2 rounded-lg">Create Account</button>
            </form>
        `);
        
        modal.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                mobile: document.getElementById('mobile').value,
                newsletter: document.getElementById('newsletter').checked,
                whatsapp: document.getElementById('whatsapp').checked
            };
            
            // Email verification step
            const verificationCode = Math.floor(100000 + Math.random() * 900000);
            
            // Send verification email (simulated)
            sendVerificationEmail(formData.email, formData.name, verificationCode);
            
            // Show verification modal
            document.body.removeChild(modal);
            const verifyModal = createModal('Verify Your Email', `
                <div class="text-center space-y-4">
                    <p class="text-gray-600">We've sent a verification code to:</p>
                    <p class="font-semibold text-green-800">${formData.email}</p>
                    <input type="text" id="verificationCode" placeholder="Enter 6-digit code" maxlength="6" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800 text-center text-lg">
                    <button onclick="verifyEmail(${verificationCode}, '${JSON.stringify(formData).replace(/'/g, "\\'")}')") class="w-full btn-luxury text-white py-2 rounded-lg">Verify Email</button>
                    <p class="text-xs text-gray-500">Check your spam folder if you don't see the email</p>
                </div>
            `);
            
            window.verifyEmail = function(correctCode, userDataStr) {
                const enteredCode = document.getElementById('verificationCode').value;
                const userData = JSON.parse(userDataStr);
                
                if (enteredCode == correctCode) {
                    // Store user data after verification
                    userData.collectData('user_registration', userData);
                    
                    // Add to email list if subscribed
                    if (userData.newsletter) {
                        let emails = JSON.parse(localStorage.getItem('silvi_emails') || '[]');
                        if (!emails.includes(userData.email)) {
                            emails.push(userData.email);
                            localStorage.setItem('silvi_emails', JSON.stringify(emails));
                        }
                    }
                    
                    // Store user profile
                    localStorage.setItem('silvi_user', JSON.stringify(userData));
                    
                    // Send welcome email
                    sendWelcomeEmail(userData.email, userData.name);
                    
                    store.showNotification('Email verified! Account created successfully!');
                    document.body.removeChild(verifyModal);
                    
                    // Update UI
                    document.querySelector('.login-btn').textContent = 'Account';
                    document.querySelector('.register-btn').textContent = userData.name.split(' ')[0];
                } else {
                    alert('Invalid verification code. Please try again.');
                }
            };
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