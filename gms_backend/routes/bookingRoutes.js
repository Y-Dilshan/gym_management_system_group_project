import express from "express";
import {
  createBooking,
  getBookings,
  getMyBookings,
  getTrainerBookings,
  updateBookingStatus,
  updateBooking,
  getBookedSlots
} from "../controllers/bookingController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Apply auth middleware to all booking routes
router.use(auth);

router.post("/", createBooking);
router.get("/", getBookings);
router.get("/my-bookings", getMyBookings);
router.get("/trainer-bookings", getTrainerBookings);
router.put("/:id/status", updateBookingStatus);
router.put("/:id", updateBooking);
router.get("/trainer/:trainer_id/booked-slots", getBookedSlots);

export default router;
