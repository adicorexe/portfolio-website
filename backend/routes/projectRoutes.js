/* ==========================================================================
   PROJECT ROUTES
   GET /api/projects       — list all projects
   GET /api/projects/:id   — get a single project
   ========================================================================== */

const express = require("express");
const { getProjects, getProjectById } = require("../controllers/projectController");

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);

module.exports = router;
