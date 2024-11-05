// Get references to HTML elements
const form = document.getElementById("resume-form") as HTMLFormElement;
const resumeDisplayElement = document.getElementById(
  "resume-display"
) as HTMLDivElement;
const imageInput = document.getElementById("imageInput") as HTMLInputElement;
const shareableLinkContainer = document.getElementById(
  "shareable-link-container"
) as HTMLDivElement;
const shareableLinkElement = document.getElementById(
  "shareable-link"
) as HTMLAnchorElement;
const downloadPdfButton = document.getElementById(
  "download-pdf"
) as HTMLButtonElement;
const themeSelector = document.getElementById(
  "theme-selector"
) as HTMLSelectElement;

// Function to change theme
function changeTheme(): void {
  document.body.className = themeSelector.value;
}

// Apply default theme on page load
window.onload = () => {
  document.body.classList.add("cool-theme");
  themeSelector.addEventListener("change", changeTheme);
};

// Form submission handler
form.addEventListener("submit", async (event: Event) => {
  event.preventDefault();
  const resumeData = {
    username: (document.getElementById("username") as HTMLInputElement).value,
    name: (document.getElementById("name") as HTMLInputElement).value,
    objective: (document.getElementById("objective") as HTMLTextAreaElement)
      .value,
    certifications: (
      document.getElementById("certifications") as HTMLTextAreaElement
    ).value,
    email: (document.getElementById("email") as HTMLInputElement).value,
    phone: (document.getElementById("phone") as HTMLInputElement).value,
    education: (document.getElementById("education") as HTMLTextAreaElement)
      .value,
    experience: (document.getElementById("experience") as HTMLTextAreaElement)
      .value,
    skills: (document.getElementById("skills") as HTMLTextAreaElement).value,
    imageSrc: imageInput.files?.[0]
      ? URL.createObjectURL(imageInput.files[0])
      : "",
    theme: themeSelector.value,
  };

  localStorage.setItem(resumeData.username, JSON.stringify(resumeData));
  generateResume(resumeData);
  displayShareableLink(resumeData.username);
});

// Function to generate the resume HTML
function generateResume(data: any): void {
  resumeDisplayElement.innerHTML = `
        <div class="resume-container ${data.theme}">
            <div class="left-section">
                ${
                  data.imageSrc
                    ? `<img src="${data.imageSrc}" alt="Profile Picture" class="profile-picture">`
                    : ""
                }
                <section id="objective">
                    <h3 class="section-title" style="color: aliceblue;">Career Objective</h3>
                    <p class="text">${data.objective}</p>
                </section>
                <section id="certification">
                    <h3 class="section-title" style="color: aliceblue;">Certifications</h3>
                    <ul class="text">${data.certifications
                      .split("\n")
                      .map((item: string) => `<li>${item}</li>`)
                      .join("")}</ul>
                </section>
            </div>
            <div class="right-section">
                <section id="personal-info">
                    <h3 class="section-title">Personal Information</h3>
                    <p><b>Name: </b>${data.name}</p>
                    <p><b>Phone: </b>${data.phone}</p>
                    <p><b>Email: </b>${data.email}</p>
                </section>
                <section id="education">
                    <h3 class="section-title">Education</h3>
                    <p>${data.education}</p>
                </section>
                <section id="skills">
                    <h3 class="section-title">Skills</h3>
                    <ul class="text">${data.skills
                      .split("\n")
                      .map((item: string) => `<li>${item}</li>`)
                      .join("")}</ul>
                </section>
                <section id="work-experience">
                    <h3 class="section-title">Work Experience</h3>
                    <p>${data.experience}</p>
                </section>
            </div>
        </div>
    `;
}

// Display shareable link
function displayShareableLink(username: string): void {
  const shareableURL = `${window.location.origin}?username=${encodeURIComponent(
    username
  )}`;
  shareableLinkContainer.style.display = "block";
  shareableLinkElement.href = shareableURL;
  shareableLinkElement.textContent = shareableURL;
}

// PDF download function
downloadPdfButton.addEventListener("click", () => {
  const options = {
    margin: 0.5,
    filename: "resume.pdf",
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };
  html2pdf().from(resumeDisplayElement).set(options).save();
});
