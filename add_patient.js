import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, push, get } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const inputs = document.querySelectorAll('input[type="text"], input[type="date"], select');
    const symptoms = document.querySelectorAll('.serious-symptoms .checkbox');
    const btn = document.querySelector('.btn1');
    const patientTable = document.getElementById('patient-table').getElementsByTagName('tbody')[0];

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
    const patientsRef = ref(database, 'patients');
  
    // Form Validation
    form.addEventListener('submit', function(event) {
      let valid = true;
  
      inputs.forEach(input => {
        if (input.value.trim() === '') {
          input.style.borderColor = 'red';
          valid = false;
        } else {
          input.style.borderColor = '#ccc';
        }
      });
  
      if (!valid) {
        event.preventDefault();
        alert('Please fill out all required fields.');
        return;
      }
  
      // Get form data
      const patientData = {
        name: document.getElementById('name').value,
        phone_num: document.getElementById('phone_num').value,
        patient_relative_name: document.getElementById('patient_relative_name').value,
        patient_relative_contact: document.getElementById('patient_relative_contact').value,
        address: document.getElementById('address').value,
        prior_ailments: document.getElementById('prior_ailments').value,
        bed_num: document.getElementById('bed_num').value,
        dob: document.getElementById('dob').value,
        status: document.getElementById('status').value,
        doctor: document.getElementById('doctor').value,
        symptoms: [] // Array to store selected symptoms
      };
  
      // Get selected symptoms
      symptoms.forEach(checkbox => {
        if (checkbox.checked) {
          patientData.symptoms.push(checkbox.value);
        }
      });
  
      // Show loading state on button
      btn.innerHTML = 'Adding Patient...';
      btn.disabled = true;
  
      // Write patient data to Firebase Realtime Database
      push(patientsRef, patientData)
        .then(() => {
          alert('Patient added successfully!');
          form.reset(); // Clear form after successful submission
          btn.innerHTML = 'Add Patient';
          btn.disabled = false;
          addPatientToTable(patientData); // Add patient to the table
        })
        .catch(error => {
          console.error('Error adding patient:', error);
          alert('There was an error adding the patient. Please try again.');
          btn.innerHTML = 'Add Patient';
          btn.disabled = false;
        });
  
      event.preventDefault(); // Prevent default form submission
    });
  
    // Live Feedback on Input
    inputs.forEach(input => {
      input.addEventListener('input', function() {
        if (input.value.trim() !== '') {
          input.style.borderColor = '#007bff';
        } else {
          input.style.borderColor = 'red';
        }
      });
    });

    // Function to read data from Firebase and display it in the table
    function read() {
        const userRef = ref(database, 'patients');
    
        get(userRef).then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const patientData = childSnapshot.val();
                addPatientToTable(patientData); // Add each patient to the table
            });
        });
    }
    
   // Function to add a patient's data to the table
// Function to add a patient's data to the table
function addPatientToTable(patientData) {
  const row = patientTable.insertRow();
  row.insertCell(0).innerText = patientData.name;
  row.insertCell(1).innerText = patientData.phone_num;
  row.insertCell(2).innerText = patientData.patient_relative_name;
  row.insertCell(3).innerText = patientData.patient_relative_contact;
  row.insertCell(4).innerText = patientData.address;
  row.insertCell(5).innerText = patientData.prior_ailments;
  row.insertCell(6).innerText = patientData.bed_num;
  row.insertCell(7).innerText = patientData.dob;
  row.insertCell(8).innerText = patientData.status;
  row.insertCell(9).innerText = patientData.doctor;
  
  // Properly handle multiple symptoms
  const symptomsCell = row.insertCell(10);
  symptomsCell.innerHTML = patientData.symptoms.length > 0 ? patientData.symptoms.join(', ') : 'None';
  symptomsCell.style.whiteSpace = "pre-wrap";  // Ensure wrapping of text and proper line breaks
}

read();

});
