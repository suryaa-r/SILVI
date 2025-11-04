// Simple pincode data loader for SILVI
// This creates a subset of the full database for faster loading

const pincodeDatabase = {
    // Delhi
    "110001": { "PostOfficeName": "Connaught Place", "City": "New Delhi", "District": "New Delhi", "State": "Delhi" },
    "110002": { "PostOfficeName": "Darya Ganj", "City": "New Delhi", "District": "Central Delhi", "State": "Delhi" },
    "110003": { "PostOfficeName": "Lodi Road", "City": "New Delhi", "District": "South Delhi", "State": "Delhi" },
    "110005": { "PostOfficeName": "Karol Bagh", "City": "New Delhi", "District": "Central Delhi", "State": "Delhi" },
    "110016": { "PostOfficeName": "Green Park", "City": "New Delhi", "District": "South Delhi", "State": "Delhi" },
    "110017": { "PostOfficeName": "Malviya Nagar", "City": "New Delhi", "District": "South Delhi", "State": "Delhi" },
    "110019": { "PostOfficeName": "Nehru Place", "City": "New Delhi", "District": "South Delhi", "State": "Delhi" },
    "110024": { "PostOfficeName": "Defence Colony", "City": "New Delhi", "District": "South Delhi", "State": "Delhi" },
    "110048": { "PostOfficeName": "Greater Kailash", "City": "New Delhi", "District": "South Delhi", "State": "Delhi" },
    "110049": { "PostOfficeName": "South Extension", "City": "New Delhi", "District": "South Delhi", "State": "Delhi" },
    
    // Mumbai
    "400001": { "PostOfficeName": "Fort", "City": "Mumbai", "District": "Mumbai", "State": "Maharashtra" },
    "400002": { "PostOfficeName": "Kalbadevi", "City": "Mumbai", "District": "Mumbai", "State": "Maharashtra" },
    "400004": { "PostOfficeName": "Girgaon", "City": "Mumbai", "District": "Mumbai", "State": "Maharashtra" },
    "400005": { "PostOfficeName": "Colaba", "City": "Mumbai", "District": "Mumbai", "State": "Maharashtra" },
    "400012": { "PostOfficeName": "Lalbaug", "City": "Mumbai", "District": "Mumbai", "State": "Maharashtra" },
    "400016": { "PostOfficeName": "Mahim", "City": "Mumbai", "District": "Mumbai", "State": "Maharashtra" },
    "400018": { "PostOfficeName": "Worli", "City": "Mumbai", "District": "Mumbai", "State": "Maharashtra" },
    "400020": { "PostOfficeName": "Churchgate", "City": "Mumbai", "District": "Mumbai", "State": "Maharashtra" },
    "400050": { "PostOfficeName": "Bandra West", "City": "Mumbai", "District": "Mumbai", "State": "Maharashtra" },
    "400051": { "PostOfficeName": "Bandra East", "City": "Mumbai", "District": "Mumbai", "State": "Maharashtra" },
    
    // Bangalore
    "560001": { "PostOfficeName": "Bangalore GPO", "City": "Bangalore", "District": "Bangalore Urban", "State": "Karnataka" },
    "560002": { "PostOfficeName": "Bangalore City", "City": "Bangalore", "District": "Bangalore Urban", "State": "Karnataka" },
    "560003": { "PostOfficeName": "Gandhinagar", "City": "Bangalore", "District": "Bangalore Urban", "State": "Karnataka" },
    "560004": { "PostOfficeName": "Rajajinagar", "City": "Bangalore", "District": "Bangalore Urban", "State": "Karnataka" },
    "560005": { "PostOfficeName": "Seshadripuram", "City": "Bangalore", "District": "Bangalore Urban", "State": "Karnataka" },
    "560008": { "PostOfficeName": "Sadashivanagar", "City": "Bangalore", "District": "Bangalore Urban", "State": "Karnataka" },
    "560012": { "PostOfficeName": "Malleshwaram", "City": "Bangalore", "District": "Bangalore Urban", "State": "Karnataka" },
    "560025": { "PostOfficeName": "Indiranagar", "City": "Bangalore", "District": "Bangalore Urban", "State": "Karnataka" },
    "560034": { "PostOfficeName": "Jayanagar", "City": "Bangalore", "District": "Bangalore Urban", "State": "Karnataka" },
    "560038": { "PostOfficeName": "BTM Layout", "City": "Bangalore", "District": "Bangalore Urban", "State": "Karnataka" },
    
    // Chennai
    "600001": { "PostOfficeName": "Chennai GPO", "City": "Chennai", "District": "Chennai", "State": "Tamil Nadu" },
    "600002": { "PostOfficeName": "Anna Salai", "City": "Chennai", "District": "Chennai", "State": "Tamil Nadu" },
    "600004": { "PostOfficeName": "Mylapore", "City": "Chennai", "District": "Chennai", "State": "Tamil Nadu" },
    "600006": { "PostOfficeName": "Chepauk", "City": "Chennai", "District": "Chennai", "State": "Tamil Nadu" },
    "600008": { "PostOfficeName": "Thousand Lights", "City": "Chennai", "District": "Chennai", "State": "Tamil Nadu" },
    "600017": { "PostOfficeName": "T Nagar", "City": "Chennai", "District": "Chennai", "State": "Tamil Nadu" },
    "600020": { "PostOfficeName": "Adyar", "City": "Chennai", "District": "Chennai", "State": "Tamil Nadu" },
    "600028": { "PostOfficeName": "Velachery", "City": "Chennai", "District": "Chennai", "State": "Tamil Nadu" },
    "600041": { "PostOfficeName": "Tambaram", "City": "Chennai", "District": "Chennai", "State": "Tamil Nadu" },
    "600042": { "PostOfficeName": "Chromepet", "City": "Chennai", "District": "Chennai", "State": "Tamil Nadu" },
    
    // Hyderabad
    "500001": { "PostOfficeName": "Hyderabad GPO", "City": "Hyderabad", "District": "Hyderabad", "State": "Telangana" },
    "500003": { "PostOfficeName": "Kachiguda", "City": "Hyderabad", "District": "Hyderabad", "State": "Telangana" },
    "500004": { "PostOfficeName": "Sultan Bazar", "City": "Hyderabad", "District": "Hyderabad", "State": "Telangana" },
    "500012": { "PostOfficeName": "Secunderabad", "City": "Hyderabad", "District": "Hyderabad", "State": "Telangana" },
    "500016": { "PostOfficeName": "Banjara Hills", "City": "Hyderabad", "District": "Hyderabad", "State": "Telangana" },
    "500028": { "PostOfficeName": "Jubilee Hills", "City": "Hyderabad", "District": "Hyderabad", "State": "Telangana" },
    "500034": { "PostOfficeName": "Somajiguda", "City": "Hyderabad", "District": "Hyderabad", "State": "Telangana" },
    "500038": { "PostOfficeName": "Madhapur", "City": "Hyderabad", "District": "Hyderabad", "State": "Telangana" },
    "500081": { "PostOfficeName": "Gachibowli", "City": "Hyderabad", "District": "Hyderabad", "State": "Telangana" },
    "500084": { "PostOfficeName": "Kondapur", "City": "Hyderabad", "District": "Hyderabad", "State": "Telangana" },
    
    // Pune
    "411001": { "PostOfficeName": "Pune GPO", "City": "Pune", "District": "Pune", "State": "Maharashtra" },
    "411002": { "PostOfficeName": "Budhwar Peth", "City": "Pune", "District": "Pune", "State": "Maharashtra" },
    "411003": { "PostOfficeName": "Pune University", "City": "Pune", "District": "Pune", "State": "Maharashtra" },
    "411004": { "PostOfficeName": "Pune Cantonment", "City": "Pune", "District": "Pune", "State": "Maharashtra" },
    "411005": { "PostOfficeName": "Deccan Gymkhana", "City": "Pune", "District": "Pune", "State": "Maharashtra" },
    "411007": { "PostOfficeName": "Aundh", "City": "Pune", "District": "Pune", "State": "Maharashtra" },
    "411008": { "PostOfficeName": "Shivajinagar", "City": "Pune", "District": "Pune", "State": "Maharashtra" },
    "411014": { "PostOfficeName": "Pimpri", "City": "Pune", "District": "Pune", "State": "Maharashtra" },
    "411018": { "PostOfficeName": "Chinchwad", "City": "Pune", "District": "Pune", "State": "Maharashtra" },
    "411028": { "PostOfficeName": "Baner", "City": "Pune", "District": "Pune", "State": "Maharashtra" },
    
    // Ahmedabad
    "380001": { "PostOfficeName": "Ahmedabad GPO", "City": "Ahmedabad", "District": "Ahmedabad", "State": "Gujarat" },
    "380002": { "PostOfficeName": "Lal Darwaja", "City": "Ahmedabad", "District": "Ahmedabad", "State": "Gujarat" },
    "380004": { "PostOfficeName": "Navrangpura", "City": "Ahmedabad", "District": "Ahmedabad", "State": "Gujarat" },
    "380006": { "PostOfficeName": "Ellisbridge", "City": "Ahmedabad", "District": "Ahmedabad", "State": "Gujarat" },
    "380007": { "PostOfficeName": "Paldi", "City": "Ahmedabad", "District": "Ahmedabad", "State": "Gujarat" },
    "380009": { "PostOfficeName": "Vastrapur", "City": "Ahmedabad", "District": "Ahmedabad", "State": "Gujarat" },
    "380013": { "PostOfficeName": "Ambawadi", "City": "Ahmedabad", "District": "Ahmedabad", "State": "Gujarat" },
    "380015": { "PostOfficeName": "Satellite", "City": "Ahmedabad", "District": "Ahmedabad", "State": "Gujarat" },
    "380051": { "PostOfficeName": "Bopal", "City": "Ahmedabad", "District": "Ahmedabad", "State": "Gujarat" },
    "380054": { "PostOfficeName": "Prahlad Nagar", "City": "Ahmedabad", "District": "Ahmedabad", "State": "Gujarat" },
    
    // Kolkata
    "700001": { "PostOfficeName": "Kolkata GPO", "City": "Kolkata", "District": "Kolkata", "State": "West Bengal" },
    "700012": { "PostOfficeName": "Alipore", "City": "Kolkata", "District": "Kolkata", "State": "West Bengal" },
    "700016": { "PostOfficeName": "Ballygunge", "City": "Kolkata", "District": "Kolkata", "State": "West Bengal" },
    "700017": { "PostOfficeName": "Elgin Road", "City": "Kolkata", "District": "Kolkata", "State": "West Bengal" },
    "700019": { "PostOfficeName": "New Alipore", "City": "Kolkata", "District": "Kolkata", "State": "West Bengal" },
    "700025": { "PostOfficeName": "Kasba", "City": "Kolkata", "District": "Kolkata", "State": "West Bengal" },
    "700027": { "PostOfficeName": "Ballygunge", "City": "Kolkata", "District": "Kolkata", "State": "West Bengal" },
    "700029": { "PostOfficeName": "Gariahat", "City": "Kolkata", "District": "Kolkata", "State": "West Bengal" },
    "700053": { "PostOfficeName": "Garia", "City": "Kolkata", "District": "Kolkata", "State": "West Bengal" },
    "700091": { "PostOfficeName": "Salt Lake", "City": "Kolkata", "District": "Kolkata", "State": "West Bengal" },
    
    // Jaipur
    "302001": { "PostOfficeName": "Jaipur GPO", "City": "Jaipur", "District": "Jaipur", "State": "Rajasthan" },
    "302002": { "PostOfficeName": "Johari Bazar", "City": "Jaipur", "District": "Jaipur", "State": "Rajasthan" },
    "302003": { "PostOfficeName": "Bapu Nagar", "City": "Jaipur", "District": "Jaipur", "State": "Rajasthan" },
    "302004": { "PostOfficeName": "Civil Lines", "City": "Jaipur", "District": "Jaipur", "State": "Rajasthan" },
    "302006": { "PostOfficeName": "Malviya Nagar", "City": "Jaipur", "District": "Jaipur", "State": "Rajasthan" },
    "302012": { "PostOfficeName": "Mansarovar", "City": "Jaipur", "District": "Jaipur", "State": "Rajasthan" },
    "302013": { "PostOfficeName": "Vaishali Nagar", "City": "Jaipur", "District": "Jaipur", "State": "Rajasthan" },
    "302015": { "PostOfficeName": "C Scheme", "City": "Jaipur", "District": "Jaipur", "State": "Rajasthan" },
    "302017": { "PostOfficeName": "Bani Park", "City": "Jaipur", "District": "Jaipur", "State": "Rajasthan" },
    "302018": { "PostOfficeName": "Shyam Nagar", "City": "Jaipur", "District": "Jaipur", "State": "Rajasthan" },
    
    // Lucknow
    "226001": { "PostOfficeName": "Lucknow GPO", "City": "Lucknow", "District": "Lucknow", "State": "Uttar Pradesh" },
    "226002": { "PostOfficeName": "Hazratganj", "City": "Lucknow", "District": "Lucknow", "State": "Uttar Pradesh" },
    "226003": { "PostOfficeName": "Aminabad", "City": "Lucknow", "District": "Lucknow", "State": "Uttar Pradesh" },
    "226004": { "PostOfficeName": "Chowk", "City": "Lucknow", "District": "Lucknow", "State": "Uttar Pradesh" },
    "226005": { "PostOfficeName": "Nishatganj", "City": "Lucknow", "District": "Lucknow", "State": "Uttar Pradesh" },
    "226010": { "PostOfficeName": "Aliganj", "City": "Lucknow", "District": "Lucknow", "State": "Uttar Pradesh" },
    "226016": { "PostOfficeName": "Gomti Nagar", "City": "Lucknow", "District": "Lucknow", "State": "Uttar Pradesh" },
    "226018": { "PostOfficeName": "Indira Nagar", "City": "Lucknow", "District": "Lucknow", "State": "Uttar Pradesh" },
    "226020": { "PostOfficeName": "Rajajipuram", "City": "Lucknow", "District": "Lucknow", "State": "Uttar Pradesh" },
    "226025": { "PostOfficeName": "Mahanagar", "City": "Lucknow", "District": "Lucknow", "State": "Uttar Pradesh" },
    
    // Additional major cities
    // Gurgaon
    "122001": { "PostOfficeName": "Gurgaon GPO", "City": "Gurgaon", "District": "Gurgaon", "State": "Haryana" },
    "122002": { "PostOfficeName": "Sector 14", "City": "Gurgaon", "District": "Gurgaon", "State": "Haryana" },
    "122003": { "PostOfficeName": "DLF City", "City": "Gurgaon", "District": "Gurgaon", "State": "Haryana" },
    "122004": { "PostOfficeName": "Cyber City", "City": "Gurgaon", "District": "Gurgaon", "State": "Haryana" },
    "122005": { "PostOfficeName": "Golf Course Road", "City": "Gurgaon", "District": "Gurgaon", "State": "Haryana" },
    
    // Noida
    "201301": { "PostOfficeName": "Noida Sector 1", "City": "Noida", "District": "Gautam Buddha Nagar", "State": "Uttar Pradesh" },
    "201303": { "PostOfficeName": "Noida Sector 19", "City": "Noida", "District": "Gautam Buddha Nagar", "State": "Uttar Pradesh" },
    "201304": { "PostOfficeName": "Noida Sector 27", "City": "Noida", "District": "Gautam Buddha Nagar", "State": "Uttar Pradesh" },
    "201305": { "PostOfficeName": "Noida Sector 50", "City": "Noida", "District": "Gautam Buddha Nagar", "State": "Uttar Pradesh" },
    "201307": { "PostOfficeName": "Noida Sector 62", "City": "Noida", "District": "Gautam Buddha Nagar", "State": "Uttar Pradesh" },
    
    // Faridabad
    "121001": { "PostOfficeName": "Faridabad GPO", "City": "Faridabad", "District": "Faridabad", "State": "Haryana" },
    "121002": { "PostOfficeName": "New Industrial Town", "City": "Faridabad", "District": "Faridabad", "State": "Haryana" },
    "121003": { "PostOfficeName": "Sector 16", "City": "Faridabad", "District": "Faridabad", "State": "Haryana" },
    
    // Chandigarh
    "160001": { "PostOfficeName": "Chandigarh GPO", "City": "Chandigarh", "District": "Chandigarh", "State": "Chandigarh" },
    "160012": { "PostOfficeName": "Sector 12", "City": "Chandigarh", "District": "Chandigarh", "State": "Chandigarh" },
    "160017": { "PostOfficeName": "Sector 17", "City": "Chandigarh", "District": "Chandigarh", "State": "Chandigarh" },
    "160022": { "PostOfficeName": "Sector 22", "City": "Chandigarh", "District": "Chandigarh", "State": "Chandigarh" },
    
    // Indore
    "452001": { "PostOfficeName": "Indore GPO", "City": "Indore", "District": "Indore", "State": "Madhya Pradesh" },
    "452002": { "PostOfficeName": "Rajwada", "City": "Indore", "District": "Indore", "State": "Madhya Pradesh" },
    "452003": { "PostOfficeName": "Palasia", "City": "Indore", "District": "Indore", "State": "Madhya Pradesh" },
    "452010": { "PostOfficeName": "Vijay Nagar", "City": "Indore", "District": "Indore", "State": "Madhya Pradesh" },
    
    // Bhopal
    "462001": { "PostOfficeName": "Bhopal GPO", "City": "Bhopal", "District": "Bhopal", "State": "Madhya Pradesh" },
    "462003": { "PostOfficeName": "New Market", "City": "Bhopal", "District": "Bhopal", "State": "Madhya Pradesh" },
    "462016": { "PostOfficeName": "TT Nagar", "City": "Bhopal", "District": "Bhopal", "State": "Madhya Pradesh" },
    
    // Nagpur
    "440001": { "PostOfficeName": "Nagpur GPO", "City": "Nagpur", "District": "Nagpur", "State": "Maharashtra" },
    "440010": { "PostOfficeName": "Civil Lines", "City": "Nagpur", "District": "Nagpur", "State": "Maharashtra" },
    "440012": { "PostOfficeName": "Dharampeth", "City": "Nagpur", "District": "Nagpur", "State": "Maharashtra" },
    
    // Surat
    "395001": { "PostOfficeName": "Surat GPO", "City": "Surat", "District": "Surat", "State": "Gujarat" },
    "395003": { "PostOfficeName": "Nanpura", "City": "Surat", "District": "Surat", "State": "Gujarat" },
    "395007": { "PostOfficeName": "Adajan", "City": "Surat", "District": "Surat", "State": "Gujarat" },
    
    // Vadodara
    "390001": { "PostOfficeName": "Vadodara GPO", "City": "Vadodara", "District": "Vadodara", "State": "Gujarat" },
    "390007": { "PostOfficeName": "Fatehgunj", "City": "Vadodara", "District": "Vadodara", "State": "Gujarat" },
    "390015": { "PostOfficeName": "Alkapuri", "City": "Vadodara", "District": "Vadodara", "State": "Gujarat" }
};

