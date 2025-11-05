// =========================
// AlumniConnect - script.js
// Handles UI interactions, sample data, modals, role-based dashboard
// =========================

/* ========= Utility & sample data ========= */

// sample alumni data
const sampleAlumni = [
  { id: 1, name: "Asha Kumar", batch: "2023", dept: "Computer Science", title: "Software Engineer", location: "Bengaluru", linkedin: "#", photo: "images/alumni1.jpg" },
  { id: 2, name: "Ravi Patel", batch: "2024", dept: "Electronics", title: "Embedded Engineer", location: "Chennai", linkedin: "#", photo: "images/alumni1.jpg" },
  { id: 3, name: "Sahana Rao", batch: "2025", dept: "Management", title: "Product Manager", location: "Hyderabad", linkedin: "#", photo: "images/alumni1.jpg" }
];

// sample events
const sampleEvents = [
  { id: 1, title: "Alumni Talk: Industry Trends", date: "2025-11-20 17:00", location: "Auditorium", img: "images/event1.jpg" },
  { id: 2, title: "Annual Alumni Meet", date: "2025-12-10 10:00", location: "Main Lawn", img: "images/event1.jpg" }
];

// sample jobs
let sampleJobs = [
  { id: 1, title: "Frontend Developer", company: "TechCo", location: "Remote", postedBy: "Asha Kumar", description: "React/JS role" },
  { id: 2, title: "Embedded Engineer", company: "EmbedLab", location: "Chennai", postedBy: "Ravi Patel", description: "Firmware and C" }
];

/* ========= DOM Utilities ========= */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* ========= Year fill ========= */
document.addEventListener("DOMContentLoaded", () => {
  const y = new Date().getFullYear();
  ["#year","#year2","#year3"].forEach(id => {
    const el = document.querySelector(id);
    if (el) el.textContent = y;
  });
});

/* ========= Navbar toggles for multiple pages ========= */
function attachNavToggle(toggleId, navId) {
  const t = document.getElementById(toggleId);
  const nav = document.getElementById(navId);
  if (!t || !nav) return;
  t.addEventListener("click", () => nav.classList.toggle("show"));
}
attachNavToggle("navToggle","mainNav");
attachNavToggle("navToggle2","mainNav2");
attachNavToggle("navToggle3","mainNav3");
attachNavToggle("navToggle4","mainNav4");
attachNavToggle("navToggle5","mainNav5");

/* ========= Render alumni cards ========= */
function renderAlumni(list) {
  const grid = $("#alumniGrid");
  if (!grid) return;
  grid.innerHTML = "";
  list.forEach(a => {
    const card = document.createElement("article");
    card.className = "card glass";
    card.innerHTML = `
      <img src="${a.photo}" alt="${a.name}" style="width:100%;height:150px;object-fit:cover;border-radius:10px;margin-bottom:10px;">
      <h4>${a.name}</h4>
      <p>${a.title} • ${a.batch}</p>
      <p>${a.dept} • ${a.location}</p>
      <div style="display:flex;gap:8px;margin-top:10px;">
        <button class="btn small connectBtn" data-id="${a.id}">Connect</button>
        <a href="${a.linkedin}" class="btn small" target="_blank">LinkedIn</a>
      </div>
    `;
    grid.appendChild(card);
  });

  // connect button listeners
  $$(".connectBtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = Number(e.currentTarget.dataset.id);
      showProfileModal(id);
    });
  });
}

/* ========= Show profile modal ========= */
function showProfileModal(id) {
  const profile = sampleAlumni.find(x => x.id === id);
  if (!profile) return;
  const modal = $("#profileModal");
  const body = $("#modalBody");
  body.innerHTML = `
    <div style="display:flex;gap:18px;">
      <img src="${profile.photo}" alt="${profile.name}" style="width:140px;height:140px;object-fit:cover;border-radius:12px;">
      <div>
        <h3>${profile.name}</h3>
        <p><strong>${profile.title}</strong></p>
        <p>${profile.dept} • Batch ${profile.batch}</p>
        <p>${profile.location}</p>
        <p style="margin-top:8px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Connect and send a message.</p>
        <div style="margin-top:12px;">
          <a href="${profile.linkedin}" class="btn">LinkedIn</a>
          <button class="btn primary" id="msgBtn">Message</button>
        </div>
      </div>
    </div>
  `;
  modal.classList.add("show");
  document.getElementById("modalClose").onclick = () => modal.classList.remove("show");
}

/* close modal on escape or outside click */
document.addEventListener("click", (e) => {
  const modal = $("#profileModal");
  if (!modal) return;
  if (modal.classList.contains("show") && e.target === modal) modal.classList.remove("show");
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { const m = $("#profileModal"); if (m) m.classList.remove("show"); } });

