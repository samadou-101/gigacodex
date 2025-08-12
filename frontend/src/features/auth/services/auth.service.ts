import apiClient from "@/features/assessment/services/api-client";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SessionUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    user: SessionUser;
  };
}

export class AuthService {
  static async login(payload: LoginPayload): Promise<AuthResponse> {
    const res = await apiClient.post("/api/auth/login", payload);
    return res.data as AuthResponse;
  }

  static async signup(payload: SignupPayload): Promise<AuthResponse> {
    const res = await apiClient.post("/api/auth/signup", payload);
    return res.data as AuthResponse;
  }

  static async logout(): Promise<{ success: boolean }> {
    const res = await apiClient.post("/api/auth/logout");
    return res.data as { success: boolean };
  }

  static async profile(): Promise<{
    success: boolean;
    data?: { user: SessionUser };
  }> {
    const res = await apiClient.get("/api/auth/profile");
    return res.data as { success: boolean; data?: { user: SessionUser } };
  }
}
