import express from "express";
import { getCodeforcesStats } from "../controllers/codeforcesController.js";

const router = express.Router();

router.get("/:username", getCodeforcesStats);

export default router;