import { Router } from "express";
import {
  signup,
  login,
  logout,
  getProfile,
  getSessionInfo,
} from "./auth.controller.js";
import { validateSignup, validateLogin } from "./auth.validator.js";
import { isAuthenticated, isNotAuthenticated } from "./auth.middleware.js";

const router = Router();

// Public routes (no authentication required)
router.post("/signup", isNotAuthenticated, validateSignup, signup);
router.post("/login", isNotAuthenticated, validateLogin, login);

// Protected routes (authentication required)
router.post("/logout", isAuthenticated, logout);
router.get("/profile", isAuthenticated, getProfile);

// Debug routes (for development)
router.get("/session-info", getSessionInfo);

export default router;
