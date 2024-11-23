var form = document.getElementById("resume-form");
var generateResumeButton = document.getElementById("generate-resume");
var resumeContainer = document.getElementById("resume-container");
var profilePictureInput = document.getElementById("profile-picture");
var profilePreview = document.getElementById("profile-preview");
profilePictureInput.addEventListener("change", function (e) {
    var _a;
    var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        var reader_1 = new FileReader();
        reader_1.onload = function () {
            profilePreview.src = reader_1.result;
        };
        reader_1.readAsDataURL(file);
    }
});
generateResumeButton.addEventListener("click", function (e) {
    e.preventDefault();
    var formData = new FormData(form);
    var resumeData = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        location: formData.get("location"),
        education: {
            institution: formData.get("education-institution"),
            degree: formData.get("education-degree"),
            duration: formData.get("education-duration"),
        },
        workExperience: {
            jobTitle: formData.get("work-job-title"),
            company: formData.get("work-company"),
            duration: formData.get("work-duration"),
        },
        skills: formData.get("skills").split(",").map(function (skill) { return skill.trim(); }),
        profilePicture: profilePreview.src || "",
    };
    generateResume(resumeData);
});
function generateResume(resumeData) {
    if (!resumeContainer) {
        console.error("Resume container not found.");
        return;
    }
    resumeContainer.innerHTML = "\n    <header>\n      <img src=\"".concat(resumeData.profilePicture, "\" alt=\"Profile\" style=\"max-width: 150px;\">\n      <h1>").concat(resumeData.name, "</h1>\n    </header>\n    <section>\n      <h2>Contact Information</h2>\n      <p><strong>Email:</strong> ").concat(resumeData.email, "</p>\n      <p><strong>Phone:</strong> ").concat(resumeData.phone, "</p>\n      <p><strong>Location:</strong> ").concat(resumeData.location, "</p>\n    </section>\n    <section>\n      <h2>Education</h2>\n      <p><strong>").concat(resumeData.education.institution, "</strong></p>\n      <p>").concat(resumeData.education.degree, "</p>\n      <p>").concat(resumeData.education.duration, "</p>\n    </section>\n    <section>\n      <h2>Work Experience</h2>\n      <p><strong>").concat(resumeData.workExperience.jobTitle, "</strong></p>\n      <p>").concat(resumeData.workExperience.company, "</p>\n      <p>").concat(resumeData.workExperience.duration, "</p>\n    </section>\n    <section>\n      <h2>Skills</h2>\n      <ul>\n        ").concat(resumeData.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(""), "\n      </ul>\n    </section>\n  ");
}
