import { Router } from "express";

const router = Router();

router.get("/health-check", (_, res) => res.send("OK"));

export default router;
