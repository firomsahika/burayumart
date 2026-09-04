import { z } from "zod";
import {
  applyAsSellerSchema,
  updateSellerProfileSchema,
} from "./sellers.schema";

export type ApplyAsSellerInput = z.infer<typeof applyAsSellerSchema>;
export type UpdateSellerProfileInput = z.infer<typeof updateSellerProfileSchema>;