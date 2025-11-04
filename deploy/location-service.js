// SILVI Location Service - Indian Pincode Integration
class LocationService {
    constructor() {
        this.csvLoader = window.csvPincodeLoader;
        this.fallbackData = [
            { Pincode: '110001', PostOfficeName: 'Connaught Place', City: 'New Delhi', District: 'New Delhi', State: 'Delhi' },
            { Pincode: '400001', PostOfficeName: 'Fort', City: 'Mumbai', District: 'Mumbai', State: 'Maharashtra' },
            { Pincode: '560001', PostOfficeName: 'Bangalore GPO', City: 'Bangalore', District: 'Bangalore Urban', State: 'Karnataka' }
        ];
    }

    // Validate pincode and get location details
    async validatePincode(pincode) {
        // Try CSV database first
        if (this.csvLoader) {
            try {
                const csvData = await this.csvLoader.getPincodeInfo(pincode.toString());
                if (csvData) {
                    return {
                        Pincode: csvData.pincode,
                        City: csvData.city,
                        District: csvData.district,
                        State: csvData.state,
                        PostOfficeName: csvData.postOffices?.[0]?.name || csvData.city,
                        coordinates: csvData.coordinates,
                        complete: true
                    };
                }
            } catch (error) {
                console.warn('CSV database lookup failed:', error);
            }
        }
        
        // Fallback to minimal data
        const location = this.fallbackData.find(item => item.Pincode === pincode.toString());
        return location || null;
    }

    // Check if pincode data is loaded
    isDataLoaded() {
        return this.csvLoader ? this.csvLoader.isDataLoaded() : true;
    }

    // Get all locations for a state
    async getLocationsByState(state) {
        if (this.csvLoader) {
            try {
                return await this.csvLoader.searchByState(state);
            } catch (error) {
                console.warn('State search failed:', error);
            }
        }
        
        return this.fallbackData.filter(item => 
            item.State.toLowerCase().includes(state.toLowerCase())
        );
    }

    // Get all locations for a city
    async getLocationsByCity(city) {
        if (this.csvLoader) {
            try {
                return await this.csvLoader.searchByCity(city);
            } catch (error) {
                console.warn('City search failed:', error);
            }
        }
        
        return this.fallbackData.filter(item => 
            item.City.toLowerCase().includes(city.toLowerCase())
        );
    }

    // Calculate delivery availability based on pincode
    async checkDeliveryAvailability(pincode) {
        const location = await this.validatePincode(pincode);
        if (!location) return { available: false, message: 'Invalid pincode' };

        // All Indian states are now deliverable with complete database
        const isDeliverable = true;

        return {
            available: isDeliverable,
            location: location,
            estimatedDays: this.getDeliveryEstimate(location),
            message: `Delivery available to ${location.City}, ${location.State}`
        };
    }

    // Get delivery time estimate based on location
    getDeliveryEstimate(location) {
        if (this.csvLoader) {
            const zone = this.csvLoader.getDeliveryZone(location.State);
            switch (zone) {
                case 'metro': return '2-3 business days';
                case 'tier1': return '3-5 business days';
                default: return '5-7 business days';
            }
        }
        
        const metroStates = ['Delhi', 'Maharashtra', 'Karnataka', 'Gujarat'];
        const nearbyStates = ['Haryana', 'Punjab', 'Uttar Pradesh'];
        
        if (metroStates.some(state => location.State.includes(state))) {
            return '2-3 business days';
        } else if (nearbyStates.some(state => location.State.includes(state))) {
            return '3-5 business days';
        } else {
            return '5-7 business days';
        }
    }

    // Get shipping cost based on location
    async getShippingCost(pincode, orderValue = 0) {
        const location = await this.validatePincode(pincode);
        if (!location) return { cost: 0, message: 'Invalid pincode' };

        // Free shipping for orders above ₹2000
        if (orderValue >= 2000) {
            return { cost: 0, message: 'Free shipping on orders above ₹2000' };
        }

        let shippingCost = 150; // Default shipping cost
        
        if (this.csvLoader) {
            const zone = this.csvLoader.getDeliveryZone(location.State);
            switch (zone) {
                case 'metro': shippingCost = 100; break;
                case 'tier1': shippingCost = 120; break;
                default: shippingCost = 150;
            }
        } else {
            const metroStates = ['Delhi', 'Maharashtra', 'Karnataka', 'Gujarat', 'Tamil Nadu', 'Telangana', 'West Bengal'];
            const nearbyStates = ['Haryana', 'Punjab', 'Uttar Pradesh', 'Rajasthan', 'Madhya Pradesh', 'Andhra Pradesh'];
            
            if (metroStates.some(state => location.State.includes(state))) {
                shippingCost = 100;
            } else if (nearbyStates.some(state => location.State.includes(state))) {
                shippingCost = 120;
            }
        }

        return {
            cost: shippingCost,
            location: location,
            message: `Shipping to ${location.City}, ${location.State}`
        };
    }

    // Search locations by partial name
    async searchLocations(query) {
        if (query.length < 2) return [];
        
        // Try CSV database first
        if (this.csvLoader) {
            try {
                const cityResults = await this.csvLoader.searchByCity(query);
                if (cityResults && cityResults.length > 0) {
                    return cityResults.slice(0, 10).map(item => ({
                        Pincode: item.pincode,
                        City: item.city,
                        District: item.district,
                        State: item.state,
                        PostOfficeName: item.postOffices?.[0]?.name || item.city,
                        coordinates: item.coordinates
                    }));
                }
            } catch (error) {
                console.warn('CSV database search failed:', error);
            }
        }
        
        // Fallback to minimal data
        const searchTerm = query.toLowerCase();
        return this.fallbackData.filter(item => 
            item.City.toLowerCase().includes(searchTerm) ||
            item.District.toLowerCase().includes(searchTerm) ||
            item.PostOfficeName.toLowerCase().includes(searchTerm)
        ).slice(0, 10);
    }

    // Get comprehensive statistics
    getDataStats() {
        if (this.csvLoader) {
            return this.csvLoader.getStats();
        }
        return {
            totalPincodes: this.fallbackData.length,
            totalCities: 3,
            totalStates: 3,
            isLoaded: true
        };
    }
}

// Initialize location service
const locationService = new LocationService();
window.locationService = locationService;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LocationService;
}