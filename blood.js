
// Simulated database
let bloodInventory = {
    'A+': 0, 'A-': 0, 'B+': 0, 'B-': 0,
    'AB+': 0, 'AB-': 0, 'O+': 0, 'O-': 0
};
let donations = [];

// Tab functionality
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab, .tab-content').forEach(el => {
            el.classList.remove('active');
            // Reset position for all tab contents
            if (el.classList.contains('tab-content')) {
                el.style.position = 'absolute';
                el.style.top = '100%';
            }
        });
        tab.classList.add('active');
        const tabContentId = tab.dataset.tab === 'add' ? 'addDonation' : 
                            tab.dataset.tab === 'inventory' ? 'viewInventory' : 'searchBlood';
        const tabContent = document.getElementById(tabContentId);
        tabContent.classList.add('active');
        tabContent.style.position = 'relative';
        tabContent.style.top = '0';
    });
});

// Add donation
document.getElementById('donationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const donation = {
        name: document.getElementById('donorName').value,
        bloodType: document.getElementById('bloodType').value,
        units: parseInt(document.getElementById('units').value),
        date: document.getElementById('donationDate').value
    };
    donations.push(donation);
    bloodInventory[donation.bloodType] += donation.units;
    alert('Donation added successfully!');
    e.target.reset();
    updateInventoryTable();
});

// Update inventory table
function updateInventoryTable() {
    const tbody = document.querySelector('#inventoryTable tbody');
    tbody.innerHTML = '';
    for (const [type, units] of Object.entries(bloodInventory)) {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = type;
        row.insertCell(1).textContent = units;
    }
}

// Search blood
document.getElementById('searchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const searchType = document.getElementById('searchBloodType').value;
    const result = bloodInventory[searchType];
    document.getElementById('searchResult').textContent = 
        `Available units of ${searchType}: ${result} mL`;
});

// Initial inventory table update
updateInventoryTable();