// Add state-wise PIN code ranges for better suggestions
const stateRanges = {
    '11': 'Delhi',
    '12': 'Haryana', 
    '13': 'Punjab',
    '14': 'Chandigarh',
    '15': 'Himachal Pradesh',
    '16': 'Chandigarh',
    '17': 'Punjab',
    '18': 'Haryana',
    '19': 'Uttar Pradesh',
    '20': 'Uttar Pradesh',
    '21': 'Uttar Pradesh',
    '22': 'Uttar Pradesh',
    '24': 'Uttar Pradesh',
    '25': 'Uttar Pradesh',
    '26': 'Uttar Pradesh',
    '27': 'Uttar Pradesh',
    '28': 'Uttar Pradesh',
    '30': 'Rajasthan',
    '31': 'Rajasthan',
    '32': 'Rajasthan',
    '33': 'Rajasthan',
    '34': 'Rajasthan',
    '38': 'Gujarat',
    '39': 'Gujarat',
    '40': 'Maharashtra',
    '41': 'Maharashtra',
    '42': 'Maharashtra',
    '43': 'Maharashtra',
    '44': 'Maharashtra',
    '45': 'Madhya Pradesh',
    '46': 'Madhya Pradesh',
    '47': 'Madhya Pradesh',
    '48': 'Madhya Pradesh',
    '49': 'Madhya Pradesh',
    '50': 'Telangana',
    '51': 'Andhra Pradesh',
    '52': 'Andhra Pradesh',
    '53': 'Andhra Pradesh',
    '56': 'Karnataka',
    '57': 'Karnataka',
    '58': 'Karnataka',
    '59': 'Karnataka',
    '60': 'Tamil Nadu',
    '61': 'Tamil Nadu',
    '62': 'Tamil Nadu',
    '63': 'Tamil Nadu',
    '64': 'Tamil Nadu',
    '67': 'Kerala',
    '68': 'Kerala',
    '69': 'Kerala',
    '70': 'West Bengal',
    '71': 'West Bengal',
    '72': 'West Bengal',
    '73': 'West Bengal',
    '74': 'West Bengal'
};

// Export the database
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { pincodeDatabase, stateRanges };
} else {
    window.pincodeDatabase = pincodeDatabase;
    window.stateRanges = stateRanges;
}