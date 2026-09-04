import type {
    Request,
    Response,
    NextFunction,
} from "express";

import { prisma } from "../../lib/prisma";

export async function requireSeller(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: {
                    code: "UNAUTHORIZED",
                    message: "Authentication required",
                },
            });
        }

        const seller = await prisma.sellerProfile.findUnique({
            where: {
                userId: req.user.id,
            },
        });

        if (!seller) {
            return res.status(403).json({
                success: false,
                error: {
                    code: "SELLER_REQUIRED",
                    message:
                        "You need a seller profile to perform this action",
                },
            });
        }

        req.seller = seller;

        next();
    } catch (error) {
        next(error);
    }
}

export async function requireApprovedSeller(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (!req.seller) {
            return res.status(403).json({
                success: false,
                error: {
                    code: "SELLER_REQUIRED",
                    message: "Seller profile required",
                },
            });
        }

        if (req.seller.status !== "APPROVED") {
            return res.status(403).json({
                success: false,
                error: {
                    code: "SELLER_NOT_APPROVED",
                    message:
                        "Your seller account must be approved before you can sell products",
                    status: req.seller.status,
                },
            });
        }

        next();
    } catch (error) {
        next(error);
    }
}