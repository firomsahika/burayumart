import { Router } from "express";

import * as addressesController from "./addresses.controller";

import { requireAuth } from "../auth/auth.middleware";

const router = Router();

router.use(requireAuth);

router.post(
    "/",
    addressesController.createAddress
);

router.get(
    "/",
    addressesController.getMyAddresses
);

router.get(
    "/:id",
    addressesController.getMyAddress
);

router.patch(
    "/:id",
    addressesController.updateMyAddress
);

router.delete(
    "/:id",
    addressesController.deleteMyAddress
);

router.patch(
    "/:id/default",
    addressesController.setDefaultAddress
);

export default router;