import { Router } from "express";

import * as ordersController
    from "./orders.controller";

import { requireAuth } from "../auth/auth.middleware";
import { requireSeller } from "../sellers/seller.middleware";
import { requireApprovedSeller } from "../sellers/seller.middleware";


const router = Router();

router.use(requireAuth);

// Customer
router.post(
    "/",
    ordersController.createOrder
);

router.get(
    "/",
    ordersController.getMyOrders
);

router.get(
    "/:id",
    ordersController.getMyOrderById
);

// Seller
router.get(
    "/seller/me",
    requireSeller,
    requireApprovedSeller,
    ordersController.getSellerOrders
);

router.get(
    "/seller/me/:id",
    requireSeller,
    requireApprovedSeller,
    ordersController.getSellerOrderById
);

router.patch(
    "/seller/me/:id/status",
    requireSeller,
    requireApprovedSeller,
    ordersController.updateSellerOrderStatus
);

export default router;