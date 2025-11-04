// SILVI Pincode Integration - UI Components and Handlers
class PincodeIntegration {
    constructor() {
        this.locationService = null;
        this.init();
    }

    async init() {
        // Wait for location service to be ready
        await this.waitForLocationService();
        this.setupEventListeners();
        this.createPincodeComponents();
    }

    async waitForLocationService() {
        return new Promise((resolve) => {
            const checkService = () => {
                if (window.locationService) {
                    this.locationService = window.locationService;
                    resolve();
                } else {
                    setTimeout(checkService, 100);
                }
            };
            checkService();
        });
    }

    setupEventListeners() {
        // Handle pincode input on product pages
        document.addEventListener('input', (e) => {
            if (e.target.matches('.pincode-input')) {
                this.handlePincodeInput(e.target);
            }
        });

        // Handle pincode check buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('.check-pincode-btn')) {
                this.handlePincodeCheck(e.target);
            }
        });

        // Handle location search
        document.addEventListener('input', (e) => {
            if (e.target.matches('.location-search')) {
                this.handleLocationSearch(e.target);
            }
        });
    }

    createPincodeComponents() {
        // Add pincode checker to product detail pages
        const productDetails = document.querySelectorAll('.product-detail, .product-info');
        productDetails.forEach(detail => {
            if (!detail.querySelector('.pincode-checker')) {
                this.addPincodeChecker(detail);
            }
        });

        // Add pincode checker to checkout page
        const checkoutForm = document.querySelector('.checkout-form, #checkout-form');
        if (checkoutForm && !checkoutForm.querySelector('.pincode-checker')) {
            this.addCheckoutPincodeChecker(checkoutForm);
        }
    }

    addPincodeChecker(container) {
        const pincodeHTML = `
            <div class="pincode-checker bg-gray-50 p-4 rounded-lg mt-4">
                <h4 class="font-medium text-gray-800 mb-3">Check Delivery</h4>
                <div class="flex gap-2">
                    <input type="text" 
                           class="pincode-input flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500" 
                           placeholder="Enter pincode" 
                           maxlength="6">
                    <button class="check-pincode-btn bg-sage-600 text-white px-4 py-2 rounded-md hover:bg-sage-700 transition-colors">
                        Check
                    </button>
                </div>
                <div class="pincode-result mt-3 hidden">
                    <div class="delivery-info p-3 bg-white rounded border"></div>
                </div>
                <div class="location-suggestions hidden">
                    <div class="suggestions-list mt-2 bg-white border rounded-md shadow-lg max-h-48 overflow-y-auto"></div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', pincodeHTML);
    }

    addCheckoutPincodeChecker(container) {
        const checkoutPincodeHTML = `
            <div class="checkout-pincode-section mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Location
                </label>
                <div class="location-input-group">
                    <input type="text" 
                           class="location-search w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-500" 
                           placeholder="Search city or enter pincode">
                    <div class="location-suggestions hidden">
                        <div class="suggestions-list mt-1 bg-white border rounded-md shadow-lg max-h-48 overflow-y-auto"></div>
                    </div>
                </div>
                <div class="selected-location mt-3 hidden">
                    <div class="location-details p-3 bg-sage-50 rounded border"></div>
                </div>
            </div>
        `;
        
        const shippingSection = container.querySelector('.shipping-info, .delivery-info') || container;
        shippingSection.insertAdjacentHTML('afterbegin', checkoutPincodeHTML);
    }

    async handlePincodeInput(input) {
        const pincode = input.value.trim();
        
        if (pincode.length === 6 && /^\d{6}$/.test(pincode)) {
            await this.checkPincode(pincode, input);
        } else if (pincode.length > 2) {
            await this.searchLocations(pincode, input);
        } else {
            this.hideResults(input);
        }
    }

    async handlePincodeCheck(button) {
        const container = button.closest('.pincode-checker');
        const input = container.querySelector('.pincode-input');
        const pincode = input.value.trim();

        if (!pincode) {
            this.showError(container, 'Please enter a pincode');
            return;
        }

        if (!/^\d{6}$/.test(pincode)) {
            this.showError(container, 'Please enter a valid 6-digit pincode');
            return;
        }

        await this.checkPincode(pincode, input);
    }

    async handleLocationSearch(input) {
        const query = input.value.trim();
        
        if (query.length < 2) {
            this.hideLocationSuggestions(input);
            return;
        }

        if (/^\d{6}$/.test(query)) {
            await this.checkPincode(query, input);
        } else {
            await this.searchLocations(query, input);
        }
    }

    async checkPincode(pincode, input) {
        const container = input.closest('.pincode-checker, .checkout-pincode-section');
        const resultDiv = container.querySelector('.pincode-result, .selected-location');
        
        try {
            this.showLoading(container);
            
            const deliveryInfo = await this.locationService.checkDeliveryAvailability(pincode);
            const shippingInfo = await this.locationService.getShippingCost(pincode, this.getCurrentCartValue());
            
            if (deliveryInfo.available) {
                this.showDeliveryInfo(resultDiv, deliveryInfo, shippingInfo);
            } else {
                this.showError(container, deliveryInfo.message || 'Delivery not available');
            }
            
        } catch (error) {
            console.error('Pincode check failed:', error);
            this.showError(container, 'Unable to check delivery. Please try again.');
        } finally {
            this.hideLoading(container);
        }
    }

    async searchLocations(query, input) {
        const container = input.closest('.pincode-checker, .checkout-pincode-section');
        const suggestionsDiv = container.querySelector('.location-suggestions');
        const suggestionsList = suggestionsDiv.querySelector('.suggestions-list');
        
        try {
            const locations = await this.locationService.searchLocations(query);
            
            if (locations.length > 0) {
                this.showLocationSuggestions(suggestionsList, locations, input);
                suggestionsDiv.classList.remove('hidden');
            } else {
                this.hideLocationSuggestions(input);
            }
            
        } catch (error) {
            console.error('Location search failed:', error);
            this.hideLocationSuggestions(input);
        }
    }

    showDeliveryInfo(container, deliveryInfo, shippingInfo) {
        const location = deliveryInfo.location;
        const deliveryDays = this.locationService.getDeliveryEstimate(location);
        
        container.innerHTML = `
            <div class="delivery-success">
                <div class="flex items-center text-green-600 mb-2">
                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="font-medium">Delivery Available</span>
                </div>
                <div class="text-sm text-gray-600 space-y-1">
                    <p><strong>Location:</strong> ${location.City}, ${location.State}</p>
                    <p><strong>Delivery Time:</strong> ${deliveryDays}</p>
                    <p><strong>Shipping Cost:</strong> ${shippingInfo.cost === 0 ? 'Free' : `₹${shippingInfo.cost}`}</p>
                    ${shippingInfo.cost > 0 ? '<p class="text-xs text-sage-600">Free shipping on orders above ₹2000</p>' : ''}
                </div>
            </div>
        `;
        container.classList.remove('hidden');
    }

    showLocationSuggestions(container, locations, input) {
        container.innerHTML = locations.map(location => `
            <div class="location-suggestion p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0" 
                 data-pincode="${location.Pincode}">
                <div class="font-medium text-gray-800">${location.City}, ${location.State}</div>
                <div class="text-sm text-gray-500">${location.Pincode} - ${location.PostOfficeName}</div>
            </div>
        `).join('');

        // Handle suggestion clicks
        container.addEventListener('click', (e) => {
            const suggestion = e.target.closest('.location-suggestion');
            if (suggestion) {
                const pincode = suggestion.dataset.pincode;
                input.value = pincode;
                this.hideLocationSuggestions(input);
                this.checkPincode(pincode, input);
            }
        });
    }

    showError(container, message) {
        const resultDiv = container.querySelector('.pincode-result, .selected-location');
        resultDiv.innerHTML = `
            <div class="delivery-error">
                <div class="flex items-center text-red-600 mb-2">
                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="font-medium">Error</span>
                </div>
                <p class="text-sm text-gray-600">${message}</p>
            </div>
        `;
        resultDiv.classList.remove('hidden');
    }

    showLoading(container) {
        const resultDiv = container.querySelector('.pincode-result, .selected-location');
        resultDiv.innerHTML = `
            <div class="delivery-loading flex items-center text-gray-600">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-sage-600 mr-2"></div>
                <span class="text-sm">Checking delivery...</span>
            </div>
        `;
        resultDiv.classList.remove('hidden');
    }

    hideLoading(container) {
        // Loading will be replaced by result
    }

    hideResults(input) {
        const container = input.closest('.pincode-checker, .checkout-pincode-section');
        const resultDiv = container.querySelector('.pincode-result, .selected-location');
        resultDiv.classList.add('hidden');
        this.hideLocationSuggestions(input);
    }

    hideLocationSuggestions(input) {
        const container = input.closest('.pincode-checker, .checkout-pincode-section');
        const suggestionsDiv = container.querySelector('.location-suggestions');
        suggestionsDiv.classList.add('hidden');
    }

    getCurrentCartValue() {
        // Get current cart value from store
        if (typeof store !== 'undefined' && store.cart) {
            return store.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        }
        return 0;
    }

    // Public method to manually trigger pincode check
    async checkDeliveryForPincode(pincode) {
        if (!this.locationService) {
            await this.waitForLocationService();
        }
        
        return await this.locationService.checkDeliveryAvailability(pincode);
    }

    // Get data statistics
    getDataStats() {
        return this.locationService ? this.locationService.getDataStats() : null;
    }
}

// Initialize pincode integration
const pincodeIntegration = new PincodeIntegration();

// Export for global use
window.pincodeIntegration = pincodeIntegration;