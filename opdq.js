// Array to hold the queue data
let queueData = [];

// Function to update doctor options in the filter form
function updateDoctorOptions() {
    const doctorSelect = document.getElementById('doctorSelect');
    const doctors = [...new Set(queueData.map(patient => patient.doctor))]; // Unique doctors

    doctorSelect.innerHTML = '<option value="">Select Doctor</option>'; // Reset options
    doctors.forEach(doctor => {
        const option = document.createElement('option');
        option.value = doctor;
        option.textContent = doctor;
        doctorSelect.appendChild(option);
    });
}

// Function to sort the queue based on appointment time (first-come, first-served)
function sortQueueData() {
    queueData.sort((a, b) => new Date(a.appointmentTime) - new Date(b.appointmentTime));
}

// Function to update the queue table with sorted data
function updateQueueTable() {
    sortQueueData(); // Sort the queue data before displaying

    const tbody = document.querySelector('#queueTable tbody');
    tbody.innerHTML = ''; // Clear existing table rows

    queueData.forEach(patient => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = patient.id;
        row.insertCell(1).textContent = patient.name;
        row.insertCell(2).textContent = new Date(patient.appointmentTime).toLocaleString();
        row.insertCell(3).textContent = patient.doctor;
    });
}

// Function to update the doctor-wise queue table
function updateDoctorQueueTable(doctor) {
    const tbody = document.querySelector('#doctorQueueTable tbody');
    tbody.innerHTML = ''; // Clear existing table rows

    const doctorQueue = queueData.filter(patient => patient.doctor === doctor);

    doctorQueue.forEach(patient => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = patient.id;
        row.insertCell(1).textContent = patient.name;
        row.insertCell(2).textContent = new Date(patient.appointmentTime).toLocaleString();
    });
}

// Event listener for the appointment form submission
document.getElementById('appointmentForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // Create a new patient object from the form data
    const newPatient = {
        id: document.getElementById('patientId').value,
        name: document.getElementById('patientName').value,
        appointmentTime: document.getElementById('appointmentTime').value,
        doctor: document.getElementById('doctorName').value,
    };

    // Add the new patient to the queue array
    queueData.push(newPatient);

    // Show a success message and reset the form
    alert('Patient added to the queue successfully!');
    e.target.reset();

    // Update the queue table to reflect the new patient
    updateQueueTable();
    updateDoctorOptions(); // Update doctor options for the filter
});

// Event listener for the doctor filter form submission
document.getElementById('doctorFilterForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const selectedDoctor = document.getElementById('doctorSelect').value;
    if (selectedDoctor) {
        updateDoctorQueueTable(selectedDoctor);
    } else {
        alert('Please select a doctor.');
    }
});

// Function to handle tab switching
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab, .tab-content').forEach(el => el.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab === 'queue' ? 'queueSection' : 
                               tab.dataset.tab === 'appointment' ? 'appointmentSection' : 'doctorQueueSection').classList.add('active');
    });
});

// Initial call to populate the queue table and doctor options (if any data exists)
updateQueueTable();
updateDoctorOptions();
