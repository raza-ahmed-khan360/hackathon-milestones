// Get References to the form and display area
const form = document.getElementById("resume-form") as HTMLFormElement;
const resumeDisplayElement = document.getElementById("resume-display") as HTMLDivElement;
const imageInput = document.getElementById("imageInput") as HTMLInputElement;
const shareableLinkContainer = document.getElementById("shareable-link-container") as HTMLDivElement;
const shareableLinkElement = document.getElementById("shareable-link") as HTMLAnchorElement;
const downloadPdfButton = document.getElementById("download-pdf") as HTMLButtonElement;

//Theme Switcher
// Function to handle theme change
function changeTheme(): void {
    const themeSelector: HTMLSelectElement | null = document.getElementById('theme-selector') as HTMLSelectElement;
    if (themeSelector) {
        const selectedTheme: string = themeSelector.value;
        
        // Remove any existing theme class
        document.body.classList.remove('cool-theme', 'warm-theme', 'premium-theme', 'professional-theme');
        
        // Add the selected theme class
        document.body.classList.add(selectedTheme);
    }
}

// Add event listener for theme selector change
const themeSelector: HTMLSelectElement | null = document.getElementById('theme-selector') as HTMLSelectElement;
if (themeSelector) {
    themeSelector.addEventListener('change', changeTheme);
}

// Set a default theme when the page loads
window.onload = (): void => {
    document.body.classList.add('cool-theme'); // Default theme can be changed here
};






// Handle form submission
form.addEventListener("submit", (event: Event) => {
    event.preventDefault(); // prevent page reload 

    // Collect input values
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const objective = (document.getElementById("objective") as HTMLInputElement).value;
    const certifications = (document.getElementById("certifications") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const education = (document.getElementById("education") as HTMLInputElement).value;
    const experience = (document.getElementById("experience") as HTMLInputElement).value;
    const skills = (document.getElementById("skills") as HTMLInputElement).value;

    // Save form data in localStorage with the username as the key
    const resumeData = {
        name,
        email,
        phone,
        education,
        experience,
        skills,
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); //saving the data locally

    // Generate the Resume content dynamically
    const resumeHTML = `
        <div class="resume-container">
            <!-- Left Section -->
            <div class="left-section">
                <img src="${URL.createObjectURL(imageInput.files[0])}" alt="Profile Picture" class="profile-picture">
                
                <!-- Career Objective Section -->
                <section id="objective">
                    <h3 class="section-title" style="color: white;">Career Objective</h3>
                    <p class="text"><span contenteditable="true">${objective}</span></p>
                </section>
                
                <!-- Certifications Section -->
                <section id="certification">
                    <h3 class="section-title" style="color: white;">Certifications</h3>
                    <ul class="text">
                        <li><span contenteditable="true">${certifications}</span></li>
                    </ul>
                </section>
            </div>

            <!-- Right Section -->
            <div class="right-section">
                <!-- Personal Information Section -->
                <section id="personal-info">
                    <h3 class="section-title">Personal Information</h3>
                    <p><b>Name: </b><span contenteditable="true">${name}</span></p>
                    <p><b>Phone: </b><span contenteditable="true">${phone}</span></p>
                    <p><b>Email: </b><span contenteditable="true">${email}</span></p>
                </section>

                <!-- Education Section -->
                <section id="education">
                    <h3 class="section-title">Education</h3>
                    <p><span contenteditable="true">${education}</span></p>
                </section>

                <!-- Skills Section -->
                <section id="skills">
                    <h3 class="section-title">Skills</h3>
                    <ul class="text">
                        <li><span contenteditable="true">${skills}</span></li>
                    </ul>
                </section>

                <!-- Work Experience Section -->
                <section id="work-experience">
                    <h3 class="section-title">Work Experience</h3>
                    <p><span contenteditable="true">${experience}</span></p>
                </section>
            </div>
        </div>
    `;

    // Display the generated resume
    resumeDisplayElement.innerHTML = resumeHTML;

    // Generate a shareable link 
    const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;
    // Display the shareable link
    shareableLinkContainer.style.display = "block";
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});

// Handle PDF Download
downloadPdfButton.addEventListener("click", () => {
    const element = resumeDisplayElement; // Only target the resume display element for PDF generation
    const options = {
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
window.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");

    if (username) {
        // Autofill form if data is found in localStorage
        const savedResumeData = localStorage.getItem(username);

        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);
            (document.getElementById("username") as HTMLInputElement).value = username;
            (document.getElementById("name") as HTMLInputElement).value = resumeData.name;
            (document.getElementById("email") as HTMLInputElement).value = resumeData.email;
            (document.getElementById("phone") as HTMLInputElement).value = resumeData.phone;
            (document.getElementById("education") as HTMLTextAreaElement).value = resumeData.education;
            (document.getElementById("experience") as HTMLTextAreaElement).value = resumeData.experience;
            (document.getElementById("skills") as HTMLTextAreaElement).value = resumeData.skills;
        }
    }
});
