// DOM Element References
var elements = {
    form: document.getElementById("resume-form"),
    resumeOutput: document.getElementById("resume-output"),
    resumeDisplay: document.getElementById("resume-display"),
    imageInput: document.getElementById("imageInput"),
    shareableLinkContainer: document.getElementById("shareable-link-container"),
    shareableLinkElement: document.getElementById("shareable-link"),
    downloadPdfButton: document.getElementById("download-pdf"),
    themeSelector: document.getElementById("theme-selector"),
};

// Theme Mapping
var themeClassMap = {
    "Cool Blue": "cool-theme",
    "Warm Sunset": "warm-theme",
    "Professional Gray": "professional-theme",
    "Premium Purple": "premium-theme",
};

// Update Shareable Link
function updateShareableLink(shareableURL) {
    elements.shareableLinkElement.href = shareableURL;
    elements.shareableLinkElement.textContent = shareableURL;
    elements.shareableLinkContainer.classList.add("visible");
}

// Generate Resume HTML
function generateResumeHTML(data, imageSrc) {
    var selectedTheme = elements.themeSelector.value;
    var themeClass = themeClassMap[selectedTheme] || "cool-theme";
    return `
      <div class="resume-container ${themeClass}">
          <div class="left-section">
              <img src="${imageSrc || "/api/placeholder/250/250"}" 
                   alt="Profile Picture" 
                   class="profile-picture" 
                   onerror="this.src='/api/placeholder/250/250'">
              <h2 class="section-title" style="color: white">Contact</h2>
              <p>${data.email}</p>
              <p>${data.phone}</p>
          </div>
          <div class="right-section">
              <h1 class="section-title">${data.name}</h1>
              <section>
                  <h2 class="section-title">Career Objective</h2>
                  <p>${data.objective}</p>
              </section>
              <section>
                  <h2 class="section-title">Education</h2>
                  <p>${data.education}</p>
              </section>
              <section>
                  <h2 class="section-title">Work Experience</h2>
                  <p>${data.experience}</p>
              </section>
              <section>
                  <h2 class="section-title">Skills</h2>
                  <p>${data.skills}</p>
              </section>
              <section>
                  <h2 class="section-title">Certifications</h2>
                  <p>${data.certifications}</p>
              </section>
          </div>
      </div>
    `;
}

// Form Submission Handler
function handleFormSubmit(event) {
    event.preventDefault();

    // Capture form data
    var formData = {
        username: document.getElementById("username").value,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        objective: document.getElementById("objective").value,
        education: document.getElementById("education").value,
        experience: document.getElementById("experience").value,
        skills: document.getElementById("skills").value,
        certifications: document.getElementById("certifications").value,
    };

    // Handle image upload (if any)
    var imageFile = elements.imageInput.files ? elements.imageInput.files[0] : null;
    var imageSrc = imageFile ? URL.createObjectURL(imageFile) : "";

    // Generate the resume HTML and display it
    var resumeHTML = generateResumeHTML(formData, imageSrc);
    elements.resumeDisplay.innerHTML = resumeHTML;

    // Ensure the resume display is visible
    elements.resumeDisplay.style.display = 'block'; // or 'flex' if using flexbox
    elements.resumeOutput.classList.add("visible");
    elements.resumeOutput.scrollIntoView({ behavior: "smooth" });

    // Create shareable link
    var shareableURL = `${window.location.origin}?username=${encodeURIComponent(formData.username)}`;
    updateShareableLink(shareableURL);
}

// PDF Download Functionality
function downloadResumeAsPDF() {
    var options = {
        margin: 0.5,
        filename: "resume.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(elements.resumeDisplay).set(options).save();
}

// Event Listeners
function initializeEventListeners() {
    elements.form.addEventListener("submit", handleFormSubmit);
    elements.downloadPdfButton.addEventListener("click", downloadResumeAsPDF);
}

// Function to change theme
function changeTheme() {
    document.body.className = elements.themeSelector.value;
}

// Apply default theme on page load
window.onload = function () {
    document.body.classList.add("cool-theme");
    elements.themeSelector.addEventListener("change", changeTheme);
    initializeEventListeners();
};
