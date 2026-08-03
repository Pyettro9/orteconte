/**
 * support.js
 * Utilidades genéricas de suporte da página: navegação, scroll,
 * revelação de elementos, botão "voltar ao topo", toasts e formulário.
 */

function initNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function initScrollReveal() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((item) => observer.observe(item));
}

function initBackToTop() {
  const button = document.querySelector("[data-back-to-top]");
  if (!button) return;

  const toggleVisibility = () => {
    button.classList.toggle("is-visible", window.scrollY > 600);
  };

  window.addEventListener("scroll", toggleVisibility, { passive: true });
  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  toggleVisibility();
}

function showToast(message) {
  const container = document.querySelector("[data-toast-container]");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.textContent = message;
  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("is-visible"));

  setTimeout(() => {
    toast.classList.remove("is-visible");
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = form.querySelector("[name='nome']");
    const email = form.querySelector("[name='email']");
    const message = form.querySelector("[name='mensagem']");

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.value.trim() || "");

    let valid = true;
    [name, email, message].forEach((field) => {
      if (!field) return;
      const fieldValid = field.value.trim().length > 0 && (field !== email || emailValid);
      field.setAttribute("aria-invalid", String(!fieldValid));
      if (!fieldValid) valid = false;
    });

    if (!valid) {
      showToast("Por favor, preencha os campos corretamente.");
      return;
    }

    showToast("Mensagem enviada! Nossa equipe entrará em contato em breve.");
    form.reset();
  });
}

function initYear() {
  const el = document.querySelector("[data-current-year]");
  if (el) el.textContent = String(new Date().getFullYear());
}

export function initSupport() {
  initNav();
  initSmoothScroll();
  initScrollReveal();
  initBackToTop();
  initContactForm();
  initYear();
}

export { showToast };

document.addEventListener("DOMContentLoaded", initSupport);
