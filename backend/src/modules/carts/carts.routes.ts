import { Router } from "express";

import * as cartController from "./carts.controller";

import { requireAuth } from "../auth/auth.middleware";

const router = Router();

router.use(requireAuth);

router.post(
    "/items",
    cartController.addToCart
);

router.get(
    "/",
    cartController.getMyCart
);

router.patch(
    "/items/:itemId",
    cartController.updateCartItem
);

router.delete(
    "/items/:itemId",
    cartController.removeFromCart
);

router.delete(
    "/",
    cartController.clearMyCart
);

export default router;