import Joi from "joi";
import { Schema, model } from "mongoose";

import User from "./user";
import ParkingSpot from "./parkingSpot";
import type { Booking } from "@/types/booking";

export const updateBookingSchema = Joi.object({
  user: Joi.object().required(), // todo: specifiy the obj props
  parkingSpot: Joi.object().required(), // todo: specifiy the obj props
  id: Joi.string().required(),
  startTime: Joi.date().iso().required(),
  endTime: Joi.date().iso().required(),
});

export const createBookingSchema = Joi.object({
  spotNumber: Joi.number().integer().positive().required(),
  startTime: Joi.date().iso().required(),
  endTime: Joi.date().iso().required(),
});

export default model<Booking>(
  "Booking",
  new Schema<Booking>({
    user: { type: User, ref: "User", required: true },
    parkingSpot: { type: ParkingSpot, ref: "ParkingSpot", required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: false },
  })
);
