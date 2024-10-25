// Get References to the form and display area
var form = document.getElementById("resume-form");
var resumeDisplayElement = document.getElementById("resume-display");
var imageInput = document.getElementById("imageInput");
var shareableLinkContainer = document.getElementById("shareable-link-container");
var shareableLinkElement = document.getElementById("shareable-link");
var downloadPdfButton = document.getElementById("download-pdf");
// Theme Switcher
function changeTheme() {
    var themeSelector = document.getElementById('theme-selector');
    if (themeSelector) {
        var selectedTheme = themeSelector.value;
        document.body.classList.remove('cool-theme', 'warm-theme', 'premium-theme', 'professional-theme');
        document.body.classList.add(selectedTheme);
    }
}
var themeSelector = document.getElementById('theme-selector');
if (themeSelector) {
    themeSelector.addEventListener('change', changeTheme);
}
window.onload = function () {
    document.body.classList.add('cool-theme');
};
// Handle form submission
form.addEventListener("submit", function (event) {
    var _a;
    event.preventDefault();
    var username = document.getElementById("username").value;
    var name = document.getElementById("name").value;
    var objective = document.getElementById("objective").value;
    var certifications = document.getElementById("certifications").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var education = document.getElementById("education").value;
    var experience = document.getElementById("experience").value;
    var skills = document.getElementById("skills").value;
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills,
        objective: objective,
        certifications: certifications
    };
    localStorage.setItem(username, JSON.stringify(resumeData));
    var imageFile = (_a = imageInput.files) === null || _a === void 0 ? void 0 : _a[0];
    var imageSrc = imageFile ? URL.createObjectURL(imageFile) : '';
    var resumeHTML = "\n        <div class=\"resume-container\">\n            <div class=\"left-section\">\n                ".concat(imageSrc ? "<img src=\"".concat(imageSrc, "\" alt=\"Profile Picture\" class=\"profile-picture\">") : '', "\n                <section id=\"objective\">\n                    <h3 class=\"section-title\" style=\"color: white;\">Career Objective</h3>\n                    <p class=\"text\"><span contenteditable=\"true\">").concat(objective, "</span></p>\n                </section>\n                <section id=\"certification\">\n                    <h3 class=\"section-title\" style=\"color: white;\">Certifications</h3>\n                    <ul class=\"text\">\n                        <li><span contenteditable=\"true\">").concat(certifications, "</span></li>\n                    </ul>\n                </section>\n            </div>\n            <div class=\"right-section\">\n                <section id=\"personal-info\">\n                    <h3 class=\"section-title\">Personal Information</h3>\n                    <p><b>Name: </b><span contenteditable=\"true\">").concat(name, "</span></p>\n                    <p><b>Phone: </b><span contenteditable=\"true\">").concat(phone, "</span></p>\n                    <p><b>Email: </b><span contenteditable=\"true\">").concat(email, "</span></p>\n                </section>\n                <section id=\"education\">\n                    <h3 class=\"section-title\">Education</h3>\n                    <p><span contenteditable=\"true\">").concat(education, "</span></p>\n                </section>\n                <section id=\"skills\">\n                    <h3 class=\"section-title\">Skills</h3>\n                    <ul class=\"text\">\n                        <li><span contenteditable=\"true\">").concat(skills, "</span></li>\n                    </ul>\n                </section>\n                <section id=\"work-experience\">\n                    <h3 class=\"section-title\">Work Experience</h3>\n                    <p><span contenteditable=\"true\">").concat(experience, "</span></p>\n                </section>\n            </div>\n        </div>\n    ");
    resumeDisplayElement.innerHTML = resumeHTML;
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    if (shareableLinkContainer) {
        shareableLinkContainer.style.display = "block";
        shareableLinkElement.href = shareableURL;
        shareableLinkElement.textContent = shareableURL;
    }
});
// Handle PDF Download
downloadPdfButton.addEventListener("click", function () {
    if (resumeDisplayElement) {
        var options = {
            margin: 0.5,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(resumeDisplayElement).set(options).save();
    }
    else {
        console.error("Resume display element not found.");
    }
});
// Prefill the form based on the username in the URL
window.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get("username");
    if (username) {
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
            document.getElementById("objective").value = resumeData.objective;
            document.getElementById("certifications").value = resumeData.certifications;
        }
    }
});
