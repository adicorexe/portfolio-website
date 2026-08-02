/* ==========================================================================
   CONTACT ROUTES
   POST /api/contact  — submit a new message
   GET  /api/contact   — list all messages
   ========================================================================== */

const express = require("express");
const { body } = require("express-validator");
const { submitContact, getContacts } = require("../controllers/contactController");

const router = express.Router();

const contactValidationRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),
  body("subject")
    .trim()
    .notEmpty()
    .withMessage("Subject is required")
    .isLength({ min: 2, max: 150 })
    .withMessage("Subject must be between 2 and 150 characters"),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 10, max: 2000 })
    .withMessage("Message must be between 10 and 2000 characters"),
];

router.post("/", contactValidationRules, submitContact);
router.get("/", getContacts);

module.exports = router;
