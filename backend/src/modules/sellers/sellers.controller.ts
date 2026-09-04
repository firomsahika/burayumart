import type {
    Request,
    Response,
    NextFunction,
} from "express";

import * as sellersService from "./sellers.services";
import {
    applyAsSellerSchema,
    updateSellerProfileSchema,
} from "./sellers.schema";
import { mapSellerProfile } from "./sellers.mapper";
import { AppError } from "../../middleware/app-error";

export async function applyAsSeller(
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

        const data = applyAsSellerSchema.parse(req.body);

        const seller = await sellersService.applyAsSeller(
            req.user.id,
            data
        );

        return res.status(201).json({
            success: true,
            data: {
                seller: mapSellerProfile(seller),
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function getMySellerProfile(
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

        const seller =
            await sellersService.getMySellerProfile(
                req.user.id
            );

        return res.status(200).json({
            success: true,
            data: {
                seller: mapSellerProfile(seller),
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function updateMySellerProfile(
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

        const data =
            updateSellerProfileSchema.parse(
                req.body
            );

        const seller =
            await sellersService.updateMySellerProfile(
                req.user.id,
                data
            );

        return res.status(200).json({
            success: true,
            data: {
                seller: mapSellerProfile(seller),
            },
        });
    } catch (error) {
        next(error);
    }
}