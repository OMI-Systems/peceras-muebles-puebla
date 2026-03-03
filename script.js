// PECERAS Y MUEBLES PUEBLA - script.js (versión estable final)

(function () {
  "use strict";

  // Helpers
  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function $$(selector, root) {
    return Array.prototype.slice.call(
      (root || document).querySelectorAll(selector)
    );
  }

  // 1) Año dinámico en footer
  var yearEl = $("#year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2) Mobile menu
  var menuBtn = $("#menuBtn");
  var mobileMenu = $("#mobileMenu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("is-open");
      menuBtn.classList.toggle("is-open");
    });

    var mobileLinks = $$("a", mobileMenu);
    mobileLinks.forEach(function (a) {
      a.addEventListener("click", function () {
        mobileMenu.classList.remove("is-open");
        menuBtn.classList.remove("is-open");
      });
    });
  }

  // 3) Config global
  var cfg = window.SITE_CONFIG || null;

  if (cfg) {

    // Marca
    if (cfg.brand && cfg.brand.name) {
      $$('[data-brand="name"]').forEach(function (el) {
        el.textContent = cfg.brand.name;
      });

      if (cfg.seo && cfg.seo.title) {
        document.title = cfg.seo.title;
      } else {
        document.title = cfg.brand.name;
      }
    }

    if (cfg.brand && cfg.brand.shortMark) {
      $$('[data-brand="mark"]').forEach(function (el) {
        el.textContent = cfg.brand.shortMark;
      });
    }

    // Ubicación
    if (cfg.location && cfg.location.coverage) {
      $$('[data-location="coverage"]').forEach(function (el) {
        el.textContent = cfg.location.coverage;
      });
    }

    // 4) WhatsApp
    var waBtns = $$('[data-wa="1"]');

    if (waBtns.length && cfg.whatsapp && cfg.whatsapp.number) {

      var number = String(cfg.whatsapp.number).replace(/\D/g, "");
      var message = encodeURIComponent(
        cfg.whatsapp.message || "Hola, quiero una cotización."
      );

      // SIN BACKTICKS (100% compatible)
      var waUrl = "https://wa.me/" + number + "?text=" + message;

      waBtns.forEach(function (btn) {

        if (btn.tagName.toLowerCase() === "a") {
          btn.setAttribute("href", waUrl);
          btn.setAttribute("target", "_blank");
          btn.setAttribute("rel", "noopener noreferrer");
        } else {
          btn.addEventListener("click", function () {
            window.open(waUrl, "_blank", "noopener,noreferrer");
          });
          btn.style.cursor = "pointer";
        }

      });
    }
  }

  // 5) Smooth scroll
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {

      var href = a.getAttribute("href");
      if (!href || href === "#") return;

      var target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });
  });

})();
