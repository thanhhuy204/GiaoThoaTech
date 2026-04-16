import { apiGet, apiPost, apiPut } from './api'

/* ─── BE Response wrapper ─────────────────────────────── */
export interface BeResponse<T> {
  status: number
  message: string
  data: T
}

/* ─── Types ──────────────────────────────────────────────────── */
export interface RegisterPayload {
  userName: string
  email: string
  password: string
  confirmPassword: string
  phoneNumber: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface Role {
  id: string
  code: string
  name: string
}

export interface AuthUser {
  id: string
  userName: string
  email: string
  phoneNumber?: string
  fullName?: string | null
  avatar?: string | null
  isActive?: boolean
  roles?: Role[]
}

export interface UpdateProfilePayload {
  fullname?: string
  phoneNumber?: string
}

// Khai báo kiểu Response trả về
export type AuthData = AuthUser & { accessToken: string }
export type UpdateProfileResponse = BeResponse<AuthUser>
export type LoginResponse = BeResponse<AuthData>
export type RegisterResponse = BeResponse<AuthData>

export interface ApiError {
  message: string
  code?: string
}

/* ─── API calls (via Next.js proxy routes — no CORS) ─────── */

export async function apiRegister(payload: RegisterPayload): Promise<RegisterResponse> {
  // Thay thế fetch truyền thống cực dài chỉ với 1 lệnh
  return apiPost<RegisterResponse>('/auth/registration', payload)
}

export async function apiLogin(payload: LoginPayload): Promise<LoginResponse> {
  return apiPost<LoginResponse>('/auth/login', payload)
}

export async function apiGetMe(): Promise<AuthUser> {
  return apiGet<AuthUser>('/auth/me')
}

export async function apiLogout(): Promise<void> {
  await apiPost<void>('/auth/logout')
}

export async function apiUpdateProfile(payload: UpdateProfilePayload): Promise<UpdateProfileResponse> {
  return apiPut<UpdateProfileResponse>('/auth/profile', payload);
}

/* ─── Forgot Password Types ──────────────────────────────── */
export interface FindAccountData {
  userId: string
  userName: string
  maskedEmail: string
  maskedPhone: string
}

export interface VerifyOtpData {
  resetToken: string
}

export interface SendOtpData {
  method: string
  destination: string
  expiresInMinutes: number
}

export type FindAccountResponse = BeResponse<FindAccountData>
export type SendOtpResponse = BeResponse<SendOtpData>
export type VerifyOtpResponse = BeResponse<VerifyOtpData>
export type ResetPasswordResponse = BeResponse<null>

/* ─── Forgot Password API calls ──────────────────────────── */
export async function apiFindAccount(identifier: string): Promise<FindAccountResponse> {
  return apiPost<FindAccountResponse>('/auth/forgot-password/find-account', { identifier })
}

export async function apiSendOtp(userId: string, method: 'email' | 'sms'): Promise<SendOtpResponse> {
  return apiPost<SendOtpResponse>('/auth/forgot-password/send-otp', { userId, method })
}

export async function apiVerifyOtp(userId: string, otp: string): Promise<VerifyOtpResponse> {
  return apiPost<VerifyOtpResponse>('/auth/forgot-password/verify-otp', { userId, otp })
}

export async function apiResetPassword(resetToken: string, newPassword: string, logoutAll?: boolean): Promise<ResetPasswordResponse> {
  return apiPost<ResetPasswordResponse>('/auth/forgot-password/reset-password', { resetToken, newPassword, logoutAll })
}
