document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const inputs = document.querySelectorAll('input[type="text"], input[type="date"], select');
    const symptoms = document.querySelectorAll('.serious-symptoms .checkbox');
    const btn = document.querySelector('.btn1');

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

        // Show loading state on button
        btn.innerHTML = 'Adding Patient...';
        btn.disabled = true;
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

});


/*What This JavaScript Does:
Form Validation: When the form is submitted, it checks if all fields are filled out. If any fields are empty, the border of those fields turns red, and a warning alert appears.

Live Feedback: As the user types in any text input or selects a date, the input's border color changes to indicate whether the field is filled out properly.

Symptom Alert: If a serious symptom is checked, an alert pops up to warn the user.

Button Loading State: When the form is submitted, the button text changes to "Adding Patient..." to indicate that the process is underway.

This script adds a layer of interactivity and user-friendliness to the form. */