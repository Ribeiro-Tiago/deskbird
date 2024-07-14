import { NextFunction, Request, Response } from "express";

import { ValidationError } from "@/exceptions";

export const handleErrors = (_: Request, res: Response, next: NextFunction) => {
  try {
    next();
  } catch (err) {
    // handle validation related errors
    if (err instanceof ValidationError) {
      return res.status(422).json({ message: err.message, errors: err.errors });
    }

    // hanlded uncaught / unexpected errors
    // log to whatever logging system
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};
