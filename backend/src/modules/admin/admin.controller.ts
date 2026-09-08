import type {
    Request,
    Response,
    NextFunction,
} from "express";

import * as adminService
    from "./admin.service";

import {
    sellerIdParamsSchema,
    productIdParamsSchema,
    updateSellerStatusSchema,
    updateProductStatusSchema,
} from "./admin.schema";

import {
    mapAdminSeller,
    mapAdminProduct,
} from "./admin.mapper";

export async function getPendingSellers(
    _req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const sellers =
            await adminService
                .getPendingSellers();

        return res.status(200).json({
            success: true,
            message:
                "Pending seller applications fetched successfully",
            data: {
                sellers:
                    sellers.map(
                        mapAdminSeller
                    ),
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function updateSellerStatus(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { id } =
            sellerIdParamsSchema.parse(
                req.params
            );

        const data =
            updateSellerStatusSchema.parse(
                req.body
            );

        const seller =
            await adminService
                .updateSellerStatus(
                    id,
                    data.status
                );

        return res.status(200).json({
            success: true,
            message:
                `Seller application ${data.status.toLowerCase()} successfully`,
            data: {
                seller:
                    mapAdminSeller(seller),
            },
        });
    } catch (error) {
        next(error);
    }
}


export async function getPendingProducts(
    _req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const products =
            await adminService
                .getPendingProducts();

        return res.status(200).json({
            success: true,
            message:
                "Pending products fetched successfully",
            data: {
                products:
                    products.map(
                        mapAdminProduct
                    ),
            },
        });
    } catch (error) {
        next(error);
    }
}


export async function updateProductStatus(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { id } =
            productIdParamsSchema.parse(
                req.params
            );

        const data =
            updateProductStatusSchema.parse(
                req.body
            );

        const product =
            await adminService
                .updateProductStatus(
                    id,
                    data.status,
                    data.rejectionReason
                );

        return res.status(200).json({
            success: true,
            message:
                `Product ${data.status.toLowerCase()} successfully`,
            data: {
                product:
                    mapAdminProduct(product),
            },
        });
    } catch (error) {
        next(error);
    }
}