/* ==========================================================================
   TYPING.JS
   Rotates through a list of roles in the hero section using a typewriter effect.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("typingText");
  if (!el) return;

  const roles = [
    "Full Stack Developer",
    "Frontend Developer",
    "Web Developer",
    "Python Enthusiast",
    "AI Enthusiast",
    "Graphic Designer",
  ];

  const TYPE_SPEED = 90;
  const DELETE_SPEED = 45;
  const PAUSE_AFTER_TYPE = 1400;
  const PAUSE_AFTER_DELETE = 400;

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      charIndex++;
      el.textContent = currentRole.substring(0, charIndex);

      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(tick, PAUSE_AFTER_TYPE);
        return;
      }
    } else {
      charIndex--;
      el.textContent = currentRole.substring(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(tick, PAUSE_AFTER_DELETE);
        return;
      }
    }

    setTimeout(tick, isDeleting ? DELETE_SPEED : TYPE_SPEED);
  }

  tick();
});
