const STORAGE_KEY = "sidrah_portfolio_data_v1";
const PAGE_SIZE = 4;

let appData = null;
const currentPages = {
  projects: 0,
  experience: 0,
  certifications: 0,
};

/* ==== MULTI-LANGUAGE LABELS ==== */
const LABELS = {
  en: {
    skills: "Skills",
    education: "Education",
    projects: "Projects",
    experience: "Experience",
    certifications: "Certifications",
    phoneLabel: "Phone",
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
    callBtn: "Call",
    emailBtn: "Gmail",
    rights: "All rights reserved.",
    downloadCv: "Download CV (PDF)",
    displaySettings: "Display Settings",
    themeMode: "Theme mode",
    modeAuto: "Auto (system)",
    modeLight: "Light",
    modeDark: "Dark",
    primaryColor: "Primary color",
    backgroundColor: "Background color",
    accentColor: "Accent color (lines/cards)",
    fontFamily: "Font family",
    saveTheme: "Save",
  },
  hi: {
    skills: "कौशल",
    education: "शिक्षा",
    projects: "प्रोजेक्ट्स",
    experience: "अनुभव",
    certifications: "प्रमाणपत्र",
    phoneLabel: "फ़ोन",
    emailLabel: "ईमेल",
    linkedinLabel: "लिंक्डइन",
    callBtn: "कॉल",
    emailBtn: "जीमेल",
    rights: "सभी अधिकार सुरक्षित।",
    downloadCv: "सीवी डाउनलोड (PDF)",
    displaySettings: "डिस्प्ले सेटिंग्स",
    themeMode: "थीम मोड",
    modeAuto: "ऑटो (सिस्टम)",
    modeLight: "लाइट",
    modeDark: "डार्क",
    primaryColor: "प्राथमिक रंग",
    backgroundColor: "पृष्ठभूमि रंग",
    accentColor: "एक्सेंट रंग (लाइन्स/कार्ड)",
    fontFamily: "फ़ॉन्ट",
    saveTheme: "सेव करें",
  },
  ur: {
    skills: "مہارتیں",
    education: "تعلیم",
    projects: "پروجیکٹس",
    experience: "تجربہ",
    certifications: "سرٹیفیکیشنز",
    phoneLabel: "فون",
    emailLabel: "ای میل",
    linkedinLabel: "لنکڈ اِن",
    callBtn: "کال",
    emailBtn: "جی میل",
    rights: "تمام حقوق محفوظ ہیں۔",
    downloadCv: "سی وی ڈاؤن لوڈ (PDF)",
    displaySettings: "ڈسپلے سیٹنگز",
    themeMode: "تھیم موڈ",
    modeAuto: "آٹو (سسٹم)",
    modeLight: "لائٹ",
    modeDark: "ڈارک",
    primaryColor: "پرائمری رنگ",
    backgroundColor: "بیک گراؤنڈ رنگ",
    accentColor: "ایکسینٹ رنگ (لائن/کارڈ)",
    fontFamily: "فونٹ فیملی",
    saveTheme: "محفوظ کریں",
  },
};

