import express from "express";
import { getCodechefStats } from "../controllers/codechefController.js";

const router = express.Router();

router.get("/:username", getCodechefStats);

export default router;