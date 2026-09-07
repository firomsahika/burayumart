import { AppError } from "../../middleware/app-error";

import * as productsRepository from "./products.repository";
import type { CreateProductInput, ProductImageInput, UpdateProductInput } from "./products.types";
import {
    isProductImageOwnedBySeller,
} from "../uploads/uploads.service";
import {
    deleteCloudinaryImage,
} from "../../lib/cloudinary";
import type { ModerateProductInput } from "./products.types";
import { ProductStatus } from "../../generated/prisma/enums";
import { slugify } from "../../utils/slug";



export async function createProduct(
    sellerId: string,
    data: CreateProductInput
) {
    // 1. Validate category
    const category = await productsRepository.findCategoryById(
        data.categoryId
    );

    if (!category || !category.isActive) {
        throw new AppError(
            "The selected category is not available",
            400,
            "CATEGORY_NOT_AVAILABLE"
        );
    }

    // 2. Validate that all uploaded images
    //    belong to this seller
    if (data.images?.length) {
        for (const image of data.images) {
            const isOwned =
                isProductImageOwnedBySeller(
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

    // 3. Generate a unique slug for this seller
    //
    // Example:
    // "iPhone 15 Pro Max"
    //      ↓
    // "iphone-15-pro-max"
    //
    // If the seller already has that slug:
    // "iphone-15-pro-max-1"
    // "iphone-15-pro-max-2"
    // etc.
    const slug =
        await generateUniqueProductSlug(
            sellerId,
            data.name
        );

    // 4. Pass the generated slug to the repository
    const product =
        await productsRepository.createProduct(
            sellerId,
            { ...data, slug, }
        );

    // 5. Return the product that was created
    //
    // Images are already created inside the repository
    // transaction, so we don't need to create them here.
    return product;
}

export async function getAllProducts() {
    const products = await productsRepository.findAllAvailableProducts();

    if (!products) {
        throw new AppError(
            "Products not found",
            404,
            "PRODUCTS_NOT_FOUND"
        )
    }

    return products;
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
    // 1. Make sure the product belongs to this seller
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

    // 2. Validate category if it is being changed
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

    // 3. Separate images from normal product fields
    const {
        images,
        ...productData
    } = data;

    // 4. Update the product itself
    const product =
        await productsRepository.updateProduct(
            productId,
            productData
        );

    // 5. Replace product images only when images
    //    were explicitly included in the request.
    //
    //    images === undefined
    //      → don't touch existing images
    //
    //    images === []
    //      → remove all existing images
    //
    //    images with items
    //      → replace existing images with new ones
    if (images !== undefined) {
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

    // 6. Fetch the complete updated product
    //    including category, seller and images
    const updatedProduct =
        await productsRepository.findSellerProductById(
            product.id,
            sellerId
        );

    if (!updatedProduct) {
        throw new AppError(
            "Failed to retrieve updated product",
            500,
            "PRODUCT_UPDATE_FAILED"
        );
    }

    return updatedProduct;
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

export async function moderateProduct(
    productId: string,
    input: ModerateProductInput
) {
    const product =
        await productsRepository.findProductById(productId);

    if (!product) {
        throw new AppError(
            "Product not found",
            404,
            "PRODUCT_NOT_FOUND"
        );
    }

    if (product.status !== "PENDING_REVIEW") {
        throw new AppError(
            `Product cannot be moderated from ${product.status} status`,
            409,
            "INVALID_PRODUCT_STATUS"
        );
    }

    if (input.status === "REJECTED" && !input.rejectionReason) {
        throw new AppError(
            "Rejection reason is required",
            400,
            "REJECTION_REASON_REQUIRED"
        );
    }

    const updatedProduct =
        await productsRepository.updateProductStatus(
            productId,
            input.status
        );

    return {
        product: updatedProduct,
        previousStatus: product.status,
        status: updatedProduct.status,
        rejectionReason:
            input.status === "REJECTED"
                ? input.rejectionReason
                : null,
    };
}

export async function resubmitProduct(
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

    if (product.status !== "REJECTED") {
        throw new AppError(
            "Only rejected products can be resubmitted",
            409,
            "PRODUCT_NOT_REJECTED"
        );
    }

    return productsRepository.updateProductStatus(
        productId,
        "PENDING_REVIEW"
    );
}

export async function updateProductInventory(
    sellerId: string,
    productId: string,
    quantity: number
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

    let nextStatus: ProductStatus | undefined;

    if (
        product.status === "AVAILABLE" &&
        quantity === 0
    ) {
        nextStatus = "OUT_OF_STOCK";
    }

    if (
        product.status === "OUT_OF_STOCK" &&
        quantity > 0
    ) {
        nextStatus = "AVAILABLE";
    }

    return productsRepository.updateProductInventory(
        productId,
        quantity,
        nextStatus
    );
}



export async function replaceMyProductImages(
    sellerId: string,
    productId: string,
    images: ProductImageInput[]
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

    // Validate every new image belongs to this seller.
    for (const image of images) {
        const belongsToSeller =
            uploadsService.isProductImageOwnedBySeller(
                image.publicId,
                sellerId
            );

        if (!belongsToSeller) {
            throw new AppError(
                "One or more images do not belong to this seller",
                403,
                "INVALID_PRODUCT_IMAGE_OWNER"
            );
        }
    }

    // Get current images before replacing them.
    const existingImages =
        await productsRepository.findProductImages(
            productId
        );

    // Replace DB records atomically.
    const newImages =
        await productsRepository.replaceProductImages(
            productId,
            images
        );

    // Determine which Cloudinary assets are no
    // longer being used.
    const newPublicIds = new Set(
        images.map(
            (image) => image.publicId
        )
    );

    const removedImages =
        existingImages.filter(
            (image) =>
                !newPublicIds.has(
                    image.publicId
                )
        );

    // Clean up old Cloudinary assets.
    for (const image of removedImages) {
        try {
            await deleteCloudinaryImage(
                image.publicId
            );
        } catch (error) {
            console.error(
                "Failed to delete old Cloudinary image",
                {
                    publicId: image.publicId,
                    productId,
                    error,
                }
            );
        }
    }

    return newImages;
}



async function generateUniqueProductSlug(
    sellerId: string,
    name: string
) {
    const baseSlug = slugify(name);

    let slug = baseSlug;
    let counter = 1;

    while (
        await productsRepository.findProductBySlug(
            sellerId,
            slug
        )
    ) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    return slug;
}