import type { Response, Request, NextFunction } from "express";
import * as authService from "./auth.service";

export async function getMe(req: Request, res: Response, next: NextFunction) {
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

    const user = await authService.getCurrentUser(
      headers
    );

    return res.status(200).json({
      success: true,
      data: {
        user,
      }
    })
    
  } catch (error) {
    next(error);
  }
}