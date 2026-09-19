const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");
const loader = document.getElementById("loader");

document.body.classList.add("is-loading");

window.addEventListener("load", () => {
  setTimeout(() => {
    if (loader) {
      loader.classList.add("hidden");
    }
    document.body.classList.remove("is-loading");
  }, 900);
});

if (menuToggle && navLinks) {
  menuToggle.setAttribute("aria-expanded", "false");

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const applyTheme = (theme) => {
  document.body.setAttribute("data-theme", theme);

  if (!themeToggle) return;

  const isDarkMode = theme === "dark";
  themeToggle.textContent = isDarkMode ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", isDarkMode ? "Switch to light mode" : "Switch to dark mode");
  themeToggle.setAttribute("title", isDarkMode ? "Switch to light mode" : "Switch to dark mode");
  localStorage.setItem("portfolio-theme", theme);
};

const savedTheme = localStorage.getItem("portfolio-theme") || "light";
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });
}

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector("button[type='submit']");
    const originalText = submitButton.textContent;

    submitButton.textContent = "Message sent!";
    submitButton.disabled = true;
    contactForm.reset();

    setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 2200);
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

const heroVisual = document.querySelector(".hero-visual");
const mainCard = document.querySelector(".main-card");

if (heroVisual && mainCard) {
  mainCard.style.transform = "rotate(6deg) translateZ(0)";
}

document.getElementById("year").textContent = new Date().getFullYear();
