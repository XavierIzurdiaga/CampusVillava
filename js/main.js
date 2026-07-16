const toggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("[data-nav-links]");

if (toggle && navLinks) {
  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const tabs = document.querySelectorAll("[data-tab]");
const panels = document.querySelectorAll("[data-panel]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    tabs.forEach((item) => item.classList.toggle("active", item === tab));
    panels.forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.panel === target);
    });
  });
});

const contactForm = document.querySelector("[data-contact-form]");
const contactMessage = document.querySelector("[data-contact-message]");

if (contactForm && contactMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const nombre = formData.get("nombre");
    const telefono = formData.get("telefono") || "No indicado";
    const email = formData.get("email");
    const asunto = formData.get("asunto");
    const mensaje = formData.get("mensaje");
    const body = [
      `Nombre: ${nombre}`,
      `Teléfono: ${telefono}`,
      `Correo electrónico: ${email}`,
      "",
      mensaje,
    ].join("\n");

    window.location.href = `mailto:campusvillava@gmail.com?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(body)}`;
    contactMessage.textContent = "Se abrirá tu aplicación de correo con el mensaje preparado.";
  });
}
