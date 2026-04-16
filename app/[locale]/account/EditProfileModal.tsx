'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { useTranslations } from 'next-intl'
import { useAppDispatch, useAppSelector } from '@/lib/store'
import { selectAuthUser, updateProfile } from '@/lib/authSlice'

import './account.css' 

interface EditProfileModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditProfileModal({ onClose, onSuccess }: EditProfileModalProps) {
  const t = useTranslations('account')
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectAuthUser) 

  const [values, setValues] = useState({
    fullName: user?.fullName || '',
    phoneNumber: user?.phoneNumber || ''
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    setError(null)
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!values.fullName.trim()) {
      setError('Họ và tên không được để trống')
      return;
    }

    setLoading(true)
    const result = await dispatch(updateProfile(values))
    setLoading(false)

    if (updateProfile.fulfilled.match(result)) {
      onSuccess()
    } else {
      setError(result.payload as string || 'Có lỗi xảy ra, vui lòng thử lại!')
    }
  }

  // Pre-defined premium styles for inputs to avoid bloating CSS file
  const inputStyle = {
    width: '100%',
    height: '48px',
    padding: '0 16px',
    borderRadius: '12px',
    border: '1.5px solid #e5e5e3',
    fontSize: '0.95rem',
    color: '#1a1a1a',
    backgroundColor: '#fff',
    transition: 'all 0.2s ease',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box' as const
  }

  const readOnlyStyle = {
    ...inputStyle,
    backgroundColor: '#f8f8f6',
    color: '#888',
    borderColor: '#f0f0ee',
    cursor: 'not-allowed'
  }

  const labelStyle = {
    display: 'block',
    fontSize: '0.88rem',
    fontWeight: 600,
    color: '#444',
    marginBottom: '8px'
  }

  const fieldStyle = {
    marginBottom: '20px'
  }

  return (
    <div className="acc-modal-overlay" style={{ backdropFilter: 'blur(4px)' }}>
      <div className="acc-modal" style={{ padding: '40px 36px', boxShadow: '0 24px 48px rgba(0,0,0,0.1)' }}>
        <button 
          onClick={onClose} 
          className="acc-modal-close"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <h1 className="acc-modal-title" style={{ fontSize: '1.6rem', marginBottom: '8px' }}>{t('editTitle')}</h1>
        <p className="acc-modal-desc" style={{ marginBottom: '32px' }}>Cập nhật thông tin cá nhân của bạn để chúng tôi có thể hỗ trợ tốt nhất.</p>

        {error && (
          <div style={{ backgroundColor: '#fff1ee', color: '#E8614A', padding: '12px 16px', borderRadius: '10px', fontSize: '0.9rem', marginBottom: '24px', border: '1px solid #ffd8d1', display: 'flex', alignItems: 'center', gap: '8px' }} role="alert">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zM8 4v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Thông tin cố định không được sửa */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
            <div style={{ ...fieldStyle, flex: 1 }}>
              <label style={labelStyle}>{t('labelUsername')} 🔒</label>
              <input
                type="text"
                value={user?.userName || ''}
                readOnly
                style={readOnlyStyle}
              />
            </div>

            <div style={{ ...fieldStyle, flex: 1 }}>
              <label style={labelStyle}>{t('labelEmail')} 🔒</label>
              <input
                type="email"
                value={user?.email || ''}
                readOnly
                style={readOnlyStyle}
              />
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: '#f0f0ee', margin: '8px 0 28px' }}></div>

          {/* Thông tin được phép sửa */}
          <div style={fieldStyle}>
            <label style={labelStyle}>{t('editFullName')}</label>
            <input
              type="text"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Nhập họ và tên..."
              onFocus={(e) => { e.currentTarget.style.borderColor = '#E8614A'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(232, 97, 74, 0.1)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = '#e5e5e3'; e.currentTarget.style.boxShadow = 'none'; }}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>{t('editPhone')}</label>
            <input
              type="text"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Nhập số điện thoại..."
              onFocus={(e) => { e.currentTarget.style.borderColor = '#E8614A'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(232, 97, 74, 0.1)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = '#e5e5e3'; e.currentTarget.style.boxShadow = 'none'; }}
            />
          </div>

          <div className="acc-modal-actions" style={{ marginTop: '36px', display: 'flex', flexDirection: 'row', gap: '12px' }}>
            <button type="button" className="acc-btn-secondary" onClick={onClose} disabled={loading} style={{ flex: 1, height: '52px', margin: 0 }}>
              Thoát
            </button>
            <button type="submit" className="acc-btn-primary" disabled={loading} style={{ flex: 1, height: '52px', fontSize: '1rem', margin: 0 }}>
              {loading ? t('saving') : t('saveChanges')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
