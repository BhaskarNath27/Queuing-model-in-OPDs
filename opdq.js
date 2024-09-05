import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, push, get, onValue } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

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
const queueRef = ref(database, 'queue');

// Array to hold the queue data
let queueData = [];

// Fetch initial queue data from Firebase
function fetchQueueData() {
    onValue(queueRef, (snapshot) => {
        queueData = [];
        snapshot.forEach(childSnapshot => {
            const childData = childSnapshot.val();
            queueData.push(childData);
        });
        updateQueueTable();
        updateDoctorOptions();
    });
}

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

    addNewPatient(newPatient);
});

// Function to handle adding a new patient to Firebase
function addNewPatient(patient) {
    push(queueRef, patient)
        .then(() => {
            alert('Patient added to the queue successfully!');
            document.getElementById('appointmentForm').reset(); // Reset form
        })
        .catch(error => {
            console.error('Error adding patient to database:', error);
            alert('An error occurred. Please try again later.');
        });
}

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

// Initial call to populate the queue table and doctor options
fetchQueueData();
