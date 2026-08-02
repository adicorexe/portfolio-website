/* ==========================================================================
   SCROLL.JS
   IntersectionObserver-driven scroll reveals, active nav-link highlighting,
   and skill progress-bar fill animation.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  initProgressBars();
  initActiveNavLink();
});

/* --------------------------- Scroll reveal (fade/slide) --------------------- */
function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* ------------------------------- Progress bars ------------------------------- */
function initProgressBars() {
  const bars = document.querySelectorAll(".progress-fill");
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.getAttribute("data-width") || "0";
          bar.style.width = `${width}%`;
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.4 }
  );

  bars.forEach((bar) => observer.observe(bar));
}

/* ------------------------------ Active nav link ------------------------------- */
function initActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.4, rootMargin: "-80px 0px -50% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}
