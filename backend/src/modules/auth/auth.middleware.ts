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
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value === undefined) continue;
      if (Array.isArray(value)) {
        value.forEach((v) => headers.append(key, v));
      } else {
        headers.set(key, value);
      }
    }

    const session = await auth.api.getSession({ headers });

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
