'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import './short-term-rental.css'

/* ─── Constants ──────────────────────────────────── */
const STR = '/images/Solutions/short-term%20rentals'

const ACCORDION_ITEMS = ['feat1', 'feat2', 'feat3'] as const
const PMS_FEATURES = ['pmsF1', 'pmsF2', 'pmsF3', 'pmsF4', 'pmsF5'] as const
const EBOOK_BULLETS = ['ebookB1', 'ebookB2', 'ebookB3'] as const

const HIGHLIGHT_PRODUCTS = [
  { key: 'deadboltGo',   label: 'Deadbolt Go',   img: `${STR}/deadbolt-go_1.webp`,       href: '/products/deadbolt-go' },
  { key: 'deadbolt2e',   label: 'Deadbolt 2E',   img: `${STR}/deadbolt-2e.webp`,          href: '/products/deadbolt-2e' },
  { key: 'keybox3',      label: 'Keybox 3',       img: `${STR}/keybox3.webp`,              href: '/products/keybox-3' },
  { key: 'retrofitLock', label: 'Retrofit Lock',  img: `${STR}/retrofit-and-keypad.webp`, href: '/products/retrofit-lock' },
]

const MULTIFAMILY_SLIDES = [
  `${STR}/deadbolt-2e-open_jzffva.webp`,
  `${STR}/deadbolt-installed-on-the-door_glakaj.webp`,
  `${STR}/deadbolt-lock-phone_fckvzv.webp`,
]

