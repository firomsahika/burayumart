import { Router, type RequestHandler } from "express";


import { requireAuth } from "../auth/auth.middleware";

import {
    requireSeller,
    requireApprovedSeller,
} from "../sellers/seller.middleware";

import * as productsController from "./products.controller";


const router = Router();

router.use(requireAuth);

router.post(
    "/",
    requireSeller,
    requireApprovedSeller,
    productsController.createProduct
);

router.get(
    "/seller/me/:id",
    requireSeller,
    productsController.getMyProduct
);

router.patch(
    "/seller/me/:id",
    requireSeller,
    requireApprovedSeller,
    productsController.updateProduct
);

router.delete(
    "/seller/me/:id",
    requireSeller,
    requireApprovedSeller,
    productsController.deleteProduct
);

router.delete(
    "/seller/me/:productId/images/:imageId",
    requireSeller,
    requireApprovedSeller,
    productsController.deleteProductImage
);

router.get(
    "/seller/me/:id/images",
    requireSeller,
    productsController.getMyProductImages
);

router.patch(
    "/seller/me/:id/resubmit",
    requireSeller,
    requireApprovedSeller,
    productsController.resubmitProduct
);

router.patch(
    "/seller/me/:id/inventory",
    requireSeller,
    requireApprovedSeller,
    productsController.updateInventory
);

export default router;

