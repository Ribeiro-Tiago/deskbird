import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import User from "@/models/user";
import type { AuthUser } from "@/types/user";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send({ error: "Please authenticate." });
  }

  try {
    const decoded: any = jwt.verify(token, "secret");
    const user: AuthUser | null = await User.findOne(
      { _id: decoded.id },
      { _id: 1, role: 1 }
    );

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ error: "Access denied." });
  }

  next();
};
