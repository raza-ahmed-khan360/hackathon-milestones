var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var _this = this;
// Get references to HTML elements
var form = document.getElementById("resume-form");
var resumeDisplayElement = document.getElementById("resume-display");
var imageInput = document.getElementById("imageInput");
var shareableLinkContainer = document.getElementById(
  "shareable-link-container"
);
var shareableLinkElement = document.getElementById("shareable-link");
var downloadPdfButton = document.getElementById("download-pdf");
var themeSelector = document.getElementById("theme-selector");
// Function to change theme
function changeTheme() {
  document.body.className = themeSelector.value;
}
// Apply default theme on page load
window.onload = function () {
  document.body.classList.add("cool-theme");
  themeSelector.addEventListener("change", changeTheme);
};
// Form submission handler
form.addEventListener("submit", function (event) {
  return __awaiter(_this, void 0, void 0, function () {
    var resumeData;
    var _a;
    return __generator(this, function (_b) {
      event.preventDefault();
      resumeData = {
        username: document.getElementById("username").value,
        name: document.getElementById("name").value,
        objective: document.getElementById("objective").value,
        certifications: document.getElementById("certifications").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        education: document.getElementById("education").value,
        experience: document.getElementById("experience").value,
        skills: document.getElementById("skills").value,
        imageSrc: (
          (_a = imageInput.files) === null || _a === void 0 ? void 0 : _a[0]
        )
          ? URL.createObjectURL(imageInput.files[0])
          : "",
        theme: themeSelector.value,
      };
      localStorage.setItem(resumeData.username, JSON.stringify(resumeData));
      generateResume(resumeData);
      displayShareableLink(resumeData.username);
      return [2 /*return*/];
    });
  });
});
// Function to generate the resume HTML
function generateResume(data) {
  resumeDisplayElement.innerHTML = '\n        <div class="resume-container '
    .concat(
      data.theme,
      '">\n            <div class="left-section">\n                '
    )
    .concat(
      data.imageSrc
        ? '<img src="'.concat(
            data.imageSrc,
            '" alt="Profile Picture" class="profile-picture">'
          )
        : "",
      '\n                <section id="objective">\n                    <h3 class="section-title" style="color: aliceblue;">Career Objective</h3>\n                    <p class="text">'
    )
    .concat(
      data.objective,
      '</p>\n                </section>\n                <section id="certification">\n                    <h3 class="section-title" style="color: aliceblue;">Certifications</h3>\n                    <ul class="text">'
    )
    .concat(
      data.certifications
        .split("\n")
        .map(function (item) {
          return "<li>".concat(item, "</li>");
        })
        .join(""),
      '</ul>\n                </section>\n            </div>\n            <div class="right-section">\n                <section id="personal-info">\n                    <h3 class="section-title">Personal Information</h3>\n                    <p><b>Name: </b>'
    )
    .concat(data.name, "</p>\n                    <p><b>Phone: </b>")
    .concat(data.phone, "</p>\n                    <p><b>Email: </b>")
    .concat(
      data.email,
      '</p>\n                </section>\n                <section id="education">\n                    <h3 class="section-title">Education</h3>\n                    <p>'
    )
    .concat(
      data.education,
      '</p>\n                </section>\n                <section id="skills">\n                    <h3 class="section-title">Skills</h3>\n                    <ul class="text">'
    )
    .concat(
      data.skills
        .split("\n")
        .map(function (item) {
          return "<li>".concat(item, "</li>");
        })
        .join(""),
      '</ul>\n                </section>\n                <section id="work-experience">\n                    <h3 class="section-title">Work Experience</h3>\n                    <p>'
    )
    .concat(
      data.experience,
      "</p>\n                </section>\n            </div>\n        </div>\n    "
    );
}
// Display shareable link
function displayShareableLink(username) {
  var shareableURL = ""
    .concat(window.location.origin, "?username=")
    .concat(encodeURIComponent(username));
  shareableLinkContainer.style.display = "block";
  shareableLinkElement.href = shareableURL;
  shareableLinkElement.textContent = shareableURL;
}
// PDF download function
downloadPdfButton.addEventListener("click", function () {
  var options = {
    margin: 0.5,
    filename: "resume.pdf",
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };
  html2pdf().from(resumeDisplayElement).set(options).save();
});
