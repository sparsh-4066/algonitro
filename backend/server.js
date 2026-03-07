import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import leetcodeRoutes from "./routes/leetcodeRoutes.js";
import codeforcesRoutes from "./routes/codeforcesRoutes.js";
import codechefRoutes from "./routes/codechefRoutes.js";   // ✅ NEW
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/leetcode", leetcodeRoutes);
app.use("/api/codeforces", codeforcesRoutes);
app.use("/api/codechef", codechefRoutes);   // ✅ NEW

// Test Route
app.get("/", (req, res) => {
  res.send("AlgoNitro API Running 🚀");
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