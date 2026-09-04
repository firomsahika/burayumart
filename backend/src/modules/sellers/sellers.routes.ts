import { Router } from "express";

import { requireAuth } from "../auth/auth.middleware";
import * as sellersController from "./sellers.controller";

const router = Router();

router.use(requireAuth);

router.post(
  "/apply",
  sellersController.applyAsSeller
);

router.get(
  "/me",
  sellersController.getMySellerProfile
);

router.patch(
  "/me",
  sellersController.updateMySellerProfile
);

export default router;