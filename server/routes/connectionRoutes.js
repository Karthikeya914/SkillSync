import express from "express";
import { sendRequest } from "../controllers/connectionController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Send connection request
router.post("/send", authMiddleware, sendRequest);

export default router;