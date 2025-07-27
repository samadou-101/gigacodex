import { Request, Response, NextFunction } from "express";
import { signupSchema, loginSchema } from "./auth.types.js";

// Validation middleware for signup
export const validateSignup = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const validatedData = signupSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (error: any) {
    if (error.errors) {
      const validationErrors = error.errors.map((err: any) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
      return;
    }
    res.status(400).json({
      success: false,
      message: "Invalid request data",
    });
  }
};

// Validation middleware for login
export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const validatedData = loginSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (error: any) {
    if (error.errors) {
      const validationErrors = error.errors.map((err: any) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
      return;
    }
    res.status(400).json({
      success: false,
      message: "Invalid request data",
    });
  }
};
