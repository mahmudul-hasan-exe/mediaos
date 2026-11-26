import { apiClient, ApiResponse } from "@/lib/api-client";
import { User } from "@/types";

export interface AuthResponseData {
  token: string;
  user: User;
}

export const authService = {
  /**
   * Log in user via Laravel Sanctum REST API
   */
  async login(email: string, password: string): Promise<AuthResponseData> {
    const response = await apiClient.post<ApiResponse<AuthResponseData>>("/auth/login", {
      email,
      password,
    });

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "Failed to log in.");
    }

    return response.data.data;
  },

  /**
   * Google SSO Login / Register via REST API
   */
  async loginWithGoogle(email: string, name?: string, avatar?: string): Promise<AuthResponseData> {
    const response = await apiClient.post<ApiResponse<AuthResponseData>>("/auth/google", {
      email,
      name,
      avatar,
    });

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "Failed to authenticate with Google.");
    }

    return response.data.data;
  },

  /**
   * Register new reader account via Laravel Sanctum REST API
   */
  async register(name: string, email: string, password: string): Promise<AuthResponseData> {
    const response = await apiClient.post<ApiResponse<AuthResponseData>>("/auth/register", {
      name,
      email,
      password,
    });

    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || "Failed to register.");
    }

    return response.data.data;
  },

  /**
   * Fetch authenticated user's current profile
   */
  async getMe(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>("/auth/me");
    if (!response.data.success || !response.data.data) {
      throw new Error("Failed to load profile.");
    }
    return response.data.data;
  },

  /**
   * Log out authenticated session
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } catch {
      // Ignore network errors on logout
    }
  },

  /**
   * Verify email via 6-digit code or token
   */
  async verifyEmail(params: { email?: string; code?: string; token?: string }): Promise<User> {
    const response = await apiClient.post<ApiResponse<{ user: User }>>("/auth/verify-email", params);
    if (!response.data.success || !response.data.data?.user) {
      throw new Error(response.data.message || "Failed to verify email.");
    }
    return response.data.data.user;
  },

  /**
   * Resend verification email with new code
   */
  async resendVerification(email: string): Promise<string> {
    const response = await apiClient.post<ApiResponse<{ verificationCode?: string }>>("/auth/resend-verification", {
      email,
    });
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to resend verification email.");
    }
    return response.data.message || "Verification code dispatched.";
  },
};
