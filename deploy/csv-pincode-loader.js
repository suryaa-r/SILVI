// SILVI CSV Pincode Loader - Efficient CSV Processing
class CSVPincodeLoader {
    constructor() {
        this.pincodeData = new Map();
        this.cityIndex = new Map();
        this.stateIndex = new Map();
        this.isLoaded = false;
        this.loadPromise = null;
    }

    // Load and parse CSV data
    async loadCSVData() {
        if (this.loadPromise) return this.loadPromise;
        
        this.loadPromise = this._loadData();
        return this.loadPromise;
    }

    async _loadData() {
        try {
            const response = await fetch('./INDIAN FULL PINCODE DATA.csv');
            const csvText = await response.text();
            
            console.log('CSV file loaded, parsing data...');
            this.parseCSV(csvText);
            this.isLoaded = true;
            console.log(`Pincode data loaded: ${this.pincodeData.size} records`);
            
        } catch (error) {
            console.error('Failed to load CSV data:', error);
            throw error;
        }
    }



    // Parse CSV with efficient indexing
    parseCSV(csvText) {
        const lines = csvText.split('\n');
        const headers = this.parseCSVLine(lines[0]);
        
        // Find column indices - match actual CSV headers from your file
        const indices = {
            pincode: 4, // pincode column
            officename: 3, // officename column  
            district: 7, // district column
            statename: 8, // statename column
            latitude: 9, // latitude column
            longitude: 10, // longitude column
            delivery: 6 // delivery column
        };
        
        console.log('CSV Headers:', headers);
        console.log('Column indices:', indices);

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            try {
                const fields = this.parseCSVLine(line);
                if (fields.length < 6) continue;

                const pincode = fields[indices.pincode]?.toString().trim();
                const officename = fields[indices.officename]?.toString().trim() || '';
                const district = fields[indices.district]?.toString().trim() || '';
                const state = fields[indices.statename]?.toString().trim() || '';
                const lat = fields[indices.latitude]?.toString().trim();
                const lng = fields[indices.longitude]?.toString().trim();
                const delivery = fields[indices.delivery]?.toString().trim();

                if (!pincode || pincode === 'NA') continue;

                const record = {
                    pincode,
                    officename: officename || '',
                    district: district || '',
                    state: state || '',
                    latitude: lat && lat !== 'NA' ? parseFloat(lat) : null,
                    longitude: lng && lng !== 'NA' ? parseFloat(lng) : null,
                    delivery: delivery === 'Delivery'
                };

                // Store in main map
                if (!this.pincodeData.has(pincode)) {
                    this.pincodeData.set(pincode, []);
                }
                this.pincodeData.get(pincode).push(record);

                // Index by city/district
                const cityKey = district.toLowerCase();
                if (cityKey && !this.cityIndex.has(cityKey)) {
                    this.cityIndex.set(cityKey, new Set());
                }
                if (cityKey) this.cityIndex.get(cityKey).add(pincode);

                // Index by state
                const stateKey = state.toLowerCase();
                if (stateKey && !this.stateIndex.has(stateKey)) {
                    this.stateIndex.set(stateKey, new Set());
                }
                if (stateKey) this.stateIndex.get(stateKey).add(pincode);

            } catch (error) {
                console.warn(`Error parsing line ${i}:`, error);
            }
        }
    }

    // Parse CSV line handling quoted fields
    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.replace(/^"|"$/g, '').trim());
                current = '';
            } else {
                current += char;
            }
        }
        
        result.push(current.replace(/^"|"$/g, '').trim());
        return result;
    }

    // Get pincode information
    async getPincodeInfo(pincode) {
        await this.loadCSVData();
        
        const records = this.pincodeData.get(pincode.toString());
        if (!records || records.length === 0) return null;

        const primary = records[0];
        return {
            pincode: primary.pincode,
            city: primary.district,
            district: primary.district,
            state: primary.state,
            postOffices: records.map(r => ({
                name: r.officename,
                delivery: r.delivery
            })),
            coordinates: primary.latitude && primary.longitude ? {
                lat: primary.latitude,
                lng: primary.longitude
            } : null
        };
    }

    // Search by city/district
    async searchByCity(query) {
        await this.loadCSVData();
        
        const searchTerm = query.toLowerCase();
        const results = [];
        
        for (const [cityKey, pincodes] of this.cityIndex) {
            if (cityKey.includes(searchTerm)) {
                for (const pincode of Array.from(pincodes).slice(0, 5)) {
                    const info = await this.getPincodeInfo(pincode);
                    if (info) results.push(info);
                }
            }
            if (results.length >= 20) break;
        }
        
        return results;
    }

    // Search by state
    async searchByState(stateName) {
        await this.loadCSVData();
        
        const stateKey = stateName.toLowerCase();
        const pincodes = this.stateIndex.get(stateKey);
        
        if (!pincodes) return [];
        
        const results = [];
        for (const pincode of Array.from(pincodes).slice(0, 50)) {
            const info = await this.getPincodeInfo(pincode);
            if (info) results.push(info);
        }
        
        return results;
    }

    // Check if data is loaded
    isDataLoaded() {
        return this.isLoaded;
    }

    // Get delivery zones for shipping calculation
    getDeliveryZone(state) {
        const metroZones = ['DELHI', 'MAHARASHTRA', 'KARNATAKA', 'TAMIL NADU', 'TELANGANA', 'WEST BENGAL', 'GUJARAT'];
        const tier1Zones = ['HARYANA', 'PUNJAB', 'UTTAR PRADESH', 'RAJASTHAN', 'MADHYA PRADESH', 'ANDHRA PRADESH'];
        
        const stateUpper = state.toUpperCase();
        
        if (metroZones.includes(stateUpper)) return 'metro';
        if (tier1Zones.includes(stateUpper)) return 'tier1';
        return 'tier2';
    }

    // Get statistics
    getStats() {
        return {
            totalPincodes: this.pincodeData.size,
            totalCities: this.cityIndex.size,
            totalStates: this.stateIndex.size,
            isLoaded: this.isLoaded
        };
    }
}

// Initialize the loader
const csvPincodeLoader = new CSVPincodeLoader();

// Export for global use
window.csvPincodeLoader = csvPincodeLoader;

// Auto-load data when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        csvPincodeLoader.loadCSVData().catch(console.error);
    });
} else {
    csvPincodeLoader.loadCSVData().catch(console.error);
}