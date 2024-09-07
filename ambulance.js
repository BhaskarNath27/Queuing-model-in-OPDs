// Dummy data for 50+ ambulances and 20+ drivers with phone numbers
let ambulances = [];
for (let i = 1; i <= 30; i++) {
    ambulances.push({
        number: `AMB${String(i).padStart(3, '0')}`,
        status: i % 3 === 0 ? 'reserved' : 'available',  // Randomly set status
<<<<<<< HEAD
        phone: `+91 98765432${i % 10}${i}`
=======
        phone: `+91 98765432${i % 10}${i}`,  // Correct phone number format
        driver: `Driver ${i}`  // Added driver property for search
>>>>>>> 6659d3ce8aeecf9ec0ef4c0e61fb0ec6d753a09b
    });
}

// Function to load ambulances into the grid
function loadAmbulances() {
    const ambulanceGrid = document.getElementById('ambulance-grid');
    ambulanceGrid.innerHTML = '';

    ambulances.forEach(ambulance => {
        const ambulanceDiv = document.createElement('div');
        ambulanceDiv.classList.add('ambulance');
        if (ambulance.status === 'available') {
            ambulanceDiv.classList.add('available');
        } else {
            ambulanceDiv.classList.add('reserved');
        }

        ambulanceDiv.innerHTML = `
            <div class="driver-number">Ambulance No: ${ambulance.number}</div>
            <div class="availability-status">${ambulance.status === 'available' ? 'Available' : 'Reserved'}</div>
            <div class="phone-icon">
                <img src="phone_icon.jpg" alt="Phone Icon" width="20px" height="20px"> 
                <span>${ambulance.phone}</span>
            </div>
        `;

        ambulanceGrid.appendChild(ambulanceDiv);
    });

    updateSummary();
}

// Function to update the summary section
function updateSummary() {
    const totalAmbulances = ambulances.length;
    const availableAmbulances = ambulances.filter(amb => amb.status === 'available').length;
    const reservedAmbulances = totalAmbulances - availableAmbulances;

    document.getElementById('total-ambulances').innerText = totalAmbulances;
    document.getElementById('available-ambulances').innerText = availableAmbulances;
    document.getElementById('reserved-ambulances').innerText = reservedAmbulances;
}

// Function to search for ambulances by number or driver
function searchAmbulances() {
    const searchValue = document.getElementById('search-ambulance').value.toLowerCase();
    const filteredAmbulances = ambulances.filter(ambulance => 
        ambulance.number.toLowerCase().includes(searchValue) || ambulance.driver.toLowerCase().includes(searchValue)
    );

    const ambulanceGrid = document.getElementById('ambulance-grid');
    ambulanceGrid.innerHTML = '';

    filteredAmbulances.forEach(ambulance => {
        const ambulanceDiv = document.createElement('div');
        ambulanceDiv.classList.add('ambulance');
        if (ambulance.status === 'available') {
            ambulanceDiv.classList.add('available');
        } else {
            ambulanceDiv.classList.add('reserved');
        }

        ambulanceDiv.innerHTML = `
            <div class="driver-number">Ambulance No: ${ambulance.number}</div>
            <div class="driver-name">Driver: ${ambulance.driver}</div>
            <div class="availability-status">${ambulance.status === 'available' ? 'Available' : 'Reserved'}</div>
            <div class="phone-icon">
<<<<<<< HEAD
                <img src="phone-icon.png" alt="Phone Icon" width="20px" height="20px"> 
=======
                <img src="phone_icon.jpg" alt="Phone Icon" width="20px" height="20px"> 
>>>>>>> 6659d3ce8aeecf9ec0ef4c0e61fb0ec6d753a09b
                <span>${ambulance.phone}</span>
            </div>
        `;

        ambulanceGrid.appendChild(ambulanceDiv);
    });
}

// Initialize the page by loading all ambulances
window.onload = loadAmbulances;
