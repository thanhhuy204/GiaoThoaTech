/**
 * Base API Wrapper
 * Cung cấp giải pháp generic call API với cấu hình có sẵn (content-type json, error format, timeout...)
 */

export interface ApiErrorParams {
  message?: string;
  [key: string]: unknown;
}

export interface ApiErrorBody {
  message?: string;
  sysError?: {
    errorParams?: ApiErrorParams;
  };
  [key: string]: unknown;
}

export class ApiError extends Error {
  status: number;
  body: ApiErrorBody;

  constructor(status: number, message: string, body: ApiErrorBody = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export interface FetchOptions extends Omit<RequestInit, "body"> {
  body?: unknown; // Dữ liệu sẽ tự động stringify sang JSON
  params?: Record<string, string | number | boolean | undefined | null>; // Hỗ trợ gắn Query Parameters
}

// Next.js BFF proxy URL mặc định mà Client gọi lên
const BASE_API_PREFIX = "/bff";

/**
 * Trình bao bọc Fetch cốt lõi cho ứng dụng
 */
export async function httpWrapper<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { body, params, headers, ...restOptions } = options;

  // Xử lý tiền tố URL mặc định
  // Nếu endpoint cấu hình sẵn http thì bỏ qua prefix (vd như gọi api outside), còn ngược lại gắn prefix BFF vào
  let url = endpoint.startsWith("http")
    ? endpoint
    : `${BASE_API_PREFIX}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  // Tự động append Query Parameters
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  // Cấu hình headers mặc định chung cho toàn app
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  const finalOptions: RequestInit = {
    ...restOptions,
    headers: { ...defaultHeaders, ...headers },
  };

  // Convert payload về JSON String
  if (body !== undefined) {
    finalOptions.body = typeof body === "string" ? body : JSON.stringify(body);
  }

  // Giao tiếp với API

  const finalRequestOptions: RequestInit = {
    ...finalOptions,
    credentials: "include", // Luôn gửi cookies (dù là CORS hay same-origin) để hỗ trợ authentication state
  };
  const res = await fetch(url, finalRequestOptions);

  // Parse lỗi / data
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const errorBody = data as ApiErrorBody;
    const errorMsg =
      errorBody.sysError?.errorParams?.message ??
      errorBody.message ??
      `HTTP Error ${res.status}`;
    // Bắt lỗi toàn cục tiện lợi (sau này nếu có Toast có thể cắm trực tiếp Event báo lỗi ngay tại đây)
    throw new ApiError(res.status, errorMsg, errorBody);
  }

  return data as T;
}

/* ─── API Shorthand Methods ──────────────────────────────── */
export function apiGet<T>(
  url: string,
  options?: Omit<FetchOptions, "body" | "method">,
) {
  return httpWrapper<T>(url, { ...options, method: "GET" });
}

export function apiPost<T>(
  url: string,
  body?: unknown,
  options?: Omit<FetchOptions, "body" | "method">,
) {
  return httpWrapper<T>(url, { ...options, body, method: "POST" });
}

export function apiPut<T>(
  url: string,
  body?: unknown,
  options?: Omit<FetchOptions, "body" | "method">,
) {
  return httpWrapper<T>(url, { ...options, body, method: "PUT" });
}

export function apiPatch<T>(
  url: string,
  body?: unknown,
  options?: Omit<FetchOptions, "body" | "method">,
) {
  return httpWrapper<T>(url, { ...options, body, method: "PATCH" });
}

export function apiDelete<T>(
  url: string,
  options?: Omit<FetchOptions, "body" | "method">,
) {
  return httpWrapper<T>(url, { ...options, method: "DELETE" });
}
