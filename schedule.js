// Import Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

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
const db = getDatabase(app);

// Variables to store doctors and schedules
let doctors = {};
let schedules = {};

// Function to update the dropdown lists with doctor data from Firebase
function updateDoctorSelects() {
    const selectForSchedule = document.getElementById('doctorSelectForSchedule');
    const selectForView = document.getElementById('doctorSelect');
    selectForSchedule.innerHTML = '<option value="">Choose a Doctor</option>';
    selectForView.innerHTML = '<option value="">Choose a Doctor</option>';

    for (const [id, doctor] of Object.entries(doctors)) {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = `${doctor.name} - ${doctor.specialty}`;
        selectForSchedule.appendChild(option);

        const optionForView = option.cloneNode(true);
        selectForView.appendChild(optionForView);
    }
}

// Function to display the schedule for a selected doctor
function displaySchedule(doctorId) {
    const scheduleContainer = document.getElementById('schedule');
    scheduleContainer.innerHTML = '';

    if (!doctorId) {
        scheduleContainer.innerHTML = '<p>Please select a doctor to view their schedule.</p>';
        return;
    }

    const doctor = doctors[doctorId];
    const schedule = schedules[doctorId];

    if (!schedule || schedule.length === 0) {
        scheduleContainer.innerHTML = `<p>No schedule available for ${doctor.name}.</p>`;
        return;
    }

    schedule.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.innerHTML = `
            <h3>${day.day}</h3>
            ${day.shifts.map(shift => `<div class="shift ${shift.trim()}">${capitalizeFirstLetter(shift.trim())}</div>`).join('')}
        `;
        scheduleContainer.appendChild(dayElement);
    });
}

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Event listener for viewing doctor schedule
document.getElementById('doctorSelect').addEventListener('change', (e) => {
    displaySchedule(e.target.value);
});

// Event listener for adding a new doctor
document.getElementById('addDoctorForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('doctorName').value;
    const specialty = document.getElementById('specialty').value;
    const newId = Date.now().toString(); // Use timestamp as unique ID for simplicity

    const doctorRef = ref(db, 'doctors/' + newId);
    set(doctorRef, {
        name: name,
        specialty: specialty
    }).then(() => {
        doctors[newId] = { name, specialty };
        updateDoctorSelects();
        alert(`Dr. ${name} has been added successfully!`);
        e.target.reset();
        document.getElementById('addScheduleForm').style.display = 'block';
    }).catch((error) => {
        console.error('Error adding doctor:', error);
    });
});

// Event listener for adding a new schedule
document.getElementById('addScheduleForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const doctorId = document.getElementById('doctorSelectForSchedule').value;
    const day = document.getElementById('day').value;
    const shifts = document.getElementById('shifts').value.split(',');

    if (!doctorId) {
        alert('Please select a doctor.');
        return;
    }

    const scheduleRef = ref(db, 'schedules/' + doctorId);
    get(scheduleRef).then((snapshot) => {
        const existingSchedule = snapshot.val() || [];
        existingSchedule.push({ day, shifts });
        set(scheduleRef, existingSchedule).then(() => {
            schedules[doctorId] = existingSchedule;
            alert(`Schedule added for Dr. ${doctors[doctorId].name} on ${day}`);
            e.target.reset();
        }).catch((error) => {
            console.error('Error adding schedule:', error);
        });
    }).catch((error) => {
        console.error('Error fetching existing schedule:', error);
    });
});

// Load initial data from Firebase
function loadInitialData() {
    const doctorsRef = ref(db, 'doctors');
    onValue(doctorsRef, (snapshot) => {
        doctors = snapshot.val() || {};
        updateDoctorSelects();
    });

    const schedulesRef = ref(db, 'schedules');
    onValue(schedulesRef, (snapshot) => {
        schedules = snapshot.val() || {};
    });
}

loadInitialData();
