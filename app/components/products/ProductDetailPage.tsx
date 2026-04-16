'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import './ProductDetailPage.css'

// ─── Types ─────────────────────────────────────────────────────────────────────
interface ProductAssets {
  heroImage: string
  gallery: { src: string; type: 'image' | 'video'; thumb?: string }[]
  video: { src: string; poster: string } | null
  datasheetUrl: string | null
  hasQuote: boolean
}

interface ProductData {
  name: string
  category: string
  tagline: string
  description: string
  heroImage: string
  gallery: { src: string; type: 'image' | 'video'; thumb?: string }[]
  video: { src: string; poster: string; title: string } | null
  benefits: { title: string; desc: string }[]
  quote: { text: string; author: string; role: string; company: string } | null
  datasheetUrl: string | null
}

// ─── Slug → translation key prefix ──────────────────────────────────────────
const SLUG_KEY: Record<string, string> = {
  'deadbolt-go':       'deadboltGo',
  'keybox-3':          'keybox3',
  'padlock-2':         'padlock2',
  'cellular-deadbolt': 'cellularDeadbolt',
  'padlock-lite':      'padlockLite',
  'mortise-touch':     'mortiseTouch',
  'gate-lock':         'gateLock',
}

// ─── Product Assets (non-translatable) ──────────────────────────────────────
const PRODUCT_ASSETS: Record<string, ProductAssets> = {
  'deadbolt-go': {
    heroImage: '/images/Products/Details-deadbolt-go/deadbolt-go-black-3d-diagonal.webp',
    gallery: [
      { src: '/images/Products/Details-deadbolt-go/deadbolt-go-black-3d-diagonal.webp', type: 'image' },
      { src: '/images/Products/Details-deadbolt-go/deadbolt-go-2.webp', type: 'image' },
      { src: '/images/Products/Details-deadbolt-go/deadbolt-go-3.webp', type: 'image' },
      { src: '/images/Products/Details-deadbolt-go/deadbolt-go-4.webp', type: 'image' },
      { src: '/images/Products/Details-deadbolt-go/deadbolt-go-5.webp', type: 'image' },
      { src: '/images/Products/Details-deadbolt-go/deadbolt-go.mp4', type: 'video', thumb: '/images/Products/Details-deadbolt-go/deadbolt-go-2.webp' },
    ],
    video: { src: '/images/Products/Details-deadbolt-go/deadbolt-go.mp4', poster: '/images/Products/Details-deadbolt-go/deadbolt-go-black-3d-diagonal.webp' },
    datasheetUrl: '#',
    hasQuote: true,
  },
  'keybox-3': {
    heroImage: '/images/Products/Details-Keybox-3/keybox-3-close-open.webp',
    gallery: [
      { src: '/images/Products/Details-Keybox-3/keybox-3-close-open.webp', type: 'image' },
      { src: '/images/Products/Details-Keybox-3/keybox-3-1.webp', type: 'image' },
      { src: '/images/Products/Details-Keybox-3/keybox-3-2.webp', type: 'image' },
      { src: '/images/Products/Details-Keybox-3/keybox-3-3.webp', type: 'image' },
      { src: '/images/Products/Details-Keybox-3/keybox-3-4.webp', type: 'image' },
      { src: '/images/Products/Details-Keybox-3/keybox-3-5.webp', type: 'image' },
      { src: '/images/Products/Details-Keybox-3/tinypod-x-igloohome.mp4', type: 'video', thumb: '/images/Products/Details-Keybox-3/keybox-3-1.webp' },
    ],
    video: { src: '/images/Products/Details-Keybox-3/tinypod-x-igloohome.mp4', poster: '/images/Products/Details-Keybox-3/keybox-3-close-open.webp' },
    datasheetUrl: '#',
    hasQuote: false,
  },
  'padlock-2': {
    heroImage: '/images/Products/Details-Padlock-2/padlock-2-1.webp',
    gallery: [
      { src: '/images/Products/Details-Padlock-2/padlock-2-1.webp', type: 'image' },
      { src: '/images/Products/Details-Padlock-2/padlock-2-2.webp', type: 'image' },
      { src: '/images/Products/Details-Padlock-2/padlock-2-3.webp', type: 'image' },
      { src: '/images/Products/Details-Padlock-2/padlock-2-4.webp', type: 'image' },
      { src: '/images/Products/Details-Padlock-2/padlock-2-5.webp', type: 'image' },
      { src: '/images/Products/Details-Padlock-2/ark-futsal-x-igloo-video.mp4', type: 'video', thumb: '/images/Products/Details-Padlock-2/padlock-2-2.webp' },
    ],
    video: { src: '/images/Products/Details-Padlock-2/ark-futsal-x-igloo-video.mp4', poster: '/images/Products/Details-Padlock-2/padlock-2-1.webp' },
    datasheetUrl: '#',
    hasQuote: true,
  },
  'cellular-deadbolt': {
    heroImage: '/images/Products/Details-cellular-deadbolt/cellular-deadbolt-and-keys.webp',
    gallery: [
      { src: '/images/Products/Details-cellular-deadbolt/cellular-deadbolt-and-keys.webp', type: 'image' },
      { src: '/images/Products/Details-cellular-deadbolt/cellular-deadbolt-1.webp', type: 'image' },
      { src: '/images/Products/Details-cellular-deadbolt/cellular-deadbolt-2.webp', type: 'image' },
      { src: '/images/Products/Details-cellular-deadbolt/cellular-deadbolt-3.webp', type: 'image' },
      { src: '/images/Products/Details-cellular-deadbolt/cellular-deadbolt-4.webp', type: 'image' },
      { src: '/images/Products/Details-cellular-deadbolt/cellular-deadbolt-5.webp', type: 'image' },
      { src: '/images/Products/Details-cellular-deadbolt/unlock-with-app.webp', type: 'image' },
      { src: '/images/Products/Details-cellular-deadbolt/singe-or-multi-family-property.webp', type: 'image' },
    ],
    video: null,
    datasheetUrl: '#',
    hasQuote: false,
  },
  'padlock-lite': {
    heroImage: '/images/Products/Details-padlock-lite/sp3.webp',
    gallery: [
      { src: '/images/Products/Details-padlock-lite/sp3.webp', type: 'image' },
      { src: '/images/Products/Details-padlock-lite/sp3-on.webp', type: 'image' },
      { src: '/images/Products/Details-padlock-lite/sp3-back.webp', type: 'image' },
      { src: '/images/Products/Details-padlock-lite/sp3-usb-c.webp', type: 'image' },
    ],
    video: null,
    datasheetUrl: null,
    hasQuote: false,
  },
  'mortise-touch': {
    heroImage: '/images/Products/deadbolt.webp',
    gallery: [{ src: '/images/Products/deadbolt.webp', type: 'image' }],
    video: null,
    datasheetUrl: '#',
    hasQuote: true,
  },
  'gate-lock': {
    heroImage: '/images/Products/deadbolt.webp',
    gallery: [{ src: '/images/Products/deadbolt.webp', type: 'image' }],
    video: null,
    datasheetUrl: '#',
    hasQuote: false,
  },
}

