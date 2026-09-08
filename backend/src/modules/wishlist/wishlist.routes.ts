import { Router } from "express";

import * as wishlistController
    from "./wishlist.controller";

import { requireAuth } from "../auth/auth.middleware";

const router = Router();

router.use(requireAuth);

router.get(
    "/",
    wishlistController.getMyWishlist
);

router.get(
    "/:productId/check",
    wishlistController.checkWishlist
);

router.post(
    "/:productId",
    wishlistController.addToWishlist
);



router.delete(
    "/:productId",
    wishlistController.removeFromWishlist
);



export default router;