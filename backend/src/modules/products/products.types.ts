import { z } from "zod";
import {
  createProductSchema,
  updateProductSchema,
  productQuerySchema,
  productImageSchema
} from "./products.schema";

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ProductQuery = z.infer<typeof productQuerySchema>;
export type ProductImageInput = z.infer<typeof productImageSchema>;
