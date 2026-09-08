import { AppError } from "../../middleware/app-error";



import * as adminRepository
    from "./admin.repository";

export async function getPendingSellers() {
    return adminRepository.findPendingSellers();
}

export async function updateSellerStatus(
    sellerId: string,
    status:
        | "APPROVED"
        | "REJECTED"
        | "SUSPENDED"
) {
    const seller =
        await adminRepository.findSellerById(
            sellerId
        );

    if (!seller) {
        throw new AppError(
            "Seller not found",
            404,
            "SELLER_NOT_FOUND"
        );
    }

    if (
        status === "APPROVED" &&
        seller.status !== "PENDING"
    ) {
        throw new AppError(
            "Only pending seller applications can be approved",
            400,
            "SELLER_NOT_PENDING"
        );
    }

    if (
        status === "REJECTED" &&
        seller.status !== "PENDING"
    ) {
        throw new AppError(
            "Only pending seller applications can be rejected",
            400,
            "SELLER_NOT_PENDING"
        );
    }

    return adminRepository.updateSellerStatus(
        sellerId,
        status
    );
}

export async function getPendingProducts() {
    return adminRepository.findPendingProducts();
}


export async function updateProductStatus(
    productId: string,
    status:
        | "AVAILABLE"
        | "REJECTED"
        | "ARCHIVED",
    rejectionReason?: string
) {
    const product =
        await adminRepository.findProductById(
            productId
        );

    if (!product) {
        throw new AppError(
            "Product not found",
            404,
            "PRODUCT_NOT_FOUND"
        );
    }

    if (
        status === "AVAILABLE" &&
        product.status !== "PENDING_REVIEW"
    ) {
        throw new AppError(
            "Only products pending review can be approved",
            400,
            "PRODUCT_NOT_PENDING"
        );
    }

    if (
        status === "REJECTED" &&
        product.status !== "PENDING_REVIEW"
    ) {
        throw new AppError(
            "Only products pending review can be rejected",
            400,
            "PRODUCT_NOT_PENDING"
        );
    }

    if (
        status === "REJECTED" &&
        !rejectionReason
    ) {
        throw new AppError(
            "A rejection reason is required",
            400,
            "REJECTION_REASON_REQUIRED"
        );
    }

    return adminRepository.updateProductStatus(
        productId,
        status,
        rejectionReason
    );
}