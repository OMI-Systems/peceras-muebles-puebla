(function () {
  const cfg = window.SITE_CONFIG;
  if (!cfg) return;

  // Build WhatsApp link
  const text = encodeURIComponent(cfg.whatsapp.message);
  const waLink = https://wa.me/${cfg.whatsapp.number}?text=${text};

  // Set all WhatsApp anchors by attribute
  document.querySelectorAll('a[data-wa="1"]').forEach((a) => {
    a.href = waLink;
    a.target = "_blank";
    a.rel = "noopener";
  });

  // Inject brand/location
  const brandName = document.querySelectorAll("[data-brand='name']");
  brandName.forEach((el) => (el.textContent = cfg.brand.name));

  const brandMark = document.querySelectorAll("[data-brand='mark']");
  brandMark.forEach((el) => (el.textContent = cfg.brand.shortMark));

  const coverage = document.querySelectorAll("[data-location='coverage']");
  coverage.forEach((el) => (el.textContent = cfg.location.coverage));

  // SEO
  document.title = cfg.seo.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", cfg.seo.description);

  // Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
