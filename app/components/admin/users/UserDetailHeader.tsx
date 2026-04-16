'use client'

import { getInitials, type AdminUser } from '@/lib/adminApi'

interface UserDetailHeaderProps {
  user: AdminUser | null
  loading: boolean
  togglingStatus: boolean
  onToggleStatus: () => void
}

export default function UserDetailHeader({ user, loading, togglingStatus, onToggleStatus }: UserDetailHeaderProps) {
  const displayName = user?.fullName || user?.userName || user?.email || ''
  const initials = displayName ? getInitials(displayName) : '...'

  return (
    <div className="admin-user-header">
      <div className="admin-user-avatar">{initials}</div>
      <div style={{ flex: 1 }}>
        {loading ? (
          <>
            <div style={{ height: 20, width: 180, background: '#F3F4F6', borderRadius: 4, marginBottom: 8, animation: 'admin-pulse 1.5s ease-in-out infinite' }} />
            <div style={{ height: 14, width: 220, background: '#F3F4F6', borderRadius: 4, animation: 'admin-pulse 1.5s ease-in-out infinite' }} />
          </>
        ) : (
          <>
            <div className="admin-user-name">{displayName}</div>
            <div className="admin-user-email">{user?.email}</div>
            <div className="admin-user-meta">
              <span className={`admin-badge admin-badge--${user?.isActive !== false ? 'green' : 'red'}`}>
                {user?.isActive !== false ? 'Hoạt động' : 'Tạm dừng'}
              </span>
              {user?.plan && (
                <span className={`admin-badge admin-badge--${user.plan === 'Premium' ? 'orange' : user.plan === 'Basic' ? 'blue' : 'gray'}`}>
                  {user.plan}
                </span>
              )}
              {(user?.roles ?? []).length === 0 ? (
                <span className="admin-badge admin-badge--gray">Chưa có vai trò</span>
              ) : (
                (user?.roles ?? []).map(r => (
                  <span key={r.id} className="admin-badge admin-badge--gray">
                    {r.name}
                  </span>
                ))
              )}
            </div>
          </>
        )}
      </div>
      <button
        className="admin-btn admin-btn--secondary"
        style={{ fontSize: '.8125rem' }}
        onClick={onToggleStatus}
        disabled={togglingStatus || loading}
      >
        {togglingStatus ? 'Đang xử lý...' : user?.isActive !== false ? 'Tạm dừng tài khoản' : 'Kích hoạt lại'}
      </button>
    </div>
  )
}
