import type {
    Request,
    Response,
    NextFunction,
} from "express";

import { AppError } from "./app-error";


export function requireAdmin(
    req: Request,
    _res: Response,
    next: NextFunction
) {
    if (!req.user) {
        return next(
            new AppError(
                "Authentication required",
                401,
                "UNAUTHORIZED"
            )
        );
    }

    if (req.user.role !== "ADMIN") {
        return next(
            new AppError(
                "Admin access required",
                403,
                "ADMIN_ACCESS_REQUIRED"
            )
        );
    }

    next();
}