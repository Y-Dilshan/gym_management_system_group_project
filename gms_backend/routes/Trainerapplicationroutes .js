import express from "express";
import {
  applyAsTrainer,
  getApplications,
  getApplicationById,
  approveApplication,
  rejectApplication,
} from "../controllers/trainerApplicationController.js";

const router = express.Router();

router.post("/", applyAsTrainer);

router.get("/", getApplications);
router.get("/:id", getApplicationById);
router.post("/:id/approve", approveApplication);
router.post("/:id/reject", rejectApplication);

export default router;