// ─── Hook ──────────────────────────────────────────────────────────────────────
function useIntersection(ref: React.RefObject<Element | null>, threshold = 0.15) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, threshold])
  return visible
}

// ─── Hero + Gallery ────────────────────────────────────────────────────────────
function HeroSection({ product, slug }: { product: ProductData; slug: string }) {
  const t = useTranslations('productDetail')
  const [selected, setSelected] = useState(0)
  const [videoOpen, setVideoOpen] = useState(false)
  const [paused, setPaused] = useState(false)
  const current = product.gallery[selected]
  const imageOnly = product.gallery.filter(g => g.type === 'image')

  useEffect(() => {
    if (paused || videoOpen || imageOnly.length <= 1) return
    const id = setInterval(() => {
      setSelected(prev => {
        const imageIndices = product.gallery
          .map((g, i) => g.type === 'image' ? i : -1)
          .filter(i => i >= 0)
        const pos = imageIndices.indexOf(prev)
        const next = imageIndices[(pos + 1) % imageIndices.length]
        return next >= 0 ? next : prev
      })
    }, 2000)
    return () => clearInterval(id)
  }, [paused, videoOpen, imageOnly.length, product.gallery])

  return (
    <section className="pdp-hero">
      <div className="container">
        <nav aria-label="Breadcrumb" className="pdp-breadcrumb">
          <ol className="pdp-breadcrumb-list">
            <li><a href="/" className="pdp-breadcrumb-link">{t('breadcrumbHome')}</a></li>
            <li className="pdp-breadcrumb-sep">/</li>
            <li><a href="/overview" className="pdp-breadcrumb-link">{t('breadcrumbProducts')}</a></li>
            <li className="pdp-breadcrumb-sep">/</li>
            <li className="pdp-breadcrumb-current">{product.name}</li>
          </ol>
        </nav>

        <div className="pdp-split">
          <div>
            <div
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              className="pdp-main-img"
            >
              {current.type === 'video' ? (
                videoOpen ? (
                  <video src={current.src} controls autoPlay style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <>
                    <Image src={current.thumb ?? product.heroImage} alt={product.name} fill style={{ objectFit: 'cover' }} />
                    <button onClick={() => setVideoOpen(true)} className="pdp-play-overlay" aria-label={t('playVideo')}>
                      <div className="pdp-play-circle">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#E8614A">
                          <polygon points="5,3 19,12 5,21"/>
                        </svg>
                      </div>
                    </button>
                  </>
                )
              ) : (
                <div key={selected} className="img-zoom-enter pdp-img-slot">
                  <Image src={current.src} alt={`${product.name} view ${selected + 1}`} fill style={{ objectFit: 'cover' }} priority={selected === 0} />
                </div>
              )}
            </div>

            {product.gallery.length > 1 && (
              <div className="pdp-thumbs">
                {product.gallery.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => { setSelected(i); setVideoOpen(false) }}
                    aria-label={item.type === 'video' ? 'Video' : `Image ${i + 1}`}
                    className="pdp-thumb-btn"
                    style={{ border: selected === i ? '2px solid #E8614A' : '2px solid transparent' }}
                  >
                    <Image src={item.type === 'video' ? (item.thumb ?? product.heroImage) : item.src} alt="" fill style={{ objectFit: 'cover' }} />
                    {item.type === 'video' && (
                      <div className="pdp-thumb-video-overlay">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><polygon points="5,3 19,12 5,21"/></svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pdp-content-col">
            <span className="label-tag pdp-category-label">{product.category}</span>
            <h1 className="heading-xl pdp-hero-heading">{product.name}</h1>
            <p className="pdp-tagline">{product.tagline}</p>
            <p className="body-lg pdp-description">{product.description}</p>

            <div className="pdp-cta-row">
              <a href={`/contact?ref=product&product=${slug}`} className="btn-primary pdp-btn-link">
                {t('btnGetDemo')}
              </a>
              {product.datasheetUrl && (
                <a href={product.datasheetUrl} className="btn-outline pdp-btn-link-flex" download={`${slug}-datasheet.pdf`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  {t('btnDataSheet')}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Section: Video ────────────────────────────────────────────────────────────
function VideoSection({ video }: { video: NonNullable<ProductData['video']> }) {
  const t = useTranslations('productDetail')
  const ref = useRef<HTMLElement>(null)
  const visible = useIntersection(ref as React.RefObject<Element>)

  return (
    <section ref={ref} className="pdp-video-section">
      <div className="container">
        <div className="pdp-video-header">
          <span className="label-tag pdp-video-label">{t('videoLabel')}</span>
          <h2 className="heading-lg" style={{
            color: '#fff', marginTop: 12,
            opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.5s, transform 0.5s',
          }}>
            {video.title}
          </h2>
        </div>
        <div className="pdp-video-wrap" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s 0.2s' }}>
          <video src={video.src} poster={video.poster} autoPlay muted loop playsInline controls className="pdp-video-player" />
        </div>
      </div>
    </section>
  )
}

// ─── Section: Benefits ─────────────────────────────────────────────────────────
function BenefitsSection({ product }: { product: ProductData }) {
  const t = useTranslations('productDetail')
  const ref = useRef<HTMLElement>(null)
  const visible = useIntersection(ref as React.RefObject<Element>)

  return (
    <section ref={ref} className="pdp-benefits-section">
      <div className="container">
        <div className="pdp-benefits-header">
          <span className="label-tag">{t('benefitsLabel', { name: product.name })}</span>
          <h2 className="heading-lg pdp-benefits-heading">
            {t('benefitsH1')} <span className="gradient-text">{t('benefitsH2')}</span>
          </h2>
        </div>
        <div className="pdp-benefits-grid">
          {product.benefits.map((b, i) => (
            <div
              key={b.title}
              className="pdp-benefit-item"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.45s ease ${i * 0.06}s, transform 0.45s ease ${i * 0.06}s`,
              }}
            >
              <span className="pdp-benefit-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </span>
              <div>
                <p className="pdp-benefit-title">{b.title}</p>
                <p className="pdp-benefit-desc">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section: Offline Technology ───────────────────────────────────────────────
function TechSection() {
  const t = useTranslations('productDetail')
  const ref = useRef<HTMLElement>(null)
  const visible = useIntersection(ref as React.RefObject<Element>)

  const PIN_TYPES = [
    { icon: '⚡', title: t('pinOneTimeTitle'),   desc: t('pinOneTimeDesc') },
    { icon: '⏱',  title: t('pinDurationTitle'), desc: t('pinDurationDesc') },
    { icon: '🔄', title: t('pinRecurringTitle'), desc: t('pinRecurringDesc') },
    { icon: '🔐', title: t('pinPermanentTitle'), desc: t('pinPermanentDesc') },
  ]

  return (
    <section ref={ref} className="pdp-tech-section">
      <div className="container">
        <div className="pdp-tech-header">
          <span className="label-tag">{t('techLabel')}</span>
          <h2 className="heading-lg pdp-tech-heading">
            {t('techH1')}<br />
            <span className="gradient-text">{t('techH2')}</span>
          </h2>
          <p className="body-lg pdp-tech-para">{t('techDesc')}</p>
        </div>
        <div className="pdp-pin-grid">
          {PIN_TYPES.map((p, i) => (
            <div
              key={p.title}
              className="pdp-pin-card"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.4s ease ${i * 0.1}s, transform 0.4s ease ${i * 0.1}s`,
              }}
            >
              <div className="pdp-pin-icon">{p.icon}</div>
              <h3 className="pdp-pin-title">{p.title}</h3>
              <p className="pdp-pin-desc">{p.desc}</p>
            </div>
          ))}
        </div>
        <p className="pdp-tech-footnote">{t('techFootnote')}</p>
      </div>
    </section>
  )
}

// ─── Section: Security ─────────────────────────────────────────────────────────
function SecuritySection() {
  const t = useTranslations('productDetail')
  const ref = useRef<HTMLElement>(null)
  const visible = useIntersection(ref as React.RefObject<Element>)

  const BADGES = [t('badge1'), t('badge2'), t('badge3'), t('badge4')]

  return (
    <section ref={ref} className="pdp-security-section">
      <div className="container pdp-security-inner">
        <div className="pdp-security-icon" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E8614A" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <h2 className="heading-lg" style={{
          color: '#fff', marginBottom: 16,
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.5s 0.1s, transform 0.5s 0.1s',
        }}>
          {t('securityH1')}<br />
          <span className="gradient-text">{t('securityH2')}</span>
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, fontSize: '0.95rem', marginBottom: 36,
          opacity: visible ? 1 : 0, transition: 'opacity 0.5s 0.2s',
        }}>
          {t('securityDesc')}
        </p>
        <div className="pdp-security-badges" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s 0.3s' }}>
          {BADGES.map(badge => (
            <span key={badge} className="pdp-security-badge">{badge}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Section: Quote ────────────────────────────────────────────────────────────
function QuoteSection({ quote, productName }: { quote: NonNullable<ProductData['quote']>; productName: string }) {
  const ref = useRef<HTMLElement>(null)
  const visible = useIntersection(ref as React.RefObject<Element>)

  return (
    <section ref={ref} className="pdp-quote-section">
      <div className="container pdp-quote-inner">
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.5s, transform 0.5s' }}>
          <div className="pdp-quote-mark">&ldquo;</div>
          <p className="pdp-quote-text">{quote.text}</p>
          <div className="pdp-quote-author-row">
            <div className="pdp-quote-avatar">{quote.author.charAt(0)}</div>
            <div>
              <p className="pdp-quote-author-name">{quote.author}</p>
              <p className="pdp-quote-author-role">{quote.role} · {quote.company}</p>
            </div>
            <span className="pdp-quote-product-badge">{productName}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Section: CTA ──────────────────────────────────────────────────────────────
function CTASection({ product, slug }: { product: ProductData; slug: string }) {
  const t = useTranslations('productDetail')
  const ref = useRef<HTMLElement>(null)
  const visible = useIntersection(ref as React.RefObject<Element>)

  return (
    <section ref={ref} className="pdp-cta-section">
      <div className="container pdp-cta-inner">
        <span className="label-tag pdp-cta-label">{t('ctaLabel')}</span>
        <h2 className="heading-lg" style={{
          color: 'var(--ink)', marginBottom: 14,
          opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.5s, transform 0.5s',
        }}>
          {t('ctaH1')}<br />
          <span className="gradient-text">{t('ctaH2')}</span>
        </h2>
        <p style={{
          color: 'var(--gray)', lineHeight: 1.75, marginBottom: 32,
          opacity: visible ? 1 : 0, transition: 'opacity 0.5s 0.1s',
        }}>
          {t('ctaDesc', { name: product.name })}
        </p>
        <div className="pdp-cta-buttons" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s 0.2s' }}>
          <a href={`/contact?ref=product-detail&product=${slug}`} className="btn-primary pdp-btn-link">
            {t('btnGetDemo')}
          </a>
          {product.datasheetUrl && (
            <a href={product.datasheetUrl} className="btn-outline pdp-btn-link-flex" download={`${slug}-datasheet.pdf`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              {t('btnDownloadDataSheet')}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function ProductDetailPage({ slug }: { slug: string }) {
  const t = useTranslations('productDetail')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pt = (key: string) => t(key as any)

  const assets = PRODUCT_ASSETS[slug]
  const k = SLUG_KEY[slug]

  if (!assets || !k) {
    return (
      <div className="pdp-not-found">
        <h1 className="pdp-not-found-heading">{t('notFoundH')}</h1>
        <a href="/overview" className="btn-primary pdp-btn-link">{t('btnBrowseAll')}</a>
      </div>
    )
  }

  const product: ProductData = {
    name:        pt(`${k}Name`),
    category:    pt(`${k}Category`),
    tagline:     pt(`${k}Tagline`),
    description: pt(`${k}Desc`),
    heroImage:   assets.heroImage,
    gallery:     assets.gallery,
    video: assets.video ? { ...assets.video, title: pt(`${k}VideoTitle`) } : null,
    benefits: Array.from({ length: 8 }, (_, i) => ({
      title: pt(`${k}B${i + 1}Title`),
      desc:  pt(`${k}B${i + 1}Desc`),
    })),
    quote: assets.hasQuote ? {
      text:    pt(`${k}QuoteText`),
      author:  pt(`${k}QuoteAuthor`),
      role:    pt(`${k}QuoteRole`),
      company: pt(`${k}QuoteCompany`),
    } : null,
    datasheetUrl: assets.datasheetUrl,
  }

  return (
    <>
      <HeroSection product={product} slug={slug} />
      {product.video && <VideoSection video={product.video} />}
      <BenefitsSection product={product} />
      <TechSection />
      <SecuritySection />
      {product.quote && <QuoteSection quote={product.quote} productName={product.name} />}
      <CTASection product={product} slug={slug} />
    </>
  )
}
