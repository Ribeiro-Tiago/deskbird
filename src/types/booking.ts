import type { ObjectId, Document } from "mongoose";

import type { User } from "@/types/user";
import type { ParkingSpot } from "@/types/parkingSpot";

// on a relational db parking spot and user would be normalized into
// their own n-n tables with {parkingSpotId, userId}
export interface Booking extends Document {
  _id: ObjectId;
  startTime: Date;
  endTime: Date;
  user: User;
  parkingSpot: ParkingSpot;
  createdAt: Date;
  updatedAt?: Date;
}
