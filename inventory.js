let inventory = [];

function addItem() {
    const itemName = document.getElementById('item-name').value;
    const itemQuantity = parseInt(document.getElementById('item-quantity').value);

    if (itemName && itemQuantity > 0) {
        inventory.push({ name: itemName, quantity: itemQuantity });
        renderInventory();
    }
}

function renderInventory() {
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = '';

    inventory.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'inventory-item';
        listItem.innerHTML = `
            <span>${item.name}</span>
            <div class="quantity-controls">
                <button onclick="decreaseQuantity(${index})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${index})">+</button>
            </div>
            <button onclick="deleteItem(${index})">Delete</button>
        `;
        inventoryList.appendChild(listItem);
    });
}

function increaseQuantity(index) {
    inventory[index].quantity++;
    renderInventory();
}

function decreaseQuantity(index) {
    if (inventory[index].quantity > 1) {
        inventory[index].quantity--;
        renderInventory();
    }
}

function deleteItem(index) {
    inventory.splice(index, 1);
    renderInventory();
}

function searchItem() {
    const searchItem = document.getElementById('search-item').value.toLowerCase();
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = '';

    inventory.forEach((item, index) => {
        if (item.name.toLowerCase().includes(searchItem)) {
            const listItem = document.createElement('li');
            listItem.className = 'inventory-item';
            listItem.innerHTML = `
                <span>${item.name}</span>
                <div class="quantity-controls">
                    <button onclick="decreaseQuantity(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${index})">+</button>
                </div>
                <button onclick="deleteItem(${index})">Delete</button>
            `;
            inventoryList.appendChild(listItem);
        }
    });
}


// Summary
// Adding Items: Users can add items to the inventory with a specified quantity.
// Managing Quantities: Users can increase or decrease the quantity of items directly from the list.
// Deleting Items: Users can remove items from the inventory.
// Searching: Users can search for specific items by name, and only matching items will be displayed.