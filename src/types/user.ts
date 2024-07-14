import { ObjectId, Document } from "mongoose";

export interface User extends Document {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  token: string;
  password: string;
}

export interface AuthUser {
  _id: ObjectId;
  role: UserRole;
}

export type UserRole = "admin" | "standard";
