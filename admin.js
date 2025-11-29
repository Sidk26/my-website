// IMPORTANT: Password is checked only in JS (not displayed in UI)
const ADMIN_PASSWORD = "Sidk2026!";

// Reuse SAME base data as user side
const DEFAULT_DATA = {
  profile: {
    name: "Sidrah Khatib",
    title: "Computer Science Student • Web & IoT Developer",
    summary:
      "I enjoy solving real-life problems using technology. I’ve worked on practical projects in IoT and web development, like building an RFID-based attendance system using ESP32 and integrating it with Google Sheets.",
    location: "Mumbai University · Mumbai, India",
    email: "sidrahkhatib00@gmail.com",
    phone: "+91 9689142418",
    linkedin: "https://www.linkedin.com/in/sidrah-khatib-a52244220",
    profileImageUrl: "",
    highlights: [
      "B.Sc. Computer Science (2023–2025)",
      "Hands-on with ESP32, Arduino & IoT",
      "Python, Java, SQL, HTML, CSS, JS",
      "Freelance money transfer software project"
    ]
  },
  about:
    "I’m someone who enjoys solving real-life problems using technology. During my Computer Science studies, I worked on practical projects in IoT and web development. One key project was building an RFID-based attendance system using ESP32 and linking it with Google Sheets to reduce manual work and errors.",
  skills: [
    "Python",
    "Java",
    "C / C-based Arduino",
    "HTML & CSS",
    "JavaScript",
    "SQL / MySQL",
    "MongoDB",
    "Wireshark",
    "VMware",
    "Git & GitHub",
    "MS Excel",
    "Responsive Web Design",
    "ESP32",
    "Arduino UNO",
    "Raspberry Pi",
    "RC522 RFID"
  ],
  languages: ["English", "Marathi", "Hindi"],
  projects: [],
  experience: [],
  education: [],
  certifications: [],
  theme: {
    primaryColor: "#f48fb1",
    accentColor: "#f5cdea",
    backgroundColor: "#fff7fa",
    textColor: "#2d2026",
    headingColor: "#1d1218",
    fontFamily: '"Poppins", system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
  },
  contact: {
    phone: "+91 9689142418",
    email: "sidrahkhatib00@gmail.com",
    linkedin: "https://www.linkedin.com/in/sidrah-khatib-a52244220"
  },
  pdf: {
    url: "Sidrah_Khatib_CV.pdf"
  },
  // NEW: uploads for images/documents per section
  uploads: {
    profile: [],
    projects: [],
    experience: [],
    education: [],
    certifications: []
  }
};

function deepMerge(base, override) {
  if (typeof base !== "object" || base === null) return override ?? base;
  const result = Array.isArray(base) ? [...base] : { ...base };
  if (typeof override !== "object" || override === null) return result;
  for (const key of Object.keys(override)) {
    if (override[key] === undefined || override[key] === null) continue;
    if (Array.isArray(override[key])) {
      result[key] = override[key];
    } else if (typeof override[key] === "object") {
      result[key] = deepMerge(base[key] ?? {}, override[key]);
    } else {
      result[key] = override[key];
    }
  }
  return result;
}

function ensureUploadsShape(data) {
  if (!data.uploads || typeof data.uploads !== "object") {
    data.uploads = {};
  }
  const keys = ["profile", "projects", "experience", "education", "certifications"];
  keys.forEach((k) => {
    if (!Array.isArray(data.uploads[k])) {
      data.uploads[k] = [];
    }
  });
  return data;
}

function loadData() {
  const stored = localStorage.getItem("cvSiteData");
  let merged = DEFAULT_DATA;
  if (!stored) {
    return ensureUploadsShape({ ...DEFAULT_DATA });
  }
  try {
    const parsed = JSON.parse(stored);
    merged = deepMerge(DEFAULT_DATA, parsed);
  } catch (e) {
    console.warn("Failed to parse cvSiteData in admin, using defaults", e);
    merged = { ...DEFAULT_DATA };
  }
  return ensureUploadsShape(merged);
}

function saveData(data) {
  localStorage.setItem("cvSiteData", JSON.stringify(data));
}

// ===== LOGIN =====

document.addEventListener("DOMContentLoaded", () => {
  const loginScreen = document.getElementById("login-screen");
  const adminScreen = document.getElementById("admin-screen");
  const loginForm = document.getElementById("login-form");
  const passwordInput = document.getElementById("admin-password");
  const loginError = document.getElementById("login-error");
  const logoutBtn = document.getElementById("logout-btn");

  // Simple session flag in memory only
  let loggedIn = false;

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = passwordInput.value.trim();
    if (value === ADMIN_PASSWORD) {
      loggedIn = true;
      loginError.textContent = "";
      loginScreen.classList.add("hidden");
      adminScreen.classList.remove("hidden");
      initAdmin();
    } else {
      loginError.textContent = "Incorrect password. Please try again.";
    }
  });

  logoutBtn.addEventListener("click", () => {
    loggedIn = false;
    adminScreen.classList.add("hidden");
    loginScreen.classList.remove("hidden");
    passwordInput.value = "";
  });
});

