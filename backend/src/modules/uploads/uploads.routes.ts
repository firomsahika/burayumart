import { Router } from "express";

import { requireAuth } from "../auth/auth.middleware";

import {
    requireSeller,
    requireApprovedSeller,
} from "../sellers/seller.middleware";

import * as uploadsController from "./uploads.controller";

const router = Router();

router.use(requireAuth);
router.use(requireSeller);
router.use(requireApprovedSeller);

router.post(
    "/product-image/signature",
    uploadsController.createProductImageSignature
);

export default router;