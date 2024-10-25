// Get References to the form and display area
const form = document.getElementById("resume-form") as HTMLFormElement;
const resumeDisplayElement = document.getElementById("resume-display") as HTMLDivElement;
const imageInput = document.getElementById("imageInput") as HTMLInputElement;
const shareableLinkContainer = document.getElementById("shareable-link-container") as HTMLDivElement;
const shareableLinkElement = document.getElementById("shareable-link") as HTMLAnchorElement;
const downloadPdfButton = document.getElementById("download-pdf") as HTMLButtonElement;

// Theme Switcher
function changeTheme(): void {
    const themeSelector: HTMLSelectElement | null = document.getElementById('theme-selector') as HTMLSelectElement;
    if (themeSelector) {
        const selectedTheme: string = themeSelector.value;
        document.body.classList.remove('cool-theme', 'warm-theme', 'premium-theme', 'professional-theme');
        document.body.classList.add(selectedTheme);
    }
}

const themeSelector: HTMLSelectElement | null = document.getElementById('theme-selector') as HTMLSelectElement;
if (themeSelector) {
    themeSelector.addEventListener('change', changeTheme);
}

window.onload = (): void => {
    document.body.classList.add('cool-theme');
};

// Handle form submission
form.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    const username = (document.getElementById("username") as HTMLInputElement).value;
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const objective = (document.getElementById("objective") as HTMLInputElement).value;
    const certifications = (document.getElementById("certifications") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const education = (document.getElementById("education") as HTMLInputElement).value;
    const experience = (document.getElementById("experience") as HTMLInputElement).value;
    const skills = (document.getElementById("skills") as HTMLInputElement).value;

    const resumeData = {
        name,
        email,
        phone,
        education,
        experience,
        skills,
        objective,
        certifications
    };
    localStorage.setItem(username, JSON.stringify(resumeData));

    const imageFile = imageInput.files?.[0];
    const imageSrc = imageFile ? URL.createObjectURL(imageFile) : '';

    const resumeHTML = `
        <div class="resume-container">
            <div class="left-section">
                ${imageSrc ? `<img src="${imageSrc}" alt="Profile Picture" class="profile-picture">` : ''}
                <section id="objective">
                    <h3 class="section-title" style="color: white;">Career Objective</h3>
                    <p class="text"><span contenteditable="true">${objective}</span></p>
                </section>
                <section id="certification">
                    <h3 class="section-title" style="color: white;">Certifications</h3>
                    <ul class="text">
                        <li><span contenteditable="true">${certifications}</span></li>
                    </ul>
                </section>
            </div>
            <div class="right-section">
                <section id="personal-info">
                    <h3 class="section-title">Personal Information</h3>
                    <p><b>Name: </b><span contenteditable="true">${name}</span></p>
                    <p><b>Phone: </b><span contenteditable="true">${phone}</span></p>
                    <p><b>Email: </b><span contenteditable="true">${email}</span></p>
                </section>
                <section id="education">
                    <h3 class="section-title">Education</h3>
                    <p><span contenteditable="true">${education}</span></p>
                </section>
                <section id="skills">
                    <h3 class="section-title">Skills</h3>
                    <ul class="text">
                        <li><span contenteditable="true">${skills}</span></li>
                    </ul>
                </section>
                <section id="work-experience">
                    <h3 class="section-title">Work Experience</h3>
                    <p><span contenteditable="true">${experience}</span></p>
                </section>
            </div>
        </div>
    `;

    resumeDisplayElement.innerHTML = resumeHTML;

    const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;
    if (shareableLinkContainer) {
        shareableLinkContainer.style.display = "block";
        shareableLinkElement.href = shareableURL;
        shareableLinkElement.textContent = shareableURL;
    }
});

// Handle PDF Download
downloadPdfButton.addEventListener("click", () => {
    if (resumeDisplayElement) {
        const options = {
            margin: 0.5,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(resumeDisplayElement).set(options).save();
    } else {
        console.error("Resume display element not found.");
    }
});

// Prefill the form based on the username in the URL
window.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");

    if (username) {
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
            (document.getElementById("objective") as HTMLInputElement).value = resumeData.objective;
            (document.getElementById("certifications") as HTMLInputElement).value = resumeData.certifications;
        }
    }
});