// ===== ADMIN UI =====

let currentData = null;

// Upload config (for all sections)
const UPLOAD_CONFIGS = [
  {
    section: "profile",
    inputId: "profile-upload-input",
    dropzoneId: "profile-upload-dropzone",
    listId: "profile-upload-list",
    single: true // profile photo: keep last / single
  },
  {
    section: "projects",
    inputId: "projects-upload-input",
    dropzoneId: "projects-upload-dropzone",
    listId: "projects-upload-list",
    single: false
  },
  {
    section: "experience",
    inputId: "experience-upload-input",
    dropzoneId: "experience-upload-dropzone",
    listId: "experience-upload-list",
    single: false
  },
  {
    section: "education",
    inputId: "education-upload-input",
    dropzoneId: "education-upload-dropzone",
    listId: "education-upload-list",
    single: false
  },
  {
    section: "certifications",
    inputId: "certifications-upload-input",
    dropzoneId: "certifications-upload-dropzone",
    listId: "certifications-upload-list",
    single: false
  }
];

function initAdmin() {
  currentData = loadData();
  bindSidebar();
  fillForm(currentData);
  initUploaders();
  bindSave();
}

function bindSidebar() {
  const buttons = Array.from(document.querySelectorAll(".sidebar-item"));
  const panels = Array.from(document.querySelectorAll(".panel"));
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-panel");
      buttons.forEach((b) => b.classList.toggle("active", b === btn));
      panels.forEach((p) => p.classList.toggle("active", p.id === id));
    });
  });
}

function fillForm(data) {
  // Profile
  document.getElementById("profile-name").value = data.profile?.name || "";
  document.getElementById("profile-title").value = data.profile?.title || "";
  document.getElementById("profile-location").value = data.profile?.location || "";
  document.getElementById("profile-summary").value = data.profile?.summary || "";
  document.getElementById("profile-image-url").value = data.profile?.profileImageUrl || "";
  document.getElementById("profile-highlights").value = (data.profile?.highlights || []).join("\n");

  // About
  document.getElementById("about-text-input").value = data.about || "";

  // Skills & languages
  document.getElementById("skills-input").value = (data.skills || []).join(", ");
  document.getElementById("languages-input").value = (data.languages || []).join(", ");

  // Projects
  document.getElementById("projects-input").value = (data.projects || [])
    .map((p) => {
      const title = p.title || "";
      const desc = p.description || "";
      const subtitle = p.subtitle || "";
      const img = p.imageUrl || "";
      const link = p.link || "";
      return `${title} - ${desc}${
        subtitle || img || link
          ? " | " + [subtitle, img, link].filter(Boolean).join(" | ")
          : ""
      }`;
    })
    .join("\n");

  // Experience
  document.getElementById("experience-input").value = (data.experience || [])
    .map((e) => {
      const role = e.role || "";
      const company = e.company || "";
      const desc = e.description || "";
      const dates = e.dates || "";
      const img = e.imageUrl || "";
      const main = `${role}${company ? " @ " + company : ""} - ${desc}`;
      const rest = [dates, img].filter(Boolean).join(" | ");
      return rest ? `${main} | ${rest}` : main;
    })
    .join("\n");

  // Education
  document.getElementById("education-input").value = (data.education || [])
    .map((ed) => {
      const title = ed.title || "";
      const inst = ed.institution || "";
      const dates = ed.dates || "";
      const details = (ed.details || []).join(", ");
      const main = `${title} - ${inst}`;
      const rest = [dates, details].filter(Boolean).join(" | ");
      return rest ? `${main} | ${rest}` : main;
    })
    .join("\n");

  // Certs
  document.getElementById("certifications-input").value = (data.certifications || []).join("\n");

  // Theme & fonts
  document.getElementById("theme-primary").value = data.theme?.primaryColor || "#f48fb1";
  document.getElementById("theme-accent").value = data.theme?.accentColor || "#f5cdea";
  document.getElementById("theme-background").value = data.theme?.backgroundColor || "#fff7fa";
  document.getElementById("theme-text").value = data.theme?.textColor || "#2d2026";
  document.getElementById("theme-heading").value = data.theme?.headingColor || "#1d1218";
  const fontSelect = document.getElementById("theme-font");
  const fontValue =
    data.theme?.fontFamily ||
    '"Poppins", system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
  Array.from(fontSelect.options).forEach((opt) => {
    opt.selected = opt.value === fontValue;
  });

  // Contact & PDF
  document.getElementById("contact-phone-input").value = data.contact?.phone || "";
  document.getElementById("contact-email-input").value = data.contact?.email || "";
  document.getElementById("contact-linkedin-input").value = data.contact?.linkedin || "";
  document.getElementById("pdf-url-input").value = data.pdf?.url || "";
}

