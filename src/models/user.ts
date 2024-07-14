import Joi from "joi";
import { Schema, model } from "mongoose";

import type { User } from "@/types/user";

export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export default model<User>(
  "User",
  new Schema<User>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    token: { type: String, required: true },
  })
);
