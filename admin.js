const STORAGE_KEY = "sidrah_portfolio_data_v1";
const ADMIN_PASSWORD = "Sidk2026!"; // kept only in JS, not shown in UI

let adminData = null;

/* Load & save same structure as user */
function getDefaultDataAdmin() {
  // If script.js is loaded in some context
  if (window.getDefaultData) return window.getDefaultData();
  // Fallback minimal structure
  return {
    name: "",
    role: "",
    about: "",
    language: "en",
    contact: {
      phone: "",
      email: "",
      linkedin: "",
      location: "",
    },
    projects: [],
    experience: [],
    certifications: [],
    education: [],
    theme: {
      mode: "auto",
      primary: "#4f46e5",
      background: "#f5f5f7",
      accent: "#e5e7eb",
      fontFamily: "'Inter', system-ui",
    },
    cv: {
      defaultPath: "assets/cv-default.pdf",
      customDataUrl: null,
      fileName: "CV.pdf",
    },
    profileImage: {
      url: "",
    },
  };
}

function loadAdminData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return getDefaultDataAdmin();
    const parsed = JSON.parse(stored);
    const defaults = getDefaultDataAdmin();
    return { ...defaults, ...parsed };
  } catch (e) {
    console.warn("Error reading stored data", e);
    return getDefaultDataAdmin();
  }
}

function saveAdminData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(adminData));
  } catch (e) {
    console.warn("Error saving admin data", e);
  }
}

/* Simple helper to create elements */
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

/* LOGIN LOGIC */
function initLogin() {
  const loginSection = document.getElementById("login-section");
  const dashboardSection = document.getElementById("dashboard-section");
  const loginForm = document.getElementById("login-form");
  const passwordInput = document.getElementById("admin-password");
  const errorEl = document.getElementById("login-error");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const pwd = passwordInput.value;
    if (pwd === ADMIN_PASSWORD) {
      errorEl.textContent = "";
      loginSection.hidden = true;
      dashboardSection.hidden = false;
      document.body.style.alignItems = "stretch";
      localStorage.setItem("sidrah_admin_logged_in", "true");
      initializeDashboard();
    } else {
      errorEl.textContent = "Incorrect password. Please try again.";
    }
  });

  // If already logged in for this browser
  if (localStorage.getItem("sidrah_admin_logged_in") === "true") {
    loginSection.hidden = true;
    dashboardSection.hidden = false;
    document.body.style.alignItems = "stretch";
    initializeDashboard();
  } else {
    // small reveal animation for login card
    requestAnimationFrame(() => {
      const loginCard = document.querySelector(".login-card.reveal");
      if (loginCard) loginCard.classList.add("visible");
    });
  }
}

/* TABS */
function initTabs() {
  const buttons = Array.from(document.querySelectorAll(".nav-item"));
  const panels = Array.from(document.querySelectorAll(".tab-panel"));

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.getAttribute("data-tab");

      buttons.forEach((b) => b.classList.remove("active"));
      panels.forEach((p) => {
        if (p.getAttribute("data-panel") === tab) {
          p.hidden = false;
          p.classList.add("tab-active");
        } else {
          p.hidden = true;
          p.classList.remove("tab-active");
        }
      });

      btn.classList.add("active");
    });
  });
}

/* PERSONAL INFO */
function loadPersonalForm() {
  const f = adminData;
  document.getElementById("personal-name").value = f.name || "";
  document.getElementById("personal-role").value = f.role || "";
  document.getElementById("personal-about").value = f.about || "";
  document.getElementById("personal-phone").value = f.contact?.phone || "";
  document.getElementById("personal-email").value = f.contact?.email || "";
  document.getElementById("personal-linkedin").value = f.contact?.linkedin || "";
  document.getElementById("personal-location").value = f.contact?.location || "";
}

function initPersonalForm() {
  const form = document.getElementById("personal-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    adminData.name = document.getElementById("personal-name").value.trim();
    adminData.role = document.getElementById("personal-role").value.trim();
    adminData.about = document.getElementById("personal-about").value.trim();
    adminData.contact = adminData.contact || {};
    adminData.contact.phone = document.getElementById("personal-phone").value.trim();
    adminData.contact.email = document.getElementById("personal-email").value.trim();
    adminData.contact.linkedin = document
      .getElementById("personal-linkedin")
      .value.trim();
    adminData.contact.location = document
      .getElementById("personal-location")
      .value.trim();
    saveAdminData();
    alert("Personal info saved.");
  });
}

