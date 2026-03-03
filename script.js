document.addEventListener("DOMContentLoaded", function () {

  const whatsappNumber = "522212810388";
  const message = encodeURIComponent(
    "Hola, quiero una cotización. Busco: Pecera / Mueble / Mantenimiento."
  );

  const whatsappLink = https://wa.me/${whatsappNumber}?text=${message};

  const buttons = document.querySelectorAll("a[id^='wa']");

  buttons.forEach(function(btn) {
    btn.setAttribute("href", whatsappLink);
  });

});
