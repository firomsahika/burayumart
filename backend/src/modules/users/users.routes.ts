import { Router } from "express";

import { requireAuth } from "../auth/auth.middleware";
import * as usersController from "./users.controller";

const router = Router();

router.use(requireAuth);

router.get(
    "/me",
    usersController.getMyProfile
);

router.patch(
    "/me",
    usersController.updateMyProfile
);

router.get(
    "/me/addresses",
    usersController.getMyAddresses
);

router.post(
    "/me/addresses",
    usersController.createMyAddress
);

router.patch(
    "/me/addresses/:id",
    usersController.updateMyAddress
);

router.delete(
    "/me/addresses/:id",
    usersController.deleteMyAddress
);

export default router;