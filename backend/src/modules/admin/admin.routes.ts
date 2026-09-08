import { Router } from "express";

import * as adminController
    from "./admin.controller";

import { requireAuth } from "../auth/auth.middleware";
import { requireAdmin } from "../../middleware/requireAdmin";

const router = Router();

router.use(requireAuth);
router.use(requireAdmin);

/*
 * Seller moderation
 */

router.get(
    "/sellers/pending",
    adminController.getPendingSellers
);

router.patch(
    "/sellers/:id/status",
    adminController.updateSellerStatus
);

/*
 * Product moderation
 */

router.get(
    "/products/pending",
    adminController.getPendingProducts
);

router.patch(
    "/products/:id/status",
    adminController.updateProductStatus
);

export default router;