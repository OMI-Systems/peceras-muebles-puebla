// PECERAS Y MUEBLES PUEBLA - script.js (versión estable + reveal + wa fix)

(function () {
  "use strict";

  // Helpers
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // 1) Año en footer
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // 2) Mobile menu
  const menuBtn = $("#menuBtn");
  const mobileMenu = $("#mobileMenu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("is-open");
      menuBtn.classList.toggle("is-open");
    });

    // Cierra menú al hacer click en enlaces
    $$("a", mobileMenu).forEach((a) => {
      a.addEventListener("click", () => {
        mobileMenu.classList.remove("is-open");
        menuBtn.classList.remove("is-open");
      });
    });
  }

  // 3) Config (si existe)
  const cfg = window.SITE_CONFIG || null;

  // Marca
  if (cfg?.brand?.name) {
    $$('[data-brand="name"]').forEach((el) => (el.textContent = cfg.brand.name));
    document.title = cfg.seo?.title || cfg.brand.name;
  }
  if (cfg?.brand?.shortMark) {
    $$('[data-brand="mark"]').forEach((el) => (el.textContent = cfg.brand.shortMark));
  }

  // Location
  if (cfg?.location?.coverage) {
    $$('[data-location="coverage"]').forEach((el) => (el.textContent = cfg.location.coverage));
  }

  // 4) WhatsApp (data-wa="1")
  const waBtns = $$('[data-wa="1"]');
  if (waBtns.length && cfg?.whatsapp?.number) {
    const number = String(cfg.whatsapp.number).replace(/\D/g, "");
    const message = encodeURIComponent(cfg.whatsapp.message || "Hola, quiero una cotización.");
    const waUrl = https://wa.me/${number}?text=${message};

    waBtns.forEach((btn) => {
      if (btn.tagName.toLowerCase() === "a") {
        btn.setAttribute("href", waUrl);
        btn.setAttribute("target", "_blank");
        btn.setAttribute("rel", "noopener noreferrer");
      } else {
        btn.addEventListener("click", () => window.open(waUrl, "_blank", "noopener,noreferrer"));
        btn.style.cursor = "pointer";
      }
    });
  }

  // 5) Smooth scroll para anchors internos (#servicios, #contacto, etc.)
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // 6) Reveal animations (activa .reveal -> .reveal.is-in)
  const revealEls = $$(".reveal");

  // Si no hay elementos, no hacemos nada
  if (revealEls.length) {
    // Fallback: si el navegador no soporta IntersectionObserver, mostramos todo
    if (!("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-in"));
    } else {
      const io = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              observer.unobserve(entry.target); // una sola vez
            }
          });
        },
        {
          root: null,
          threshold: 0.12,
          rootMargin: "0px 0px -10% 0px",
        }
      );

      revealEls.forEach((el) => io.observe(el));
    }
  }

  // Nota: NO ocultamos nada con JS. Si algo está oculto, es CSS.
})();

