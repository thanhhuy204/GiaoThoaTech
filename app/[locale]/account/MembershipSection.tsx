'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

/* ─── Types ──────────────────────────────────────────────── */
export type PlanStatus = 'none' | 'basic' | 'premium'
type BillingCycle = 'monthly' | 'yearly' | null

/* ─── Small icons ────────────────────────────────────────── */
function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="7" fill="#22c55e"/>
      <path d="M4 7L6.2 9.5L10 5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

/* ─── Modal wrapper ──────────────────────────────────────── */
function ModalOverlay({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="ms-modal-overlay" onClick={onClose}>
      <div className="ms-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="ms-modal-close" onClick={onClose} aria-label="Đóng"><CloseIcon /></button>
        {children}
      </div>
    </div>
  )
}

/* ─── Basic Plan Modal ───────────────────────────────────── */
function BasicModal({ onConfirm, onClose }: { onConfirm: () => void; onClose: () => void }) {
  const t = useTranslations('account')
  return (
    <ModalOverlay onClose={onClose}>
      <div className="ms-modal-badge ms-modal-badge--free">Miễn phí</div>
      <h2 className="ms-modal-title" id="modal-basic-title">{t('modalBasicTitle')}</h2>
      <p className="ms-modal-desc">{t('modalBasicDesc')}</p>
      <ul className="ms-modal-features">
        <li><CheckIcon />{t('basicFeat1')}</li>
        <li><CheckIcon />{t('basicFeat2')}</li>
        <li><CheckIcon />{t('basicFeat3')}</li>
      </ul>
      <div className="ms-modal-actions">
        <button className="ms-btn-primary" onClick={onConfirm}>{t('btnActivateBasic')}</button>
        <button className="ms-btn-secondary" onClick={onClose}>{t('cancel')}</button>
      </div>
    </ModalOverlay>
  )
}

/* ─── Premium Plan Modal ─────────────────────────────────── */
function PremiumModal({ onConfirm, onClose }: { onConfirm: (b: BillingCycle) => void; onClose: () => void }) {
  const t = useTranslations('account')
  const [billing, setBilling] = useState<BillingCycle>(null)
  return (
    <ModalOverlay onClose={onClose}>
      <div className="ms-modal-badge ms-modal-badge--premium">★ {t('planPremiumName')}</div>
      <h2 className="ms-modal-title" id="modal-premium-title">{t('modalPremiumTitle')}</h2>
      <p className="ms-modal-desc">{t('modalPremiumDesc')}</p>
      <div className="ms-billing-options">
        {([
          { key: 'yearly' as BillingCycle,  name: t('billingYearly'),  note: t('billingYearlyNote'),  price: t('billingYearlyPrice'),  tag: t('billingYearlyTag') },
          { key: 'monthly' as BillingCycle, name: t('billingMonthly'), note: t('billingMonthlyNote'), price: t('billingMonthlyPrice'), tag: null },
        ] as { key: BillingCycle; name: string; note: string; price: string; tag: string | null }[]).map(opt => (
          <label key={opt.key!} className={`ms-billing-option ${billing === opt.key ? 'selected' : ''}`}>
            <input type="radio" name="billing" value={opt.key!} checked={billing === opt.key} onChange={() => setBilling(opt.key)} />
            <div className="ms-billing-info">
              <span className="ms-billing-name">{opt.name}</span>
              <span className="ms-billing-note">{opt.note}</span>
            </div>
            <div className="ms-billing-price-wrap">
              <span className="ms-billing-price">{opt.price}</span>
              {opt.tag && <span className="ms-billing-tag">{opt.tag}</span>}
            </div>
          </label>
        ))}
      </div>
      <div className="ms-modal-actions">
        <button className="ms-btn-primary" onClick={() => onConfirm(billing)} disabled={!billing}>
          {t('btnActivatePremium')}
        </button>
        <button className="ms-btn-secondary" onClick={onClose}>{t('cancel')}</button>
      </div>
    </ModalOverlay>
  )
}

/* ─── Props ──────────────────────────────────────────────── */
interface MembershipSectionProps {
  planStatus: PlanStatus
  onActivateBasic: () => void
  onActivatePremium: () => void
}

