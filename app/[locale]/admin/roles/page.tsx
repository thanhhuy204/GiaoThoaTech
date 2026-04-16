'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { getAdminRoles, extractRoles, type AdminRole } from '@/lib/adminApi'
import RoleModal from '@/app/components/admin/roles/RoleModal'
import DeleteRoleModal from '@/app/components/admin/roles/DeleteRoleModal'

function RoleBadgeColor(code: string): string {
  if (code === 'SUPER_ADMIN') return '#DC2626'
  if (code === 'ADMIN') return '#E8614A'
  if (code?.includes('PREMIUM')) return '#7C3AED'
  if (code?.includes('BASIC')) return '#2563EB'
  return '#6B7280'
}

function RoleIcon({ code }: { code: string }) {
  if (code === 'SUPER_ADMIN' || code === 'ADMIN') {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2L4 5v5c0 4.4 2.6 8.4 6 9.5 3.4-1.1 6-5.1 6-9.5V5L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export default function AdminRolesPage() {
  const locale = useLocale()
  const [roles, setRoles] = useState<AdminRole[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Modals state
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<AdminRole | null>(null)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  function showToast(msg: string, type: 'success' | 'error' = 'success') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchRoles = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await getAdminRoles()
      setRoles(extractRoles(res))
    } catch {
      setError('Không thể tải danh sách vai trò. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchRoles() }, [fetchRoles])

  return (
    <>
      <div className="admin-page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 className="admin-page-title">Vai trò & Quyền</h1>
          <p className="admin-page-subtitle">Danh sách vai trò trong hệ thống</p>
        </div>
        <button 
          className="admin-btn admin-btn--primary"
          onClick={() => { setSelectedRole(null); setIsRoleModalOpen(true) }}
          style={{ display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          Thêm vai trò
        </button>
      </div>

      {/* Info banner */}
      <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 10, padding: '12px 16px', marginBottom: 20, display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: '.875rem', color: '#1E40AF' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 7v5M8 5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span>
          Để gán vai trò cho người dùng, vào{' '}
          <Link href={`/${locale}/admin/users`} style={{ color: '#1D4ED8', fontWeight: 600, textDecoration: 'underline' }}>
            trang Người dùng
          </Link>
          {' '}→ chọn một người dùng → tab <strong>Quản lý vai trò</strong>.
        </span>
      </div>

      {error && (
        <div style={{ padding: '14px 16px', background: '#FEF2F2', borderRadius: 8, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10, color: '#DC2626', fontSize: '.875rem' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5v4M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          {error}
          <button className="admin-btn admin-btn--secondary" onClick={fetchRoles} style={{ marginLeft: 'auto', height: 30, fontSize: '.8125rem' }}>Thử lại</button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="admin-card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: '#F3F4F6', animation: 'admin-pulse 1.5s ease-in-out infinite' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ height: 14, width: '60%', background: '#F3F4F6', borderRadius: 4, marginBottom: 8, animation: 'admin-pulse 1.5s ease-in-out infinite' }} />
                  <div style={{ height: 12, width: '40%', background: '#F3F4F6', borderRadius: 4, animation: 'admin-pulse 1.5s ease-in-out infinite' }} />
                </div>
              </div>
            </div>
          ))
          : roles.length === 0
            ? (
              <div className="admin-card" style={{ gridColumn: '1/-1', padding: 40 }}>
                <div className="admin-empty">
                  <div className="admin-empty__icon">🛡️</div>
                  <div className="admin-empty__text">Chưa có vai trò nào trong hệ thống</div>
                </div>
              </div>
            )
            : roles.map(role => {
              const color = RoleBadgeColor(role.code)
              return (
                <div key={role.id} className="admin-card" style={{ padding: 20, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', flex: 1 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                      background: `${color}18`, color: color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <RoleIcon code={role.code} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontWeight: 700, fontSize: '.9375rem', color: '#111827' }}>{role.name}</span>
                          {role.isProtected && (
                            <span style={{ fontSize: '.7rem', background: '#F3F4F6', color: '#6B7280', padding: '2px 6px', borderRadius: 4, fontWeight: 500 }}>🔒</span>
                          )}
                        </div>
                        
                        <div style={{ display: 'flex', gap: 2 }}>
                          <button 
                            className="admin-btn admin-btn--secondary"
                            onClick={() => { setSelectedRole(role); setIsRoleModalOpen(true) }}
                            title="Chỉnh sửa"
                            style={{ width: 28, height: 28, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 'auto' }}
                          >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10 2L12 4L4.5 11.5H2.5V9.5L10 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </button>
                          {!role.isProtected && (
                            <button 
                              className="admin-btn admin-btn--secondary"
                              onClick={() => { setSelectedRole(role); setIsDeleteModalOpen(true) }}
                              title="Xóa"
                              style={{ width: 28, height: 28, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 'auto', color: '#DC2626' }}
                            >
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 3l8 8M11 3L3 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                            </button>
                          )}
                        </div>
                      </div>
                      <div style={{ fontSize: '.75rem', color: '#9CA3AF', fontFamily: 'monospace', marginBottom: 6 }}>{role.code}</div>
                      {role.description && (
                        <div style={{ fontSize: '.8125rem', color: '#6B7280', lineHeight: 1.5 }}>{role.description}</div>
                      )}
                    </div>
                  </div>
                  <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid #F3F4F6' }}>
                    <Link
                      href={`/${locale}/admin/users`}
                      style={{ fontSize: '.8125rem', color: '#E8614A', fontWeight: 500, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                    >
                      Xem người dùng {role.isProtected ? 'hệ thống' : 'có vai trò này'}
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </Link>
                  </div>
                </div>
              )
            })
        }
      </div>

      {isRoleModalOpen && (
        <RoleModal 
          role={selectedRole}
          onClose={() => setIsRoleModalOpen(false)}
          onSuccess={() => {
            setIsRoleModalOpen(false)
            fetchRoles()
            showToast(selectedRole ? 'Đã cập nhật vai trò' : 'Đã tạo vai trò mới')
          }}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteRoleModal 
          role={selectedRole}
          onClose={() => setIsDeleteModalOpen(false)}
          onSuccess={() => {
            setIsDeleteModalOpen(false)
            fetchRoles()
            showToast('Đã xóa vai trò thành công')
          }}
        />
      )}

      {toast && (
        <div className={`admin-toast admin-toast--${toast.type}`} role="alert">
          {toast.type === 'success' ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#22c55e" strokeWidth="1.5"/><path d="M5 8l2 2 4-4" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#ef4444" strokeWidth="1.5"/><path d="M8 5v4M8 11v.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/></svg>
          )}
          {toast.msg}
        </div>
      )}
    </>
  )
}