/* ========= Search & filter alumni ========= */
const searchInput = $("#alumniSearch");
const filterBatch = $("#filterBatch");
const filterDept = $("#filterDept");
function applyAlumniFilters() {
  if (!$("#alumniGrid")) return;
  const q = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const batch = filterBatch ? filterBatch.value : "";
  const dept = filterDept ? filterDept.value : "";

  const filtered = sampleAlumni.filter(a => {
    const nameMatch = a.name.toLowerCase().includes(q);
    const batchMatch = batch ? a.batch === batch : true;
    const deptMatch = dept ? a.dept === dept : true;
    const otherMatch = `${a.batch} ${a.dept} ${a.title} ${a.location}`.toLowerCase().includes(q);
    return (nameMatch || otherMatch) && batchMatch && deptMatch;
  });
  renderAlumni(filtered);
}
if (searchInput) searchInput.addEventListener("input", applyAlumniFilters);
if (filterBatch) filterBatch.addEventListener("change", applyAlumniFilters);
if (filterDept) filterDept.addEventListener("change", applyAlumniFilters);

/* initialize alumni rendering on DOM load */
document.addEventListener("DOMContentLoaded", () => {
  if ($("#alumniGrid")) renderAlumni(sampleAlumni);
});

/* ========= Render events ========= */
function renderEvents() {
  const container = $("#eventsList");
  if (!container) return;
  container.innerHTML = "";
  sampleEvents.forEach(ev => {
    const card = document.createElement("article");
    card.className = "card glass";
    card.innerHTML = `
      <img src="${ev.img}" alt="${ev.title}" style="width:100%;height:150px;object-fit:cover;border-radius:10px;margin-bottom:10px;">
      <h4>${ev.title}</h4>
      <p>${ev.date} • ${ev.location}</p>
      <div style="margin-top:10px;">
        <button class="btn primary registerBtn" data-id="${ev.id}">Register</button>
      </div>
    `;
    container.appendChild(card);
  });

  $$(".registerBtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = Number(e.currentTarget.dataset.id);
      registerForEvent(id);
    });
  });
}
document.addEventListener("DOMContentLoaded", () => {
  if ($("#eventsList")) renderEvents();
});

/* register for event (dummy - localStorage) */
function registerForEvent(id) {
  const ev = sampleEvents.find(x => x.id === id);
  if (!ev) return alert("Event not found");
  const regs = JSON.parse(localStorage.getItem("registrations") || "[]");
  regs.push({ eventId: id, title: ev.title, timestamp: new Date().toISOString() });
  localStorage.setItem("registrations", JSON.stringify(regs));
  alert(`Registered for: ${ev.title}`);
}

/* ========= Render jobs ========= */
function renderJobs() {
  const container = $("#jobsList");
  if (!container) return;
  container.innerHTML = "";
  sampleJobs.forEach(job => {
    const card = document.createElement("article");
    card.className = "card glass";
    card.innerHTML = `
      <h4>${job.title}</h4>
      <p><strong>${job.company}</strong> • ${job.location}</p>
      <p>Posted by: ${job.postedBy}</p>
      <p style="margin-top:8px;">${job.description || ""}</p>
      <div style="margin-top:10px;display:flex;gap:8px;">
        <button class="btn small applyBtn" data-id="${job.id}">Apply</button>
      </div>
    `;
    container.appendChild(card);
  });

  $$(".applyBtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = Number(e.currentTarget.dataset.id);
      alert("Applied (demo) for job id: " + id);
    });
  });
}
document.addEventListener("DOMContentLoaded", () => {
  if ($("#jobsList")) renderJobs();
});

/* ========= Post Job modal handling ========= */
const postJobBtn = $("#postJobBtn");
const postJobModal = $("#postJobModal");
const postJobClose = $("#postJobClose");
const postJobForm = $("#postJobForm");

if (postJobBtn) {
  postJobBtn.addEventListener("click", () => {
    // show modal only if user is alumni (demo role check)
    const cu = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!cu || cu.role !== "alumni") {
      return alert("Only alumni can post jobs. Please login as an alumni.");
    }
    postJobModal.classList.add("show");
  });
}
if (postJobClose) postJobClose.addEventListener("click", () => postJobModal.classList.remove("show"));

if (postJobForm) {
  postJobForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(postJobForm);
    const job = {
      id: Date.now(),
      title: fd.get("title"),
      company: fd.get("company"),
      location: fd.get("location"),
      description: fd.get("description"),
      postedBy: JSON.parse(localStorage.getItem("currentUser") || '{"name":"Anonymous"}').name
    };
    sampleJobs.unshift(job);
    renderJobs();
    postJobModal.classList.remove("show");
    postJobForm.reset();
    alert("Job posted (demo).");
  });
}

/* ========= Login & Register (localStorage demo) ========= */
const loginForm = $("#loginForm");
const registerForm = $("#registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(registerForm);
    const user = { name: fd.get("name"), email: fd.get("email"), role: fd.get("role") || "student" };
    // For demo, save as "registeredUsers" in localStorage
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    users.push(user);
    localStorage.setItem("registeredUsers", JSON.stringify(users));
    alert("Account created (demo). Please login.");
    registerForm.reset();
    window.location = "login.html";
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(loginForm);
    const email = fd.get("email");
    const role = fd.get("role");
    // For demo allow any login - store currentUser in localStorage
    const name = email.split("@")[0] || "User";
    const currentUser = { name, email, role };
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    alert("Login successful (demo). Redirecting to dashboard.");
    window.location = "dashboard.html";
  });
}

