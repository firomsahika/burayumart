import { Router } from "express";

import { requireAuth } from "../auth/auth.middleware";

import * as categoriesController
    from "./categories.controller";

const router = Router();

/**
 * Public routes
 */

// Get categories
router.get(
    "/",
    categoriesController.getCategories
);

// Get single category
router.get(
    "/:id",
    categoriesController.getCategoryById
);

/**
 * Protected routes
 *
 * These will later become admin-only
 * when A14 Admin & Moderation is implemented.
 */

router.post(
    "/",
    requireAuth,
    categoriesController.createCategory
);

router.patch(
    "/:id",
    requireAuth,
    categoriesController.updateCategory
);

router.patch(
    "/:id/activate",
    requireAuth,
    categoriesController.activateCategory
);

router.patch(
    "/:id/deactivate",
    requireAuth,
    categoriesController.deactivateCategory
);

export default router;