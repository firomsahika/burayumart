import { AppError } from "../../middleware/app-error";

import * as productsRepository from "./products.repository";
import type { CreateProductInput, UpdateProductInput } from "./products.types";
import {
    isProductImageOwnedBySeller,
} from "../uploads/uploads.service";
import {
    deleteCloudinaryImage,
} from "../../lib/cloudinary";

export async function createProduct(
    sellerId: string,
    data: CreateProductInput
) {
    const category = await productsRepository.findCategoryById(data.categoryId);

    if (!category || !category.isActive) {
        throw new AppError(
            "The selected category is not available",
            400,
            "CATEGORY_NOT_AVAILABLE"
        );
    }

    if (data.images?.length) {
        for (const image of data.images) {
            const isOwned = isProductImageOwnedBySeller(
                image.publicId,
                sellerId
            );

            if (!isOwned) {
                throw new AppError(
                    "Invalid product image",
                    400,
                    "INVALID_PRODUCT_IMAGE"
                );
            }
        }
    }

    const product =
        await productsRepository.createProduct(
            sellerId,
            data
        );

    if (data.images?.length) {
        await Promise.all(
            data.images.map((image) =>
                productsRepository.createProductImage(
                    product.id,
                    image
                )
            )
        );
    }

    return productsRepository.findSellerProductById(
        product.id,
        sellerId
    );
}

export async function getMyProduct(
    productId: string,
    sellerId: string
) {
    const product =
        await productsRepository.findSellerProductById(
            productId,
            sellerId
        );

    if (!product) {
        throw new AppError(
            "Product not found",
            404,
            "PRODUCT_NOT_FOUND"
        );
    }

    return product;
}

export async function updateMyProduct(
    productId: string,
    sellerId: string,
    data: UpdateProductInput
) {
    const existingProduct =
        await productsRepository.findSellerProductById(
            productId,
            sellerId
        );

    if (!existingProduct) {
        throw new AppError(
            "Product not found",
            404,
            "PRODUCT_NOT_FOUND"
        );
    }

    if (data.categoryId) {
        const category =
            await productsRepository.findCategoryById(
                data.categoryId
            );

        if (!category || !category.isActive) {
            throw new AppError(
                "The selected category is not available",
                400,
                "CATEGORY_NOT_AVAILABLE"
            );
        }
    }

    const {
        images,
        ...productData
    } = data;

    const product =
        await productsRepository.updateProduct(
            productId,
            productData
        );

    if (images) {
        await productsRepository.deleteProductImages(
            productId
        );

        if (images.length > 0) {
            await productsRepository.createProductImages(
                productId,
                images
            );
        }
    }

    return productsRepository.findSellerProductById(
        product.id,
        sellerId
    );
}

export async function archiveMyProduct(
    productId: string,
    sellerId: string
) {
    const product =
        await productsRepository.findSellerProductById(
            productId,
            sellerId
        );

    if (!product) {
        throw new AppError(
            "Product not found",
            404,
            "PRODUCT_NOT_FOUND"
        );
    }

    if (product.status === "ARCHIVED") {
        throw new AppError(
            "Product is already archived",
            409,
            "PRODUCT_ALREADY_ARCHIVED"
        );
    }

    return productsRepository.archiveProduct(
        productId
    );
}

export async function deleteMyProductImage(
    sellerId: string,
    productId: string,
    imageId: string
) {
    const product =
        await productsRepository.findSellerProductById(
            productId,
            sellerId
        );

    if (!product) {
        throw new AppError(
            "Product not found",
            404,
            "PRODUCT_NOT_FOUND"
        );
    }

    const image =
        await productsRepository.findProductImageById(
            imageId,
            productId
        );

    if (!image) {
        throw new AppError(
            "Product image not found",
            404,
            "PRODUCT_IMAGE_NOT_FOUND"
        );
    }

    // Delete from Cloudinary first
    if (image.publicId) {
        await deleteCloudinaryImage(
            image.publicId
        );
    }

    // Then delete DB record
    await productsRepository.deleteProductImage(
        imageId
    );

    return {
        message:
            "Product image deleted successfully",
    };
}

export async function getMyProductImages(
    sellerId: string,
    productId: string
) {
    const product =
        await productsRepository.findSellerProductById(
            productId,
            sellerId
        );

    if (!product) {
        throw new AppError(
            "Product not found",
            404,
            "PRODUCT_NOT_FOUND"
        );
    }

    return productsRepository.findProductImages(
        productId
    );
}