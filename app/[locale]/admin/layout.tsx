'use client'

import { useState } from 'react'
import AdminHeader from '@/app/components/admin/AdminHeader'
import AdminSidebar from '@/app/components/admin/AdminSidebar'
import AdminGuard from '@/app/components/admin/AdminGuard'
import '@/app/components/admin/admin.css'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <AdminGuard>
      <div className="admin-shell">
        <AdminHeader onHamburger={() => setSidebarOpen(true)} />
        <div className="admin-body">
          <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="admin-content">
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  )
}
