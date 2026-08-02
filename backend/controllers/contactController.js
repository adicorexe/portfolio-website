/* ==========================================================================
   CONTACT CONTROLLER
   Handles business logic for creating and retrieving contact messages.
   ========================================================================== */

const { validationResult } = require("express-validator");
const Contact = require("../models/Contact");

/**
 * @desc    Submit a new contact form message
 * @route   POST /api/contact
 * @access  Public
 */
const submitContact = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
        errors: errors.array(),
      });
    }

    const { name, email, subject, message } = req.body;

    const contact = await Contact.create({ name, email, subject, message });

    return res.status(201).json({
      success: true,
      message: "Your message has been sent successfully!",
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all contact messages (admin use)
 * @route   GET /api/contact
 * @access  Public (recommend securing this in production)
 */
const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { submitContact, getContacts };
