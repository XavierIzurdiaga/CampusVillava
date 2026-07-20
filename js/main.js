const toggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("[data-nav-links]");

if (toggle && navLinks) {
  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const sponsorButtons = Array.from(document.querySelectorAll("[data-sponsor-index]"));
const sponsorModal = document.querySelector("[data-sponsor-modal]");
const sponsorModalImage = document.querySelector("[data-sponsor-modal-image]");
const sponsorModalTitle = document.querySelector("[data-sponsor-modal-title]");
const sponsorCloseButtons = document.querySelectorAll("[data-sponsor-close]");
const sponsorPrevButton = document.querySelector("[data-sponsor-prev]");
const sponsorNextButton = document.querySelector("[data-sponsor-next]");

if (sponsorButtons.length && sponsorModal && sponsorModalImage && sponsorModalTitle) {
  let currentSponsorIndex = 0;
  let lastFocusedSponsor = null;

  const sponsors = sponsorButtons.map((button) => {
    const image = button.querySelector("img");

    return {
      alt: image ? image.alt : "",
      src: image ? image.getAttribute("src") : "",
    };
  });

  const showSponsor = (index) => {
    currentSponsorIndex = (index + sponsors.length) % sponsors.length;
    const sponsor = sponsors[currentSponsorIndex];

    sponsorModalImage.src = sponsor.src;
    sponsorModalImage.alt = sponsor.alt;
    sponsorModalTitle.textContent = sponsor.alt;
  };

  const openSponsorModal = (index, trigger) => {
    lastFocusedSponsor = trigger;
    showSponsor(index);
    sponsorModal.classList.add("open");
    sponsorModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (sponsorNextButton) {
      sponsorNextButton.focus();
    }
  };

  const closeSponsorModal = () => {
    sponsorModal.classList.remove("open");
    sponsorModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    sponsorModalImage.removeAttribute("src");

    if (lastFocusedSponsor) {
      lastFocusedSponsor.focus();
    }
  };

  sponsorButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      openSponsorModal(index, button);
    });
  });

  sponsorCloseButtons.forEach((button) => {
    button.addEventListener("click", closeSponsorModal);
  });

  if (sponsorPrevButton) {
    sponsorPrevButton.addEventListener("click", () => {
      showSponsor(currentSponsorIndex - 1);
    });
  }

  if (sponsorNextButton) {
    sponsorNextButton.addEventListener("click", () => {
      showSponsor(currentSponsorIndex + 1);
    });
  }

  document.addEventListener("keydown", (event) => {
    if (!sponsorModal.classList.contains("open")) {
      return;
    }

    if (event.key === "Escape") {
      closeSponsorModal();
    }

    if (event.key === "ArrowLeft") {
      showSponsor(currentSponsorIndex - 1);
    }

    if (event.key === "ArrowRight") {
      showSponsor(currentSponsorIndex + 1);
    }
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
