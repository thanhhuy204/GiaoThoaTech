'use client'

import { useState } from 'react'
import { deleteAdminRole, type AdminRole } from '@/lib/adminApi'

interface DeleteRoleModalProps {
  role: AdminRole | null
  onClose: () => void
  onSuccess: () => void
}

export default function DeleteRoleModal({ role, onClose, onSuccess }: DeleteRoleModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!role) return null

  async function handleDelete() {
    setLoading(true)
    setError(null)
    try {
      if (!role) return
      await deleteAdminRole(role.id)
      onSuccess()
    } catch {
      setError('Không thể xóa vai trò này. Vui lòng thử lại sau.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 380 }}>
        <div className="admin-modal-body" style={{ padding: '24px 20px', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#FEF2F2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '24px' }}>
            🗑️
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: 8 }}>Xác nhận xóa vai trò?</h3>
          <p style={{ fontSize: '.875rem', color: '#6B7280', lineHeight: 1.5, marginBottom: 24 }}>
            Bạn có chắc chắn muốn xóa vai trò <strong>{role?.name}</strong>?
            Hành động này không thể hoàn tác và sẽ ảnh hưởng đến người dùng hiện tại của vai trò này.
          </p>

          {error && (
            <div style={{ padding: '10px 12px', background: '#FEF2F2', color: '#DC2626', borderRadius: 6, fontSize: '.8125rem', marginBottom: 16 }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: 12 }}>
            <button 
              type="button" 
              className="admin-btn admin-btn--secondary" 
              onClick={onClose}
              style={{ flex: 1 }}
              disabled={loading}
            >
              Hủy
            </button>
            <button 
              type="button" 
              className="admin-btn admin-btn--primary" 
              onClick={handleDelete}
              style={{ flex: 1, background: '#DC2626' }}
              disabled={loading}
            >
              {loading ? 'Đang xóa...' : 'Xóa ngay'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
