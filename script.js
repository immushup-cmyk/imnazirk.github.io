// Menu Icon Toggle for Mobile
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Scroll Sections Active Link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    // Sticky Navbar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove toggle icon and navbar when clicking navbar link
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Typed.js Animation for Hero Section
const typed = new Typed('.typing-text', {
    strings: ['Freelance Software Developer', 'Website Designer & Coder', 'Android Developer'],
    typeSpeed: 70,
    backSpeed: 50,
    backDelay: 1000,
    loop: true
});

// Auto Generate PDF Resume
const downloadBtn = document.getElementById('download-btn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Initialize jsPDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Setup styles and content
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text("Md Nazir Ahamed", 20, 20);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(14);
        doc.setTextColor(37, 99, 235); // Blue Accent
        doc.text("Freelance Software & Android Developer", 20, 30);
        
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text("Email: imnazirk@gmail.com", 20, 40);
        doc.text("Portfolio: https://imnazirk.github.io", 20, 48);
        
        // Draw a line
        doc.setDrawColor(200, 200, 200);
        doc.line(20, 55, 190, 55);
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(30, 58, 138); // Dark Blue
        doc.text("About Me", 20, 68);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(50, 50, 50);
        const aboutText = "I am a passionate developer with a strong foundation in writing clean code, designing intuitive user interfaces, and building custom digital solutions. My goal is to bridge the gap between design and engineering, crafting products that look good and perform flawlessly. Whether it's a dynamic web application, a robust Android app, or a complete software architecture, I bring dedication and technical expertise to every project I undertake.";
        const splitAbout = doc.splitTextToSize(aboutText, 170);
        doc.text(splitAbout, 20, 78);
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(30, 58, 138);
        doc.text("Services", 20, 115);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(50, 50, 50);
        doc.text("\u2022 Website Design & Development", 20, 125);
        doc.text("\u2022 Android App Development", 20, 135);
        doc.text("\u2022 Custom Software Solutions", 20, 145);
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(30, 58, 138);
        doc.text("Latest Projects", 20, 165);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(50, 50, 50);
        doc.text("1. Mahira Technology: Broadband & CCTV Installation provider.", 20, 175);
        doc.text("2. New Seva Foundation: Web project with QR payment system & Volunteer registration.", 20, 185);
        doc.text("3. Task Management: Android app with real-time sync and push notifications.", 20, 195);
        doc.text("4. E-commerce Dashboard: Admin dashboard for inventory & tracking.", 20, 205);
        
        // Save PDF
        doc.save("Md_Nazir_Ahamed_Resume.pdf");
    });
}

// Contact Form AJAX Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission (page redirect)
        
        const submitBtn = contactForm.querySelector('input[type="submit"]');
        const originalText = submitBtn.value;
        submitBtn.value = "Sending...";
        
        const formData = new FormData(contactForm);

        fetch("https://formsubmit.co/ajax/imnazirk@gmail.com", {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            // Show Success Alert
            alert("Thank You! Aapka message successfully send ho gaya hai.");
            // Reset the form fields
            contactForm.reset();
            // Redirect to home section
            window.location.href = "#home";
            // Restore button text
            submitBtn.value = originalText;
        })
        .catch(error => {
            alert("Oops! Kuch galat ho gaya. Please phir se try karein.");
            submitBtn.value = originalText;
            console.error(error);
        });
    });
}
