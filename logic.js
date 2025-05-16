"use strict";

/**
 * Zeigt das gewünschte PDF an und blendet alle Buttons aus
 * @param {string} id - ID des iFrames
 */
function openPDF(id) {
  // Alle Buttons ausblenden
  const buttons = document.querySelectorAll("button");
  buttons.forEach((btn) => (btn.style.display = "none"));

  // Alle iFrames ausblenden
  const iframes = document.querySelectorAll("iframe");
  iframes.forEach((frame) => (frame.style.display = "none"));

  // Nur das gewünschte anzeigen
  const iframe = document.getElementById(id);
  if (iframe) {
    iframe.style.display = "block";
  }
}

/**
 * Lädt die Navigationsleiste und initialisiert den Darkmode-Toggle
 */
function loadNavbar() {
  fetch("/navbar.html")
    .then((res) => res.text())
    .then((data) => {
      const placeholder = document.getElementById("navbar-placeholder");
      if (placeholder) {
        placeholder.innerHTML = data;

        // active-Klasse setzen basierend auf Seitenpfad
        const current = window.location.pathname.toLowerCase();
        document.querySelectorAll("nav a, .navbar a").forEach((link) => {
          const page = link.getAttribute("data-page");
          if (page && current.includes(page)) {
            link.classList.add("active");
          }
        });

        // Darkmode-Toggle initialisieren
        const toggle = document.getElementById("toggle-darkmode");

        function setDarkMode(isDark) {
          document.body.classList.toggle("dark", isDark);
          toggle.textContent = isDark ? "🌞" : "🌙";
          localStorage.setItem("preferred-theme", isDark ? "dark" : "light");
        }

        const preferred = localStorage.getItem("preferred-theme");
        setDarkMode(preferred === "dark");

        toggle.addEventListener("click", () => {
          const isDark = document.body.classList.contains("dark");
          setDarkMode(!isDark);
        });
      }
    });
}

// Gesamte Initialisierung
document.addEventListener("DOMContentLoaded", () => {
  loadNavbar();

  // PDF-Logik bei URL-Parameter
  const params = new URLSearchParams(window.location.search);
  const pdfId = params.get("pdf");
  if (pdfId && typeof openPDF === "function") {
    openPDF(pdfId);
  }
});

// carusellfunction initFancyCarousel() {
function init3DCarousel() {
  const ring = document.querySelector(".carousel-ring");
  const cards = Array.from(ring.children);
  const angleStep = 360 / cards.length;
  let currentIndex = 0;
  let autoRotateInterval;
  const rotationSpeed = 3000; // alle 4 Sekunden

  cards.forEach((card, index) => {
    const angle = angleStep * index;
    card.style.transform = `rotateY(${angle}deg) translateZ(240px)`; // gleichmäßig verteilt
  });

  function rotateCarousel() {
    const angle = currentIndex * -angleStep;
    ring.style.transform = `rotateY(${angle}deg)`;
  }

  document.querySelector(".carousel-btn.left").addEventListener("click", () => {
    currentIndex--;
    rotateCarousel();
  });

  document
    .querySelector(".carousel-btn.right")
    .addEventListener("click", () => {
      currentIndex++;
      rotateCarousel();
    });

  rotateCarousel(); // Initial
  autoRotateInterval = setInterval(() => {
    currentIndex++;
    rotateCarousel();
  }, rotationSpeed);

  // Hover-Pause
  const carousel = document.querySelector(".carousel-viewport");
  carousel.addEventListener("mouseenter", () =>
    clearInterval(autoRotateInterval)
  );
  carousel.addEventListener("mouseleave", () => {
    autoRotateInterval = setInterval(() => {
      currentIndex++;
      rotateCarousel();
    }, rotationSpeed);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadNavbar(); // falls du deine Navigation lädst
  init3DCarousel();
});
