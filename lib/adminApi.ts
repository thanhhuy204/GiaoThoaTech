import { apiGet, apiPatch, apiPut, apiPost, apiDelete } from '@/lib/api'

/* ─── Types ──────────────────────────────────────────────── */

export interface AdminRole {
  id: string
  name: string
  code: string
  description?: string
  isProtected?: boolean
  isCritical?: boolean
}

export interface AdminUser {
  id: string
  fullName?: string
  userName?: string
  email: string
  phoneNumber?: string
  /** Backend field: boolean true=active, false=inactive */
  isActive?: boolean
  plan?: string
  roles?: AdminRole[]
  createdAt?: string
  updatedAt?: string
  lastLogin?: string
}

export interface AdminUsersResponse {
  data?: AdminUser[] | { items?: AdminUser[]; total?: number; page?: number }
  users?: AdminUser[]
  items?: AdminUser[]
  total?: number
  page?: number
  pageSize?: number
  [key: string]: unknown
}

export interface AdminUserDetailResponse {
  data?: AdminUser
  user?: AdminUser
  [key: string]: unknown
}

export interface AdminRolesResponse {
  data?: AdminRole[]
  roles?: AdminRole[]
  [key: string]: unknown
}

export interface AdminDashboardStats {
  totalUsers: number
  activeUsers: number
  premiumUsers: number
  monthlyRevenue: string
  userTrend: string
  activeTrend: string
  revenueTrend: string
  isRevenueUp: boolean
}

/* ─── API helpers ────────────────────────────────────────── */

/**
 * Lấy danh sách người dùng
 * Backend params: page, pageSize, search, roleCode, isActive (boolean)
 */
export async function getAdminUsers(params?: {
  search?: string
  page?: number
  pageSize?: number
  isActive?: boolean
}) {
  const queryParams: Record<string, string> = {}
  if (params?.search) queryParams.search = params.search
  if (params?.page !== undefined) queryParams.page = String(params.page)
  if (params?.pageSize !== undefined) queryParams.pageSize = String(params.pageSize)
  if (params?.isActive !== undefined) queryParams.isActive = String(params.isActive)

  return apiGet<AdminUsersResponse>('/admin/users', { params: queryParams })
}

/** Lấy thông tin chi tiết một người dùng */
export async function getAdminUserById(id: string) {
  return apiGet<AdminUserDetailResponse>(`/admin/users/${id}`)
}

/** Lấy danh sách tất cả vai trò */
export async function getAdminRoles() {
  return apiGet<AdminRolesResponse>('/admin/roles')
}

/** Lấy thông số Dashboard */
export async function getAdminStats() {
  return apiGet<AdminDashboardStats>('/admin/stats')
}

/** Tạo vai trò mới */
export async function createAdminRole(data: { name: string, code: string, description?: string }) {
  return apiPost<AdminUserDetailResponse>('/admin/roles', data)
}

/** Cập nhật thông tin vai trò */
export async function updateAdminRole(id: string, data: { name?: string, description?: string }) {
  return apiPatch<AdminUserDetailResponse>(`/admin/roles/${id}`, data)
}

/** Xóa vai trò */
export async function deleteAdminRole(id: string) {
  return apiDelete<AdminUserDetailResponse>(`/admin/roles/${id}`)
}

/** Cập nhật vai trò cho người dùng (roleIds: UUID[]) */
export async function updateUserRoles(userId: string, roleIds: string[]) {
  return apiPut<AdminUserDetailResponse>(`/admin/users/${userId}/roles`, { roleIds })
}

/** Kích hoạt / tạm dừng tài khoản người dùng */
export async function updateUserActive(userId: string, isActive: boolean) {
  return apiPatch<AdminUserDetailResponse>(`/admin/users/${userId}`, { isActive })
}

/* ─── Normalizers ────────────────────────────────────────── */

/** Trả về mảng users từ nhiều dạng response */
export function extractUsers(res: AdminUsersResponse): AdminUser[] {
  if (Array.isArray(res)) return res as AdminUser[]
  // { data: { items: [], total: N } }
  if (res.data && typeof res.data === 'object' && !Array.isArray(res.data)) {
    const nested = res.data as { items?: AdminUser[] }
    if (Array.isArray(nested.items)) return nested.items
  }
  if (Array.isArray(res.data)) return res.data
  if (Array.isArray(res.items)) return res.items
  if (Array.isArray(res.users)) return res.users
  return []
}

/** Trả về total count từ response */
export function extractTotal(res: AdminUsersResponse, fallback: number): number {
  if (typeof res.total === 'number') return res.total
  if (res.data && typeof res.data === 'object' && !Array.isArray(res.data)) {
    const nested = res.data as { total?: number }
    if (typeof nested.total === 'number') return nested.total
  }
  return fallback
}

/** Trả về user từ response */
export function extractUser(res: AdminUserDetailResponse): AdminUser | null {
  if (res.data && typeof res.data === 'object') return res.data as AdminUser
  if (res.user && typeof res.user === 'object') return res.user as AdminUser
  if ((res as unknown as AdminUser).id) return res as unknown as AdminUser
  return null
}

/** Trả về mảng roles từ response */
export function extractRoles(res: AdminRolesResponse): AdminRole[] {
  if (Array.isArray(res)) return res as AdminRole[]
  if (Array.isArray(res.data)) return res.data
  if (Array.isArray(res.roles)) return res.roles
  return []
}

/** Định dạng ngày từ ISO string sang dd/MM/yyyy */
export function formatDate(iso?: string): string {
  if (!iso) return '—'
  const d = new Date(iso)
  if (isNaN(d.getTime())) return iso
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

/** Lấy tên hiển thị của user */
export function getUserDisplayName(user: AdminUser): string {
  return user.fullName || user.userName || user.email || '(Chưa có tên)'
}

/** Lấy initials (2 chữ cái đầu) từ tên */
export function getInitials(name: string): string {
  return name.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase()
}
