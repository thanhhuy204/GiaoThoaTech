'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'

interface AdminSidebarProps {
  open: boolean
  onClose: () => void
}

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const locale = useLocale()
  const pathname = usePathname()

  const items = [
    {
      label: 'Dashboard', href: `/${locale}/admin`,
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="2" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="2" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/></svg>,
    },
    {
      label: 'Người dùng', href: `/${locale}/admin/users`,
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M3 15c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    },
    {
      label: 'Vai trò & Quyền', href: `/${locale}/admin/roles`,
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M9 2L3 5v4c0 3.9 2.6 7.5 6 8.5 3.4-1 6-4.6 6-8.5V5L9 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
    },
    {
      label: 'Thẻ thành viên', href: `/${locale}/admin/memberships`,
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 9h6M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="13" cy="7" r="1.5" fill="currentColor"/></svg>,
    },
    {
      label: 'Cài đặt', href: `/${locale}/admin/settings`,
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M9 2v2M9 14v2M2 9h2M14 9h2M3.9 3.9l1.4 1.4M12.7 12.7l1.4 1.4M3.9 14.1l1.4-1.4M12.7 5.3l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    },
  ]

  function isActive(href: string) {
    if (href === `/${locale}/admin`) return pathname === `/${locale}/admin`
    return pathname.startsWith(href)
  }

  return (
    <>
      <div
        className={`admin-sidebar-overlay${open ? ' admin-sidebar-overlay--open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`admin-sidebar${open ? ' admin-sidebar--open' : ''}`} aria-label="Admin navigation">
        <nav className="admin-sidebar__nav">
          <span className="admin-sidebar__section-label">Quản trị</span>
          {items.map(item => (
            <Link
              key={item.label}
              href={item.href}
              className={`admin-nav-item${isActive(item.href) ? ' admin-nav-item--active' : ''}`}
              onClick={onClose}
            >
              <span className="admin-nav-item__icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar__footer">
          <span style={{ fontSize: '.75rem', color: '#4b5563' }}>SmartLock Admin v1.0</span>
        </div>
      </aside>
    </>
  )
}
