'use client'

import { useState, useEffect, useCallback, use } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import {
  getAdminUserById,
  getAdminRoles,
  updateUserRoles,
  updateUserActive,
  extractUser,
  extractRoles,
  formatDate,
  getUserDisplayName,
  getInitials,
  type AdminUser,
  type AdminRole,
} from '@/lib/adminApi'
import { ApiError } from '@/lib/api'

// Sub-components
import UserDetailHeader from '@/app/components/admin/users/UserDetailHeader'
import UserInfoTab from '@/app/components/admin/users/UserInfoTab'
import UserRolesTab from '@/app/components/admin/users/UserRolesTab'
import UnsavedChangesBar from '@/app/components/admin/users/UnsavedChangesBar'
import ConfirmRemoveRoleModal from '@/app/components/admin/users/ConfirmRemoveRoleModal'

type Tab = 'info' | 'roles'


export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const locale = useLocale()
  const [tab, setTab] = useState<Tab>('info')
  const [user, setUser] = useState<AdminUser | null>(null)
  const [allRoles, setAllRoles] = useState<AdminRole[]>([])
  const [loadingUser, setLoadingUser] = useState(true)
  const [loadingRoles, setLoadingRoles] = useState(true)
  const [userError, setUserError] = useState<string | null>(null)
  const [rolesError, setRolesError] = useState<string | null>(null)

  // Role management state
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [saved, setSaved] = useState<Set<string>>(new Set())
  const [saving, setSaving] = useState(false)
  const [togglingStatus, setTogglingStatus] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)
  const [confirm, setConfirm] = useState<string | null>(null)

  const hasChanges = [...selected].sort().join() !== [...saved].sort().join()
  const changeCount = [...selected].filter(r => !saved.has(r)).length + [...saved].filter(r => !selected.has(r)).length

  function showToast(msg: string, type: 'success' | 'error') {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchUser = useCallback(async () => {
    setLoadingUser(true)
    setUserError(null)
    try {
      const res = await getAdminUserById(id)
      const u = extractUser(res)
      if (!u) { setUserError('Không tìm thấy người dùng'); return }
      setUser(u)
      const roleIds = new Set((u.roles ?? []).map(r => r.id))
      setSelected(new Set(roleIds))
      setSaved(new Set(roleIds))
    } catch (e) {
      if (e instanceof ApiError && e.status === 404) setUserError('Không tìm thấy người dùng')
      else setUserError('Không thể tải thông tin người dùng')
    } finally {
      setLoadingUser(false)
    }
  }, [id])

  const fetchRoles = useCallback(async () => {
    setLoadingRoles(true)
    setRolesError(null)
    try {
      const res = await getAdminRoles()
      setAllRoles(extractRoles(res))
    } catch {
      setRolesError('Không thể tải danh sách vai trò')
    } finally {
      setLoadingRoles(false)
    }
  }, [])

  useEffect(() => {
    fetchUser()
    fetchRoles()
  }, [fetchUser, fetchRoles])

  function toggleRole(role: AdminRole) {
    if (role.isProtected) return
    const id = role.id
    if (selected.has(id) && saved.has(id) && role.isCritical) {
      setConfirm(id)
      return
    }
    setSelected(prev => {
      const n = new Set(prev)
      n.has(id) ? n.delete(id) : n.add(id)
      return n
    })
  }

  function confirmRemove() {
    if (!confirm) return
    setSelected(prev => { const n = new Set(prev); n.delete(confirm); return n })
    setConfirm(null)
  }

  async function save() {
    if (!user) return
    setSaving(true)
    try {
      await updateUserRoles(user.id, [...selected])
      setSaved(new Set(selected))
      // Sync user roles in local state
      const updatedRoles = allRoles.filter(r => selected.has(r.id))
      setUser(prev => prev ? { ...prev, roles: updatedRoles } : prev)
      showToast('Quản lý vai trò đã được cập nhật', 'success')
    } catch {
      showToast('Có lỗi xảy ra, vui lòng thử lại', 'error')
    } finally {
      setSaving(false)
    }
  }

  function cancel() { setSelected(new Set(saved)) }

  function switchTab(t: Tab) {
    if (hasChanges && t !== tab) {
      if (!window.confirm('Bạn có thay đổi chưa lưu, bạn có muốn rời đi không?')) return
      cancel()
    }
    setTab(t)
  }

  async function toggleUserStatus() {
    if (!user) return
    const newIsActive = user.isActive === false ? true : false
    setTogglingStatus(true)
    try {
      await updateUserActive(user.id, newIsActive)
      setUser(prev => prev ? { ...prev, isActive: newIsActive } : prev)
      showToast(newIsActive ? 'Tài khoản đã được kích hoạt' : 'Tài khoản đã bị tạm dừng', 'success')
    } catch {
      showToast('Có lỗi xảy ra, vui lòng thử lại', 'error')
    } finally {
      setTogglingStatus(false)
    }
  }

  // Error / not found state
  if (!loadingUser && userError) {
    return (
      <>
        <Link href={`/${locale}/admin/users`} className="admin-back-link">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L5 7l4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Quay lại danh sách
        </Link>
        <div className="admin-empty">
          <div className="admin-empty__icon">❓</div>
          <div className="admin-empty__text">{userError}</div>
          <button className="admin-btn admin-btn--secondary" onClick={fetchUser} style={{ marginTop: 12 }}>Thử lại</button>
        </div>
      </>
    )
  }

  const toastMsg = toast ? toast.msg : ''
  const toastType = toast ? toast.type : 'success'

  return (
    <>
      <Link href={`/${locale}/admin/users`} className="admin-back-link">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 2L5 7l4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Quay lại danh sách
      </Link>

      <UserDetailHeader user={user} loading={loadingUser} togglingStatus={togglingStatus} onToggleStatus={toggleUserStatus} />

      <div className="admin-tabs">
        <button className={`admin-tab${tab === 'info' ? ' admin-tab--active' : ''}`} onClick={() => switchTab('info')}>
          Thông tin
        </button>
        <button className={`admin-tab${tab === 'roles' ? ' admin-tab--active' : ''}`} onClick={() => switchTab('roles')}>
          Quản lý vai trò
          {hasChanges && (
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#E8614A',
                display: 'inline-block',
                marginLeft: 4,
              }}
            />
          )}
        </button>
      </div>

      {tab === 'info' && <UserInfoTab user={user} loading={loadingUser} />}

      {tab === 'roles' && (
        <UserRolesTab
          allRoles={allRoles}
          selectedRoles={selected}
          savedRoles={saved}
          loading={loadingRoles}
          error={rolesError}
          onToggleRole={toggleRole}
          onRetry={fetchRoles}
        />
      )}

      {hasChanges && tab === 'roles' && (
        <UnsavedChangesBar changeCount={changeCount} saving={saving} onCancel={cancel} onSave={save} />
      )}

      <ConfirmRemoveRoleModal
        role={confirm ? allRoles.find((r) => r.id === confirm) ?? null : null}
        onCancel={() => setConfirm(null)}
        onConfirm={confirmRemove}
      />

      {toast && (
        <div className={`admin-toast admin-toast--${toastType}`} role="alert">
          {toastType === 'success' ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="#22c55e" strokeWidth="1.5" />
              <path d="M5 8l2 2 4-4" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="#ef4444" strokeWidth="1.5" />
              <path d="M8 5v4M8 11v.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
          {toastMsg}
        </div>
      )}
    </>
  )
}
