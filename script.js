// ======================================
// 1. MENU NAVIGASI HP
// ======================================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {
  navMenu.classList.toggle("active");

  const menuTerbuka = navMenu.classList.contains("active");

  menuToggle.setAttribute("aria-expanded", menuTerbuka);

  menuToggle.textContent = menuTerbuka ? "✕" : "☰";
});

// ======================================
// 2. NAVBAR AKTIF
// ======================================

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    // Menutup menu HP
    navMenu.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.textContent = "☰";

    // Mengubah menu aktif
    navLinks.forEach(function (item) {
      item.classList.remove("active");
    });

    link.classList.add("active");
  });
});

// ======================================
// 3. NAVBAR AKTIF SAAT SCROLL
// ======================================

const sections = document.querySelectorAll("main section[id]");

window.addEventListener("scroll", function () {
  let currentSection = "home";

  sections.forEach(function (section) {
    const sectionTop = section.offsetTop - 150;

    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(function (link) {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
});

// ======================================
// 4. DARK MODE
// ======================================

const darkModeBtn = document.getElementById("darkModeBtn");

const savedTheme = localStorage.getItem("portfolioTheme");

// Mengaktifkan tema tersimpan
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");

  darkModeBtn.textContent = "☀️ Light Mode";
}

// Mengubah tema ketika tombol diklik
darkModeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  const isDark = document.body.classList.contains("dark-mode");

  if (isDark) {
    darkModeBtn.textContent = "☀️ Light Mode";

    localStorage.setItem("portfolioTheme", "dark");
  } else {
    darkModeBtn.textContent = "🌙 Dark Mode";

    localStorage.setItem("portfolioTheme", "light");
  }
});

// ======================================
// 5. VALIDASI FORM KONTAK
// ======================================

const contactForm = document.getElementById("contactForm");

const formStatus = document.getElementById("formStatus");

const hasilForm = document.getElementById("hasilForm");

contactForm.addEventListener("submit", function (event) {
  // Mencegah halaman refresh
  event.preventDefault();

  // Mengambil data dari form
  const nama = document.getElementById("nama").value.trim();

  const email = document.getElementById("email").value.trim();

  const pesan = document.getElementById("pesan").value.trim();

  // Pola validasi email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Menyembunyikan hasil sebelumnya
  hasilForm.hidden = true;

  // VALIDASI KOLOM KOSONG
  if (nama === "" || email === "" || pesan === "") {
    formStatus.textContent = "⚠️ Semua kolom wajib diisi!";

    formStatus.className = "error";

    return;
  }

  // VALIDASI FORMAT EMAIL
  if (!emailPattern.test(email)) {
    formStatus.textContent = "⚠️ Format email tidak valid!";

    formStatus.className = "error";

    return;
  }

  // PESAN BERHASIL
  formStatus.textContent = "✅ Pesan berhasil disimpan pada halaman!";

  formStatus.className = "success";

  // MENAMPILKAN HASIL FORM
  document.getElementById("hasilNama").textContent = "Nama: " + nama;

  document.getElementById("hasilEmail").textContent = "Email: " + email;

  document.getElementById("hasilPesan").textContent = "Pesan: " + pesan;

  hasilForm.hidden = false;

  // Mengosongkan form
  contactForm.reset();
});
