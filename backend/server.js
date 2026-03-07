import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import leetcodeRoutes from "./routes/leetcodeRoutes.js";
import codeforcesRoutes from "./routes/codeforcesRoutes.js";
import codechefRoutes from "./routes/codechefRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

/* -------------------- MIDDLEWARE -------------------- */

app.use(cors()); // Enable CORS for frontend (Vercel)
app.use(express.json()); // Parse JSON body


/* -------------------- ROUTES -------------------- */

app.use("/api/auth", authRoutes);
app.use("/api/leetcode", leetcodeRoutes);
app.use("/api/codeforces", codeforcesRoutes);
app.use("/api/codechef", codechefRoutes);


/* -------------------- TEST ROUTE -------------------- */

app.get("/", (req, res) => {
  res.send("AlgoNitro API Running 🚀");
});


/* -------------------- SERVER PORT -------------------- */

const PORT = process.env.PORT || 5000;


/* -------------------- MONGODB CONNECTION -------------------- */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Failed:", err.message);
  });