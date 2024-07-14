import { Request as OriginalRequest } from "express";

import type { AuthUser } from "./user";

export {};

declare global {
  namespace Express {
    export type UnAuthedRequest = OriginalRequest;

    export interface Request {
      user: AuthUser;
    }
  }
}
