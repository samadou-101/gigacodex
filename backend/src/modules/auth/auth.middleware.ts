import { Request, Response, NextFunction } from "express";
import { SessionUser } from "./auth.schema.js";

// Middleware to check if user is authenticated
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.session && req.session.user) {
    // Add user to request object for easy access
    (req as any).user = req.session.user;
    next();
    return;
  }

  res.status(401).json({
    success: false,
    message: "Authentication required",
  });
};

// Middleware to check if user is NOT authenticated (for login/signup pages)
export const isNotAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.session && req.session.user) {
    res.status(403).json({
      success: false,
      message: "Already authenticated",
    });
    return;
  }

  next();
};

// Helper function to get current user from session
export const getCurrentUser = (req: Request): SessionUser | null => {
  return req.session?.user || null;
};
