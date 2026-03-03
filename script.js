(function () {
  "use strict";

  // Helpers
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // 1) Año en footer
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // 2) Config
  const cfg = window.SITE_CONFIG || null;

  // Marca / título
  if (cfg?.brand?.name) {
    $$('[data-brand="name"]').forEach((el) => (el.textContent = cfg.brand.name));
    document.title = cfg.seo?.title || cfg.brand.name;
  }
  if (cfg?.brand?.shortMark) {
    $$('[data-brand="mark"]').forEach((el) => (el.textContent = cfg.brand.shortMark));
  }
  if (cfg?.location?.coverage) {
    $$('[data-location="coverage"]').forEach((el) => (el.textContent = cfg.location.coverage));
  }
  if (cfg?.whatsapp?.number) {
    const label = $$("[data-wa-label]");
    if (label.length) {
      // Formato simple para mostrar
      const raw = String(cfg.whatsapp.number);
      label.forEach((el) => (el.textContent = `+${raw}`));
    }
  }

  // 3) Mobile menu
  const menuBtn = $("#menuBtn");
  const mobileMenu = $("#mobileMenu");

  if (menuBtn && mobileMenu) {
    const setExpanded = (isOpen) => {
      menuBtn.setAttribute("aria-expanded", String(isOpen));
      mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    };

    menuBtn.addEventListener("click", () => {
      const isOpen = !mobileMenu.classList.contains("is-open");
      mobileMenu.classList.toggle("is-open", isOpen);
      menuBtn.classList.toggle("is-open", isOpen);
      setExpanded(isOpen);
    });

    $$("a", mobileMenu).forEach((a) => {
      a.addEventListener("click", () => {
        mobileMenu.classList.remove("is-open");
        menuBtn.classList.remove("is-open");
        setExpanded(false);
      });
    });

    // Cierra si haces click fuera del panel
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove("is-open");
        menuBtn.classList.remove("is-open");
        setExpanded(false);
      }
    });

    setExpanded(false);
  }

  // 4) WhatsApp (data-wa="1")
  const waBtns = $$('[data-wa="1"]');

  if (waBtns.length && cfg?.whatsapp?.number) {
    const number = String(cfg.whatsapp.number).replace(/\D/g, "");
    const message = encodeURIComponent(cfg.whatsapp.message || "Hola, quiero una cotización.");
    const waUrl = `https://wa.me/${number}?text=${message}`;

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

  // 5) Smooth scroll para anchors internos
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

  // 6) Reveal / Animaciones de entrada (robusto)
  const revealEls = $$(".reveal");

  const makeVisible = (el) => {
    el.classList.add("is-in");
    el.style.opacity = "";
    el.style.transform = "";
    el.style.visibility = "";
  };

  if (revealEls.length) {
    if (!("IntersectionObserver" in window)) {
      revealEls.forEach(makeVisible);
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              makeVisible(entry.target);
              io.unobserve(entry.target);
            }
          });
        },
        { root: null, threshold: 0.12 }
      );

      revealEls.forEach((el) => io.observe(el));

      // Backup: si por CSS quedó oculto por algo raro, lo mostramos al cargar
      window.addEventListener("load", () => {
        revealEls.forEach((el) => {
          const st = getComputedStyle(el);
          if (st.opacity === "0" || st.visibility === "hidden") makeVisible(el);
        });
      });
    }
  }

  // Debug opcional:
  // console.log("script.js OK - timestamp:", Date.now());
})();
