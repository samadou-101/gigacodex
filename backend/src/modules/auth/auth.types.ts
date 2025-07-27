import { z } from "zod";
import { Session } from "express-session";

// Signup validation schema
export const signupSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one number"
    ),
});

// Login validation schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

// TypeScript types derived from schemas
export type SignupRequest = z.infer<typeof signupSchema>;
export type LoginRequest = z.infer<typeof loginSchema>;

// Session user interface
export interface SessionUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

// Extended Session interface
declare module "express-session" {
  interface SessionData {
    user?: SessionUser;
  }
}

// Extended Request interface with session
export interface AuthenticatedRequest extends Request {
  user?: SessionUser;
}
