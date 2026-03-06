import express from "express";
import { getLeetcodeStats } from "../controllers/leetcodeController.js";

const router = express.Router();

// GET LeetCode stats by username
router.get("/:username", getLeetcodeStats);

export default router;