// ===== UPLOAD / DRAG & DROP HANDLING =====

function initUploaders() {
  ensureUploadsShape(currentData);

  UPLOAD_CONFIGS.forEach((cfg) => {
    setupImageUploader(cfg);
    renderUploadList(cfg);
  });
}

function ensureUploadSection(section) {
  if (!currentData.uploads || typeof currentData.uploads !== "object") {
    currentData.uploads = {};
  }
  if (!Array.isArray(currentData.uploads[section])) {
    currentData.uploads[section] = [];
  }
}

function setupImageUploader(cfg) {
  const inputEl = document.getElementById(cfg.inputId);
  const dropzoneEl = document.getElementById(cfg.dropzoneId);
  if (!inputEl || !dropzoneEl) return;

  ensureUploadSection(cfg.section);

  // Click to open file dialog
  dropzoneEl.addEventListener("click", () => {
    inputEl.click();
  });

  // Input change
  inputEl.addEventListener("change", async (e) => {
    if (!e.target.files || !e.target.files.length) return;
    await handleFilesForSection(cfg, e.target.files);
    inputEl.value = ""; // reset so same file can be added again if needed
  });

  // Drag over
  dropzoneEl.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzoneEl.classList.add("drag-over");
  });

  dropzoneEl.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropzoneEl.classList.remove("drag-over");
  });

  dropzoneEl.addEventListener("drop", async (e) => {
    e.preventDefault();
    dropzoneEl.classList.remove("drag-over");
    const files = e.dataTransfer?.files;
    if (!files || !files.length) return;
    await handleFilesForSection(cfg, files);
  });
}

async function handleFilesForSection(cfg, fileList) {
  ensureUploadSection(cfg.section);
  const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
  for (const file of files) {
    try {
      const dataUrl = await compressImageFile(file, 1200);
      const imageObj = {
        id: Date.now().toString(16) + Math.random().toString(16).slice(2),
        name: file.name,
        dataUrl
      };
      if (cfg.single) {
        // keep only last / single
        currentData.uploads[cfg.section] = [imageObj];
      } else {
        currentData.uploads[cfg.section].push(imageObj);
      }
    } catch (err) {
      console.warn("Failed to process image", err);
    }
  }
  renderUploadList(cfg);
}

// Compress image to max dimension and jpeg dataURL
function compressImageFile(file, maxSize = 1200) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (ev) {
      const img = new Image();
      img.onload = function () {
        try {
          let width = img.width;
          let height = img.height;
          const largestSide = Math.max(width, height);
          const scale = largestSide > maxSize ? maxSize / largestSide : 1;
          width = Math.round(width * scale);
          height = Math.round(height * scale);

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // JPEG at 0.8 quality
          const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
          resolve(dataUrl);
        } catch (e) {
          console.warn("Canvas compression failed, using original data", e);
          resolve(ev.target.result);
        }
      };
      img.onerror = function () {
        console.warn("Image load failed, using original file data");
        resolve(ev.target.result);
      };
      img.src = ev.target.result;
    };
    reader.onerror = function () {
      reject(reader.error || new Error("FileReader error"));
    };
    reader.readAsDataURL(file);
  });
}

function renderUploadList(cfg) {
  const listEl = document.getElementById(cfg.listId);
  if (!listEl) return;

  ensureUploadSection(cfg.section);
  const items = currentData.uploads[cfg.section];

  listEl.innerHTML = "";

  if (!items || !items.length) {
    const empty = document.createElement("p");
    empty.className = "upload-empty";
    empty.textContent = "No files added yet.";
    listEl.appendChild(empty);
    return;
  }

  items.forEach((img) => {
    const wrapper = document.createElement("div");
    wrapper.className = "upload-thumb";

    const imgBox = document.createElement("div");
    imgBox.className = "upload-thumb-image";
    const image = document.createElement("img");
    image.src = img.dataUrl;
    image.alt = img.name || "Uploaded image";
    imgBox.appendChild(image);

    const meta = document.createElement("div");
    meta.className = "upload-thumb-meta";
    const nameSpan = document.createElement("span");
    nameSpan.className = "upload-thumb-name";
    nameSpan.textContent = img.name || "Untitled";

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "upload-remove-btn";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      currentData.uploads[cfg.section] = currentData.uploads[cfg.section].filter(
        (x) => x.id !== img.id
      );
      renderUploadList(cfg);
    });

    meta.appendChild(nameSpan);
    meta.appendChild(removeBtn);

    wrapper.appendChild(imgBox);
    wrapper.appendChild(meta);
    listEl.appendChild(wrapper);
  });
}

