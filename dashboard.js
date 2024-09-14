document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.nav-button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            button.classList.add('active');

            // Handle redirection based on the data-section attribute
            const section = button.dataset.section;
            if (section) {
                redirectToSection(section);
            }
        });
    });
});

/**
 * Redirects to the specified section page in a new tab.
 * @param {string} section - The section identifier to redirect to.
 */
function redirectToSection(section) {
    const sectionPages = {
        "opd-queue": "opdq.html",
        "add-patient": "add_patient.html",
        "bed-availability": "bed.html",
        "inventory": "inventory.html",
        "refer-patient": "patient_refer.html",
        "staff-training": "training.html",
        "schedule": "schedulenew.html",
        "blood-bank": "blood.html",
        "ambulance" : "ambulance.html"
    };

    const pageUrl = sectionPages[section];
    if (pageUrl) {
        window.location.href = pageUrl;
    } else {
        console.error(`No page found for section: ${section}`);
    }
}
