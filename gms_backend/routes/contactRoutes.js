import express from "express";
import { createContactMessage, getContactMessages, replyContactMessage } from "../controllers/contactController.js";

const router = express.Router();

router.post("/", createContactMessage);
router.get("/", getContactMessages);
router.post("/reply", replyContactMessage);

export default router;

