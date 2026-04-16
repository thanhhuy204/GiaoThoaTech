'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useAppSelector } from '@/lib/store'
import { selectAuthUser, selectAuthInitialized } from '@/lib/authSlice'
import { useAuthInit } from '@/hooks/useAuthInit'

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  useAuthInit()
  const router = useRouter()
  const locale = useLocale()
  const user = useAppSelector(selectAuthUser)
  const initialized = useAppSelector(selectAuthInitialized)

  useEffect(() => {
    if (!initialized) return
    const isAdmin =
      user &&
      Array.isArray(user.roles) &&
      user.roles.some((r) => r.code === 'ADMIN' || r.code === 'SUPER_ADMIN')
    if (!isAdmin) router.replace(`/${locale}`)
  }, [initialized, user, router, locale])

  if (!initialized) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 36, height: 36, border: '3px solid #e5e7eb', borderTopColor: '#E8614A', borderRadius: '50%', animation: 'admin-spin .8s linear infinite', margin: '0 auto 12px' }}/>
          <style>{`@keyframes admin-spin{to{transform:rotate(360deg)}}`}</style>
          <p style={{ fontSize: '.875rem', color: '#6b7280' }}>Đang xác thực...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