/* ==== DEFAULT DATA ==== */
function getDefaultData() {
  return {
    name: "SIDRAH KHATIB",
    role: "Computer Science Student & Web Developer",
    about:
      "I enjoy solving real-world problems using technology, especially in IoT and web development. I like building complete solutions that actually work in daily life.",
    language: "en",
    contact: {
      phone: "+91 9689142418",
      email: "sidrahkhatib00@gmail.com",
      linkedin: "https://linkedin.com/in/sidrah-khatib-a52244220",
      location: "Mumbai, India",
    },
    skills: [
      "Python",
      "Java",
      "JavaScript",
      "HTML & CSS",
      "SQL / MySQL",
      "MongoDB",
      "Wireshark",
      "VMware",
      "GitHub",
      "MS Excel",
      "ESP32 / Arduino",
      "Raspberry Pi",
      "NodeMCU (ESP8266)",
      "Responsive Web Design",
    ],
    education: [
      {
        title: "B.Sc. in Computer Science",
        institution: "Mumbai University",
        period: "2023 - 2025",
        meta: "CGPA 9.2 / 10",
      },
      {
        title: "On-Campus IT Assistant | Web Developer (Intern)",
        institution: "L.G.M A.C.S College, Mandangad",
        period: "2022 - 2023",
        meta: "Supported staff & students, managed online systems",
      },
      {
        title: "12th HSC (Science)",
        institution: "L.G.M A.C.S College, Mandangad",
        period: "2020 - 2022",
        meta: "54%",
      },
      {
        title: "10th (English Medium)",
        institution: "English Medium School, Mandangad",
        period: "2019 - 2020",
        meta: "74.40%",
      },
    ],
    projects: [
      {
        title: "IoT RFID Attendance System",
        subtitle: "Using Google Sheets & NodeMCU (ESP8266)",
        period: "",
        description:
          "End-to-end system to automate attendance using RFID cards and Google Sheets, reducing manual work and errors.",
        imageUrl: "",
      },
      {
        title: "Money Transfer Recording Software",
        subtitle: "Awes Enterprises Software (Freelance Project)",
        period: "Aug 2025 - Nov 2025",
        description:
          "Desktop app using Python (Tkinter) and MySQL to record and manage money transfer transactions with validation.",
        imageUrl: "",
      },
      {
        title: "Grocery Management System",
        subtitle: "Python Web Application",
        period: "",
        description:
          "Web-based system to manage grocery items, inventory and operations with a clean interface.",
        imageUrl: "",
      },
      {
        title: "Weather Checker Website",
        subtitle: "",
        period: "",
        description: "Responsive site to check live weather for any location.",
        imageUrl: "",
      },
      {
        title: "QR Code Maker Website",
        subtitle: "",
        period: "",
        description: "Tool to generate QR codes quickly for links and text.",
        imageUrl: "",
      },
      {
        title: "Snake Game",
        subtitle: "",
        period: "",
        description: "Classic snake game built to strengthen logic and UI skills.",
        imageUrl: "",
      },
    ],
    experience: [
      {
        title: "On-Campus IT Assistant",
        company: "L.G.M A.C.S College, Mandangad",
        period: "2022 - 2023",
        description:
          "Supported students and staff with technical issues, managed projectors and systems, and assisted in digital attendance.",
        imageUrl: "",
      },
      {
        title: "Web Developer (Intern)",
        company: "Kauchali Enterprises",
        period: "2022 - 2023",
        description:
          "Developed and maintained front-end and back-end features, optimised performance and mobile compatibility.",
        imageUrl: "",
      },
    ],
    certifications: [
      {
        title: "Foundations of Cybersecurity",
        organization: "Google",
        period: "",
        description: "",
        imageUrl: "",
      },
      {
        title: "MySQL with Information Technology",
        organization: "Coursera",
        period: "",
        description: "",
        imageUrl: "",
      },
    ],
    theme: {
      mode: "auto", // 'auto' | 'light' | 'dark'
      primary: "#4f46e5",
      background: "#f5f5f7",
      accent: "#e5e7eb",
      fontFamily: "'Inter', system-ui",
    },
    cv: {
      defaultPath: "assets/cv-default.pdf",
      customDataUrl: null,
      fileName: "Sidrah_Khatib_CV.pdf",
    },
    profileImage: {
      url: "",
    },
  };
}

/* make default visible to admin page if needed */
window.getDefaultData = getDefaultData;

/* ==== STORAGE ==== */
function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return getDefaultData();
    const parsed = JSON.parse(stored);
    const defaults = getDefaultData();
    return { ...defaults, ...parsed };
  } catch (err) {
    console.warn("Error loading stored data, using defaults", err);
    return getDefaultData();
  }
}

function saveData() {
  if (!appData) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
  } catch (err) {
    console.warn("Error saving data", err);
  }
}

/* ==== THEME / DARK MODE ==== */
let systemDarkMatcher = null;

function resolveMode(mode) {
  if (mode === "light" || mode === "dark") return mode;
  // auto = follow system
  if (window.matchMedia) {
    if (!systemDarkMatcher) {
      systemDarkMatcher = window.matchMedia("(prefers-color-scheme: dark)");
    }
    return systemDarkMatcher.matches ? "dark" : "light";
  }
  return "light";
}

function applyTheme(theme) {
  if (!theme) return;
  const root = document.documentElement;
  if (theme.primary) root.style.setProperty("--primary", theme.primary);
  if (theme.background) root.style.setProperty("--background", theme.background);
  if (theme.accent) root.style.setProperty("--accent", theme.accent);
  if (theme.fontFamily) root.style.setProperty("--font-family", theme.fontFamily);

  const effectiveMode = resolveMode(theme.mode || "auto");
  root.setAttribute("data-theme", effectiveMode);
}

