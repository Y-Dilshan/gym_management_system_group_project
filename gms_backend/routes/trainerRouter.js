import express from "express";
import {
  trainerLogin,
  getTrainers,
  getTrainerById,
  updateTrainer,
  deleteTrainer,
  getAssignedMembers,
  updateTrainerProfile,
} from "../controllers/trainerController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/login", trainerLogin);

// router.post("/", createTrainer);
router.get("/", getTrainers);
router.get("/:id", getTrainerById);
router.put("/:id", updateTrainer);
router.delete("/:id", deleteTrainer);

// Trainer updates own profile after login
router.put(
  "/:id/profile",
  upload.single("profile_picture"),
  updateTrainerProfile,
);

router.get("/:id/members", getAssignedMembers); // Members assigned to this trainer

export default router;
