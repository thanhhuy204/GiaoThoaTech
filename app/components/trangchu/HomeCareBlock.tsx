'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'


/* ─── useInView hook ─────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

/* ─── Icons ──────────────────────────────────────────────── */
function CheckCircle() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="9" fill="#22c55e" opacity="0.15"/>
      <circle cx="9" cy="9" r="7" stroke="#22c55e" strokeWidth="1.5"/>
      <path d="M5.5 9L7.8 11.5L12.5 6.5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function PlusMinusIcon({ open }: { open: boolean }) {
  return (
    <span className="hc2-pm" aria-hidden="true"
      style={{ background: open ? '#E8614A' : '#f0f0ee', color: open ? '#fff' : '#666' }}>
      {open ? '−' : '+'}
    </span>
  )
}
function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"
      style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}>
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/* ─── Benefit accordion item ─────────────────────────────── */
interface BenefitProps {
  emoji: string
  title: string
  detail: string
  index: number
  inView: boolean
}
function BenefitItem({ emoji, title, detail, index, inView }: BenefitProps) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className={`hc2-benefit ${open ? 'hc2-benefit--open' : ''}`}
      style={{ transitionDelay: `${index * 80}ms`, opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms` }}
    >
      <button className="hc2-benefit-btn" onClick={() => setOpen(v => !v)} aria-expanded={open}>
        <span className="hc2-benefit-emoji">{emoji}</span>
        <span className="hc2-benefit-title">{title}</span>
        <PlusMinusIcon open={open} />
      </button>
      {open && (
        <div className="hc2-benefit-body">
          <p>{detail}</p>
        </div>
      )}
    </div>
  )
}

/* ─── Main Component ─────────────────────────────────────── */
export default function HomeCareBlock() {
  const t = useTranslations('homeCare')
  const { ref: sectionRef, inView } = useInView(0.1)
  const [accordionOpen, setAccordionOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<'yearly' | 'monthly' | null>(null)

  const benefits = [
    { emoji: '🕐', title: t('benefit1Title'), detail: t('benefit1Detail') },
    { emoji: '🚨', title: t('benefit2Title'), detail: t('benefit2Detail') },
    { emoji: '🔥', title: t('benefit3Title'), detail: t('benefit3Detail') },
    { emoji: '🛡️', title: t('benefit4Title'), detail: t('benefit4Detail') },
  ]

  const products = [
    { src: '/images/Products/deadbolt-go.webp',  alt: 'Khóa deadbolt thông minh',  label: 'Deadbolt Go',  delay: 0   },
    { src: '/images/Products/keybox-3.webp',      alt: 'Hộp khóa mã thông minh',   label: 'Keybox 3',    delay: 120 },
    { src: '/images/Products/padlock-2.webp',     alt: 'Khóa treo thông minh',      label: 'Padlock 2',   delay: 240 },
  ]

  return (
    <section className="hc2-section" ref={sectionRef} aria-labelledby="hc2-heading">

      {/* ── Background decoration ── */}
      <div className="hc2-bg-glow hc2-bg-glow--a" aria-hidden="true" />
      <div className="hc2-bg-glow hc2-bg-glow--b" aria-hidden="true" />

      <div className="hc2-inner">

        {/* ══════════════════════════════════════════
            TOP: Headline + promo badges
        ══════════════════════════════════════════ */}
        <div className={`hc2-headline-wrap ${inView ? 'hc2-fade-up' : 'hc2-hidden'}`}>
          <div className="hc2-eyebrow">
            <span className="hc2-eyebrow-dot" />
            Gói dịch vụ an ninh Home Care 
          </div>
          <h2 id="hc2-heading" className="hc2-headline">
            Bảo vệ ngôi nhà bạn<br />
            <span className="hc2-headline-accent">toàn diện 24/7</span>
          </h2>
          <p className="hc2-sub">
            Hệ thống khóa thông minh tích hợp cảnh báo trộm, báo cháy tự động và bảo hiểm tài sản —
            mọi thứ trong một gói duy nhất.
          </p>

          {/* Promo badges */}
          <div className="hc2-badges">
            <span className="hc2-badge hc2-badge--gift">🎁 Tặng khóa + camera</span>
            <span className="hc2-badge hc2-badge--price">Chỉ từ 200.000₫/tháng</span>
            <span className="hc2-badge hc2-badge--hot">🔥 Ưu đãi có hạn</span>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            MIDDLE: Product images + key selling points
        ══════════════════════════════════════════ */}
        <div className="hc2-showcase">

          {/* Product images */}
          <div className="hc2-products">
            {products.map((p, i) => (
              <div
                key={p.src}
                className="hc2-product-card"
                style={{
                  opacity:    inView ? 1 : 0,
                  transform:  inView ? 'translateY(0)' : 'translateY(40px)',
                  transition: `opacity 0.6s ease ${p.delay}ms, transform 0.6s ease ${p.delay}ms`,
                  animationDelay: `${p.delay}ms`,
                }}
              >
                <div className={`hc2-product-img-wrap hc2-float-${i}`}>
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={160}
                    height={160}
                    className="hc2-product-img"
                    unoptimized
                  />
                </div>
                <span className="hc2-product-label">{p.label}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          className="hc2-cta-btn hc2-showcase-cta"
          onClick={() => setShowModal(true)}
          style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.6s ease 360ms' }}
        >
          Đăng ký ngay
        </button>

        {/* ══════════════════════════════════════════
            ACCORDION — 4 benefits + price
        ══════════════════════════════════════════ */}
        <div className={`hc2-accordion-wrap ${inView ? 'hc2-fade-up hc2-delay-500' : 'hc2-hidden'}`}>

          {/* Accordion trigger */}
          <button
            className={`hc2-accordion-trigger ${accordionOpen ? 'open' : ''}`}
            onClick={() => setAccordionOpen(v => !v)}
            aria-expanded={accordionOpen}
          >
            <div className="hc2-accordion-trigger-left">
              <span className="hc2-accordion-trigger-icon">✦</span>
              <div>
                <p className="hc2-accordion-trigger-title">{t('teaserTitle')}</p>
                <p className="hc2-accordion-trigger-sub">{t('teaserSub')}</p>
              </div>
            </div>
            <ChevronDown open={accordionOpen} />
          </button>

          {/* Expanded panel */}
          {accordionOpen && (
            <div className="hc2-accordion-panel">

              {/* Benefits 2-col grid */}
              <div className="hc2-benefits-grid">
                {benefits.map((b, i) => (
                  <BenefitItem key={b.title} {...b} index={i} inView={accordionOpen} />
                ))}
              </div>

              {/* Price card */}
              <div className="hc2-price-card">
                <div className="hc2-price-card-left">
                  <p className="hc2-price-card-label">💰 {t('priceSummary')}</p>
                  <p className="hc2-price-card-note">{t('priceDetail')}</p>
                  <ul className="hc2-price-perks">
                    <li><CheckCircle /> Giám sát 24/7</li>
                    <li><CheckCircle /> Báo động trộm cướp &amp; cháy nổ tự động</li>
                    <li><CheckCircle /> Bảo hiểm rủi ro đến hàng trăm triệu đồng</li>
                    <li><CheckCircle /> 🎁 Tặng khóa điện tử &amp; camera khi trả năm</li>
                  </ul>
                </div>
                <div className="hc2-price-card-right">
                  <p className="hc2-price-main">200.000₫<span>/tháng</span></p>
                  <p className="hc2-price-alt"> <span>hoặc</span> 1.900.000₫ <span>/năm</span></p>
                  <button className="hc2-cta-btn" onClick={() => setShowModal(true)}>
                    Đăng ký ngay
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>

      {/* ── Plan selector modal ── */}
      {showModal && (
        <div className="hc2-modal-overlay" onClick={() => { setShowModal(false); setSelectedPlan(null) }}>
          <div className="hc2-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="hc2-modal-title">
            <button className="hc2-modal-close" onClick={() => { setShowModal(false); setSelectedPlan(null) }} aria-label="Đóng">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </button>
            <p className="hc2-modal-eyebrow">Chọn gói đăng ký</p>
            <h3 id="hc2-modal-title" className="hc2-modal-title">Bắt đầu bảo vệ ngôi nhà ngay hôm nay</h3>
            <div className="hc2-modal-plans">
              {/* Yearly */}
              <div
                className={`hc2-plan hc2-plan--featured ${selectedPlan === 'yearly' ? 'hc2-plan--selected' : selectedPlan === 'monthly' ? 'hc2-plan--dimmed' : ''}`}
                onClick={() => setSelectedPlan('yearly')}
                role="button"
                aria-pressed={selectedPlan === 'yearly'}
              >
                <span className="hc2-plan-best">Tiết kiệm nhất</span>
                <p className="hc2-plan-name">Gói năm</p>
                <p className="hc2-plan-price">1.900.000₫<span>/năm</span></p>
                <p className="hc2-plan-gift">🎁 Tặng khóa điện tử &amp; camera</p>
                <p className="hc2-plan-saving">Tiết kiệm 500.000₫ so với gói tháng</p>
                <button className={`hc2-plan-btn ${selectedPlan === 'yearly' ? 'hc2-plan-btn--featured' : ''}`} onClick={e => { e.stopPropagation(); setSelectedPlan('yearly') }}>Chọn gói này</button>
              </div>
              {/* Monthly */}
              <div
                className={`hc2-plan ${selectedPlan === 'monthly' ? 'hc2-plan--selected' : selectedPlan === 'yearly' ? 'hc2-plan--dimmed' : ''}`}
                onClick={() => setSelectedPlan('monthly')}
                role="button"
                aria-pressed={selectedPlan === 'monthly'}
              >
                <p className="hc2-plan-name">Gói tháng</p>
                <p className="hc2-plan-price">200.000₫<span>/tháng</span></p>
                <p className="hc2-plan-desc">Linh hoạt — huỷ bất kỳ lúc nào</p>
                <button className={`hc2-plan-btn ${selectedPlan === 'monthly' ? 'hc2-plan-btn--featured' : ''}`} onClick={e => { e.stopPropagation(); setSelectedPlan('monthly') }}>Chọn gói này</button>
              </div>
            </div>
            <button className="hc2-modal-back" onClick={() => { setShowModal(false); setSelectedPlan(null) }}>Quay lại</button>
          </div>
        </div>
      )}
    </section>
  )
}
