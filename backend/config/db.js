/* ==========================================================================
   DB.JS
   Establishes and exports the MongoDB Atlas connection using Mongoose.
   ========================================================================== */

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Exit the process with failure if the DB connection fails,
    // since the API cannot function without a database.
    process.exit(1);
  }
};

module.exports = connectDB;
