//  Get References to the form and display area
const form = document.getElementById("resume-form") as HTMLFormElement;
const resumeDisplayElement = document.getElementById("resume-display") as HTMLDivElement;
const imageInput = document.getElementById("imageInput") as HTMLInputElement;

// Handle form submission
form.addEventListener("submit" , (event: Event) => {
    event.preventDefault(); // prevent page reload 
    
    // Collect input values
    const name = (document.getElementById("name") as HTMLInputElement).value
    const objective = (document.getElementById("objective") as HTMLInputElement).value
    const certifications = (document.getElementById("certifications") as HTMLInputElement).value
    const email = (document.getElementById("email") as HTMLInputElement).value
    const phone = (document.getElementById("phone") as HTMLInputElement).value
    const education = (document.getElementById("education") as HTMLInputElement).value
    const experience = (document.getElementById("experience") as HTMLInputElement).value
    const skills = (document.getElementById("skills") as HTMLInputElement).value


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
                <p><b>Name:</b><span contenteditable="true">${name}</span></p>
                <p><b>Phone:</b><span contenteditable="true">${phone}</span></p>
                <p><b>Email:</b><span contenteditable="true">${email}</span></p>
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
    if(resumeDisplayElement){
        resumeDisplayElement.innerHTML = resumeHTML;
    }else{
        console.error("The resume display element is missing.");
    }
});