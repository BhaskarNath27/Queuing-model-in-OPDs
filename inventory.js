import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, push, get, onValue, set } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// Firebase configuration
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
const inventoryRef = ref(database, 'inventory'); // Reference to the 'inventory' node in Firebase

// Function to render inventory items
function renderInventory(items) {
    const inventoryListBody = document.getElementById('inventory-list-body');
    inventoryListBody.innerHTML = ''; // Clear the table body
    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.category}</td>
            <td>${item.status}</td>
        `;
        inventoryListBody.appendChild(row); // Append each row to the table
    });
}

// Fetch inventory from Firebase and render in real-time
function fetchInventory() {
    onValue(inventoryRef, (snapshot) => {
        const inventory = [];
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val(); // Get the actual data from Firebase
            inventory.push(data); // Add the data to the inventory array
        });
        renderInventory(inventory); // Call the render function to display the data
    });
}

// Add a new item to the Firebase Realtime Database
window.addItem = function() {
    const itemName = document.getElementById('item-name').value;
    const itemQuantity = parseInt(document.getElementById('item-quantity').value);
    const itemCategory = document.getElementById('item-category').value;

    if (itemName && itemQuantity && itemCategory) {
        const status = itemQuantity < 100 ? 'Low Stock' : 'Available';
        const newItemRef = push(inventoryRef); // Create a new reference in the 'inventory' node
        set(newItemRef, {
            name: itemName,
            quantity: itemQuantity,
            category: itemCategory,
            status: status
        })
        .then(() => {
            alert("Item added successfully!"); // Show success message
            clearFormFields(); // Clear form fields after adding an item
        })
        .catch((error) => {
            console.error("Error adding item: ", error);
            alert("Error adding item. Please try again.");
        });
    } else {
        alert("Please fill out all fields.");
    }
};

// Clear form fields after adding an item
function clearFormFields() {
    document.getElementById('item-name').value = '';
    document.getElementById('item-quantity').value = '';
    document.getElementById('item-category').value = '';
}

// Search items based on name, category, or status
window.searchItems = function() {
    const queryText = document.getElementById('search-input').value.toLowerCase();
    onValue(inventoryRef, (snapshot) => {
        const filteredItems = [];
        snapshot.forEach((childSnapshot) => {
            const item = childSnapshot.val();
            if (item.name.toLowerCase().includes(queryText) || 
                item.category.toLowerCase().includes(queryText) ||
                item.status.toLowerCase().includes(queryText)) {
                filteredItems.push(item); // Filter items based on the search query
            }
        });
        renderInventory(filteredItems); // Render the filtered results
    });
};

// Initial fetch and rendering of inventory
fetchInventory();