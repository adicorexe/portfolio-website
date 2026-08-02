/* ==========================================================================
   MAIN.JS
   General page initialization: preloader, navbar state, mobile menu,
   footer year, animated counters, and project data fetch.
   ========================================================================== */

// Base URL for the backend API. Update this after deploying the backend.
window.PORTFOLIO_API_BASE = window.PORTFOLIO_API_BASE || "http://localhost:5000/api";

document.addEventListener("DOMContentLoaded", () => {
  hidePreloader();
  initNavbarScroll();
  initHamburgerMenu();
  setFooterYear();
  initCounters();
  initBackToTop();
});

/* ------------------------------ Preloader -------------------------------- */
function hidePreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  window.addEventListener("load", () => {
    setTimeout(() => preloader.classList.add("hidden"), 300);
  });

  // Fallback in case the load event already fired
  if (document.readyState === "complete") {
    setTimeout(() => preloader.classList.add("hidden"), 300);
  }
}

/* ---------------------------- Navbar scroll state -------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const toggleScrolled = () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  toggleScrolled();
  window.addEventListener("scroll", toggleScrolled);
}

/* ------------------------------ Mobile menu -------------------------------- */
function initHamburgerMenu() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
}

/* -------------------------------- Footer year ------------------------------- */
function setFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ----------------------------- Animated counters ------------------------------ */
function initCounters() {
  const counters = document.querySelectorAll(".stat-number");
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute("data-target"), 10) || 0;
    const duration = 1400;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = `${target}+`;
      }
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

/* -------------------------------- Back to top ------------------------------- */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