/* GENERIC LIST RENDERER (projects, experience, certifications) */
function renderItemList(sectionKey, containerId, addBtnId, labels) {
  const listEl = document.getElementById(containerId);
  const addBtn = document.getElementById(addBtnId);

  function createCard(item, index) {
    const card = el("div", "item-card");

    const fields = el("div", "item-fields");
    const actions = el("div", "item-actions");

    const titleField = el("label", "field");
    titleField.append(el("span", null, labels.title));
    const titleInput = el("input");
    titleInput.value = item.title || "";
    titleField.append(titleInput);

    const subtitleField = el("label", "field");
    subtitleField.append(el("span", null, labels.subtitle));
    const subtitleInput = el("input");
    subtitleInput.value = item.subtitle || item.company || item.organization || "";
    subtitleField.append(subtitleInput);

    const periodField = el("label", "field");
    periodField.append(el("span", null, "Period"));
    const periodInput = el("input");
    periodInput.value = item.period || "";
    periodField.append(periodInput);

    const descField = el("label", "field");
    descField.append(el("span", null, "Description"));
    const descInput = document.createElement("textarea");
    descInput.rows = 3;
    descInput.value = item.description || "";
    descField.append(descInput);

    fields.appendChild(titleField);
    fields.appendChild(subtitleField);
    fields.appendChild(periodField);
    fields.appendChild(descField);

    const imgField = el("label", "field");
    imgField.append(el("span", null, "Image URL (optional)"));
    const imgInput = el("input");
    imgInput.value = item.imageUrl || "";
    imgField.append(imgInput);

    const saveBtn = el("button", "btn btn-primary", "Save");
    const deleteBtn = el("button", "btn btn-outline", "Delete");

    saveBtn.addEventListener("click", () => {
      const arr = adminData[sectionKey] || [];
      const current = arr[index];
      current.title = titleInput.value.trim();
      current.subtitle = subtitleInput.value.trim();
      current.period = periodInput.value.trim();
      current.description = descInput.value.trim();
      current.imageUrl = imgInput.value.trim();
      // map subtitle to right field for experience/certs
      if (labels.subtitleKey && labels.subtitleKey !== "subtitle") {
        current[labels.subtitleKey] = current.subtitle;
      }
      saveAdminData();
      alert("Saved.");
    });

    deleteBtn.addEventListener("click", () => {
      if (!confirm("Delete this item?")) return;
      adminData[sectionKey].splice(index, 1);
      saveAdminData();
      render(); // re-render after delete
    });

    actions.appendChild(imgField);
    actions.appendChild(saveBtn);
    actions.appendChild(deleteBtn);

    card.appendChild(fields);
    card.appendChild(actions);
    return card;
  }

  function render() {
    listEl.innerHTML = "";
    const arr = adminData[sectionKey] || [];
    arr.forEach((item, idx) => {
      listEl.appendChild(createCard(item, idx));
    });
  }

  addBtn.addEventListener("click", () => {
    adminData[sectionKey] = adminData[sectionKey] || [];
    adminData[sectionKey].push({
      title: "",
      subtitle: "",
      company: "",
      organization: "",
      period: "",
      description: "",
      imageUrl: "",
    });
    saveAdminData();
    render();
  });

  function renderWrapper() {
    render();
  }

  renderItemList[sectionKey] = renderWrapper; // store reference
  render();
}

