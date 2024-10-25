// Get References to the form and display area
var form = document.getElementById("resume-form");
var resumeDisplayElement = document.getElementById("resume-display");
var imageInput = document.getElementById("imageInput");
var shareableLinkContainer = document.getElementById("shareable-link-container");
var shareableLinkElement = document.getElementById("shareable-link");
var downloadPdfButton = document.getElementById("download-pdf");
//Theme Switcher
// Function to handle theme change
function changeTheme() {
    var themeSelector = document.getElementById('theme-selector');
    if (themeSelector) {
        var selectedTheme = themeSelector.value;
        // Remove any existing theme class
        document.body.classList.remove('cool-theme', 'warm-theme', 'premium-theme', 'professional-theme');
        // Add the selected theme class
        document.body.classList.add(selectedTheme);
    }
}
// Add event listener for theme selector change
var themeSelector = document.getElementById('theme-selector');
if (themeSelector) {
    themeSelector.addEventListener('change', changeTheme);
}
// Set a default theme when the page loads
window.onload = function () {
    document.body.classList.add('cool-theme'); // Default theme can be changed here
};
// Handle form submission
form.addEventListener("submit", function (event) {
    event.preventDefault(); // prevent page reload 
    // Collect input values
    var username = document.getElementById("username").value;
    var name = document.getElementById("name").value;
    var objective = document.getElementById("objective").value;
    var certifications = document.getElementById("certifications").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var education = document.getElementById("education").value;
    var experience = document.getElementById("experience").value;
    var skills = document.getElementById("skills").value;
    // Save form data in localStorage with the username as the key
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills,
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); //saving the data locally
    // Generate the Resume content dynamically
    var resumeHTML = "\n        <div class=\"resume-container\">\n            <!-- Left Section -->\n            <div class=\"left-section\">\n                <img src=\"".concat(URL.createObjectURL(imageInput.files[0]), "\" alt=\"Profile Picture\" class=\"profile-picture\">\n                \n                <!-- Career Objective Section -->\n                <section id=\"objective\">\n                    <h3 class=\"section-title\" style=\"color: white;\">Career Objective</h3>\n                    <p class=\"text\"><span contenteditable=\"true\">").concat(objective, "</span></p>\n                </section>\n                \n                <!-- Certifications Section -->\n                <section id=\"certification\">\n                    <h3 class=\"section-title\" style=\"color: white;\">Certifications</h3>\n                    <ul class=\"text\">\n                        <li><span contenteditable=\"true\">").concat(certifications, "</span></li>\n                    </ul>\n                </section>\n            </div>\n\n            <!-- Right Section -->\n            <div class=\"right-section\">\n                <!-- Personal Information Section -->\n                <section id=\"personal-info\">\n                    <h3 class=\"section-title\">Personal Information</h3>\n                    <p><b>Name: </b><span contenteditable=\"true\">").concat(name, "</span></p>\n                    <p><b>Phone: </b><span contenteditable=\"true\">").concat(phone, "</span></p>\n                    <p><b>Email: </b><span contenteditable=\"true\">").concat(email, "</span></p>\n                </section>\n\n                <!-- Education Section -->\n                <section id=\"education\">\n                    <h3 class=\"section-title\">Education</h3>\n                    <p><span contenteditable=\"true\">").concat(education, "</span></p>\n                </section>\n\n                <!-- Skills Section -->\n                <section id=\"skills\">\n                    <h3 class=\"section-title\">Skills</h3>\n                    <ul class=\"text\">\n                        <li><span contenteditable=\"true\">").concat(skills, "</span></li>\n                    </ul>\n                </section>\n\n                <!-- Work Experience Section -->\n                <section id=\"work-experience\">\n                    <h3 class=\"section-title\">Work Experience</h3>\n                    <p><span contenteditable=\"true\">").concat(experience, "</span></p>\n                </section>\n            </div>\n        </div>\n    ");
    // Display the generated resume
    resumeDisplayElement.innerHTML = resumeHTML;
    // Generate a shareable link 
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    // Display the shareable link
    shareableLinkContainer.style.display = "block";
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
// Handle PDF Download
downloadPdfButton.addEventListener("click", function () {
    var element = resumeDisplayElement; // Only target the resume display element for PDF generation
    var options = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    // Use html2pdf to download only the resume content as a PDF
    html2pdf().from(element).set(options).save();
});
// Prefill the form based on the username in the URL
window.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get("username");
    if (username) {
        // Autofill form if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById("username").value = username;
            document.getElementById("name").value = resumeData.name;
            document.getElementById("email").value = resumeData.email;
            document.getElementById("phone").value = resumeData.phone;
            document.getElementById("education").value = resumeData.education;
            document.getElementById("experience").value = resumeData.experience;
            document.getElementById("skills").value = resumeData.skills;
        }
    }
});
