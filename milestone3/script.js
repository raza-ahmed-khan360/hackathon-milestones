//  Get References to the form and display area
var form = document.getElementById("resume-form");
var resumeDisplayElement = document.getElementById("resume-display");
var imageInput = document.getElementById("imageInput");
// Handle form submission
form.addEventListener("submit", function (event) {
    event.preventDefault(); // prevent page reload 
    // Collect input values
    var name = document.getElementById("name").value;
    var objective = document.getElementById("objective").value;
    var certifications = document.getElementById("certifications").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var education = document.getElementById("education").value;
    var experience = document.getElementById("experience").value;
    var skills = document.getElementById("skills").value;
    // Generate the Resume content dynamically
    var resumeHTML = "\n     <div class=\"resume-container\">\n        <!-- Left Section -->\n        <div class=\"left-section\">\n            <img src=\"".concat(URL.createObjectURL(imageInput.files[0]), "\" alt=\"Profile Picture\" class=\"profile-picture\"> \n            \n            <!-- Career Objective Section -->\n            <section id=\"objective\">\n                <h3 class=\"section-title\" style=\"color: white;\">Career Objective</h3>\n                <p class=\"text\">").concat(objective, "</p>\n            </section>\n            \n            <!-- Certifications Section -->\n            <section id=\"certification\">\n                <h3 class=\"section-title\" style=\"color: white;\">Certifications</h3>\n                <ul class=\"text\">\n                    <li>").concat(certifications, "</li>\n                </ul>\n            </section>\n        </div>\n\n        <!-- Right Section -->\n        <div class=\"right-section\">\n\n            <!-- Personal Information Section -->\n            <section id=\"personal-info\">\n                <h3 class=\"section-title\">Personal Information</h3>\n                <p><b>Name:</b>").concat(name, "</p>\n                <p><b>Phone:</b>").concat(phone, "</p>\n                <p><b>Email:</b>").concat(email, "</p>\n            </section>\n\n            <!-- Education Section -->\n            <section id=\"education\">\n                <h3 class=\"section-title\">Education</h3>\n                <p>").concat(education, "</p>\n            </section>\n\n            <!-- Skills Section -->\n            <section id=\"skills\">\n                <h3 class=\"section-title\">Skills</h3>\n                <ul class=\"text\">\n                    <li>").concat(skills, "</li>\n                </ul>\n            </section>\n\n            <!-- Work Experience Section -->\n            <section id=\"work-experience\">\n                <h3 class=\"section-title\">Work Experience</h3>\n                <p>").concat(experience, "</p>\n            </section>\n        </div>\n    </div>\n    ");
    // Display the generated resume
    if (resumeDisplayElement) {
        resumeDisplayElement.innerHTML = resumeHTML;
    }
    else {
        console.error("The resume display element is missing.");
    }
});
