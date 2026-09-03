import type {
  Request,
  Response,
  NextFunction,
} from "express";

import { auth } from "../../lib/auth";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return res.status(401).json({
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Authentication required",
        },
      });
    }

    req.user = session.user;

    next();
  } catch (error) {
    next(error);
  }
}
