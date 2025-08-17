import { Request, Response } from "express";
import { SessionUser } from "./auth.schema.js";

// Session management utilities
export class SessionService {
  // Set user session
  static setUserSession(req: Request, user: SessionUser): void {
    req.session.user = user;
    req.session.save((err) => {
      if (err) {
        console.error("❌ Failed to save session:", err);
      } else {
        console.log("✅ User session saved:", user.email);
      }
    });
  }

  // Get user from session
  static getUserFromSession(req: Request): SessionUser | null {
    return req.session.user || null;
  }

  // Clear user session (logout)
  static clearUserSession(req: Request, res: Response): Promise<void> {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          console.error("❌ Failed to destroy session:", err);
          reject(err);
        } else {
          console.log("✅ User session destroyed");
          resolve();
        }
      });
    });
  }

  // Check if user is authenticated
  static isAuthenticated(req: Request): boolean {
    return !!req.session.user;
  }

  // Get session info for debugging
  static getSessionInfo(req: Request) {
    return {
      sessionId: req.sessionID,
      hasUser: !!req.session.user,
      userEmail: req.session.user?.email || null,
      createdAt: req.session.cookie.expires,
    };
  }

  // Regenerate session (for security)
  static regenerateSession(req: Request): Promise<void> {
    return new Promise((resolve, reject) => {
      req.session.regenerate((err) => {
        if (err) {
          console.error("❌ Failed to regenerate session:", err);
          reject(err);
        } else {
          console.log("✅ Session regenerated");
          resolve();
        }
      });
    });
  }
}
