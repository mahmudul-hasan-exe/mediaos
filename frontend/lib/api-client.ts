import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000,
});

// Request interceptor to attach bearer token and active tenant
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("mediaos_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      const tenantId = localStorage.getItem("mediaos_active_tenant_id");
      const tenantDomain = localStorage.getItem("mediaos_active_tenant_domain");

      // Respect explicit per-request tenant headers first; ignore suspended demo tenant ten-04 on public portal
      if (!config.headers["X-Tenant-ID"]) {
        if (tenantId && tenantId !== "ten-04") {
          config.headers["X-Tenant-ID"] = tenantId;
        } else {
          config.headers["X-Tenant-ID"] = "ten-01";
        }
      }
      if (!config.headers["X-Tenant-Domain"] && !config.headers["X-Tenant-ID"] && tenantDomain) {
        config.headers["X-Tenant-Domain"] = tenantDomain;
      }

      const locale = localStorage.getItem("mediaos_locale") || "en";
      config.headers["Accept-Language"] = locale;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for unified error handling & token expiration logout
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        // Clear auth state on 401 Unauthorized
        localStorage.removeItem("mediaos_token");
        localStorage.removeItem("mediaos_user");
        
        // Only redirect if not already on login
        if (!window.location.pathname.startsWith("/login")) {
          window.location.href = "/login?expired=true";
        }
      }
    }
    return Promise.reject(error);
  }
);

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data: T;
  meta?: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
}

