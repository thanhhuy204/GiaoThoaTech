'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/lib/store'
import { logout, selectAuthUser } from '@/lib/authSlice'
import { apiLogout } from '@/lib/authApi'
import MembershipSection, { type PlanStatus } from './MembershipSection'
import EditProfileModal from './EditProfileModal'
import './account.css'

/* ─── Avatar Placeholder ─────────────────────────────────── */
function AvatarPlaceholder({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return (
    <div className="acc-avatar-placeholder" aria-hidden="true">
      {initials || '?'}
    </div>
  )
}

/* ─── Shield Icon ────────────────────────────────────────── */
function ShieldIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 1L2 3.5V7c0 2.8 2.1 5.4 5 6 2.9-.6 5-3.2 5-6V3.5L7 1z" fill="currentColor" />
    </svg>
  )
}

/* ─── Check Icon ─────────────────────────────────────────── */
function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M3 7.5L6 10.5L12 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ─── Main Component ─────────────────────────────────────── */
export default function AccountContent() {
  const t = useTranslations('account')
  const locale = useLocale()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectAuthUser)

  const [planStatus, setPlanStatus] = useState<PlanStatus>('none')
  const [toast, setToast] = useState<string | null>(null)
  const [loggingOut, setLoggingOut] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  /* Show toast */
  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  /* Logout */
  async function handleLogout() {
    setLoggingOut(true)
    try {
      await apiLogout()
    } finally {
      dispatch(logout())
      router.push(`/${locale}`)
    }
  }

  /* Display name */
  const displayName = user?.fullName || user?.userName || user?.email || t('guestLabel')

  /* Badge config */
  const badgeConfig = {
    none: { label: t('planNone'), cls: 'acc-badge--none' },
    basic: { label: t('planBasic'), cls: 'acc-badge--basic' },
    premium: { label: t('planPremium'), cls: 'acc-badge--premium' },
  }[planStatus]

  return (
    <div className="acc-page">
      {/* ── Toast ── */}
      {toast && (
        <div className="acc-toast" role="status">
          <CheckIcon /> {toast}
        </div>
      )}

      <div className="acc-container">

        {/* ── Profile Header ── */}
        <section className="acc-profile-header">
          <div className="acc-avatar-wrap">
            {user?.avatar ? (
              <Image src={user.avatar} alt={displayName} width={96} height={96} className="acc-avatar-img" unoptimized />
            ) : (
              <AvatarPlaceholder name={displayName} />
            )}
          </div>

          <div className="acc-profile-info">
            <h1 className="acc-display-name">{displayName}</h1>
            {user?.email && <p className="acc-email">{user.email}</p>}

            {/* Membership badge (status indicator only) */}
            <div className="acc-badge-wrap">
              <span className={`acc-badge ${badgeConfig.cls}`}>
                <ShieldIcon />
                <span>{badgeConfig.label}</span>
              </span>
            </div>
          </div>
        </section>

        {/* ── Account Info Card ── */}
        <section className="acc-info-card">
          <h2 className="acc-section-title">{t('infoTitle')}</h2>
          <div className="acc-info-grid">
            <div className="acc-info-row">
              <span className="acc-info-label">{t('labelUsername')}</span>
              <span className="acc-info-value">{user?.userName || '—'}</span>
            </div>
            <div className="acc-info-row">
              <span className="acc-info-label">{t('labelEmail')}</span>
              <span className="acc-info-value">{user?.email || '—'}</span>
            </div>
            <div className="acc-info-row">
              <span className="acc-info-label">{t('labelPhone')}</span>
              <span className="acc-info-value">{user?.phoneNumber || '—'}</span>
            </div>
          </div>
        </section>

        {/* ── Thẻ thành viên (FEAT-074) ── */}
        <MembershipSection
          planStatus={planStatus}
          onActivateBasic={() => { setPlanStatus('basic'); showToast(t('toastBasicActivated')) }}
          onActivatePremium={() => { setPlanStatus('premium'); showToast(t('toastPremiumActivated')) }}
        />

        {/* ── Account Actions ── */}
        <section className="acc-actions">
          <button onClick={() => setIsEditModalOpen(true)} className="acc-action-btn">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M13 2.5L15.5 5L6.5 14H4V11.5L13 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t('editProfile')}
          </button>
          <button
            className="acc-action-btn acc-logout-btn"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M12 12.5L15.5 9L12 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15.5 9H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M7 2.5H3.5C2.9 2.5 2.5 2.9 2.5 3.5V14.5C2.5 15.1 2.9 15.5 3.5 15.5H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {loggingOut ? t('loggingOut') : t('logout')}
          </button>
        </section>
      </div>

      {isEditModalOpen && (
        <EditProfileModal 
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={() => {
            setIsEditModalOpen(false)
            showToast(t('updateSuccess'))
          }}
        />
      )}
    </div>
  )
}
