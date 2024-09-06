const inventory = [
    // { name: 'Syringes', quantity: 500, category: 'Medical Supplies', status: 'Available' },
    // { name: 'Stethoscope', quantity: 50, category: 'Equipment', status: 'Available' },
    // { name: 'Paracetamol', quantity: 200, category: 'Medicines', status: 'Low Stock' }
];

function renderInventory(items = inventory) {
    const inventoryListBody = document.getElementById('inventory-list-body');
    inventoryListBody.innerHTML = '';
    items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.category}</td>
            <td>${item.status}</td>
        `;
        inventoryListBody.appendChild(row);
    });
}

function addItem() {
    const itemName = document.getElementById('item-name').value;
    const itemQuantity = parseInt(document.getElementById('item-quantity').value);
    const itemCategory = document.getElementById('item-category').value;

    if (itemName && itemQuantity && itemCategory) {
        const status = itemQuantity < 100 ? 'Low Stock' : 'Available';
        inventory.push({ name: itemName, quantity: itemQuantity, category: itemCategory, status });
        renderInventory();
        clearFormFields();
    }
}

function clearFormFields() {
    document.getElementById('item-name').value = '';
    document.getElementById('item-quantity').value = '';
    document.getElementById('item-category').value = '';
}

function searchItems() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filteredItems = inventory.filter(item => {
        return item.name.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query) ||
            item.status.toLowerCase().includes(query);
    });
    renderInventory(filteredItems);
}

// Initial rendering of inventory
renderInventory();