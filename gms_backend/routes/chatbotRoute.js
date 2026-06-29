import express from "express";
import { askAI } from "../controllers/chatbotController.js";

const router=express.Router();

router.post("/",askAI);

export default router;