/* CV & PROFILE IMAGE */
function initCvPanel() {
  const fileNameInput = document.getElementById("cv-file-name");
  const fileInput = document.getElementById("cv-file-input");
  const saveBtn = document.getElementById("save-cv-btn");

  const profileUrlInput = document.getElementById("profile-image-url");
  const profileFileInput = document.getElementById("profile-image-file");
  const saveProfileBtn = document.getElementById("save-profile-image-btn");

  // Prefill
  adminData.cv = adminData.cv || {
    defaultPath: "assets/cv-default.pdf",
    customDataUrl: null,
    fileName: "CV.pdf",
  };
  fileNameInput.value = adminData.cv.fileName || "CV.pdf";

  adminData.profileImage = adminData.profileImage || { url: "" };
  profileUrlInput.value = adminData.profileImage.url || "";

  saveBtn.addEventListener("click", () => {
    adminData.cv.fileName = fileNameInput.value.trim() || "CV.pdf";
    if (!adminData.cv.customDataUrl && !adminData.cv.defaultPath) {
      adminData.cv.defaultPath = "assets/cv-default.pdf";
    }
    saveAdminData();
    alert("CV settings saved. The user page will use the new PDF/filename.");
  });

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      adminData.cv.customDataUrl = e.target.result; // data URL
      saveAdminData();
      alert("New CV file stored. Download button will use this file.");
    };
    reader.readAsDataURL(file);
  });

  // Profile image
  saveProfileBtn.addEventListener("click", () => {
    const url = profileUrlInput.value.trim();
    if (url) {
      adminData.profileImage.url = url;
      saveAdminData();
      alert("Profile image URL saved.");
      return;
    }
    if (!adminData.profileImage.url) {
      alert("Provide a URL or upload an image.");
    }
  });

  profileFileInput.addEventListener("change", () => {
    const file = profileFileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      adminData.profileImage.url = e.target.result; // data URL
      profileUrlInput.value = "";
      saveAdminData();
      alert("Profile image updated from file.");
    };
    reader.readAsDataURL(file);
  });
}

/* THEME + LANGUAGE PANEL */
function initThemePanel() {
  adminData.theme = adminData.theme || {
    mode: "auto",
    primary: "#4f46e5",
    background: "#f5f5f7",
    accent: "#e5e7eb",
    fontFamily: "'Inter', system-ui",
  };

  if (!adminData.language) adminData.language = "en";

  const primaryInput = document.getElementById("theme-primary");
  const backgroundInput = document.getElementById("theme-background");
  const accentInput = document.getElementById("theme-accent");
  const fontSelect = document.getElementById("theme-font");
  const modeSelect = document.getElementById("theme-mode-admin");
  const langSelect = document.getElementById("default-language");
  const form = document.getElementById("theme-form");

  primaryInput.value = adminData.theme.primary;
  backgroundInput.value = adminData.theme.background;
  accentInput.value = adminData.theme.accent;
  fontSelect.value = adminData.theme.fontFamily;
  modeSelect.value = adminData.theme.mode || "auto";
  langSelect.value = adminData.language || "en";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    adminData.theme.primary = primaryInput.value;
    adminData.theme.background = backgroundInput.value;
    adminData.theme.accent = accentInput.value;
    adminData.theme.fontFamily = fontSelect.value;
    adminData.theme.mode = modeSelect.value;
    adminData.language = langSelect.value;
    saveAdminData();
    alert("Theme & language saved. Refresh the user page to see changes.");
  });
}

/* LOGOUT */
function initLogout() {
  const btn = document.getElementById("logout-btn");
  btn.addEventListener("click", () => {
    localStorage.removeItem("sidrah_admin_logged_in");
    location.reload();
  });
}

/* Main dashboard init */
function initializeDashboard() {
  // Ensure default provider exists for structure
  if (!window.getDefaultData) {
    window.getDefaultData = function () {
      return getDefaultDataAdmin();
    };
  }

  adminData = loadAdminData();

  initTabs();
  loadPersonalForm();
  initPersonalForm();

  renderItemList("projects", "projects-list", "add-project-btn", {
    title: "Project title",
    subtitle: "Subtitle (stack, client, etc.)",
    subtitleKey: "subtitle",
  });

  renderItemList("experience", "experience-list", "add-experience-btn", {
    title: "Role / Position",
    subtitle: "Company",
    subtitleKey: "company",
  });

  renderItemList("certifications", "certifications-list", "add-cert-btn", {
    title: "Certification name",
    subtitle: "Organization",
    subtitleKey: "organization",
  });

  initCvPanel();
  initThemePanel();
  initLogout();
}

/* Entry */
document.addEventListener("DOMContentLoaded", () => {
  initLogin();
});
