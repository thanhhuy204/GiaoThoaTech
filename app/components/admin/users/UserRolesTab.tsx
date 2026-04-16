'use client'

import { type AdminRole } from '@/lib/adminApi'

interface UserRolesTabProps {
  allRoles: AdminRole[]
  selectedRoles: Set<string>
  savedRoles: Set<string>
  loading: boolean
  error: string | null
  onToggleRole: (role: AdminRole) => void
  onRetry: () => void
}

export default function UserRolesTab({
  allRoles,
  selectedRoles,
  savedRoles,
  loading,
  error,
  onToggleRole,
  onRetry
}: UserRolesTabProps) {
  return (
    <div className="admin-card" style={{ position: 'relative' }}>
      <div className="admin-card__header">
        <div>
          <h2 className="admin-card__title">Cấp quyền & Vai trò</h2>
          <p style={{ fontSize: '.8125rem', color: '#6b7280', marginTop: 4 }}>
            Chọn một hoặc nhiều vai trò để gán cho người dùng này
          </p>
        </div>
      </div>

      {error && (
        <div style={{ padding: '12px 20px', background: '#FEF2F2', borderRadius: 8, margin: '0 20px 16px', display: 'flex', alignItems: 'center', gap: 10, color: '#DC2626', fontSize: '.875rem' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5v4M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          {error}
          <button className="admin-btn admin-btn--secondary" onClick={onRetry} style={{ marginLeft: 'auto', height: 30, fontSize: '.8125rem' }}>Thử lại</button>
        </div>
      )}

      <div className="admin-role-list">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="admin-role-item" style={{ opacity: 0.6 }}>
                <div style={{ width: 18, height: 18, borderRadius: 4, background: '#F3F4F6', flexShrink: 0, animation: 'admin-pulse 1.5s ease-in-out infinite' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ height: 14, width: 120, background: '#F3F4F6', borderRadius: 4, marginBottom: 6, animation: 'admin-pulse 1.5s ease-in-out infinite' }} />
                  <div style={{ height: 12, width: 200, background: '#F3F4F6', borderRadius: 4, animation: 'admin-pulse 1.5s ease-in-out infinite' }} />
                </div>
              </div>
            ))
          : allRoles.length === 0
          ? (
            <div className="admin-empty">
              <div className="admin-empty__text">Chưa có vai trò nào trong hệ thống</div>
            </div>
          )
          : allRoles.map((role) => {
              const checked = selectedRoles.has(role.id)
              return (
                <div
                  key={role.id}
                  className={`admin-role-item${role.isProtected ? ' admin-role-item--disabled' : ''}`}
                  onClick={() => onToggleRole(role)}
                  role="checkbox"
                  aria-checked={checked}
                  aria-disabled={role.isProtected}
                  tabIndex={role.isProtected ? -1 : 0}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault()
                      onToggleRole(role)
                    }
                  }}
                  title={role.isProtected ? 'Vai trò này được bảo vệ, không thể tự gỡ' : undefined}
                >
                  <div className={`admin-role-checkbox${checked ? ' admin-role-checkbox--checked' : ''}`}>
                    {checked && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <div className="admin-role-info">
                    <div className="admin-role-name">{role.name}</div>
                    {role.description && <div className="admin-role-desc">{role.description}</div>}
                  </div>
                  {role.isProtected && <span className="admin-role-protected">🔒 Được bảo vệ</span>}
                </div>
              )
            })}
      </div>
    </div>
  )
}