/* ─── Sub-components ─────────────────────────────── */
function CheckIcon() {
  return (
    <span className="str-check-icon" aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="9" fill="rgba(232,97,74,0.15)"/>
        <path d="M5 9.5L7.5 12L13 6.5" stroke="#E8614A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  )
}

function NavArrow({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      {dir === 'left'
        ? <path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        : <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      }
    </svg>
  )
}

function SuccessCard({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <div className="str-success">
      <div className="str-success-icon">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <circle cx="28" cy="28" r="28" fill="rgba(232,97,74,0.12)"/>
          <circle cx="28" cy="28" r="20" fill="rgba(232,97,74,0.15)"/>
          <path d="M18 28.5L24 34.5L38 20" stroke="#E8614A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h3 className="str-success-title">{t('formSuccessTitle')}</h3>
      <p className="str-success-desc">{t('formSuccessDesc')}</p>
    </div>
  )
}

/* ─── Main Content Component ─────────────────────── */
export default function ShortTermRentalContent() {
  const t = useTranslations('shortTermRental')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [openAccordion, setOpenAccordion] = useState<string | null>('feat1')
  const toggleAccordion = (key: string) => setOpenAccordion(prev => prev === key ? null : key)

  const [activeProduct, setActiveProduct] = useState(HIGHLIGHT_PRODUCTS[0].key)
  const currentProduct = HIGHLIGHT_PRODUCTS.find(p => p.key === activeProduct) ?? HIGHLIGHT_PRODUCTS[0]

  const total = MULTIFAMILY_SLIDES.length
  const prevSlide = () => setActiveSlide(i => (i - 1 + total) % total)
  const nextSlide = () => setActiveSlide(i => (i + 1) % total)

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <>
      {/* ── FEAT-050: Hero ─────────────────────────────── */}
      <section className="str-hero">
        <Image
          src={`${STR}/short-term-rental-igloo.webp`}
          alt="Short-term rental villa"
          fill
          className="str-hero-bg-img"
          priority
          unoptimized
        />
        <div className="str-hero-overlay" />

        {/* Hero content — separate from container */}
        <div className="str-hero-body">
          <div className="container">
            <div className="str-hero-content">
              <span className="label-tag str-label-dark anim-fadeup">{t('heroBadge')}</span>
              <h1 className="str-hero-h1 anim-fadeup delay-1">{t('heroTitle')}</h1>
              <p className="str-hero-sub anim-fadeup delay-2">{t('heroSubtitle')}</p>
              <div className="str-hero-ctas anim-fadeup delay-3">
                <Link href="/contact?ref=str-hero" className="btn-primary">{t('heroCta')} →</Link>
                <Link href="/products" className="btn-ghost-white">{t('heroCtaSecondary')}</Link>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ── FEAT-051: Features ─────────────────────────── */}
      <section className="str-features">
        <div className="container str-features-inner">
          {/* Left */}
          <div className="str-features-text reveal-left">
            <span className="label-tag">{t('featuresLabel')}</span>
            <h2 className="str-features-h2">{t('featuresTitle')}</h2>
            <p className="str-features-sub">{t('featuresSubtitle')}</p>
          </div>

          {/* Right — accordion */}
          <div className="str-accordion reveal-right">
            {ACCORDION_ITEMS.map((k, idx) => {
              const isOpen = openAccordion === k
              return (
                <div key={k} className={`str-acc-item ${isOpen ? 'open' : ''} ${idx < ACCORDION_ITEMS.length - 1 ? 'bordered' : ''}`}>
                  <button
                    className="str-acc-header"
                    onClick={() => toggleAccordion(k)}
                    aria-expanded={isOpen}
                  >
                    <span className="str-acc-title">{t(`${k}Title` as 'feat1Title')}</span>
                    <span className={`str-acc-arrow ${isOpen ? 'open' : ''}`}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>
                  <div className="str-acc-body">
                    <p className="str-acc-desc">{t(`${k}Desc` as 'feat1Desc')}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── FEAT-052: No WiFi No Issue ─────────────────── */}
      <section className="str-nowifi">
        <div className="container str-nowifi-inner">
          <div className="str-nowifi-text reveal-left">
            <span className="label-tag str-label-light">{t('noWifiLabel')}</span>
            <h2 className="heading-lg str-nowifi-h2">
              {t('noWifiTitle1')}{' '}
              <span className="gradient-text">{t('noWifiTitle2')}</span>
            </h2>
            <p className="str-nowifi-desc">{t('noWifiDesc')}</p>
            <div className="str-nowifi-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8614A" strokeWidth="2">
                <line x1="1" y1="1" x2="23" y2="23"/>
                <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.56 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/>
              </svg>
              <span>algoPIN™ — {t('noWifiBadge')}</span>
            </div>
          </div>
          <div className="str-nowifi-visual reveal-right">
            <Image
              src={`${STR}/no-wifi.webp`}
              alt="Offline smart lock"
              width={480}
              height={400}
              unoptimized
              className="str-nowifi-img"
            />
          </div>
        </div>
      </section>

      {/* ── FEAT-053: Multi-Family ─────────────────────── */}
      <section className="str-multifamily">
        <Image src={`${STR}/maunen.webp`} alt="" fill className="str-mf-bg" unoptimized />
        <div className="str-mf-bg-overlay" />

        <div className="container str-mf-inner">
          {/* Carousel */}
          <div className="str-mf-carousel reveal-left">
            <div
              className="str-mf-slides"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {MULTIFAMILY_SLIDES.map((src, i) => (
                <div key={i} className="str-mf-slide">
                  <Image src={src} alt={`Slide ${i + 1}`} width={480} height={560} unoptimized className="str-mf-slide-img" />
                </div>
              ))}
            </div>
            <button className="str-mf-nav str-mf-prev" onClick={prevSlide} aria-label="Previous slide">
              <NavArrow dir="left" />
            </button>
            <button className="str-mf-nav str-mf-next" onClick={nextSlide} aria-label="Next slide">
              <NavArrow dir="right" />
            </button>
          </div>

          {/* Text */}
          <div className="str-mf-text reveal-right">
            <h2 className="str-mf-h2">{t('multiFamilyTitle')}</h2>
            <p className="str-mf-sub">{t('multiFamilySubtitle')}</p>
            <Link href="/solutions/multi-family" className="btn-primary">{t('multiFamilyCta')}</Link>
            <div className="str-carousel-dots">
              {MULTIFAMILY_SLIDES.map((_, i) => (
                <button
                  key={i}
                  className={`str-dot ${activeSlide === i ? 'active' : ''}`}
                  onClick={() => setActiveSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEAT-054: Product Highlight ────────────────── */}
      <section className="str-product-highlight">
        <div className="container str-ph-inner">
          {/* Heading + tabs — white bg */}
          <div className="str-ph-heading reveal">
            <span className="label-tag">{t('productLabel')}</span>
            <h2 className="heading-lg str-product-h2">{t('productTitle')}</h2>
          </div>

          <div className="str-ph-tabs reveal d-100" role="tablist">
            {HIGHLIGHT_PRODUCTS.map(p => (
              <button
                key={p.key}
                role="tab"
                aria-selected={activeProduct === p.key}
                className={`str-ph-tab ${activeProduct === p.key ? 'active' : ''}`}
                onClick={() => setActiveProduct(p.key)}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Card with background image */}
          <div className="str-ph-card-wrap reveal-scale d-200">
            <Image src={`${STR}/maunen.webp`} alt="" fill className="str-ph-bg" unoptimized />
            <div className="str-ph-overlay" />
            <div className="str-product-card">
              <div className="str-product-img-wrap">
                <Image
                  key={currentProduct.key}
                  src={currentProduct.img}
                  alt={currentProduct.label}
                  width={280}
                  height={360}
                  unoptimized
                  className="str-ph-product-img"
                />
              </div>
              <div className="str-product-info">
                <h3 className="str-product-name">{currentProduct.label}</h3>
                <p className="str-product-desc">{t(`productDesc_${currentProduct.key}` as 'productDesc_deadboltGo')}</p>
                <Link href={currentProduct.href} className="btn-primary">{t('productCta')}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEAT-055: PMS Integration ──────────────────── */}
      <section className="str-pms">
        <div className="str-pms-headline-row reveal">
          <div className="str-pms-logos-side">
            <Image src={`${STR}/logos-left.webp`} alt="Partner logos" width={180} height={180} unoptimized />
          </div>
          <div className="str-pms-headline-center">
            <span className="label-tag str-label-light">{t('pmsLabel')}</span>
            <h2 className="heading-lg str-pms-h2">{t('pmsTitle')}</h2>
            <p className="str-pms-sub">{t('pmsSubtitle')}</p>
          </div>
          <div className="str-pms-logos-side">
            <Image src={`${STR}/logos-right.webp`} alt="Partner logos" width={180} height={180} unoptimized />
          </div>
        </div>

        <div className="str-pms-dashboard-wrap reveal-scale d-200">
          <Image
            src={`${STR}/marketplace.webp`}
            alt="MobiSure marketplace"
            width={960}
            height={520}
            unoptimized
            className="str-pms-dashboard-img"
          />
        </div>

        <div className="container str-pms-cols">
          <div className="str-pms-col">
            <Image src={`${STR}/dashboard.webp`} alt="Real-time dashboard" width={440} height={260} unoptimized className="str-pms-col-img" />
            <span className="str-pms-col-label">{t('pmsRealtime')}</span>
          </div>
          <div className="str-pms-col">
            <ul className="str-pms-features">
              {PMS_FEATURES.map(k => (
                <li key={k}><CheckIcon /><span>{t(k)}</span></li>
              ))}
            </ul>
            <Link href="/integrations" className="btn-primary">{t('pmsCta')}</Link>
          </div>
        </div>
      </section>

      {/* ── FEAT-056: Lead Form ────────────────────────── */}
      <section className="str-form-section">
        <div className="container str-form-inner">

          {/* Left — ebook image only */}
          <div className="str-form-visual reveal-left">
            <Image
              src={`${STR}/ebook-igloohome-integration-1.webp`}
              alt="MobiSure integration guide"
              width={320}
              height={420}
              unoptimized
              className="str-ebook-img"
            />
          </div>

          {/* Right — title + bullets + form */}
          <div className="str-form-col reveal-right">
            <h2 className="str-form-title">{t('formTitle')}</h2>
            <p className="str-form-sub">{t('formSubtitle')}</p>

            <ul className="str-ebook-bullets str-form-bullets">
              {EBOOK_BULLETS.map(k => (
                <li key={k}><CheckIcon /><span>{t(k)}</span></li>
              ))}
            </ul>

            {submitted ? (
              <SuccessCard t={t} />
            ) : (
              <form className="str-form" onSubmit={handleSubmit} noValidate>
                <div className="str-field">
                  <label>{t('formName')}</label>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="John Smith" required />
                </div>
                <div className="str-field">
                  <label>{t('formEmail')}</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john@company.com" required />
                </div>
                <button type="submit" className="btn-primary str-submit" disabled={loading}>
                  {loading ? t('formSubmitting') : t('formSubmit')}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
