import { Router } from "express";
import * as authController from "./auth.controller";

const router = Router();

router.get(
  "/me",
  authController.getMe
);

export default router;
