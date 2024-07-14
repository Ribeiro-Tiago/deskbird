import { Router } from "express";

import { auth } from "@/middleware/auth";
import validate from "@/middleware/validate";
import BookingInstance, {
  createBookingSchema,
  updateBookingSchema,
} from "@/models/booking";
import type { AuthUser } from "@/types/user";

const router = Router();

const isAdmin = (user: AuthUser) => user.role === "admin";

// Create a booking
router.post(
  "/bookings",
  auth,
  validate(createBookingSchema),
  async (req, res) => {
    try {
      const booking = new BookingInstance({
        ...req.body,
        userId: req.user._id,
      });
      await booking.save();
      res.status(201).json(booking);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

// Get all bookings
router.get("/bookings", auth, async (req, res) => {
  try {
    return res.json(
      await BookingInstance.find(
        isAdmin(req.user) ? {} : { userId: req.user._id }
      )
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a booking
router.patch(
  "/bookings/:id",
  auth,
  validate(updateBookingSchema),
  async (req, res) => {
    try {
      const booking = await BookingInstance.findOneAndUpdate<Document>(
        {
          _id: req.params.id,
          userId: req.user.role === "admin" ? req.params.id : req.user._id,
        },
        req.body
      );

      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }

      res.json(booking);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

// Delete a booking
router.delete("/bookings/:id", auth, async (req, res) => {
  try {
    const booking = await BookingInstance.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.role === "admin" ? req.body.userId : req.user._id,
    });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json(booking);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
