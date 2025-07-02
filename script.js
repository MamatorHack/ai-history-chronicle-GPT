// script.js - Interactions pour History of AI

// 🌙 Gestion du thème clair/sombre
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  toggleBtn.textContent = document.body.classList.contains("dark-mode") ? "Mode Clair" : "Mode Sombre";
});

// 🔽 Accordéon pour la FAQ
const accordionBtns = document.querySelectorAll(".accordion-btn");
accordionBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    content.classList.toggle("open");
    const expanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", !expanded);
  });
});

// 🧩 Filtre chronologique dynamique
const filterSelect = document.getElementById("filter");
const events = document.querySelectorAll(".timeline .event");
filterSelect.addEventListener("change", () => {
  events.forEach((ev) => {
    const year = parseInt(ev.dataset.year, 10);
    let show = true;
    switch (filterSelect.value) {
      case "before2000":
        show = year < 2000;
        break;
      case "2000-2020":
        show = year >= 2000 && year <= 2020;
        break;
      case "after2020":
        show = year > 2020;
        break;
    }
    ev.classList.toggle("hidden", !show);
  });
});

// 📖 Mode "visite guidée"
const tourBtn = document.getElementById("tour-btn");
const infoBox = document.getElementById("tour-info");
tourBtn.addEventListener("click", () => {
  let index = 0;
  tourBtn.disabled = true;
  filterSelect.value = "all";
  filterSelect.dispatchEvent(new Event("change"));
  const step = () => {
    if (index > 0) events[index - 1].classList.remove("highlight");
    if (index >= events.length) {
      infoBox.classList.add("hidden");
      tourBtn.disabled = false;
      return;
    }
    const ev = events[index];
    ev.classList.add("highlight");
    infoBox.textContent = ev.querySelector("h2").textContent;
    infoBox.classList.remove("hidden");
    ev.scrollIntoView({ behavior: "smooth", block: "center" });
    index++;
    setTimeout(step, 3000);
  };
  step();
});

// 🧮 Bouton "Retour en haut"
const backBtn = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    backBtn.classList.add("show");
  } else {
    backBtn.classList.remove("show");
  }
});
backBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});