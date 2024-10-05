document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector(".primary-navigation");
  const navToggle = document.querySelector(".mobile-nav-toggle");

  // Original navigation toggle functionality
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const visibility = nav.getAttribute("data-visible");
      if (visibility === "false") {
        nav.setAttribute("data-visible", true);
        navToggle.setAttribute("aria-expanded", true);
      } else {
        nav.setAttribute("data-visible", false);
        navToggle.setAttribute("aria-expanded", false);
      }
    });
  }

  // New page transition functionality
  const navLinks = document.querySelectorAll('.primary-navigation a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const destination = link.href;

      // Close mobile menu if it's open
      if (window.innerWidth < 35 * 16) { // 35em
        nav.setAttribute("data-visible", false);
        navToggle.setAttribute("aria-expanded", false);
      }

      // Fade out
      document.body.classList.add('fade-out');

      // Navigate after fade out
      setTimeout(() => {
        window.location.href = destination;
      }, 500); // This should match the transition duration in CSS
    });
  });
});

// Handle the page load
window.addEventListener('pageshow', () => {
  document.body.classList.remove('fade-out');
});
