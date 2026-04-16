'use client'

import { formatDate, type AdminUser } from '@/lib/adminApi'

interface UserInfoTabProps {
  user: AdminUser | null
  loading: boolean
}

function FieldSkeleton() {
  return <div style={{ height: 16, background: '#F3F4F6', borderRadius: 4, width: '70%', animation: 'admin-pulse 1.5s ease-in-out infinite' }} />
}

export default function UserInfoTab({ user, loading }: UserInfoTabProps) {
  const displayName = user?.fullName || user?.userName || user?.email || ''
  
  const fields = [
    ['Họ và tên', loading ? null : displayName],
    ['Email', loading ? null : user?.email],
    ['Tên đăng nhập', loading ? null : user?.userName ? `@${user.userName}` : '—'],
    ['Số điện thoại', loading ? null : user?.phoneNumber || '—'],
    ['Ngày tham gia', loading ? null : formatDate(user?.createdAt)],
    ['Đăng nhập lần cuối', loading ? null : formatDate(user?.lastLogin)],
    ['Gói thành viên', loading ? null : user?.plan || 'Chưa đăng ký'],
    ['Trạng thái', loading ? null : user?.isActive !== false ? 'Đang hoạt động' : 'Tạm dừng'],
  ]

  return (
    <div className="admin-card">
      <div className="admin-card__header">
        <h2 className="admin-card__title">Thông tin cơ bản</h2>
      </div>
      <div className="admin-info-grid">
        {fields.map(([label, val]) => (
          <div key={label as string} className="admin-info-field">
            <span className="admin-info-field__label">{label as string}</span>
            <span className="admin-info-field__value">
              {val === null ? <FieldSkeleton /> : (val as string)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
