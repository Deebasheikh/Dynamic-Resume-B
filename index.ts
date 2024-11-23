interface ResumeData {
  name: string;
  email: string;
  phone: string;
  location: string;
  education: {
    institution: string;
    degree: string;
    duration: string;
  };
  workExperience: {
    jobTitle: string;
    company: string;
    duration: string;
  };
  skills: string[];
  profilePicture: string;
}

const form = document.getElementById("resume-form") as HTMLFormElement;
const generateResumeButton = document.getElementById("generate-resume") as HTMLButtonElement;
const resumeContainer = document.getElementById("resume-container") as HTMLElement;
const profilePictureInput = document.getElementById("profile-picture") as HTMLInputElement;
const profilePreview = document.getElementById("profile-preview") as HTMLImageElement;

profilePictureInput.addEventListener("change", (e) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      profilePreview.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
});

generateResumeButton.addEventListener("click", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const resumeData: ResumeData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    location: formData.get("location") as string,
    education: {
      institution: formData.get("education-institution") as string,
      degree: formData.get("education-degree") as string,
      duration: formData.get("education-duration") as string,
    },
    workExperience: {
      jobTitle: formData.get("work-job-title") as string,
      company: formData.get("work-company") as string,
      duration: formData.get("work-duration") as string,
    },
    skills: (formData.get("skills") as string).split(",").map(skill => skill.trim()),
    profilePicture: profilePreview.src || "",
  };

  generateResume(resumeData);
});

function generateResume(resumeData: ResumeData): void {
  if (!resumeContainer) {
    console.error("Resume container not found.");
    return;
  }

  resumeContainer.innerHTML = `
    <header>
      <img src="${resumeData.profilePicture}" alt="Profile" style="max-width: 150px;">
      <h1>${resumeData.name}</h1>
    </header>
    <section>
      <h2>Contact Information</h2>
      <p><strong>Email:</strong> ${resumeData.email}</p>
      <p><strong>Phone:</strong> ${resumeData.phone}</p>
      <p><strong>Location:</strong> ${resumeData.location}</p>
    </section>
    <section>
      <h2>Education</h2>
      <p><strong>${resumeData.education.institution}</strong></p>
      <p>${resumeData.education.degree}</p>
      <p>${resumeData.education.duration}</p>
    </section>
    <section>
      <h2>Work Experience</h2>
      <p><strong>${resumeData.workExperience.jobTitle}</strong></p>
      <p>${resumeData.workExperience.company}</p>
      <p>${resumeData.workExperience.duration}</p>
    </section>
    <section>
      <h2>Skills</h2>
      <ul>
        ${resumeData.skills.map(skill => `<li>${skill}</li>`).join("")}
      </ul>
    </section>
  `;
}
