import express from "express";
import { auth } from "../middleware/auth.js";
import { 
  createOrder, 
  getOrders, 
  getMyOrders, 
  updateOrderStatus, 
  deleteOrder 
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", auth, createOrder);
router.get("/", auth, getOrders);
router.get("/my-orders", auth, getMyOrders);
router.put("/:id", auth, updateOrderStatus);
router.delete("/:id", auth, deleteOrder);

export default router;