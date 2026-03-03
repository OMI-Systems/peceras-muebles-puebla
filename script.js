const BRAND = {
  businessName: "Peceras & Muebles Puebla",
  whatsapp: "522212810388",
  city: "Puebla y alrededores",
  waMessage:
    "Hola, quiero una cotización. Busco: Pecera / Mueble / Mantenimiento. Estoy en: _. Medidas aproximadas: __. Presupuesto: ___."
};

function buildWaLink() {
  const text = encodeURIComponent(BRAND.waMessage);
  return https://wa.me/${BRAND.whatsapp}?text=${text};
}

function setLinks() {
  const link = buildWaLink();
  const ids = [
    "waFloat",
    "waTop",
    "waHero",
    "waMobile",
    "waPricing",
    "waPricing2",
    "waPricing3",
    "waContact",
    "waPortafolio"
  ];

  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = link;
  });

  const cityEl = document.getElementById("cityText");
  if (cityEl) cityEl.textContent = BRAND.city;

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// Mobile menu
function setupMobileMenu() {
  const btn = document.getElementById("menuBtn");
  const menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;

  const toggle = () => {
    const open = menu.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    menu.setAttribute("aria-hidden", open ? "false" : "true");
  };

  btn.addEventListener("click", toggle);

  menu.querySelectorAll("a[href^='#']").forEach((a) => {
    a.addEventListener("click", () => {
      menu.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-hidden", "true");
    });
  });
}

// FAQ accordion
function setupFAQ() {
  document.querySelectorAll(".faq__q").forEach((q) => {
    q.addEventListener("click", () => {
      const isOpen = q.classList.toggle("is-open");
      const icon = q.querySelector(".faq__icon");
      if (icon) icon.textContent = isOpen ? "–" : "+";
    });
  });
}

// Scroll reveal
function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el) => io.observe(el));
}

// Fake form submit (no backend)
function setupForm() {
  const form = document.getElementById("leadForm");
  const status = document.getElementById("formStatus");
  if (!form || !status) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent =
      "Listo. Si quieres respuesta inmediata, usa el botón de WhatsApp.";
    form.reset();
  });
}

setLinks();
setupMobileMenu();
setupFAQ();
setupReveal();
setupForm();
