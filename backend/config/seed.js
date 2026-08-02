/* ==========================================================================
   SEED.JS
   Populates the database with the initial set of portfolio projects.
   Run with: npm run seed
   ========================================================================== */

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./db");
const Project = require("../models/Project");

const projects = [
  {
    title: "Personal Portfolio Website",
    description:
      "A full stack developer portfolio with a Node.js + Express + MongoDB backend and a pure CSS glassmorphism frontend.",
    techStack: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"],
    github: "https://github.com/adityarajsaxena/portfolio-website",
    liveDemo: "https://adityarajsaxena.dev",
    featured: true,
  },
  {
    title: "Python Quiz Game",
    description:
      "An interactive command-line quiz game built with Python featuring score tracking and multiple categories.",
    techStack: ["Python"],
    github: "https://github.com/adityarajsaxena/python-quiz-game",
    liveDemo: "",
    featured: false,
  },
  {
    title: "Student Management System",
    description:
      "A desktop application to manage student records, grades and attendance built with Java and MySQL.",
    techStack: ["Java", "MySQL"],
    github: "https://github.com/adityarajsaxena/student-management-system",
    liveDemo: "",
    featured: false,
  },
  {
    title: "Weather App",
    description:
      "A responsive weather forecast application that consumes a public weather API in real time.",
    techStack: ["JavaScript", "API"],
    github: "https://github.com/adityarajsaxena/weather-app",
    liveDemo: "https://weather-app-demo.vercel.app",
    featured: false,
  },
  {
    title: "Task Manager",
    description:
      "A full stack task management app with authentication, CRUD operations and a MongoDB backend.",
    techStack: ["Node.js", "MongoDB"],
    github: "https://github.com/adityarajsaxena/task-manager",
    liveDemo: "",
    featured: false,
  },
];

const seedDB = async () => {
  try {
    await connectDB();
    await Project.deleteMany();
    await Project.insertMany(projects);
    console.log("Database seeded successfully with initial projects.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDB();
