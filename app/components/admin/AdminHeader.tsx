'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/lib/store'
import { logout, selectAuthUser } from '@/lib/authSlice'
import { apiLogout } from '@/lib/authApi'

interface AdminHeaderProps {
  onHamburger: () => void
}

export default function AdminHeader({ onHamburger }: AdminHeaderProps) {
  const locale = useLocale()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectAuthUser)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  async function handleLogout() {
    try { await apiLogout() } catch {}
    dispatch(logout())
    router.push(`/${locale}`)
  }

  const name = user?.fullName || user?.userName || 'Admin'
  const initials = name.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase()

  return (
    <header className="admin-header">
      <button className="admin-hamburger" onClick={onHamburger} aria-label="Mở menu">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </button>

      <Link href={`/${locale}/admin`} className="admin-header__logo">
        <Image src="/images/logo/Logo-footer.png" alt="Logo" width={32} height={32} className="admin-header__logo-img"/>
        <span className="admin-header__logo-text">SmartLock</span>
        <span className="admin-header__logo-badge">Admin</span>
      </Link>

      <div className="admin-header__spacer"/>

      <div className="admin-header__actions">
        <button className="admin-notif-btn" aria-label="Thông báo">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 2a6 6 0 0 0-6 6v3l-1.5 2.5A1 1 0 0 0 3.5 15h13a1 1 0 0 0 .9-1.45L16 11V8a6 6 0 0 0-6-6zM8.5 17a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="admin-notif-badge" aria-label="3 thông báo">3</span>
        </button>

        <div style={{ position: 'relative' }} ref={ref}>
          <button className="admin-avatar-btn" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-label="Tài khoản admin">
            <div className="admin-avatar-circle">{initials}</div>
            <span className="admin-avatar-name">{name}</span>
            <svg className="admin-avatar-chevron" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {open && (
            <div className="admin-avatar-dropdown" role="menu">
              <Link href={`/${locale}/account`} className="admin-avatar-dropdown-item" role="menuitem" onClick={() => setOpen(false)}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <circle cx="7" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M2 12c0-2.2 2.24-4 5-4s5 1.8 5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Hồ sơ
              </Link>
              <Link href={`/${locale}/admin/settings`} className="admin-avatar-dropdown-item" role="menuitem" onClick={() => setOpen(false)}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M7 1v2M7 11v2M1 7h2M11 7h2M2.9 2.9l1.4 1.4M9.7 9.7l1.4 1.4M2.9 11.1l1.4-1.4M9.7 4.3l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Cài đặt
              </Link>
              <div className="admin-avatar-dropdown-divider"/>
              <button className="admin-avatar-dropdown-item admin-avatar-dropdown-item--danger" role="menuitem" onClick={handleLogout}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M5 2H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2M9 10l3-3-3-3M12 7H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
