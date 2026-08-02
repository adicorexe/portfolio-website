/* ==========================================================================
   THEME.JS
   Handles dark/light theme toggling. Defaults to dark mode.
   Persists the user's choice in localStorage.
   ========================================================================== */

(function initTheme() {
  const STORAGE_KEY = "portfolio-theme";
  const savedTheme = localStorage.getItem(STORAGE_KEY);

  // Apply saved theme immediately (before DOMContentLoaded) to avoid a flash
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme-preload", savedTheme);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const toggleBtn = document.getElementById("themeToggle");

    // Apply saved theme (default is dark, as set in the HTML markup)
    if (savedTheme) {
      body.setAttribute("data-theme", savedTheme);
    }

    if (!toggleBtn) return;

    toggleBtn.addEventListener("click", () => {
      const current = body.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      body.setAttribute("data-theme", next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  });
})();
