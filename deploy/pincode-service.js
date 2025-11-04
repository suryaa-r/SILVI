// SILVI Pincode Service
class PincodeService {
    constructor() {
        this.pincodeData = [];
        this.loadPincodeData();
    }

    async loadPincodeData() {
        try {
            const response = await fetch('INDIAN FULL PINCODE DATA.csv');
            const csvText = await response.text();
            this.pincodeData = this.parseCSV(csvText);
            console.log('Pincode data loaded:', this.pincodeData.length, 'records');
        } catch (error) {
            console.error('Failed to load CSV pincode data:', error);
        }
    }

    parseCSV(csvText) {
        const lines = csvText.split('\n');
        const data = [];
        
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
            if (values.length >= 11) {
                data.push({
                    circlename: values[0],
                    regionname: values[1],
                    divisionname: values[2],
                    officename: values[3],
                    pincode: values[4],
                    officetype: values[5],
                    delivery: values[6],
                    district: values[7],
                    statename: values[8],
                    latitude: values[9],
                    longitude: values[10]
                });
            }
        }
        return data;
    }

    validatePincode(pincode) {
        if (this.pincodeData.length === 0) return null;
        
        const pin = pincode.toString().trim();
        const result = this.pincodeData.find(item => 
            item.pincode === pin
        );
        
        return result ? {
            pincode: result.pincode,
            city: result.officename,
            district: result.district,
            state: result.statename,
            postOffice: result.officename
        } : null;
    }

    getDeliveryInfo(pincode) {
        const location = this.validatePincode(pincode);
        if (!location) return null;

        // Delivery zones based on major cities and states
        const deliveryZones = {
            // Metro cities - Free delivery
            'New Delhi': { days: '2-3', charge: 0, cod: true },
            'Delhi': { days: '2-3', charge: 0, cod: true },
            'Mumbai': { days: '3-4', charge: 0, cod: true },
            'Bangalore': { days: '3-4', charge: 0, cod: true },
            'Chennai': { days: '3-4', charge: 0, cod: true },
            'Hyderabad': { days: '3-4', charge: 0, cod: true },
            'Pune': { days: '3-4', charge: 0, cod: true },
            'Kolkata': { days: '4-5', charge: 0, cod: true },
            
            // Major cities - Low delivery charge
            'Ahmedabad': { days: '4-5', charge: 50, cod: true },
            'Jaipur': { days: '3-4', charge: 50, cod: true },
            'Gurgaon': { days: '2-3', charge: 0, cod: true },
            'Faridabad': { days: '2-3', charge: 0, cod: true },
            'Noida': { days: '2-3', charge: 0, cod: true },
            'Ghaziabad': { days: '2-3', charge: 0, cod: true },
            'Lucknow': { days: '4-5', charge: 50, cod: true },
            'Kanpur': { days: '4-5', charge: 50, cod: true },
            'Nagpur': { days: '4-5', charge: 50, cod: true },
            'Indore': { days: '4-5', charge: 50, cod: true },
            'Bhopal': { days: '4-5', charge: 50, cod: true },
            'Visakhapatnam': { days: '5-6', charge: 60, cod: true },
            'Patna': { days: '5-6', charge: 60, cod: true },
            'Vadodara': { days: '4-5', charge: 50, cod: true },
            'Ludhiana': { days: '3-4', charge: 50, cod: true },
            'Agra': { days: '4-5', charge: 50, cod: true },
            'Nashik': { days: '4-5', charge: 50, cod: true },
            'Meerut': { days: '3-4', charge: 50, cod: true },
            'Rajkot': { days: '5-6', charge: 60, cod: true },
            'Varanasi': { days: '5-6', charge: 60, cod: true },
            'Srinagar': { days: '6-8', charge: 100, cod: false },
            'Aurangabad': { days: '5-6', charge: 60, cod: true },
            'Dhanbad': { days: '5-6', charge: 60, cod: true },
            'Amritsar': { days: '4-5', charge: 50, cod: true },
            'Allahabad': { days: '5-6', charge: 60, cod: true },
            'Ranchi': { days: '5-6', charge: 60, cod: true },
            'Howrah': { days: '4-5', charge: 50, cod: true },
            'Coimbatore': { days: '5-6', charge: 60, cod: true },
            'Jabalpur': { days: '5-6', charge: 60, cod: true },
            'Gwalior': { days: '4-5', charge: 50, cod: true },
            'Vijayawada': { days: '5-6', charge: 60, cod: true },
            'Jodhpur': { days: '4-5', charge: 50, cod: true },
            'Madurai': { days: '5-6', charge: 60, cod: true },
            'Raipur': { days: '5-6', charge: 60, cod: true },
            'Kota': { days: '4-5', charge: 50, cod: true },
            'Chandigarh': { days: '3-4', charge: 50, cod: true },
            'Guwahati': { days: '6-8', charge: 100, cod: true },
            'Solapur': { days: '5-6', charge: 60, cod: true },
            'Hubli': { days: '5-6', charge: 60, cod: true },
            'Bareilly': { days: '4-5', charge: 50, cod: true },
            'Moradabad': { days: '4-5', charge: 50, cod: true },
            'Mysore': { days: '5-6', charge: 60, cod: true },
            'Gurgaon': { days: '2-3', charge: 0, cod: true },
            'Aligarh': { days: '4-5', charge: 50, cod: true },
            'Jalandhar': { days: '4-5', charge: 50, cod: true },
            'Tiruchirappalli': { days: '5-6', charge: 60, cod: true },
            'Bhubaneswar': { days: '5-6', charge: 60, cod: true },
            'Salem': { days: '5-6', charge: 60, cod: true },
            'Warangal': { days: '5-6', charge: 60, cod: true },
            'Mira Bhayandar': { days: '3-4', charge: 50, cod: true },
            'Thiruvananthapuram': { days: '6-7', charge: 80, cod: true },
            'Bhiwandi': { days: '4-5', charge: 50, cod: true },
            'Saharanpur': { days: '4-5', charge: 50, cod: true },
            'Gorakhpur': { days: '5-6', charge: 60, cod: true },
            'Guntur': { days: '5-6', charge: 60, cod: true },
            'Bikaner': { days: '5-6', charge: 60, cod: true },
            'Amravati': { days: '5-6', charge: 60, cod: true },
            'Noida': { days: '2-3', charge: 0, cod: true },
            'Jamshedpur': { days: '5-6', charge: 60, cod: true },
            'Bhilai Nagar': { days: '5-6', charge: 60, cod: true },
            'Cuttack': { days: '5-6', charge: 60, cod: true },
            'Firozabad': { days: '4-5', charge: 50, cod: true },
            'Kochi': { days: '6-7', charge: 80, cod: true },
            'Bhavnagar': { days: '5-6', charge: 60, cod: true },
            'Dehradun': { days: '4-5', charge: 50, cod: true },
            'Durgapur': { days: '5-6', charge: 60, cod: true },
            'Asansol': { days: '5-6', charge: 60, cod: true },
            'Nanded Waghala': { days: '5-6', charge: 60, cod: true },
            'Kolhapur': { days: '5-6', charge: 60, cod: true },
            'Ajmer': { days: '4-5', charge: 50, cod: true },
            'Gulbarga': { days: '5-6', charge: 60, cod: true },
            'Jamnagar': { days: '5-6', charge: 60, cod: true },
            'Ujjain': { days: '5-6', charge: 60, cod: true },
            'Loni': { days: '3-4', charge: 50, cod: true },
            'Siliguri': { days: '6-7', charge: 80, cod: true },
            'Jhansi': { days: '4-5', charge: 50, cod: true },
            'Ulhasnagar': { days: '4-5', charge: 50, cod: true },
            'Nellore': { days: '5-6', charge: 60, cod: true },
            'Jammu': { days: '5-6', charge: 80, cod: true },
            'Sangli Miraj Kupwad': { days: '5-6', charge: 60, cod: true },
            'Belgaum': { days: '5-6', charge: 60, cod: true },
            'Mangalore': { days: '6-7', charge: 80, cod: true },
            'Ambattur': { days: '5-6', charge: 60, cod: true },
            'Tirunelveli': { days: '6-7', charge: 80, cod: true },
            'Malegaon': { days: '5-6', charge: 60, cod: true },
            'Gaya': { days: '5-6', charge: 60, cod: true },
            'Jalgaon': { days: '5-6', charge: 60, cod: true },
            'Udaipur': { days: '5-6', charge: 60, cod: true },
            'Maheshtala': { days: '5-6', charge: 60, cod: true }
        };

        // State-based delivery for areas not in city list
        const stateDelivery = {
            'Delhi': { days: '2-3', charge: 0, cod: true },
            'Maharashtra': { days: '4-5', charge: 60, cod: true },
            'Karnataka': { days: '5-6', charge: 60, cod: true },
            'Tamil Nadu': { days: '5-6', charge: 60, cod: true },
            'Uttar Pradesh': { days: '4-5', charge: 60, cod: true },
            'Gujarat': { days: '5-6', charge: 60, cod: true },
            'Rajasthan': { days: '4-5', charge: 60, cod: true },
            'West Bengal': { days: '5-6', charge: 60, cod: true },
            'Madhya Pradesh': { days: '5-6', charge: 60, cod: true },
            'Telangana': { days: '5-6', charge: 60, cod: true },
            'Andhra Pradesh': { days: '5-6', charge: 60, cod: true },
            'Kerala': { days: '6-7', charge: 80, cod: true },
            'Punjab': { days: '4-5', charge: 60, cod: true },
            'Haryana': { days: '3-4', charge: 50, cod: true },
            'Bihar': { days: '5-6', charge: 80, cod: true },
            'Odisha': { days: '5-6', charge: 80, cod: true },
            'Jharkhand': { days: '5-6', charge: 80, cod: true },
            'Assam': { days: '6-8', charge: 100, cod: true },
            'Chhattisgarh': { days: '5-6', charge: 80, cod: true },
            'Uttarakhand': { days: '4-5', charge: 60, cod: true },
            'Himachal Pradesh': { days: '5-6', charge: 80, cod: true },
            'Jammu and Kashmir': { days: '6-8', charge: 120, cod: false },
            'Goa': { days: '5-6', charge: 60, cod: true },
            'Tripura': { days: '7-10', charge: 120, cod: true },
            'Manipur': { days: '7-10', charge: 120, cod: true },
            'Meghalaya': { days: '7-10', charge: 120, cod: true },
            'Mizoram': { days: '7-10', charge: 120, cod: true },
            'Nagaland': { days: '7-10', charge: 120, cod: true },
            'Arunachal Pradesh': { days: '7-10', charge: 120, cod: false },
            'Sikkim': { days: '6-8', charge: 100, cod: true }
        };

        // First try city-specific delivery
        let zone = deliveryZones[location.city];
        
        // If not found, try state-based delivery
        if (!zone) {
            zone = stateDelivery[location.state];
        }
        
        // Default for remote areas
        if (!zone) {
            zone = { days: '7-10', charge: 120, cod: false };
        }
        
        return {
            ...location,
            deliveryDays: zone.days,
            deliveryCharge: zone.charge,
            codAvailable: zone.cod
        };
    }
}

// Initialize service
const pincodeService = new PincodeService();

// Export for use in other files
window.pincodeService = pincodeService;

// Wait for data to load before making service available
window.addEventListener('load', () => {
    // Give some time for the service to load data
    setTimeout(() => {
        if (window.pincodeService && window.pincodeService.pincodeData) {
            console.log('Pincode service ready with', window.pincodeService.pincodeData.length, 'records');
        }
    }, 1000);
});