'use client'

import { useState, useEffect } from 'react'
import { createAdminRole, updateAdminRole, type AdminRole } from '@/lib/adminApi'

interface RoleModalProps {
  role?: AdminRole | null
  onClose: () => void
  onSuccess: () => void
}

export default function RoleModal({ role, onClose, onSuccess }: RoleModalProps) {
  const isEdit = !!role
  const [name, setName] = useState(role?.name || '')
  const [code, setCode] = useState(role?.code || '')
  const [description, setDescription] = useState(role?.description || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (role) {
      setName(role.name)
      setCode(role.code)
      setDescription(role.description || '')
    }
  }, [role])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || (!isEdit && !code.trim())) {
      setError('Vui lòng điền đầy đủ các thông tin bắt buộc.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      if (isEdit && role) {
        await updateAdminRole(role.id, { name, description })
      } else {
        await createAdminRole({ name, code, description })
      }
      onSuccess()
    } catch {
      setError('Có lỗi xảy ra. Vui lòng kiểm tra lại dữ liệu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 460 }}>
        <div className="admin-modal-header">
          <h3 className="admin-modal-title">{isEdit ? 'Chỉnh sửa vai trò' : 'Thêm vai trò mới'}</h3>
          <button className="admin-modal-close" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="admin-modal-body">
          {error && (
            <div style={{ padding: '10px 12px', background: '#FEF2F2', color: '#DC2626', borderRadius: 6, fontSize: '.8125rem', marginBottom: 16 }}>
              {error}
            </div>
          )}

          <div className="admin-form-group">
            <label className="admin-label">Tên vai trò <span style={{ color: '#E8614A' }}>*</span></label>
            <input 
              type="text" 
              className="admin-input" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="Ví dụ: Quản trị viên"
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Mã định danh <span style={{ color: '#E8614A' }}>*</span></label>
            <input 
              type="text" 
              className="admin-input" 
              value={code} 
              onChange={e => setCode(e.target.value.toUpperCase())} 
              placeholder="Ví dụ: ADMIN"
              disabled={isEdit}
              required
            />
            {isEdit && <p style={{ fontSize: '.75rem', color: '#9CA3AF', marginTop: 4 }}>Mã định danh không thể thay đổi sau khi tạo.</p>}
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Mô tả</label>
            <textarea 
              className="admin-input" 
              style={{ minHeight: 80, resize: 'vertical' }}
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              placeholder="Mô tả quyền hạn của vai trò này..."
            />
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
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
              type="submit" 
              className="admin-btn admin-btn--primary" 
              style={{ flex: 1 }}
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : isEdit ? 'Cập nhật' : 'Tạo mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
