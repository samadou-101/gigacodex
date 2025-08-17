import { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import { SessionService } from "./auth.session.js";
import { SignupRequest, LoginRequest } from "./auth.schema.js";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData: SignupRequest = req.body;

    // Create user using service
    const newUser = await AuthService.signup(userData);

    // Store user in session using session service
    SessionService.setUserSession(req, newUser);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: newUser,
        sessionInfo: SessionService.getSessionInfo(req),
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to register user",
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const loginData: LoginRequest = req.body;

    // Authenticate user using service
    const user = await AuthService.login(loginData);

    // Store user in session using session service
    SessionService.setUserSession(req, user);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user,
        sessionInfo: SessionService.getSessionInfo(req),
      },
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    // Clear user session using session service
    await SessionService.clearUserSession(req, res);

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to logout",
    });
  }
};

// Get current user profile
export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = SessionService.getUserFromSession(req);

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        user,
        sessionInfo: SessionService.getSessionInfo(req),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get profile",
    });
  }
};

// Get session info (for debugging)
export const getSessionInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const sessionInfo = SessionService.getSessionInfo(req);

    res.status(200).json({
      success: true,
      data: {
        sessionInfo,
        isAuthenticated: SessionService.isAuthenticated(req),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get session info",
    });
  }
};
