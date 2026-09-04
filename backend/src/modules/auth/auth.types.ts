import type { SellerProfile } from "../../generated/prisma/client";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  image?: string | null | undefined;
  emailVerified?: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
      seller?: SellerProfile;
    }
  }
}
