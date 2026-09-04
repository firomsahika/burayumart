import type {
    Request,
    Response,
    NextFunction,
} from "express";

import * as usersService from "./users.services";
import {
    createAddressSchema,
    updateAddressSchema,
    updateProfileSchema,
} from "./users.schema";
import { mapUserProfile } from "./users.mapper";
import { AppError } from "../../middleware/app-error";

export async function getMyProfile(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.user) {
            throw new AppError(
                "Authentication required",
                401,
                "UNAUTHORIZED"
            );
        }

        const user = await usersService.getMyProfile(
            req.user.id
        );

        return res.status(200).json({
            success: true,
            data: {
                user: mapUserProfile(user),
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function updateMyProfile(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.user) {
            throw new AppError(
                "Authentication required",
                401,
                "UNAUTHORIZED"
            );
        }

        const data = updateProfileSchema.parse(req.body);

        const user = await usersService.updateMyProfile(
            req.user.id,
            data
        );

        return res.status(200).json({
            success: true,
            data: {
                user,
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function getMyAddresses(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.user) {
            throw new AppError(
                "Authentication required",
                401,
                "UNAUTHORIZED"
            );
        }

        const addresses =
            await usersService.getMyAddresses(req.user.id);

        return res.status(200).json({
            success: true,
            data: {
                addresses,
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function createMyAddress(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.user) {
            throw new AppError(
                "Authentication required",
                401,
                "UNAUTHORIZED"
            );
        }

        const data = createAddressSchema.parse(req.body);

        const address =
            await usersService.createMyAddress(
                req.user.id,
                data
            );

        return res.status(201).json({
            success: true,
            data: {
                address,
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function updateMyAddress(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.user) {
            throw new AppError(
                "Authentication required",
                401,
                "UNAUTHORIZED"
            );
        }

        const { id } = req.params;

        if (!id) {
            throw new AppError(
                "Address ID is required",
                400,
                "ADDRESS_ID_REQUIRED"
            );
        }

        const data = updateAddressSchema.parse(req.body);

        const address =
            await usersService.updateMyAddress(
                req.user.id,
                id,
                data
            );

        return res.status(200).json({
            success: true,
            data: {
                address,
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteMyAddress(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.user) {
            throw new AppError(
                "Authentication required",
                401,
                "UNAUTHORIZED"
            );
        }

        const { id } = req.params;

        if (!id) {
            throw new AppError(
                "Address ID is required",
                400,
                "ADDRESS_ID_REQUIRED"
            );
        }

        const result =
            await usersService.deleteMyAddress(
                req.user.id,
                id
            );

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
}