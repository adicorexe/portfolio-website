/* ==========================================================================
   CONTACT.JS
   Client-side validation and submission of the contact form to the
   backend REST API (POST /api/contact).
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const API_BASE_URL = window.PORTFOLIO_API_BASE || "http://localhost:5000/api";

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  const submitBtn = document.getElementById("submitBtn");
  const btnText = submitBtn.querySelector(".btn-text");
  const btnLoader = submitBtn.querySelector(".btn-loader");
  const formStatus = document.getElementById("formStatus");

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(input, errorId, message) {
    input.classList.toggle("invalid", Boolean(message));
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.textContent = message || "";
  }

  function validate() {
    let isValid = true;

    if (!nameInput.value.trim()) {
      setError(nameInput, "nameError", "Please enter your name.");
      isValid = false;
    } else {
      setError(nameInput, "nameError", "");
    }

    if (!emailInput.value.trim()) {
      setError(emailInput, "emailError", "Please enter your email.");
      isValid = false;
    } else if (!EMAIL_REGEX.test(emailInput.value.trim())) {
      setError(emailInput, "emailError", "Please enter a valid email address.");
      isValid = false;
    } else {
      setError(emailInput, "emailError", "");
    }

    if (!subjectInput.value.trim()) {
      setError(subjectInput, "subjectError", "Please enter a subject.");
      isValid = false;
    } else {
      setError(subjectInput, "subjectError", "");
    }

    if (!messageInput.value.trim()) {
      setError(messageInput, "messageError", "Please write a message.");
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      setError(messageInput, "messageError", "Message should be at least 10 characters.");
      isValid = false;
    } else {
      setError(messageInput, "messageError", "");
    }

    return isValid;
  }

  function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    btnText.style.display = isLoading ? "none" : "inline";
    btnLoader.style.display = isLoading ? "inline-block" : "none";
  }

  function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    showStatus("", "");

    if (!validate()) {
      showStatus("Please fix the errors above and try again.", "error");
      return;
    }

    const payload = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      subject: subjectInput.value.trim(),
      message: messageInput.value.trim(),
    };

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Something went wrong. Please try again.");
      }

      showStatus("Your message has been sent successfully! I'll get back to you soon.", "success");
      form.reset();
    } catch (err) {
      console.error("Contact form submission failed:", err);
      showStatus(
        err.message || "Couldn't send your message right now. Please try again later.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  });

  // Clear individual field errors as the user types
  [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
    input.addEventListener("input", () => {
      input.classList.remove("invalid");
    });
  });
});
