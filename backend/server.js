import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import leetcodeRoutes from "./routes/leetcodeRoutes.js";
import authRoutes from "./routes/authRoutes.js";   // ADD THIS

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);        // ADD THIS
app.use("/api/leetcode", leetcodeRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("AlgoNitro API Running");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Failed:", err.message);
  });