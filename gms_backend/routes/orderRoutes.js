import express from "express";
import { auth } from "../middleware/auth.js";
import { createOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", auth, createOrder);

export default router;