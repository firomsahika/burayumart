import { z } from "zod";
import {
  updateProfileSchema,
  createAddressSchema,
  updateAddressSchema,
} from "./users.schema";

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type CreateAddressInput = z.infer<typeof createAddressSchema>;
export type UpdateAddressInput = z.infer<typeof updateAddressSchema>;