/* ========= Dashboard rendering & sidebar ========= */
const sidebar = $("#sidebar");
const sidebarToggle = $("#sidebarToggle");
const overlay = $("#overlay");
const logoutBtn = $("#logoutBtn");
const dashName = $("#dashName");
const dashRole = $("#dashRole");
const dashArea = $("#dashArea");

function openSidebar() { if (sidebar) sidebar.classList.add("open"); if (overlay) overlay.classList.add("show"); }
function closeSidebar() { if (sidebar) sidebar.classList.remove("open"); if (overlay) overlay.classList.remove("show"); }

if (sidebarToggle) sidebarToggle.addEventListener("click", () => {
  if (sidebar.classList.contains("open")) closeSidebar(); else openSidebar();
});
if (overlay) overlay.addEventListener("click", closeSidebar);
if (logoutBtn) logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location = "index.html";
});

// dashboard content rendering
function renderDashboard() {
  const cu = JSON.parse(localStorage.getItem("currentUser") || "null");
  if (!cu) {
    // not logged in
    if (window.location.pathname.endsWith("dashboard.html")) {
      alert("You must login first.");
      window.location = "login.html";
    }
    return;
  }
  if (dashName) dashName.textContent = cu.name;
  if (dashRole) dashRole.textContent = cu.role;

  if (!dashArea) return;
  dashArea.innerHTML = ""; // clear

  if (cu.role === "student") {
    // student sees alumni quick panel, events, jobs
    const panel = document.createElement("div");
    panel.className = "card glass";
    panel.innerHTML = `<h3>Student View</h3><p>Explore alumni, events, and jobs.</p>`;
    dashArea.appendChild(panel);

    const alumniList = document.createElement("div");
    alumniList.className = "card glass";
    alumniList.innerHTML = `<h4>Featured Alumni</h4><p>Connect with alumni for mentorship.</p>`;
    dashArea.appendChild(alumniList);
  } else if (cu.role === "alumni") {
    // alumni can post jobs, update profile
    const postCard = document.createElement("div");
    postCard.className = "card glass";
    postCard.innerHTML = `<h3>Alumni View</h3><p><button class="btn primary" id="dashPostJob">Post Job</button></p>`;
    dashArea.appendChild(postCard);

    setTimeout(()=> {
      const btn = document.getElementById("dashPostJob");
      if (btn) btn.addEventListener("click", () => { postJobModal.classList.add("show"); });
    }, 20);

  } else if (cu.role === "admin") {
    // admin management
    const adminCard = document.createElement("div");
    adminCard.className = "card glass";
    adminCard.innerHTML = `<h3>Admin View</h3><p>Manage users and view analytics.</p>`;
    dashArea.appendChild(adminCard);

    // fake analytics
    const analytics = document.createElement("div");
    analytics.className = "card glass";
    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]").length;
    analytics.innerHTML = `<h4>Analytics</h4><p>Registered users: ${users}</p><p>Jobs: ${sampleJobs.length}</p><p>Events: ${sampleEvents.length}</p>`;
    dashArea.appendChild(analytics);
  }
}

/* run on dashboard load */
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.endsWith("dashboard.html")) {
    renderDashboard();
  }
});

/* ========= Dark mode toggle ========= */
const darkToggle = $("#darkToggle");
if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("darkMode", isDark ? "1" : "0");
  });
}
(function restoreDark() {
  const dm = localStorage.getItem("darkMode");
  if (dm === "1") document.documentElement.classList.add("dark");
})();

/* ========= Small helper: init everything on DOM ready ========= */
document.addEventListener("DOMContentLoaded", () => {
  // make sure dynamic lists are rendered if on pages
  if ($("#alumniGrid")) applyAlumniFilters();
  if ($("#eventsList")) renderEvents();
  if ($("#jobsList")) renderJobs();
});
// Simple register form simulation
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const batch = document.getElementById("batch").value.trim();

      if (name && email && batch) {
        alert(`Welcome ${name}! Registration successful.`);
        window.location.href = "dashboard.html";
      } else {
        alert("Please fill all required fields.");
      }
    });
  }
});
// ===== Register Page Functionality =====
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const batch = document.getElementById("batch").value.trim();
      const role = document.getElementById("role").value;

      if (!name || !email || !batch || !role) {
        alert("⚠️ Please fill all fields.");
        return;
      }

      let users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
      const exists = users.some(u => u.email === email);
      if (exists) {
        alert("❌ Email already registered. Please login.");
        window.location.href = "login.html";
        return;
      }

      const user = {
        id: Date.now(),
        name,
        email,
        batch,
        role,
        registeredAt: new Date().toISOString()
      };

      users.push(user);
      localStorage.setItem("registeredUsers", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(user));

      alert(`✅ Welcome ${name}! Registration successful.`);
      window.location.href = "dashboard.html";
    });
  }
});

