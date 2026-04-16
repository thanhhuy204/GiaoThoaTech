'use client'

import { type AdminRole } from '@/lib/adminApi'

interface ConfirmRemoveRoleModalProps {
  role: AdminRole | null
  onCancel: () => void
  onConfirm: () => void
}

export default function ConfirmRemoveRoleModal({ role, onCancel, onConfirm }: ConfirmRemoveRoleModalProps) {
  if (!role) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
      onClick={onCancel}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 16,
          padding: '28px 32px',
          maxWidth: 420,
          width: '90%',
          boxShadow: '0 20px 60px rgba(0,0,0,.15)',
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: '#FEF2F2',
            color: '#DC2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 9v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 18c-.77 1.333.192 3 1.732 3z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#111827', marginBottom: 8 }}>
          Xác nhận gỡ vai trò quan trọng
        </h3>
        <p style={{ fontSize: '.875rem', color: '#6b7280', lineHeight: 1.6 }}>
          Gỡ vai trò <strong>{role.name}</strong> sẽ thu hồi các quyền hạn quan trọng của người dùng này. Hành động này
          có thể ảnh hưởng đến khả năng truy cập hệ thống của họ.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 28 }}>
          <button className="admin-btn admin-btn--secondary" onClick={onCancel} style={{ height: 40, paddingLeft: 20, paddingRight: 20 }}>
            Huỷ
          </button>
          <button className="admin-btn admin-btn--danger" onClick={onConfirm} style={{ height: 40, paddingLeft: 20, paddingRight: 20 }}>
            Xác nhận gỡ role
          </button>
        </div>
      </div>
    </div>
  )
}
