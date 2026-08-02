/* ==========================================================================
   SERVER.JS
   Entry point for the Portfolio backend API.
   Sets up Express, connects to MongoDB, registers routes and middleware.
   ========================================================================== */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

const contactRoutes = require("./routes/contactRoutes");
const projectRoutes = require("./routes/projectRoutes");

// Connect to MongoDB Atlas
connectDB();

const app = express();

// ------------------------------ Middleware ------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = (process.env.CLIENT_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// -------------------------------- Routes ---------------------------------
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is running",
    endpoints: {
      projects: "/api/projects",
      contact: "/api/contact",
    },
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, status: "OK", timestamp: new Date().toISOString() });
});

app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

// ------------------------------ Error handling ----------------------------
app.use(notFound);
app.use(errorHandler);

// -------------------------------- Start server -----------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});

module.exports = app;
