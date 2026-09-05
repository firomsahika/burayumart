import type {
    Request,
    Response,
    NextFunction,
    RequestHandler,
} from "express";

import {
    createProductSchema,
    updateProductSchema,
} from "./products.schema";
import { getRequiredParam } from "../../helpers/get-params";

import * as productsService from "./products.services";
import { mapProduct } from "./products.mapper";
import {
    updateInventorySchema,
} from "./products.schema";



interface ProductIdParams {
    id: string;
}

interface ProductImageParams {
    productId: string;
    imageId: string;
}

export async function createProduct(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const data = createProductSchema.parse(
            req.body
        );

        const product =
            await productsService.createProduct(
                req.seller!.id,
                data
            );

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: {
                product: mapProduct(product),
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function getMyProduct(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) {
    try {
        const product =
            await productsService.getMyProduct(
                req.params.id,
                req.seller!.id
            );

        return res.status(200).json({
            success: true,
            data: {
                product: mapProduct(product),
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function updateProduct(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) {
    try {
        const data = updateProductSchema.parse(
            req.body
        );

        const product =
            await productsService.updateMyProduct(
                req.params.id,
                req.seller!.id,
                data
            );

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: {
                product: mapProduct(product),
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteProduct(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) {
    try {
        const product =
            await productsService.archiveMyProduct(
                req.params.id,
                req.seller!.id
            );

        return res.status(200).json({
            success: true,
            message: "Product archived successfully",
            data: {
                product,
            },
        });
    } catch (error) {
        next(error);
    }
}


export async function deleteProductImage(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const productId = getRequiredParam(
            req.params.productId,
            "product ID"
        );

        const imageId = getRequiredParam(
            req.params.imageId,
            "image ID"
        );

        const image =
            await productsService.deleteMyProductImage(
                req.seller!.id,
                productId,
                imageId
            );

        return res.status(200).json({
            success: true,
            message: "Product image deleted successfully",
            data: {
                image,
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function getMyProductImages(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const productId = getRequiredParam(
            req.params.id,
            "product ID"
        );

        const images =
            await productsService.getMyProductImages(
                req.seller!.id,
                productId
            );

        return res.status(200).json({
            success: true,
            data: {
                images,
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function resubmitProduct(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const productId = getRequiredParam(
            req.params.id,
            "product ID"
        );

        const product =
            await productsService.resubmitProduct(
                req.seller!.id,
                productId
            );

        return res.status(200).json({
            success: true,
            message:
                "Product resubmitted for review successfully",
            data: {
                product: mapProduct(product),
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function updateInventory(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const productId = getRequiredParam(
            req.params.id,
            "product ID"
        );

        const data = updateInventorySchema.parse(
            req.body
        );

        const product =
            await productsService.updateProductInventory(
                req.seller!.id,
                productId,
                data.quantity
            );

        return res.status(200).json({
            success: true,
            message: "Product inventory updated successfully",
            data: {
                product: mapProduct(product),
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function replaceProductImages(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const productId =
            getRequiredParam(
                req.params.id,
                "product ID"
            );

        const data =
            updateProductSchema
                .pick({
                    images: true,
                })
                .parse(req.body);

        const images =
            await productsService.replaceMyProductImages(
                req.seller!.id,
                productId,
                data.images ?? []
            );

        return res.status(200).json({
            success: true,
            message:
                "Product images updated successfully",
            data: {
                images,
            },
        });
    } catch (error) {
        next(error);
    }
}