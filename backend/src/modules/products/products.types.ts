import { z } from "zod";
import {
  createProductSchema,
  updateProductSchema,
  productQuerySchema,
  productImageSchema
} from "./products.schema";
import type { ProductStatus } from "../../generated/prisma/client";


export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ProductQuery = z.infer<typeof productQuerySchema>;
export type ProductImageInput = z.infer<typeof productImageSchema>;

export interface CreateProductRepositoryInput
  extends CreateProductInput {
  slug: string;
}

export interface ModerateProductInput {
  status: "AVAILABLE" | "REJECTED";
  rejectionReason?: string;
}

export interface ProductStatusResult {
  previousStatus: ProductStatus;
  status: ProductStatus;
}

