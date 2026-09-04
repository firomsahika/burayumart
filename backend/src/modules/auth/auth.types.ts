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
    }
  }
}
