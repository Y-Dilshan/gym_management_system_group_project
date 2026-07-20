import express from "express";
import {
  applyAsTrainer,
  getApplications,
  getApplicationById,
  approveApplication,
  rejectApplication,
} from "../controllers/trainerApplicationController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", applyAsTrainer);

router.get("/", auth, getApplications);
router.get("/:id", auth, getApplicationById);
router.post("/:id/approve", auth, approveApplication);
router.post("/:id/reject", auth, rejectApplication);

export default router;
