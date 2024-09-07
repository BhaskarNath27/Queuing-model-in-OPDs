const generalWardBeds = [
    { number: 'A1', status: 'available' },
    { number: 'A2', status: 'reserved' },
    { number: 'A3', status: 'available' },
    { number: 'A4', status: 'reserved' },
    { number: 'A5', status: 'available' },
    { number: 'A6', status: 'reserved' },
    { number: 'A7', status: 'available' },
    { number: 'A8', status: 'reserved' },
    { number: 'A9', status: 'available' },
    { number: 'A10', status: 'reserved' },
    { number: 'A11', status: 'available' },
    { number: 'A12', status: 'reserved' },
    { number: 'A13', status: 'available' },
    { number: 'A14', status: 'reserved' },
    { number: 'A15', status: 'available' },
    { number: 'A16', status: 'reserved' },
    { number: 'A17', status: 'available' },
    { number: 'A18', status: 'reserved' },
    { number: 'A19', status: 'available' },
    { number: 'A20', status: 'reserved' }
];

const icuWardBeds = [
    { number: 'ICU1', status: 'available' },
    { number: 'ICU2', status: 'reserved' },
    { number: 'ICU3', status: 'available' },
    { number: 'ICU4', status: 'reserved' },
    { number: 'ICU5', status: 'available' },
    { number: 'ICU6', status: 'reserved' },
    { number: 'ICU7', status: 'available' },
    { number: 'ICU8', status: 'reserved' },
    { number: 'ICU9', status: 'available' },
    { number: 'ICU10', status: 'reserved' }
];

const privateWardBeds = [
    { number: 'P1', status: 'available' },
    { number: 'P2', status: 'reserved' },
    { number: 'P3', status: 'available' },
    { number: 'P4', status: 'reserved' },
    { number: 'P5', status: 'available' },
    { number: 'P6', status: 'reserved' },
    { number: 'P7', status: 'available' },
    { number: 'P8', status: 'reserved' },
    { number: 'P9', status: 'available' },
    { number: 'P10', status: 'reserved' }
];

// Function to toggle bed status between 'available' and 'reserved'
function toggleBedStatus(bed, containerId) {
    bed.status = bed.status === 'available' ? 'reserved' : 'available';
    createBedElements(getBedsByWard(containerId), containerId);
    updateBedCounts();
}

// Function to create bed elements with buttons to free or occupy
function createBedElements(beds, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous beds
    beds.forEach(bed => {
        const bedElement = document.createElement('div');
        bedElement.classList.add('bed');
        bedElement.classList.add(bed.status === 'available' ? 'available' : 'reserved');
        bedElement.innerHTML = `
            <div class="bed-number">${bed.number}</div>
            <button onclick="toggleBedStatus(${JSON.stringify(bed)}, '${containerId}')">
                ${bed.status === 'available' ? 'Occupy' : 'Free'}
            </button>
        `;
        container.appendChild(bedElement);
    });
}

// Function to search for beds by number or status
function searchBeds(containerId, searchInputId) {
    const query = document.getElementById(searchInputId).value.toLowerCase();
    const beds = getBedsByWard(containerId);

    const filteredBeds = beds.filter(bed => bed.number.toLowerCase().includes(query) || bed.status.toLowerCase().includes(query));
    createBedElements(filteredBeds, containerId);
}

// Function to update total, available, and reserved bed counts
function updateBedCounts() {
    const allBeds = [...generalWardBeds, ...icuWardBeds, ...privateWardBeds];
    const totalBeds = allBeds.length;
    const availableBeds = allBeds.filter(bed => bed.status === 'available').length;
    const reservedBeds = totalBeds - availableBeds;

    document.getElementById('total-beds').textContent = totalBeds;
    document.getElementById('available-beds').textContent = availableBeds;
    document.getElementById('reserved-beds').textContent = reservedBeds;
}

// Function to get beds based on ward type
function getBedsByWard(ward) {
    if (ward === 'general-ward') return generalWardBeds;
    if (ward === 'icu-ward') return icuWardBeds;
    if (ward === 'private-ward') return privateWardBeds;
    return [];
}

// Initialize bed grids and counts
createBedElements(generalWardBeds, 'general-ward');
createBedElements(icuWardBeds, 'icu-ward');
createBedElements(privateWardBeds, 'private-ward');
updateBedCounts();
