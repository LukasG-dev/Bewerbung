'use strict'

/**
 * Zeigt das gewünschte PDF an und blendet alle Buttons aus
 * @param {string} id - ID des iFrames
 */
function openPDF(id) {
    // Alle Buttons ausblenden
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => btn.style.display = 'none');

    // Alle iFrames ausblenden
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(frame => frame.style.display = 'none');

    // Nur das gewünschte anzeigen
    const iframe = document.getElementById(id);
    if (iframe) {
        iframe.style.display = 'block';
    }
}

// liest den URL-Parameter aus
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const pdfId = params.get('pdf');
    if (pdfId) {
        openPDF(pdfId);
    }
});

// navbar laden + active-Klasse setzen
function loadNavbar() {
    fetch('/Bewerbung/navbar.html')
      .then(res => res.text())
      .then(data => {
        const placeholder = document.getElementById('navbar-placeholder');
        if (placeholder) {
          placeholder.innerHTML = data;
  
          // active-Klasse setzen basierend auf Pfad
          const current = window.location.pathname.toLowerCase();
          document.querySelectorAll('nav a').forEach(link => {
            const page = link.getAttribute('data-page');
            if (page && current.includes(page)) {
              link.classList.add('active');
            }
          });
        }
      });
  }
  
  window.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
  
    //PDF anzeigen, wenn URL-Parameter vorhanden ist
    const params = new URLSearchParams(window.location.search);
    const pdfId = params.get('pdf');
    if (pdfId && typeof openPDF === 'function') {
      openPDF(pdfId);
    }
  });
  