// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATdLPT9FResHcVR5txmIHhwIjKXbsF0og",
    authDomain: "first-project-5e9a3.firebaseapp.com",
    databaseURL: "https://first-project-5e9a3-default-rtdb.firebaseio.com",
    projectId: "first-project-5e9a3",
    storageBucket: "first-project-5e9a3.appspot.com",
    messagingSenderId: "795890594127",
    appId: "1:795890594127:web:d5066cb2ccb5515c26953a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Tab functionality
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab, .tab-content').forEach(el => el.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab + 'Tab').classList.add('active');
    });
});

// Add referral
document.getElementById('referralForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const referral = {
        patientName: document.getElementById('patientName').value,
        dateOfBirth: document.getElementById('dateOfBirth').value,
        medicalHistory: document.getElementById('medicalHistory').value,
        referringHospital: document.getElementById('referringHospital').value,
        referringDoctor: document.getElementById('referringDoctor').value,
        referralDate: document.getElementById('referralDate').value,
        referralReason: document.getElementById('referralReason').value
    };

    // Add referral to Firebase
    const newReferralRef = ref(database, 'referrals/' + Date.now());
    set(newReferralRef, referral);

    alert('Referral submitted successfully!');
    e.target.reset();
});

// Add hospital
document.getElementById('hospitalForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const hospital = {
        name: document.getElementById('hospitalName').value,
        address: document.getElementById('hospitalAddress').value,
        phone: document.getElementById('hospitalPhone').value
    };

    // Add hospital to Firebase
    const newHospitalRef = ref(database, 'hospitals/' + Date.now());
    set(newHospitalRef, hospital);

    alert('Hospital added successfully!');
    e.target.reset();
});

// Add doctor
document.getElementById('doctorForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const doctor = {
        name: document.getElementById('doctorName').value,
        specialty: document.getElementById('specialty').value,
        hospital: document.getElementById('doctorHospital').value
    };

    // Add doctor to Firebase
    const newDoctorRef = ref(database, 'doctors/' + Date.now());
    set(newDoctorRef, doctor);

    alert('Doctor added successfully!');
    e.target.reset();
});

// Update hospital table
function updateHospitalTable() {
    const tbody = document.querySelector('#hospitalTable tbody');
    tbody.innerHTML = '';
    onValue(ref(database, 'hospitals'), (snapshot) => {
        const data = snapshot.val();
        for (let key in data) {
            const hospital = data[key];
            const row = tbody.insertRow();
            row.insertCell(0).textContent = hospital.name;
            row.insertCell(1).textContent = hospital.address;
            row.insertCell(2).textContent = hospital.phone;
        }
    });
}

// Update doctor table
function updateDoctorTable() {
    const tbody = document.querySelector('#doctorTable tbody');
    tbody.innerHTML = '';
    onValue(ref(database, 'doctors'), (snapshot) => {
        const data = snapshot.val();
        for (let key in data) {
            const doctor = data[key];
            const row = tbody.insertRow();
            row.insertCell(0).textContent = doctor.name;
            row.insertCell(1).textContent = doctor.specialty;
            row.insertCell(2).textContent = doctor.hospital;
        }
    });
}

// Update hospital select options
function updateHospitalSelects() {
    const hospitalSelects = document.querySelectorAll('#referringHospital, #doctorHospital');
    onValue(ref(database, 'hospitals'), (snapshot) => {
        const data = snapshot.val();
        hospitalSelects.forEach(select => {
            select.innerHTML = '<option value="">Select Hospital</option>';
            for (let key in data) {
                const hospital = data[key];
                const option = document.createElement('option');
                option.value = hospital.name;
                option.textContent = hospital.name;
                select.appendChild(option);
            }
        });
    });
}

// Update doctor select options
function updateDoctorSelects() {
    const doctorSelect = document.getElementById('referringDoctor');
    onValue(ref(database, 'doctors'), (snapshot) => {
        const data = snapshot.val();
        doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
        for (let key in data) {
            const doctor = data[key];
            const option = document.createElement('option');
            option.value = doctor.name;
            option.textContent = `${doctor.name} (${doctor.specialty})`;
            doctorSelect.appendChild(option);
        }
    });
}

// Initial setup
updateHospitalTable();
updateDoctorTable();
updateHospitalSelects();
updateDoctorSelects();
