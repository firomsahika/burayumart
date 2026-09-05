import type { ProductStatus } from "../../generated/prisma/client";

export const SELLER_ALLOWED_STATUS_TRANSITIONS: Partial<
    Record<ProductStatus, ProductStatus[]>
> = {
    AVAILABLE: ["ARCHIVED"],
    OUT_OF_STOCK: ["ARCHIVED"],
    DRAFT: ["PENDING_REVIEW"],
};

export const ADMIN_ALLOWED_STATUS_TRANSITIONS: Partial<
    Record<ProductStatus, ProductStatus[]>
> = {
    PENDING_REVIEW: ["AVAILABLE", "REJECTED"],
    REJECTED: ["PENDING_REVIEW"],
    AVAILABLE: ["OUT_OF_STOCK", "ARCHIVED"],
    OUT_OF_STOCK: ["AVAILABLE", "ARCHIVED"],
};