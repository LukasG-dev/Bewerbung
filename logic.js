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
  fetch("navbar.html")
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

// Time-Controll Video content
document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".hero-video");

  if (video) {
    video.addEventListener("loadedmetadata", () => {
      const loopEnd = video.duration * 0.2; // 10% des Videos

      // Überwache die Zeit
      video.addEventListener("timeupdate", () => {
        if (video.currentTime >= loopEnd) {
          video.currentTime = 0;
          video.play(); // optional, damit es weiterläuft
        }
      });
    });
  }
});
