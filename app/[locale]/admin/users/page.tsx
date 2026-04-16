'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import {
  getAdminUsers,
  extractUsers,
  formatDate,
  getUserDisplayName,
  getInitials,
  type AdminUser,
} from '@/lib/adminApi'

type StatusFilter = 'all' | 'active' | 'inactive'

function Avatar({ name }: { name: string }) {
  const initials = getInitials(name)
  return (
    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#E8614A', color: '#fff', fontSize: '.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {initials}
    </div>
  )
}

function SkeletonRow() {
  return (
    <tr>
      {Array.from({ length: 7 }).map((_, i) => (
        <td key={i}><div style={{ height: 16, background: '#F3F4F6', borderRadius: 4, width: i === 0 ? '80%' : '60%', animation: 'admin-pulse 1.5s ease-in-out infinite' }} /></td>
      ))}
    </tr>
  )
}

const PER_PAGE = 10

export default function AdminUsersPage() {
  const locale = useLocale()
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [page, setPage] = useState(1)
  const [users, setUsers] = useState<AdminUser[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Debounce search 300ms
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300)
    return () => clearTimeout(t)
  }, [search])

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await getAdminUsers({
        search: debouncedSearch || undefined,
        page,
        pageSize: PER_PAGE,
        isActive: status === 'all' ? undefined : status === 'active',
      })
      const list = extractUsers(res)
      setUsers(list)
      setTotal(typeof res.total === 'number' ? res.total : list.length)
    } catch {
      setError('Không thể tải danh sách người dùng. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }, [debouncedSearch, page, status])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  // Reset page khi filter thay đổi
  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, status])

  const pages = Math.ceil(total / PER_PAGE)

  return (
    <>
      <div className="admin-page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 className="admin-page-title">Người dùng</h1>
          <p className="admin-page-subtitle">{loading ? '...' : `${total} người dùng`}</p>
        </div>
        <button className="admin-btn admin-btn--primary">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          Thêm người dùng
        </button>
      </div>

      <div className="admin-card">
        <div className="admin-toolbar">
          <div className="admin-search">
            <svg className="admin-search__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              className="admin-search__input"
              placeholder="Tìm theo tên, email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {(['all', 'active', 'inactive'] as StatusFilter[]).map(s => (
              <button key={s} onClick={() => setStatus(s)}
                className={`admin-btn ${status === s ? 'admin-btn--primary' : 'admin-btn--secondary'}`}
                style={{ height: 36, fontSize: '.8125rem' }}>
                {s === 'all' ? 'Tất cả' : s === 'active' ? 'Hoạt động' : 'Tạm dừng'}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div style={{ padding: '16px 20px', background: '#FEF2F2', borderRadius: 8, margin: '0 20px 16px', display: 'flex', alignItems: 'center', gap: 10, color: '#DC2626', fontSize: '.875rem' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5v4M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            {error}
            <button className="admin-btn admin-btn--secondary" onClick={fetchUsers} style={{ marginLeft: 'auto', height: 30, fontSize: '.8125rem' }}>Thử lại</button>
          </div>
        )}

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Người dùng</th><th>Tên đăng nhập</th><th>Vai trò</th><th>Gói</th><th>Trạng thái</th><th>Ngày tham gia</th><th></th></tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
              ) : users.length === 0 ? (
                <tr><td colSpan={7}>
                  <div className="admin-empty"><div className="admin-empty__icon">👤</div><div className="admin-empty__text">Không tìm thấy người dùng</div></div>
                </td></tr>
              ) : users.map(u => {
                const displayName = getUserDisplayName(u)
                const statusVal = u.isActive !== false ? 'active' : 'inactive'
                return (
                  <tr key={u.id}>
                    <td>
                      <div className="admin-user-info">
                        <Avatar name={displayName}/>
                        <div className="admin-user-info__details">
                          <div className="admin-user-info__name">{displayName}</div>
                          <div className="admin-user-info__email">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: '#6b7280' }}>{u.userName ? `@${u.userName}` : '—'}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {(u.roles ?? []).length === 0
                          ? <span className="admin-badge admin-badge--gray">Chưa có vai trò</span>
                          : (u.roles ?? []).map(r => (
                            <span key={r.id} className={`admin-badge admin-badge--${r.code === 'ADMIN' || r.code === 'SUPER_ADMIN' ? 'orange' : r.code?.includes('PREMIUM') ? 'purple' : 'gray'}`}>
                              {r.name}
                            </span>
                          ))
                        }
                      </div>
                    </td>
                    <td>
                      <span className={`admin-badge admin-badge--${u.plan === 'Premium' ? 'orange' : u.plan === 'Basic' ? 'blue' : 'gray'}`}>
                        {u.plan || 'Chưa đăng ký'}
                      </span>
                    </td>
                    <td><span className={`admin-badge admin-badge--${statusVal === 'active' ? 'green' : 'red'}`}>{statusVal === 'active' ? 'Hoạt động' : 'Tạm dừng'}</span></td>
                    <td style={{ color: '#6b7280', fontSize: '.8125rem', whiteSpace: 'nowrap' }}>{formatDate(u.createdAt)}</td>
                    <td>
                      <Link href={`/${locale}/admin/users/${u.id}`} className="admin-btn admin-btn--secondary" style={{ height: 32, fontSize: '.8125rem', gap: 4 }}>
                        Chi tiết
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {!loading && pages > 1 && (
          <div className="admin-pagination">
            <span className="admin-pagination__info">{(page-1)*PER_PAGE+1}–{Math.min(page*PER_PAGE, total)} / {total} người dùng</span>
            <div className="admin-pagination__btns">
              <button className="admin-pagination__btn" onClick={() => setPage(p => p-1)} disabled={page===1} aria-label="Trang trước">‹</button>
              {Array.from({length:pages},(_,i)=>i+1).map(p => (
                <button key={p} className={`admin-pagination__btn${page===p?' admin-pagination__btn--active':''}`} onClick={()=>setPage(p)}>{p}</button>
              ))}
              <button className="admin-pagination__btn" onClick={() => setPage(p => p+1)} disabled={page===pages} aria-label="Trang sau">›</button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
