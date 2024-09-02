document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            
            sections.forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetSection).classList.add('active');

            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Form submission
    const scheduleForm = document.getElementById('schedule-form');
    scheduleForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        alert(`Session scheduled for ${date} at ${time}`);
        this.reset();
    });

    // Simulating module start
    const startButtons = document.querySelectorAll('.module-card button');
    startButtons.forEach(button => {
        button.addEventListener('click', function() {
            const moduleName = this.parentElement.querySelector('h3').textContent;
            alert(`Starting VR training: ${moduleName}`);
        });
    });
});