function setupThemePanel() {
  const panel = document.getElementById("theme-panel");
  const toggleBtn = document.getElementById("theme-toggle-btn");
  const closeBtn = document.getElementById("theme-panel-close");
  const primaryInput = document.getElementById("primary-color-input");
  const backgroundInput = document.getElementById("background-color-input");
  const accentInput = document.getElementById("accent-color-input");
  const fontSelect = document.getElementById("font-family-select");
  const modeSelect = document.getElementById("theme-mode-select");
  const saveBtn = document.getElementById("save-theme-btn");

  if (!panel) return;

  // Prefill
  primaryInput.value = appData.theme.primary || "#4f46e5";
  backgroundInput.value = appData.theme.background || "#f5f5f7";
  accentInput.value = appData.theme.accent || "#e5e7eb";
  fontSelect.value = appData.theme.fontFamily || "'Inter', system-ui";
  modeSelect.value = appData.theme.mode || "auto";

  toggleBtn.addEventListener("click", () => {
    panel.classList.toggle("open");
  });

  closeBtn.addEventListener("click", () => {
    panel.classList.remove("open");
  });

  saveBtn.addEventListener("click", () => {
    appData.theme.primary = primaryInput.value;
    appData.theme.background = backgroundInput.value;
    appData.theme.accent = accentInput.value;
    appData.theme.fontFamily = fontSelect.value;
    appData.theme.mode = modeSelect.value;
    applyTheme(appData.theme);
    saveData();
    panel.classList.remove("open");
  });

  // System change listener for auto mode
  if (window.matchMedia) {
    systemDarkMatcher = window.matchMedia("(prefers-color-scheme: dark)");
    systemDarkMatcher.addEventListener("change", () => {
      if ((appData.theme.mode || "auto") === "auto") {
        applyTheme(appData.theme);
      }
    });
  }
}

/* ==== LANGUAGE ==== */
function applyLanguage(lang) {
  const dictionary = LABELS[lang] || LABELS.en;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dictionary[key]) {
      el.textContent = dictionary[key];
    }
  });
}

function setupLanguageSelector() {
  const select = document.getElementById("language-select");
  const initialLang = appData.language || "en";
  select.value = initialLang;
  applyLanguage(initialLang);

  select.addEventListener("change", () => {
    const lang = select.value;
    appData.language = lang;
    saveData();
    applyLanguage(lang);
  });
}

