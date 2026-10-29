// Vidéo Vimeo de la vigne : coller ici l'identifiant de la vidéo (les chiffres à la fin
// de l'adresse vimeo.com/123456789). Tant qu'il est vide, la photo reste affichée.
const VIMEO_VIDEO_ID = "";

const ICON_FACEBOOK = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M14 8.5V6.8c0-.8.5-1 .9-1h2.4V2.1L14 2c-3.6 0-4.4 2.7-4.4 4.4v2.1H7.5v3.9h2.1V22H14v-9.6h3l.4-3.9H14z" fill="currentColor"/></svg>`;
const ICON_INSTAGRAM = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor"/></svg>`;

const FOOTER_TEMPLATE = `
  <footer class="site-footer">
    <div class="container-wide footer-content">
      <p class="footer-address">
        Association des Vignerons de Gouvieux<br>
        Mairie, 48 rue de la Mairie, 60270 Gouvieux
      </p>
      <div class="footer-social">
        <a class="social-link" href="https://www.facebook.com/VigneronsdeGouvieux" target="_blank" rel="noopener noreferrer" aria-label="Facebook">${ICON_FACEBOOK}</a>
        <a class="social-link" href="https://www.instagram.com/vigneronsdegouvieux" target="_blank" rel="noopener noreferrer" aria-label="Instagram">${ICON_INSTAGRAM}</a>
      </div>
    </div>
  </footer>
`;

document.querySelectorAll("[data-site-footer]").forEach((node) => {
  node.innerHTML = FOOTER_TEMPLATE;
});

function initVimeo() {
  if (!VIMEO_VIDEO_ID) return;
  document.querySelectorAll("[data-vimeo-slot]").forEach((slot) => {
    const frame = document.createElement("iframe");
    frame.src = `https://player.vimeo.com/video/${encodeURIComponent(VIMEO_VIDEO_ID)}?dnt=1&title=0&byline=0&portrait=0&color=2F4A3D`;
    frame.title = slot.getAttribute("data-vimeo-title") || "Vidéo de la vigne communale";
    frame.allow = "autoplay; fullscreen; picture-in-picture";
    frame.loading = "lazy";
    frame.setAttribute("allowfullscreen", "");
    slot.replaceChildren(frame);
    slot.classList.add("is-video");
  });
}

function initMobileNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const navigation = document.querySelector(".navigation");

  if (!toggle || !navigation) return;

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });
}

initVimeo();
initMobileNavigation();
