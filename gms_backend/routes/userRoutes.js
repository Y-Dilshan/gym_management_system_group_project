import express from "express";
import {
  register,
  createUserByAdmin,
  login,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  googleLogin,
  getAdminStats,
  forgotPassword,
  resetPassword, 
} from "../controllers/userController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/admin/create", createUserByAdmin);
router.post("/login", login);
router.post("/google-login", googleLogin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword); 
router.get("/admin/stats", getAdminStats);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);


export default router;
