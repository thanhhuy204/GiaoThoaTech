'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useAppDispatch, useAppSelector } from '@/lib/store'
import { selectAuthUser, updateProfile } from '@/lib/authSlice'
import Link from 'next/link'

// Tái sử dụng CSS Auth (Màn hình Form màu trắng căn giữa + Nút cam)
import '@/app/[locale]/auth/login/login.css' 

export default function EditContent() {
  const locale = useLocale()
  const t = useTranslations('account')
  const router = useRouter()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectAuthUser) // Binding real-time Redux state

  // Map vào useState
  const [values, setValues] = useState({
    fullName: user?.fullName || '',
    phoneNumber: user?.phoneNumber || ''
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    setError(null) // Khi gõ chữ sẽ xóa Error
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Validate
    if (!values.fullName.trim()) {
      setError('Họ và tên không được để trống')
      return;
    }

    setLoading(true)
    const result = await dispatch(updateProfile(values))
    setLoading(false)

    // Check action success promise 
    if (updateProfile.fulfilled.match(result)) {
      router.push(`/${locale}/account`)
    } else {
      setError(result.payload as string || 'Có lỗi xảy ra, vui lòng thử lại!')
    }
  }

  // Tái sử dụng code style login
  return (
    <div className="auth-page">
       <div className="auth-form-col" style={{ width: '100%', maxWidth: '500px', margin: '0 auto', paddingTop: '50px' }}>
         <div className="auth-form-box">
           <h1 className="auth-form-title">{t('editTitle')}</h1>

           {error && (
             <div className="auth-form-alert" role="alert">
               {error}
             </div>
           )}

           <form onSubmit={handleSubmit} noValidate className="auth-form">
             {/* Thông tin cố định không được sửa */}
             <div className="auth-field">
               <label className="auth-label">{t('labelUsername')}</label>
               <input
                 type="text"
                 value={user?.userName || ''}
                 readOnly
                 className="auth-input"
                 style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed', color: '#6b7280' }}
               />
             </div>

             <div className="auth-field">
               <label className="auth-label">{t('labelEmail')}</label>
               <input
                 type="email"
                 value={user?.email || ''}
                 readOnly
                 className="auth-input"
                 style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed', color: '#6b7280' }}
               />
             </div>

             {/* Thông tin được phép sửa */}
             <div className="auth-field">
               <label className="auth-label">{t('editFullName')}</label>
               <input
                 type="text"
                 name="fullName"
                 value={values.fullName}
                 onChange={handleChange}
                 className="auth-input"
                 placeholder="Nhập họ và tên..."
               />
             </div>

             <div className="auth-field">
               <label className="auth-label">{t('editPhone')}</label>
               <input
                 type="text"
                 name="phoneNumber"
                 value={values.phoneNumber}
                 onChange={handleChange}
                 className="auth-input"
                 placeholder="Nhập số điện thoại..."
               />
             </div>

             <button type="submit" className="auth-submit-btn" disabled={loading}>
               {loading ? t('saving') : t('saveChanges')}
             </button>
             
             <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <Link href={`/${locale}/account`} style={{ color: '#E8614A', textDecoration: 'none', fontWeight: 500, fontSize: '0.9rem' }}>
                   Quay trở lại thiết lập chung
                </Link>
             </div>
           </form>
         </div>
       </div>
    </div>
  )
}
