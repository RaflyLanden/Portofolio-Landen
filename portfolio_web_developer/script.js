/*
  PENGATURAN PROFIL
  Ganti nilai di bawah dengan data Anda. Biarkan string kosong ("")
  jika informasi belum ingin ditampilkan.
*/
const profile = {
  name: "Muhammad Rafly Landen",
  brand: "Landen Portofolio",
  email: "mraflylanden@gmail.com",
  github: "https://github.com/RaflyLanden",
  linkedin: "https://www.linkedin.com/in/muhammad-rafly-landen-021765321"
};

// Perbarui nama pada hero dan brand pada logo serta footer dari satu tempat.
const displayName = profile.name.trim() || "Nama Anda";
const brandName = (profile.brand || "Landen Portofolio").trim();
const brandInitial = (brandName.charAt(0) || "L").toUpperCase();
document.querySelectorAll(".brand-mark").forEach((el) => {
  const dot = document.createElement("span");
  dot.textContent = ".";
  el.replaceChildren(document.createTextNode(brandInitial), dot);
  el.setAttribute("aria-label", `Logo ${brandName}`);
});
document.querySelectorAll(".brand-name").forEach((el) => {
  const slash = document.createElement("span");
  slash.textContent = "/";
  el.replaceChildren(document.createTextNode(brandName.toUpperCase()), slash);
});
const heroName = document.querySelector(".hero .accent-text");
if (heroName) heroName.textContent = `${displayName}.`;
document.querySelector(".copyright").innerHTML = `© <span id="year">${new Date().getFullYear()}</span> ${escapeHTML(displayName)}`;

// Tampilkan tautan kontak hanya jika datanya sudah diisi.
function setContact(id, value, label, href) {
  const element = document.getElementById(id);
  if (!element) return;
  const row = element.closest(".contact-row");
  if (!value) {
    element.textContent = label;
    return;
  }
  element.textContent = value.replace(/^https?:\/\//, "").replace(/\/$/, "");
  if (href) {
    const link = document.createElement("a");
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = element.textContent;
    link.style.color = "inherit";
    link.style.textDecoration = "none";
    element.replaceWith(link);
  }
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}
setContact("contact-email", profile.email, "Tambahkan alamat email Anda", profile.email ? `mailto:${profile.email}` : "");
setContact("contact-github", profile.github, "Tambahkan tautan GitHub", profile.github);
setContact("contact-linkedin", profile.linkedin, "Tambahkan tautan LinkedIn", profile.linkedin);

// Navigasi menu untuk layar kecil.
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
});
navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Buka menu");
  });
});

// Animasi fade setiap kali elemen masuk/keluar layar (dua arah scroll).
// Elemen tidak di-unobserve supaya animasi tetap berjalan saat scroll ke atas.
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("visible", entry.isIntersecting);
    });
  }, { threshold: 0, rootMargin: "0px 0px -10% 0px" });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}