/* ─── Main Component ─────────────────────────────────────── */
export default function MembershipSection({ planStatus, onActivateBasic, onActivatePremium }: MembershipSectionProps) {
  const t = useTranslations('account')
  const [modal, setModal] = useState<'basic' | 'premium' | null>(null)

  function handleActivateBasic() {
    setModal(null)
    onActivateBasic()
  }
  function handleActivatePremium() {
    setModal(null)
    onActivatePremium()
  }

  const isBasicActive   = planStatus === 'basic'
  const isPremiumActive = planStatus === 'premium'

  return (
    <>
      <section className="ms-section">
        <div className="ms-header">
          <h2 className="ms-title">{t('membershipTitle')}</h2>
          <p className="ms-subtitle">{t('membershipSubtitle')}</p>
        </div>

        {/* ── Basic Plan Card ── */}
        <div
          className={`ms-card ms-card--basic ${isBasicActive ? 'ms-card--activated' : 'ms-card--clickable'}`}
          onClick={() => !isBasicActive && setModal('basic')}
          role={!isBasicActive ? 'button' : undefined}
          tabIndex={!isBasicActive ? 0 : undefined}
          onKeyDown={e => !isBasicActive && (e.key === 'Enter' || e.key === ' ') && setModal('basic')}
        >
          <div className="ms-card-top">
            <div className="ms-card-name-row">
              <span className="ms-card-name">{t('planBasicName')}</span>
              <span className="ms-card-free-badge">FREE</span>
            </div>
            <p className="ms-card-tagline">{t('basicTagline')}</p>
          </div>

          <ul className="ms-card-perks">
            <li><CheckIcon />{t('basicPerk1')}</li>
            <li><CheckIcon />{t('basicPerk2')}</li>
            <li><CheckIcon />{t('basicPerk3')}</li>
          </ul>

          <div className="ms-card-footer">
            {isBasicActive ? (
              <span className="ms-activated-badge">✓ {t('statusActivated')}</span>
            ) : (
              <button className="ms-card-cta ms-card-cta--outline" tabIndex={-1}>
                {t('btnActivateBasic')}
              </button>
            )}
          </div>
        </div>

        {/* ── Premium Plan Card ── */}
        <div
          className={`ms-card ms-card--premium ${isPremiumActive ? 'ms-card--activated' : 'ms-card--clickable'}`}
          onClick={() => !isPremiumActive && setModal('premium')}
          role={!isPremiumActive ? 'button' : undefined}
          tabIndex={!isPremiumActive ? 0 : undefined}
          onKeyDown={e => !isPremiumActive && (e.key === 'Enter' || e.key === ' ') && setModal('premium')}
        >
          {/* promo banner */}
          {!isPremiumActive && (
            <div className="ms-promo-banner">
              <span className="ms-promo-icon">🎁</span>
              <span>{t('premiumPromoBanner')}</span>
              <span className="ms-promo-pill">{t('premiumPromoPill')}</span>
            </div>
          )}

          <div className="ms-card-top">
            <div className="ms-card-name-row">
              <span className="ms-card-name">
                <span className="ms-star">★</span> {t('planPremiumName')}
              </span>
              {!isPremiumActive && <span className="ms-card-hot-badge">HOT</span>}
            </div>
            <p className="ms-card-tagline">{t('premiumTagline')}</p>
            {!isPremiumActive && (
              <div className="ms-price-row">
                <span className="ms-price">{t('planPremiumPrice')}</span>
                <span className="ms-price-or">{t('priceOr')}</span>
                <span className="ms-price-alt">{t('premiumPriceYearly')}</span>
              </div>
            )}
          </div>

          <ul className="ms-card-perks ms-card-perks--premium">
            <li><CheckIcon />{t('premiumPerk1')}</li>
            <li><CheckIcon />{t('premiumPerk2')}</li>
            <li><CheckIcon />{t('premiumPerk3')}</li>
            <li><CheckIcon />{t('premiumPerk4')}</li>
          </ul>

          {!isPremiumActive && (
            <p className="ms-saving-note">{t('premiumSavingNote')}</p>
          )}

          <div className="ms-card-footer">
            {isPremiumActive ? (
              <span className="ms-activated-badge ms-activated-badge--premium">✓ {t('statusActivated')}</span>
            ) : (
              <button className="ms-card-cta ms-card-cta--primary" tabIndex={-1}>
                {t('btnActivatePremium')}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Modals ── */}
      {modal === 'basic'   && <BasicModal   onConfirm={handleActivateBasic}   onClose={() => setModal(null)} />}
      {modal === 'premium' && <PremiumModal onConfirm={handleActivatePremium} onClose={() => setModal(null)} />}
    </>
  )
}