// ===== SAVE =====

function bindSave() {
  const saveBtn = document.getElementById("save-btn");
  const statusEl = document.getElementById("save-status");

  saveBtn.addEventListener("click", () => {
    const updated = collectFormData();
    saveData(updated);
    currentData = updated;
    statusEl.textContent = "Saved! Refresh your public site to see changes.";
    setTimeout(() => {
      statusEl.textContent = "";
    }, 3500);
  });
}

function collectFormData() {
  // Start from current in-memory data so unsaved uploads are included
  let data = currentData || loadData();
  data = ensureUploadsShape(data);

  // Profile
  data.profile = {
    ...(data.profile || {}),
    name: document.getElementById("profile-name").value.trim(),
    title: document.getElementById("profile-title").value.trim(),
    location: document.getElementById("profile-location").value.trim(),
    summary: document.getElementById("profile-summary").value.trim(),
    profileImageUrl: document.getElementById("profile-image-url").value.trim(),
    highlights: document
      .getElementById("profile-highlights")
      .value.split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    email: data.profile?.email || data.contact?.email || "",
    phone: data.profile?.phone || data.contact?.phone || "",
    linkedin: data.profile?.linkedin || data.contact?.linkedin || ""
  };

  // If a profile upload exists, override profileImageUrl with first upload's dataUrl
  if (data.uploads?.profile && data.uploads.profile.length > 0) {
    const first = data.uploads.profile[0];
    if (first && first.dataUrl) {
      data.profile.profileImageUrl = first.dataUrl;
    }
  }

  // About
  data.about = document.getElementById("about-text-input").value.trim();

  // Skills & languages
  data.skills = document
    .getElementById("skills-input")
    .value.split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  data.languages = document
    .getElementById("languages-input")
    .value.split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  // Projects
  data.projects = document
    .getElementById("projects-input")
    .value.split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [main] = line.split(" | ");
      const extras = line.split(" | ").slice(1); // subtitle, image, link
      const [titlePart, descPart] = (main || "").split(" - ");
      const [subtitle = "", imageUrl = "", link = ""] = extras;
      return {
        title: (titlePart || "").trim(),
        description: (descPart || "").trim(),
        subtitle: (subtitle || "").trim(),
        imageUrl: (imageUrl || "").trim(),
        link: (link || "").trim(),
        tech: [] // manual / extend later
      };
    });

  // Experience
  data.experience = document
    .getElementById("experience-input")
    .value.split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [main, dates, imageUrl] = line.split(" | ");
      const [roleCompany, desc] = (main || "").split(" - ");
      const [role, company] = (roleCompany || "").split("@");
      return {
        role: (role || "").trim(),
        company: (company || "").trim(),
        description: (desc || "").trim(),
        dates: (dates || "").trim(),
        imageUrl: (imageUrl || "").trim()
      };
    });

  // Education
  data.education = document
    .getElementById("education-input")
    .value.split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [main, dates, details] = line.split(" | ");
      const [title, inst] = (main || "").split(" - ");
      return {
        title: (title || "").trim(),
        institution: (inst || "").trim(),
        dates: (dates || "").trim(),
        details: (details || "")
          .split(",")
          .map((d) => d.trim())
          .filter(Boolean)
      };
    });

  // Certifications (still stored as simple array of strings)
  data.certifications = document
    .getElementById("certifications-input")
    .value.split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  // Theme & fonts
  data.theme = {
    primaryColor: document.getElementById("theme-primary").value || "#f48fb1",
    accentColor: document.getElementById("theme-accent").value || "#f5cdea",
    backgroundColor: document.getElementById("theme-background").value || "#fff7fa",
    textColor: document.getElementById("theme-text").value || "#2d2026",
    headingColor: document.getElementById("theme-heading").value || "#1d1218",
    fontFamily: document.getElementById("theme-font").value
  };

  // Contact & PDF
  data.contact = {
    phone: document.getElementById("contact-phone-input").value.trim(),
    email: document.getElementById("contact-email-input").value.trim(),
    linkedin: document.getElementById("contact-linkedin-input").value.trim()
  };

  data.pdf = {
    url: document.getElementById("pdf-url-input").value.trim() || "Sidrah_Khatib_CV.pdf"
  };

  // uploads already live in currentData / data.uploads; just ensure shape
  data = ensureUploadsShape(data);

  return data;
}
