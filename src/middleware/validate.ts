import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

export default (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(
      { ...req.body, ...req.params },
      { stripUnknown: true }
    );

    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    next({ body: value });
  };
};
