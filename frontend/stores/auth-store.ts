import { create } from "zustand";
import { User, UserRole } from "@/types";
import { authService } from "@/services/auth-service";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<User>;
  loginWithGoogle: (email: string, name?: string, avatar?: string) => Promise<User>;
  signInWithGoogle: () => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  verifyEmail: (params: { email?: string; code?: string; token?: string }) => Promise<User>;
  switchRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>((set, get) => {
  // Check if saved user in localStorage exists on client
  let initialUser: User | null = null;
  let initialToken: string | null = null;

  if (typeof window !== "undefined") {
    try {
      const savedUser = localStorage.getItem("mediaos_user");
      const savedToken = localStorage.getItem("mediaos_token");
      if (savedUser && savedToken) {
        initialUser = JSON.parse(savedUser);
        initialToken = savedToken;
      }
    } catch {
      // Clear corrupt state
      localStorage.removeItem("mediaos_user");
      localStorage.removeItem("mediaos_token");
    }
  }

  return {
    user: initialUser,
    token: initialToken,
    isAuthenticated: !!initialUser && !!initialToken,
    isLoading: false,
    error: null,

    setUser: (user) => {
      if (typeof window !== "undefined") {
        if (user) {
          localStorage.setItem("mediaos_user", JSON.stringify(user));
        } else {
          localStorage.removeItem("mediaos_user");
        }
      }
      set({ user, isAuthenticated: !!user });
    },

    setToken: (token) => {
      if (typeof window !== "undefined") {
        if (token) {
          localStorage.setItem("mediaos_token", token);
        } else {
          localStorage.removeItem("mediaos_token");
        }
      }
      set({ token, isAuthenticated: !!token && !!get().user });
    },

    login: async (email: string, password: string) => {
      set({ isLoading: true, error: null });
      try {
        const { token, user } = await authService.login(email, password);

        if (typeof window !== "undefined") {
          localStorage.setItem("mediaos_token", token);
          localStorage.setItem("mediaos_user", JSON.stringify(user));
        }

        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });

        return user;
      } catch (err: unknown) {
        let message = "Invalid email or password.";
        if (err && typeof err === "object" && "response" in err) {
          const axiosErr = err as { response?: { data?: { message?: string } } };
          message = axiosErr.response?.data?.message || message;
        } else if (err instanceof Error) {
          message = err.message;
        }
        set({ isLoading: false, error: message });
        throw new Error(message);
      }
    },

    loginWithGoogle: async (email: string, name?: string, avatar?: string) => {
      set({ isLoading: true, error: null });
      try {
        const { token, user } = await authService.loginWithGoogle(email, name, avatar);

        if (typeof window !== "undefined") {
          localStorage.setItem("mediaos_token", token);
          localStorage.setItem("mediaos_user", JSON.stringify(user));
        }

        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });

        return user;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Google sign-in failed.";
        set({ isLoading: false, error: message });
        throw new Error(message);
      }
    },

    signInWithGoogle: async () => {
      set({ isLoading: true, error: null });
      try {
        const { signInWithGooglePopup } = await import("@/lib/firebase");
        const googleUser = await signInWithGooglePopup();
        const { token, user } = await authService.loginWithGoogle(
          googleUser.email,
          googleUser.name,
          googleUser.avatar
        );

        if (!user.avatar && googleUser.avatar) {
          user.avatar = googleUser.avatar;
        }

        if (typeof window !== "undefined") {
          localStorage.setItem("mediaos_token", token);
          localStorage.setItem("mediaos_user", JSON.stringify(user));
        }

        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });

        return user;
      } catch (err: unknown) {
        let message = "Google sign-in failed.";
        if (err && typeof err === "object" && "code" in err) {
          const fbErr = err as { code: string; message: string };
          if (fbErr.code === "auth/popup-closed-by-user") {
            message = "Google sign-in was canceled.";
          } else if (fbErr.code === "auth/popup-blocked") {
            message = "Popup blocked by browser. Please allow popups for Google sign-in.";
          } else if (fbErr.code === "auth/cancelled-popup-request") {
            message = "Sign-in request canceled.";
          } else if (fbErr.code === "auth/operation-not-allowed") {
            message = "Google Sign-in is not enabled in Firebase Console. Please enable Google provider in Firebase Authentication.";
          } else if (fbErr.code === "auth/unauthorized-domain") {
            message = "This domain (localhost) is not authorized in Firebase OAuth redirect domains. Please add localhost to Firebase Auth Authorized Domains.";
          } else {
            message = fbErr.message || message;
          }
        } else if (err instanceof Error) {
          message = err.message;
        }
        set({ isLoading: false, error: message });
        throw new Error(message);
      }
    },

    register: async (name: string, email: string, password: string) => {
      set({ isLoading: true, error: null });
      try {
        const { token, user } = await authService.register(name, email, password);

        if (typeof window !== "undefined") {
          localStorage.setItem("mediaos_token", token);
          localStorage.setItem("mediaos_user", JSON.stringify(user));
        }

        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });

        return user;
      } catch (err: unknown) {
        let message = "Registration failed. Please verify your details.";
        if (err && typeof err === "object" && "response" in err) {
          const axiosErr = err as { response?: { data?: { message?: string; errors?: Record<string, string[]> } } };
          const data = axiosErr.response?.data;
          if (data?.errors) {
            const firstKey = Object.keys(data.errors)[0];
            message = data.errors[firstKey][0] || data.message || message;
          } else if (data?.message) {
            message = data.message;
          }
        } else if (err instanceof Error) {
          message = err.message;
        }
        set({ isLoading: false, error: message });
        throw new Error(message);
      }
    },

    logout: async () => {
      try {
        await authService.logout();
      } catch {
        // ignore logout errors
      } finally {
        if (typeof window !== "undefined") {
          localStorage.removeItem("mediaos_token");
          localStorage.removeItem("mediaos_user");
        }
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    },

    checkAuth: async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("mediaos_token") : null;
      if (!token) {
        set({ user: null, token: null, isAuthenticated: false });
        return;
      }

      try {
        const user = await authService.getMe();
        if (user.status === "suspended") {
          if (typeof window !== "undefined") {
            localStorage.removeItem("mediaos_token");
            localStorage.removeItem("mediaos_user");
            window.location.href = `/suspended?email=${encodeURIComponent(user.email)}`;
          }
          set({ user: null, token: null, isAuthenticated: false });
          return;
        }
        if (typeof window !== "undefined") {
          localStorage.setItem("mediaos_user", JSON.stringify(user));
        }
        set({ user, token, isAuthenticated: true });
      } catch {
        // Invalid or expired token
        if (typeof window !== "undefined") {
          localStorage.removeItem("mediaos_token");
          localStorage.removeItem("mediaos_user");
        }
        set({ user: null, token: null, isAuthenticated: false });
      }
    },

    verifyEmail: async (params: { email?: string; code?: string; token?: string }) => {
      set({ isLoading: true, error: null });
      try {
        const updatedUser = await authService.verifyEmail(params);
        if (typeof window !== "undefined") {
          localStorage.setItem("mediaos_user", JSON.stringify(updatedUser));
        }
        set({ user: updatedUser, isLoading: false, error: null });
        return updatedUser;
      } catch (err: unknown) {
        let message = "Failed to verify email.";
        if (err && typeof err === "object" && "response" in err) {
          const axiosErr = err as { response?: { data?: { message?: string } } };
          message = axiosErr.response?.data?.message || message;
        } else if (err instanceof Error) {
          message = err.message;
        }
        set({ isLoading: false, error: message });
        throw new Error(message);
      }
    },

    switchRole: (role: UserRole) => {
      set((state) => {
        if (!state.user) return state;
        let designation = "Verified Reader";
        if (role === "super-admin") designation = "Super Administrator";
        if (role === "admin") designation = "Digital Managing Director";
        if (role === "editor") designation = "Senior Desk Editor";
        if (role === "reporter") designation = "Special Correspondent";
        if (role === "reader") designation = "Verified Reader";

        const updatedUser: User = {
          ...state.user,
          role,
          designation,
        };
        if (typeof window !== "undefined") {
          localStorage.setItem("mediaos_user", JSON.stringify(updatedUser));
        }
        return { user: updatedUser };
      });
    },
  };
});
