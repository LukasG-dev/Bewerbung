# Bewerbungsportfolio · Lukas Grebner

Statische Website für den beruflichen Einstieg in Product und UX Research. HTML, CSS und JavaScript ohne Build-Schritt, externe Schriftarten oder Laufzeit-Abhängigkeiten.

## Lokal ansehen

`index.html` direkt öffnen oder im Projektordner einen lokalen Server starten:

```powershell
python -m http.server 8000
```

Anschließend `http://localhost:8000` öffnen. Zum Beenden im Terminal `Strg+C` drücken.

## Inhalte pflegen

- `index.html`: Startseite und ausgewählte Projekte.
- `projects.html`: Praxisfelder mit Aufgaben, eigenem Beitrag und weiterführenden Research-Fragen.
- `skills.html`: Kompetenzen, Berufserfahrung und Unterlagen.
- `study.html`: Studium, Modulübersicht und separate OpenLearn-Weiterbildung.
- `about.html`: Persönlicher Hintergrund.
- `contact.html`: Direkte Kontaktwege per E-Mail und LinkedIn.
- `css/style.css`: Gemeinsame Gestaltung und responsive Layouts.
- `js/main.js`: Navigation, Modulfilter und Kopierfunktion für die E-Mail-Adresse.

### Module aktualisieren

In `study.html` stehen die Module als `<article class="module-card">`. Zum Ergänzen einen vorhandenen Block kopieren und Kürzel, Titel, Inhalt und offiziellen Modul-Link ändern.

- `data-status="current"`: aktuell belegt.
- `data-status="completed"`: Bearbeitung absolviert. Die sichtbare Statusmarkierung unterscheidet zwischen bestätigtem Abschluss und ausstehender Bewertung.
- Die sichtbare Markierung (`badge`) und einen möglichen Ergebnishinweis (`module-grade`) ebenfalls anpassen.
- Die Filterzahlen berechnet JavaScript automatisch. Bei Änderungen den Stand oberhalb der Modulübersicht aktualisieren.
- Für TM112 ist derzeit die Bearbeitung abgeschlossen, die Bewertung aber noch ausstehend. Sobald das Ergebnis vorliegt, Statusmarkierung und Ergebnishinweis aktualisieren.

Modulinhalte sind anhand der jeweils verlinkten offiziellen OU-Modulbeschreibungen zusammengefasst. Persönliche Studienangaben stammen vom Website-Inhaber; Berufserfahrung und Studiengang aus dem bereitgestellten Lebenslauf. Der OpenLearn-Kurs ist kein anrechenbares Studienmodul.

### Kontakt

Die Kontaktseite zeigt die E-Mail-Adresse mit einer Kopierfunktion und einen LinkedIn-Link. Ein Klick auf die E-Mail-Adresse öffnet über `mailto:` das E-Mail-Programm. Es gibt kein Kontaktformular und keine Vorlagen- oder Versandautomatik. Direkte Kontaktlinks funktionieren auch ohne JavaScript; Module und Navigation bleiben ebenfalls zugänglich.
