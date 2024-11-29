// DOM Element References
const elements = {
    form: document.getElementById("resume-form") as HTMLFormElement,
    resumeOutput: document.getElementById("resume-output") as HTMLElement,
    resumeDisplay: document.getElementById("resume-display") as HTMLElement,
    imageInput: document.getElementById("imageInput") as HTMLInputElement,
    shareableLinkContainer: document.getElementById("shareable-link-container") as HTMLElement,
    shareableLinkElement: document.getElementById("shareable-link") as HTMLAnchorElement,
    downloadPdfButton: document.getElementById("download-pdf") as HTMLButtonElement,
    themeSelector: document.getElementById("theme-selector") as HTMLSelectElement,
};

// Type for Form Data
interface FormData {
    username: string;
    name: string;
    email: string;
    phone: string;
    objective: string;
    education: string;
    experience: string;
    skills: string;
    certifications: string;
}

// Theme Mapping
const themeClassMap: { [key: string]: string } = {
    "Cool Blue": "cool-theme",
    "Warm Sunset": "warm-theme",
    "Professional Gray": "professional-theme",
    "Premium Purple": "premium-theme",
};

// Update Shareable Link
function updateShareableLink(shareableURL: string): void {
    elements.shareableLinkElement.href = shareableURL;
    elements.shareableLinkElement.textContent = shareableURL;
    elements.shareableLinkContainer.classList.add("visible");
}

// Generate Resume HTML
function generateResumeHTML(data: FormData, imageSrc: string): string {
    const selectedTheme = elements.themeSelector.value;
    const themeClass = themeClassMap[selectedTheme] || "cool-theme";
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
function handleFormSubmit(event: SubmitEvent): void {
    event.preventDefault();

    // Capture form data
    const formData: FormData = {
        username: (document.getElementById("username") as HTMLInputElement).value,
        name: (document.getElementById("name") as HTMLInputElement).value,
        email: (document.getElementById("email") as HTMLInputElement).value,
        phone: (document.getElementById("phone") as HTMLInputElement).value,
        objective: (document.getElementById("objective") as HTMLInputElement).value,
        education: (document.getElementById("education") as HTMLInputElement).value,
        experience: (document.getElementById("experience") as HTMLInputElement).value,
        skills: (document.getElementById("skills") as HTMLInputElement).value,
        certifications: (document.getElementById("certifications") as HTMLInputElement).value,
    };

    // Handle image upload (if any)
    const imageFile = elements.imageInput.files ? elements.imageInput.files[0] : null;
    const imageSrc = imageFile ? URL.createObjectURL(imageFile) : "";

    // Generate the resume HTML and display it
    const resumeHTML = generateResumeHTML(formData, imageSrc);
    elements.resumeDisplay.innerHTML = resumeHTML;

    // Ensure the resume display is visible
    elements.resumeDisplay.style.display = 'block'; // or 'flex' if using flexbox
    elements.resumeOutput.classList.add("visible");
    elements.resumeOutput.scrollIntoView({ behavior: "smooth" });

    // Create shareable link
    const shareableURL = `${window.location.origin}?username=${encodeURIComponent(formData.username)}`;
    updateShareableLink(shareableURL);
}

// PDF Download Functionality
function downloadResumeAsPDF(): void {
    const options = {
        margin: 0.5,
        filename: "resume.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(elements.resumeDisplay).set(options).save();
}

// Event Listeners
function initializeEventListeners(): void {
    elements.form.addEventListener("submit", handleFormSubmit);
    elements.downloadPdfButton.addEventListener("click", downloadResumeAsPDF);
}

// Function to change theme
function changeTheme(): void {
    document.body.className = elements.themeSelector.value;
}

// Apply default theme on page load
window.onload = function (): void {
    document.body.classList.add("cool-theme");
    elements.themeSelector.addEventListener("change", changeTheme);
    initializeEventListeners();
};
