import { ObjectId, Document } from "mongoose";

export interface ParkingSpot extends Document {
  _id: ObjectId;
  name: string;
}
