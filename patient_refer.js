// Simulated database
let referrals = [];
let hospitals = [];
let doctors = [];

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
    referrals.push(referral);
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
    hospitals.push(hospital);
    updateHospitalTable();
    updateHospitalSelects();
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
    doctors.push(doctor);
    updateDoctorTable();
    updateDoctorSelects();
    alert('Doctor added successfully!');
    e.target.reset();
});

// Update hospital table
function updateHospitalTable() {
    const tbody = document.querySelector('#hospitalTable tbody');
    tbody.innerHTML = '';
    hospitals.forEach(hospital => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = hospital.name;
        row.insertCell(1).textContent = hospital.address;
        row.insertCell(2).textContent = hospital.phone;
    });
}

// Update doctor table
function updateDoctorTable() {
    const tbody = document.querySelector('#doctorTable tbody');
    tbody.innerHTML = '';
    doctors.forEach(doctor => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = doctor.name;
        row.insertCell(1).textContent = doctor.specialty;
        row.insertCell(2).textContent = doctor.hospital;
    });
}

// Update hospital select options
function updateHospitalSelects() {
    const hospitalSelects = document.querySelectorAll('#referringHospital, #doctorHospital');
    hospitalSelects.forEach(select => {
        select.innerHTML = '<option value="">Select Hospital</option>';
        hospitals.forEach(hospital => {
            const option = document.createElement('option');
            option.value = hospital.name;
            option.textContent = hospital.name;
            select.appendChild(option);
        });
    });
}

// Update doctor select options
function updateDoctorSelects() {
    const doctorSelect = document.getElementById('referringDoctor');
    doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
    doctors.forEach(doctor => {
        const option = document.createElement('option');
        option.value = doctor.name;
        option.textContent = `${doctor.name} (${doctor.specialty})`;
        doctorSelect.appendChild(option);
    });
}

// Initial setup
updateHospitalTable();
updateDoctorTable();
updateHospitalSelects();
updateDoctorSelects();
