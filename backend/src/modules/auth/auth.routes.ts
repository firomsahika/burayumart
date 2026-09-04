import { Router } from "express";
import * as authController from "./auth.controller";
import { requireAuth } from "./auth.middleware"

const router = Router();

router.get(
  "/me",
  requireAuth,
  authController.getMe
);

export default router;
