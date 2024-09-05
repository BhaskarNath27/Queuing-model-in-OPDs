import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDwquccsuzkUNxfz5vhxrahyQ5dh-Ygw-g",
    authDomain: "addpatient-e3ca6.firebaseapp.com",
    projectId: "addpatient-e3ca6",
    storageBucket: "addpatient-e3ca6.appspot.com",
    messagingSenderId: "109284311899",
    appId: "1:109284311899:web:f5fe7618dc5b6a9eccd07e"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const donationsRef = ref(database, 'donations');

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

    // Push the donation to Firebase
    push(donationsRef, donation)
      .then(() => {
        alert('Donation added successfully!');
        e.target.reset();
      })
      .catch(error => {
        console.error('Error adding donation to database:', error);
        alert('An error occurred. Please try again later.');
      });
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

// Fetch donations from Firebase and update inventory
onValue(donationsRef, (snapshot) => {
    const data = snapshot.val();
    donations = [];
    bloodInventory = {
        'A+': 0, 'A-': 0, 'B+': 0, 'B-': 0,
        'AB+': 0, 'AB-': 0, 'O+': 0, 'O-': 0
    };

    if (data) {
        Object.entries(data).forEach(([key, value]) => {
            donations.push(value);
            bloodInventory[value.bloodType] += value.units;
        });
        updateInventoryTable();
    }
});
