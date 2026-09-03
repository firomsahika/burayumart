import type { Response, Request, NextFunction } from "express";
import * as authService from "./auth.service";

export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await authService.getCurrentUser(
      req.headers
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