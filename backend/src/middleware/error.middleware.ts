// src/middleware/error.middleware.ts

import type {
  Request,
  Response,
  NextFunction,
} from "express";

import { ZodError } from "zod";
import { AppError } from "./app-error";

export function errorMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`,
    error
  );

  // ----------------------------------------
  // ZOD VALIDATION ERROR
  // ----------------------------------------
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid request data",
        details: error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      },
    });
  }

  // ----------------------------------------
  // APPLICATION ERROR
  // ----------------------------------------
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        ...(error.details !== undefined && {
          details: error.details,
        }),
      },
    });
  }

  // ----------------------------------------
  // UNKNOWN / UNEXPECTED ERROR
  // ----------------------------------------
  return res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred",
    },
  });
}