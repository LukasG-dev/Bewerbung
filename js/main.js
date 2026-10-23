(() => {
  "use strict";
  document.documentElement.classList.add("js");

  const menu = document.querySelector(".menu");
  const nav = document.getElementById("navigation");
  if (menu && nav) {
    const closeMenu = (restoreFocus = false) => {
      const wasOpen = menu.getAttribute("aria-expanded") === "true";
      menu.setAttribute("aria-expanded", "false");
      nav.classList.remove("open");
      menu.querySelector("span").textContent = "＋";
      if (restoreFocus && wasOpen) menu.focus();
    };
    menu.addEventListener("click", () => {
      const open = menu.getAttribute("aria-expanded") !== "true";
      menu.setAttribute("aria-expanded", String(open));
      menu.querySelector("span").textContent = open ? "−" : "＋";
      nav.classList.toggle("open", open);
    });
    nav.addEventListener("click", event => {
      if (event.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu(true);
    });
    document.addEventListener("click", event => {
      if (!event.target.closest(".nav")) closeMenu();
    });
    const mobile = matchMedia("(max-width: 760px)");
    mobile.addEventListener("change", () => closeMenu());
  }

  const copy = document.querySelector("[data-copy]");
  copy?.addEventListener("click", async () => {
    const status = document.querySelector("[data-copy-status]");
    try {
      await navigator.clipboard.writeText(copy.dataset.copy);
      status.textContent = "E-Mail-Adresse kopiert.";
    } catch {
      status.textContent = "Bitte die E-Mail-Adresse oben markieren und kopieren.";
    }
  });

  document.querySelector("[data-mail]")?.addEventListener("submit", event => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent(String(data.get("subject")).trim());
    const body = encodeURIComponent("Hallo Lukas,\n\n" + String(data.get("message")).trim() + "\n\nViele Grüße\n" + String(data.get("name")).trim() + "\n" + String(data.get("email")).trim());
    document.querySelector("[data-mail-status]").textContent = "Die E-Mail wird an Ihr E-Mail-Programm übergeben. Falls sich nichts öffnet, nutzen Sie bitte den direkten E-Mail-Link.";
    window.location.href = "mailto:grebner1998@gmail.com?subject=" + subject + "&body=" + body;
  });

  const filterToolbar = document.querySelector("[data-module-filters]");
  if (filterToolbar) {
    const cards = [...document.querySelectorAll(".module-card")];
    const buttons = [...filterToolbar.querySelectorAll("[data-filter]")];
    const result = document.getElementById("filter-result");
    buttons.forEach(button => {
      const count = cards.filter(card => button.dataset.filter === "all" || card.dataset.status === button.dataset.filter).length;
      button.querySelector("span").textContent = String(count);
      button.addEventListener("click", () => {
        let visible = 0;
        cards.forEach(card => {
          card.hidden = button.dataset.filter !== "all" && card.dataset.status !== button.dataset.filter;
          if (!card.hidden) visible++;
        });
        buttons.forEach(item => {
          const active = item === button;
          item.classList.toggle("active", active);
          item.setAttribute("aria-pressed", String(active));
        });
        result.textContent = visible + (visible === 1 ? " Modul" : " Module");
      });
    });
    result.textContent = cards.length + (cards.length === 1 ? " Modul" : " Module");
    filterToolbar.hidden = false;
  }

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
