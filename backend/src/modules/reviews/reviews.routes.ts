import { Router } from "express";

import * as reviewsController
    from "./reviews.controller";

import { requireAuth } from "../auth/auth.middleware";

const router = Router();


 
router.get(
    "/product/:productId",
    reviewsController.getProductReviews
);

/*
 * Everything below requires authentication
 */
router.use(requireAuth);

router.post(
    "/",
    reviewsController.createReview
);

router.get(
    "/me",
    reviewsController.getMyReviews
);

router.patch(
    "/:id",
    reviewsController.updateReview
);

router.delete(
    "/:id",
    reviewsController.deleteReview
);

export default router;