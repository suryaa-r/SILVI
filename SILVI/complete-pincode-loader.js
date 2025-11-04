// Complete Indian PIN Code Database Loader
class CompletePincodeLoader {
    constructor() {
        this.pincodes = null;
        this.loaded = false;
    }

    async loadPincodes() {
        if (this.loaded) return this.pincodes;
        
        try {
            const response = await fetch('../INDIAN FULL PINCODE DATA.csv');
            const csvText = await response.text();
            
            // Process CSV data
            this.pincodes = this.processCSVData(csvText);
            this.loaded = true;
            
            console.log(`Loaded ${Object.keys(this.pincodes).length} PIN codes from CSV`);
            return this.pincodes;
        } catch (error) {
            console.error('Failed to load CSV PIN code database:', error);
            // Fallback to basic data
            this.pincodes = this.getFallbackData();
            this.loaded = true;
            return this.pincodes;
        }
    }

    processCSVData(csvText) {
        const processed = {};
        const lines = csvText.split('\n');
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
            const entry = {};
            
            headers.forEach((header, index) => {
                entry[header] = values[index] || '';
            });
            
            const pincode = entry.Pincode || entry.pincode;
            if (pincode && !processed[pincode]) {
                processed[pincode] = {
                    pincode: pincode,
                    city: entry.City || entry.city || entry.OfficeName,
                    district: entry.District || entry.district,
                    state: entry.State || entry.state || entry.StateName,
                    postOffices: [{
                        name: entry.OfficeName || entry.PostOfficeName || entry.city,
                        city: entry.City || entry.city,
                        district: entry.District || entry.district
                    }]
                };
            }
        }
        
        return processed;
    }

    getFallbackData() {
        return {
            // Major cities fallback data
            '110001': { pincode: '110001', city: 'New Delhi', district: 'Central Delhi', state: 'Delhi' },
            '400001': { pincode: '400001', city: 'Mumbai', district: 'Mumbai City', state: 'Maharashtra' },
            '560001': { pincode: '560001', city: 'Bangalore', district: 'Bangalore Urban', state: 'Karnataka' },
            '600001': { pincode: '600001', city: 'Chennai', district: 'Chennai', state: 'Tamil Nadu' },
            '500001': { pincode: '500001', city: 'Hyderabad', district: 'Hyderabad', state: 'Telangana' },
            '411001': { pincode: '411001', city: 'Pune', district: 'Pune', state: 'Maharashtra' },
            '380001': { pincode: '380001', city: 'Ahmedabad', district: 'Ahmedabad', state: 'Gujarat' },
            '700001': { pincode: '700001', city: 'Kolkata', district: 'Kolkata', state: 'West Bengal' },
            '302001': { pincode: '302001', city: 'Jaipur', district: 'Jaipur', state: 'Rajasthan' },
            '226001': { pincode: '226001', city: 'Lucknow', district: 'Lucknow', state: 'Uttar Pradesh' },
            '122001': { pincode: '122001', city: 'Gurgaon', district: 'Gurgaon', state: 'Haryana' },
            '201301': { pincode: '201301', city: 'Noida', district: 'Gautam Buddha Nagar', state: 'Uttar Pradesh' },
            '121001': { pincode: '121001', city: 'Faridabad', district: 'Faridabad', state: 'Haryana' },
            '160001': { pincode: '160001', city: 'Chandigarh', district: 'Chandigarh', state: 'Chandigarh' },
            '452001': { pincode: '452001', city: 'Indore', district: 'Indore', state: 'Madhya Pradesh' }
        };
    }

    async getPincodeInfo(pincode) {
        if (!this.loaded) {
            await this.loadPincodes();
        }
        
        return this.pincodes[pincode] || null;
    }

    async searchByCity(cityName) {
        if (!this.loaded) {
            await this.loadPincodes();
        }
        
        const results = [];
        const searchTerm = cityName.toLowerCase();
        
        Object.values(this.pincodes).forEach(entry => {
            if (entry.city.toLowerCase().includes(searchTerm) || 
                entry.district.toLowerCase().includes(searchTerm)) {
                results.push(entry);
            }
        });
        
        return results.slice(0, 10); // Limit results
    }

    async searchByState(stateName) {
        if (!this.loaded) {
            await this.loadPincodes();
        }
        
        const results = [];
        const searchTerm = stateName.toLowerCase();
        
        Object.values(this.pincodes).forEach(entry => {
            if (entry.state.toLowerCase().includes(searchTerm)) {
                results.push(entry);
            }
        });
        
        return results.slice(0, 20); // Limit results
    }

    async getAllStates() {
        if (!this.loaded) {
            await this.loadPincodes();
        }
        
        const states = new Set();
        Object.values(this.pincodes).forEach(entry => {
            states.add(entry.state);
        });
        
        return Array.from(states).sort();
    }

    async getPincodesByState(stateName) {
        if (!this.loaded) {
            await this.loadPincodes();
        }
        
        const results = [];
        Object.values(this.pincodes).forEach(entry => {
            if (entry.state.toLowerCase() === stateName.toLowerCase()) {
                results.push(entry);
            }
        });
        
        return results;
    }

    async validatePincode(pincode) {
        if (!this.loaded) {
            await this.loadPincodes();
        }
        
        return this.pincodes.hasOwnProperty(pincode);
    }

    async getSuggestions(partialPincode) {
        if (!this.loaded) {
            await this.loadPincodes();
        }
        
        const suggestions = [];
        const searchTerm = partialPincode.toString();
        
        Object.keys(this.pincodes).forEach(pincode => {
            if (pincode.startsWith(searchTerm)) {
                suggestions.push(this.pincodes[pincode]);
            }
        });
        
        return suggestions.slice(0, 10);
    }
}

// Create global instance
window.completePincodeLoader = new CompletePincodeLoader();

// Auto-load on page load
document.addEventListener('DOMContentLoaded', () => {
    window.completePincodeLoader.loadPincodes();
});