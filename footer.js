const FOOTER_TEMPLATE = `
  <footer class="site-footer">
    <div class="container-wide footer-content">
      <a class="cta-mail focus-outline" href="mailto:vigneronsdegouvieux@gmail.com">Contact email</a>
      <div class="footer-meta">
        <p class="footer-address">
          Association des Vignerons de Gouvieux<br>
          Mairie - 48 rue de la Mairie<br>
          60270 Gouvieux
        </p>
        <div class="footer-social" aria-label="Réseaux sociaux">
          <a class="social-link facebook" href="https://www.facebook.com/VigneronsdeGouvieux" target="_blank" rel="noopener noreferrer">
            <span class="social-icon" aria-hidden="true">
              <img src="images/Facebook_Logo_Primary.png" alt="" loading="lazy">
            </span>
            <span>Facebook</span>
          </a>
          <a class="social-link instagram" href="https://www.instagram.com/vigneronsdegouvieux" target="_blank" rel="noopener noreferrer">
            <span class="social-icon" aria-hidden="true">
              <img src="images/Instagram_Glyph_Gradient.svg" alt="" loading="lazy">
            </span>
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
`;

document.querySelectorAll("[data-site-footer]").forEach((node) => {
  node.innerHTML = FOOTER_TEMPLATE;
});

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

initMobileNavigation();