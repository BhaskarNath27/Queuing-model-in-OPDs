let queueNumber = 1;

document.getElementById('addPatientForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const patientName = document.getElementById('patientName').value;
    const fatherName = document.getElementById('fatherName').value;
    if (patientName && fatherName) {
        const queueList = document.getElementById('queueList');
        const listItem = document.createElement('li');
        listItem.textContent = `${queueNumber}. ${patientName} (Father: ${fatherName})`;
        queueList.appendChild(listItem);
        document.getElementById('patientName').value = '';
        document.getElementById('fatherName').value = '';
        queueNumber++;
    }
});

function searchPatient() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const queueList = document.getElementById('queueList');
    const items = queueList.getElementsByTagName('li');
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.textContent.toLowerCase().includes(searchInput)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    }
}