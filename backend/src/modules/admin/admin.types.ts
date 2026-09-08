import {
    ProductStatus,
    SellerStatus,
} from "../../generated/prisma/client";

export type UpdateSellerStatusInput = {
    status: SellerStatus;
    rejectionReason?: string;
};

export type UpdateProductStatusInput = {
    status: ProductStatus;
    rejectionReason?: string;
};