'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { 
  getAdminStats, 
  getAdminUsers, 
  extractUsers, 
  getUserDisplayName,
  getInitials,
  type AdminDashboardStats, 
  type AdminUser 
} from '@/lib/adminApi'

function Avatar({ name, size = 32 }: { name: string, size?: number }) {
  const initials = getInitials(name)
  return (
    <div style={{ 
      width: size, height: size, borderRadius: '50%', 
      background: '#E8614A', color: '#fff', 
      fontSize: size > 40 ? '1rem' : '.75rem', 
      fontWeight: 700, display: 'flex', 
      alignItems: 'center', justifyContent: 'center', flexShrink: 0 
    }}>
      {initials}
    </div>
  )
}

const INITIAL_STATS: AdminDashboardStats = {
  totalUsers: 0,
  activeUsers: 0,
  premiumUsers: 0,
  monthlyRevenue: '₫0',
  userTrend: '+0% tháng này',
  activeTrend: '+0% tuần này',
  revenueTrend: '0%',
  isRevenueUp: true
}

const ACTIVITIES = [
  { id: 1, action: 'Người dùng mới đăng ký', who: 'Nguyễn Văn A', time: '5 phút trước', dot: '#3b82f6' },
  { id: 2, action: 'Nâng cấp gói Premium',   who: 'Phạm Thị D',   time: '1 giờ trước',  dot: '#E8614A' },
  { id: 3, action: 'Thay đổi vai trò Admin', who: 'Admin System',  time: '2 giờ trước',  dot: '#a855f7' },
  { id: 4, action: 'Người dùng đăng xuất',  who: 'Lê Văn C',      time: '3 giờ trước',  dot: '#6b7280' },
]

export default function AdminDashboardPage() {
  const locale = useLocale()
  const [stats, setStats] = useState<AdminDashboardStats>(INITIAL_STATS)
  const [latestUsers, setLatestUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [statsRes, usersRes] = await Promise.all([
        getAdminStats(),
        getAdminUsers({ page: 1, pageSize: 8 })
      ])
      setStats(statsRes)
      setLatestUsers(extractUsers(usersRes))
    } catch {
      setError('Không thể tải dữ liệu dashboard. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const formatVal = (n: number) => new Intl.NumberFormat('vi-VN').format(n)

  const statConfig = [
    { label: 'Tổng người dùng', value: formatVal(stats.totalUsers), color: 'blue',
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M3 15c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> },
    { label: 'Đang hoạt động', value: formatVal(stats.activeUsers), color: 'green',
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2l1.8 4.8H16l-4 3.1 1.5 4.8L9 12 5.5 14.7 7 9.9 3 6.8h5.2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg> },
    { label: 'Gói thành viên', value: formatVal(stats.premiumUsers), color: 'orange',
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 9h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> },
    { label: 'Doanh thu tháng', value: stats.monthlyRevenue, color: 'purple',
      icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2v14M5 5.5C5 4.1 6.8 3 9 3s4 1.1 4 2.5-1.8 2.5-4 2.5S5 7.9 5 9.5 6.8 12 9 12s4 1.1 4 2.5S11.2 17 9 17s-4-1.1-4-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> },
  ]

  return (
    <>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <p className="admin-page-subtitle">Tổng quan hệ thống SmartLock</p>
      </div>

      {error && (
        <div style={{ padding: '12px 16px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, color: '#DC2626', marginBottom: 20, fontSize: '.875rem' }}>
          {error}
        </div>
      )}

      {/* Stat Cards */}
      <div className="admin-stats-grid">
        {statConfig.map(s => (
          <div key={s.label} className="admin-stat-card">
            <div className={`admin-stat-card__icon admin-stat-card__icon--${s.color}`}>{s.icon}</div>
            <div className="admin-stat-card__value">
              {loading ? <div style={{ height: 32, width: '60%', background: '#F3F4F6', borderRadius: 4, animation: 'admin-pulse 1.5s infinite' }} /> : s.value}
            </div>
            <div className="admin-stat-card__label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Dashboard Grid */}
      <div className="admin-dashboard-grid">
        {/* Recent Users */}
        <div className="admin-card">
          <div className="admin-card__header">
            <h2 className="admin-card__title">Người dùng mới nhất</h2>
            <Link href={`/${locale}/admin/users`} className="admin-btn admin-btn--secondary" style={{ height: 32, fontSize: '.8125rem' }}>
              Xem tất cả
            </Link>
          </div>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr><th>Tên</th><th>Gói</th><th>Trạng thái</th><th>Ngày tham gia</th></tr>
              </thead>
              <tbody>
                {loading 
                  ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      <td>
                        <div style={{ height: 14, width: '80%', background: '#F9FAFB', borderRadius: 4, marginBottom: 4, animation: 'admin-pulse 1.5s infinite' }} />
                        <div style={{ height: 10, width: '40%', background: '#F9FAFB', borderRadius: 4, animation: 'admin-pulse 1.5s infinite' }} />
                      </td>
                      <td><div style={{ height: 20, width: 60, background: '#F9FAFB', borderRadius: 20, animation: 'admin-pulse 1.5s infinite' }} /></td>
                      <td><div style={{ height: 20, width: 80, background: '#F9FAFB', borderRadius: 20, animation: 'admin-pulse 1.5s infinite' }} /></td>
                      <td><div style={{ height: 14, width: 100, background: '#F9FAFB', borderRadius: 4, animation: 'admin-pulse 1.5s infinite' }} /></td>
                    </tr>
                  ))
                  : latestUsers.length === 0 
                    ? (<tr><td colSpan={4}><div style={{ textAlign: 'center', padding: '20px', color: '#9CA3AF' }}>Không có dữ liệu người dùng mới</div></td></tr>)
                    : latestUsers.map(u => (
                      <tr key={u.id}>
                        <td>
                          <div className="admin-user-info">
                            <Avatar name={getUserDisplayName(u)} />
                            <div className="admin-user-info__details">
                              <div className="admin-user-info__name">{getUserDisplayName(u)}</div>
                              <div className="admin-user-info__email">{u.email}</div>
                            </div>
                          </div>
                        </td>
                      <td>
                        <span className={`admin-badge admin-badge--${u.plan === 'Premium' ? 'orange' : u.plan === 'Basic' ? 'blue' : 'gray'}`}>
                          {u.plan || 'Free'}
                        </span>
                      </td>
                      <td>
                        <span className={`admin-badge admin-badge--${u.isActive ? 'green' : 'red'}`}>
                          {u.isActive ? 'Hoạt động' : 'Tạm dừng'}
                        </span>
                      </td>
                      <td style={{ color: '#64748b' }}>
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString('vi-VN') : '—'}
                      </td>
                    </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="admin-card">
          <div className="admin-card__header">
            <h2 className="admin-card__title">Hoạt động gần đây</h2>
          </div>
          {ACTIVITIES.map(a => (
            <div key={a.id} className="admin-activity-item">
              <div className="admin-activity-dot" style={{ background: a.dot }} />
              <div className="admin-activity-content">
                <div className="admin-activity-action">{a.action}</div>
                <div className="admin-activity-meta">{a.who} · {a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
