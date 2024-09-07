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

// Add or update an item in the Firebase Realtime Database
window.addItem = function() {
    const itemName = document.getElementById('item-name').value.trim();
    const itemQuantity = parseInt(document.getElementById('item-quantity').value);
    const itemCategory = document.getElementById('item-category').value.trim();

    if (itemName && itemQuantity && itemCategory) {
        // Check if the item already exists in the database
        get(inventoryRef).then((snapshot) => {
            let itemExists = false;
            let itemKey = null;
            let existingQuantity = 0;

            snapshot.forEach((childSnapshot) => {
                const data = childSnapshot.val();
                if (data.name.toLowerCase() === itemName.toLowerCase() && 
                    data.category.toLowerCase() === itemCategory.toLowerCase()) {
                    itemExists = true;
                    itemKey = childSnapshot.key; // Get the Firebase key for the item
                    existingQuantity = data.quantity; // Get the existing quantity
                }
            });

            if (itemExists) {
                // Update the existing item by adding the new quantity
                const updatedQuantity = existingQuantity + itemQuantity;
                const itemRef = ref(database, `inventory/${itemKey}`); // Reference to the existing item
                set(itemRef, {
                    name: itemName,
                    quantity: updatedQuantity,
                    category: itemCategory
                })
                .then(() => {
                    alert("Item quantity updated successfully!");
                    clearFormFields(); // Clear form fields after updating an item
                })
                .catch((error) => {
                    console.error("Error updating item: ", error);
                    alert("Error updating item. Please try again.");
                });
            } else {
                // Add a new item to the inventory
                const newItemRef = push(inventoryRef); // Create a new reference in the 'inventory' node
                set(newItemRef, {
                    name: itemName,
                    quantity: itemQuantity,
                    category: itemCategory
                })
                .then(() => {
                    alert("Item added successfully!");
                    clearFormFields(); // Clear form fields after adding an item
                })
                .catch((error) => {
                    console.error("Error adding item: ", error);
                    alert("Error adding item. Please try again.");
                });
            }
        }).catch((error) => {
            console.error("Error fetching inventory: ", error);
        });
    } else {
        alert("Please fill out all fields.");
    }
};

// Clear form fields after adding/updating an item
function clearFormFields() {
    document.getElementById('item-name').value = '';
    document.getElementById('item-quantity').value = '';
    document.getElementById('item-category').value = '';
}

// Search items based on name or category
window.searchItems = function() {
    const queryText = document.getElementById('search-input').value.toLowerCase();
    onValue(inventoryRef, (snapshot) => {
        const filteredItems = [];
        snapshot.forEach((childSnapshot) => {
            const item = childSnapshot.val();
            if (item.name.toLowerCase().includes(queryText) || 
                item.category.toLowerCase().includes(queryText)) {
                filteredItems.push(item); // Filter items based on the search query
            }
        });
        renderInventory(filteredItems); // Render the filtered results
    });
};

// Initial fetch and rendering of inventory
fetchInventory();