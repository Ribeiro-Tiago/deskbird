import Joi from "joi";
import { Schema, model } from "mongoose";

import type { ParkingSpot } from "@/types/parkingSpot";

export const parkingSpotSchema = Joi.object({
  name: Joi.string().required(),
});

export default model<ParkingSpot>(
  "ParkingSpot",
  new Schema<ParkingSpot>({
    name: { type: String, required: true },
  })
);
