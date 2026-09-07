import { Router } from "express";

import * as ordersController
    from "./orders.controller";

import { requireAuth } from "../auth/auth.middleware";

const router = Router();

router.use(requireAuth);

// Create order / checkout
router.post(
    "/",
    ordersController.createOrder
);

// Customer order history
router.get(
    "/",
    ordersController.getMyOrders
);

// Customer order details
router.get(
    "/:id",
    ordersController.getMyOrderById
);

export default router;