/* ==== RENDER BASIC INFO ==== */
function renderProfile() {
  document.getElementById("user-name-display").textContent = appData.name;
  document.getElementById("user-role-display").textContent = appData.role;
  document.getElementById("about-text").textContent = appData.about;

  const profileImg = document.getElementById("profile-image");
  if (appData.profileImage && appData.profileImage.url) {
    profileImg.src = appData.profileImage.url;
  } else {
    // Minimal gradient fallback avatar
    profileImg.src =
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>
            <defs>
              <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
                <stop offset='0%' stop-color='#e5e7eb'/>
                <stop offset='100%' stop-color='#d1d5db'/>
              </linearGradient>
            </defs>
            <rect width='120' height='120' rx='30' fill='url(#g)'/>
            <circle cx='60' cy='46' r='20' fill='#f9fafb'/>
            <path d='M25 96c6-18 18-28 35-28s29 10 35 28' fill='#f9fafb'/>
        </svg>`
      );
  }
}

/* SKILLS */
function renderSkills() {
  const list = document.getElementById("skills-list");
  list.innerHTML = "";
  appData.skills.forEach((skill) => {
    const li = document.createElement("li");
    li.textContent = skill;
    list.appendChild(li);
  });
}

/* EDUCATION */
function renderEducation() {
  const container = document.getElementById("education-list");
  container.innerHTML = "";
  appData.education.forEach((ed) => {
    const row = document.createElement("div");
    row.className = "timeline-item";

    const left = document.createElement("div");
    const right = document.createElement("div");
    right.className = "timeline-meta";

    const title = document.createElement("div");
    title.className = "timeline-main-title";
    title.textContent = ed.title;

    const subtitle = document.createElement("div");
    subtitle.className = "timeline-subtitle";
    subtitle.textContent = `${ed.institution}`;

    left.appendChild(title);
    left.appendChild(subtitle);

    const period = document.createElement("div");
    period.textContent = ed.period;
    const meta = document.createElement("div");
    meta.textContent = ed.meta || "";

    right.appendChild(period);
    right.appendChild(meta);

    row.appendChild(left);
    row.appendChild(right);
    container.appendChild(row);
  });
}

/* GENERIC SECTION RENDERER (Projects, Experience, Certifications) */
function renderSection(sectionKey) {
  const container = document.querySelector(`[data-section="${sectionKey}"]`);
  const pagination = document.querySelector(`[data-pagination="${sectionKey}"]`);
  if (!container || !pagination) return;

  const items = appData[sectionKey] || [];
  const currentPage = currentPages[sectionKey] || 0;
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages - 1);
  currentPages[sectionKey] = safePage;

  const start = safePage * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageItems = items.slice(start, end);

  container.innerHTML = "";
  pageItems.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card reveal";

    const main = document.createElement("div");
    main.className = "card-main";

    const title = document.createElement("h3");
    title.textContent = item.title;
    const subtitle = document.createElement("p");
    subtitle.style.fontWeight = "500";
    subtitle.style.marginBottom = "3px";
    subtitle.textContent = item.subtitle || item.company || item.organization || "";

    const desc = document.createElement("p");
    desc.textContent = item.description || "";

    main.appendChild(title);
    if (subtitle.textContent.trim()) main.appendChild(subtitle);
    if (desc.textContent.trim()) main.appendChild(desc);

    const right = document.createElement("div");
    right.className = "card-image-wrapper";
    if (item.imageUrl) {
      const img = document.createElement("img");
      img.src = item.imageUrl;
      img.alt = item.title;
      right.innerHTML = "";
      right.appendChild(img);
    } else {
      right.textContent = "Optional image";
    }

    const meta = document.createElement("div");
    meta.className = "card-meta";
    meta.textContent = item.period || "";

    card.appendChild(main);
    card.appendChild(right);
    card.appendChild(meta);

    container.appendChild(card);
  });

  // Pagination controls
  pagination.innerHTML = "";
  if (items.length > PAGE_SIZE) {
    const info = document.createElement("span");
    info.textContent = `Page ${safePage + 1} of ${totalPages}`;

    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Prev";
    prevBtn.disabled = safePage === 0;
    prevBtn.addEventListener("click", () => {
      if (currentPages[sectionKey] > 0) {
        currentPages[sectionKey] -= 1;
        renderSection(sectionKey);
        setupRevealObserver(); // re-attach
      }
    });

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.disabled = safePage >= totalPages - 1;
    nextBtn.addEventListener("click", () => {
      if (currentPages[sectionKey] < totalPages - 1) {
        currentPages[sectionKey] += 1;
        renderSection(sectionKey);
        setupRevealObserver(); // re-attach
      }
    });

    pagination.appendChild(info);
    pagination.appendChild(prevBtn);
    pagination.appendChild(nextBtn);
  }
}

/* CONTACT */
function renderContact() {
  const phoneEl = document.getElementById("contact-phone");
  const emailEl = document.getElementById("contact-email");
  const linkedinEl = document.getElementById("contact-linkedin");
  const callBtn = document.getElementById("call-button");
  const emailBtn = document.getElementById("email-button");

  phoneEl.textContent = appData.contact.phone;
  emailEl.textContent = appData.contact.email;
  linkedinEl.textContent = appData.contact.linkedin;
  linkedinEl.href = appData.contact.linkedin || "#";

  callBtn.href = `tel:${appData.contact.phone.replace(/\s+/g, "")}`;
  emailBtn.href = `mailto:${appData.contact.email}`;
}

/* CV DOWNLOAD */
function setupDownloadCv() {
  const btn = document.getElementById("download-cv-btn");
  btn.addEventListener("click", () => {
    const cvInfo = appData.cv || {};
    const href = cvInfo.customDataUrl || cvInfo.defaultPath;
    const a = document.createElement("a");
    a.href = href;
    a.download = cvInfo.fileName || "CV.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}

/* Apple-like “magnetic” button ripple */
function setupMagneticButtons() {
  document.querySelectorAll(".btn-primary").forEach((btn) => {
    btn.addEventListener("pointerenter", () => {
      btn.classList.add("magnetic-active");
    });
    btn.addEventListener("pointerleave", () => {
      btn.classList.remove("magnetic-active");
    });
  });
}

/* Scroll reveal using IntersectionObserver */
let revealObserver = null;

function setupRevealObserver() {
  const elements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("visible"));
    return;
  }
  if (revealObserver) {
    revealObserver.disconnect();
  }
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  elements.forEach((el) => revealObserver.observe(el));
}

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
  appData = loadData();

  // If admin set a language explicitly
  if (appData.language === undefined) {
    appData.language = "en";
  }

  applyTheme(appData.theme);
  applyLanguage(appData.language);

  renderProfile();
  renderSkills();
  renderEducation();
  renderSection("projects");
  renderSection("experience");
  renderSection("certifications");
  renderContact();
  setupDownloadCv();
  setupThemePanel();
  setupLanguageSelector();
  setupMagneticButtons();
  setupRevealObserver();

  document.getElementById("current-year").textContent =
    new Date().getFullYear().toString();
});
