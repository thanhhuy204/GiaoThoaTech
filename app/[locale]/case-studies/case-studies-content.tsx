'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import './case-studies.css'

// ─── Types ────────────────────────────────────────────────────────────────────

const INDUSTRY_TAGS = [
  'All',
  'Hospitality',
  'Single Family Rental',
  'Sharing Economy',
  'Multi-Family Residential',
  'Short-Term Rental',
  'Commercial Real Estate',
] as const

type IndustryTag = typeof INDUSTRY_TAGS[number]

interface CaseStudy {
  id: string
  company: string
  location: string
  quote: string
  industry: Exclude<IndustryTag, 'All'>
  products: string[]
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const CASE_STUDIES: CaseStudy[] = [
  { id: '1',  company: 'Loftaffair',      location: 'Germany',        quote: 'MobiSure transformed our check-in process completely. Our guests love the seamless keyless entry experience.',          industry: 'Short-Term Rental',        products: ['Deadbolt 2S', 'MobiSureHome app'] },
  { id: '2',  company: 'Kayakomat',       location: 'Sweden',         quote: "Managing 50+ kayak rental locations became effortless with MobiSure's smart lock solution.",                          industry: 'Sharing Economy',          products: ['Padlock 2', 'MobiSureConnect'] },
  { id: '3',  company: 'Hornbach',        location: 'Germany',        quote: "Our tool rental service scaled rapidly thanks to MobiSure's reliable and easy-to-manage access control.",              industry: 'Commercial Real Estate',   products: ['Retrofit Lock', 'MobiSureWork'] },
  { id: '4',  company: 'StayKing',        location: 'Singapore',      quote: 'We reduced check-in complaints by 90% after switching to MobiSure smart locks across all our properties.',            industry: 'Hospitality',              products: ['Mortise Touch', 'MobiSureHome'] },
  { id: '5',  company: 'PropNest',        location: 'United States',  quote: 'Our tenants appreciate the convenience of PIN codes and remote access management from day one.',                       industry: 'Single Family Rental',     products: ['Deadbolt Go', 'MobiSureAccess'] },
  { id: '6',  company: 'UrbanNest',       location: 'Australia',      quote: 'With MobiSure, managing access for 200+ apartment units is as simple as a few clicks on our dashboard.',             industry: 'Multi-Family Residential', products: ['Push-Pull Mortise', 'MobiSureWork'] },
  { id: '7',  company: 'BikeFlex',        location: 'Netherlands',    quote: "Our bike-sharing stations run 24/7 without staff thanks to MobiSure's reliable smart padlocks.",                     industry: 'Sharing Economy',          products: ['Padlock 2', 'MobiSureConnect'] },
  { id: '8',  company: 'Grand View Hotels', location: 'Thailand',     quote: 'Guest satisfaction scores jumped 15 points after deploying MobiSure access solutions in all 300 rooms.',             industry: 'Hospitality',              products: ['Mortise 2+', 'MobiSureHome'] },
  { id: '9',  company: 'StoreSafe',       location: 'United Kingdom', quote: 'Keyless entry for our self-storage facilities cut operational costs by 40% in the first year.',                      industry: 'Commercial Real Estate',   products: ['Gate Lock', 'MobiSureWork'] },
  { id: '10', company: 'CozyStay',        location: 'Spain',          quote: "Managing 120 vacation rentals across Europe is now seamless with MobiSure's centralized platform.",                  industry: 'Short-Term Rental',        products: ['Retrofit Lock', 'MobiSureHome app'] },
  { id: '11', company: 'MetroLiving',     location: 'Canada',         quote: 'Our residents love the app-based access. Maintenance requests dropped by 30% since installation.',                   industry: 'Multi-Family Residential', products: ['Mortise 2', 'MobiSureAccess'] },
  { id: '12', company: 'HomeRent Pro',    location: 'New Zealand',    quote: "Switching to MobiSure was the best decision for our growing single-family rental portfolio.",                         industry: 'Single Family Rental',     products: ['Deadbolt 2S', 'MobiSureHome'] },
]

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  'Hospitality':              { bg: '#eff6ff', color: '#2563eb' },
  'Single Family Rental':     { bg: '#f0fdf4', color: '#16a34a' },
  'Sharing Economy':          { bg: '#faf5ff', color: '#7c3aed' },
  'Multi-Family Residential': { bg: '#f0fdfa', color: '#0d9488' },
  'Short-Term Rental':        { bg: '#fff7ed', color: '#ea580c' },
  'Commercial Real Estate':   { bg: '#f9fafb', color: '#4b5563' },
}

const PAGE_SIZE = 12

// ─── Content Component ────────────────────────────────────────────────────────

export default function CaseStudiesContent() {
  const t = useTranslations('caseStudies')
  const [selectedTag, setSelectedTag] = useState<IndustryTag>('All')
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE)
  const [loading, setLoading] = useState(false)

  const filtered = selectedTag === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter(s => s.industry === selectedTag)

  const visible = filtered.slice(0, displayCount)
  const hasMore = displayCount < filtered.length

  function handleTagChange(tag: IndustryTag) {
    setSelectedTag(tag)
    setDisplayCount(PAGE_SIZE)
  }

  function handleLoadMore() {
    setLoading(true)
    setTimeout(() => {
      setDisplayCount(prev => prev + PAGE_SIZE)
      setLoading(false)
    }, 600)
  }

  return (
    <>
      {/* ── Hero (FEAT-020) ─────────────────────────────────────────── */}
      <section className="cs-hero">
        <div className="cs-hero-glow" />
        <div className="cs-hero-grid" />
        <div className="container cs-hero-inner">
          <nav aria-label="Breadcrumb" className="cs-breadcrumb">
            <ol className="cs-breadcrumb-list">
              <li><a href="/" className="cs-breadcrumb-link">Home</a></li>
              <li className="cs-breadcrumb-sep">/</li>
              <li className="cs-breadcrumb-current">Case Studies</li>
            </ol>
          </nav>
          <div className="cs-hero-content">
            <span className="label-tag anim-fadeup">{t('badge')}</span>
            <h1 className="heading-xl anim-fadeup delay-1 cs-hero-heading">
              {t('heroTitle')}<br />
              <span className="gradient-text">{t('heroHighlight')}</span>
            </h1>
            <div className="divider anim-fadeup delay-2 cs-hero-divider" />
            <p className="anim-fadeup delay-2 cs-hero-para">
              {t('heroSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* ── Case Studies List (FEAT-021 + FEAT-022 + FEAT-023) ─────── */}
      <section className="section-pad cs-list-section">
        <div className="container">

          {/* Industry tag filter */}
          <div
            role="group"
            aria-label="Filter by industry"
            className="cs-filter-group"
          >
            {INDUSTRY_TAGS.map(tag => {
              const isActive = selectedTag === tag
              return (
                <button
                  key={tag}
                  onClick={() => handleTagChange(tag)}
                  aria-pressed={isActive}
                  className={`cs-filter-btn${isActive ? ' active' : ''}`}
                >
                  {tag}
                </button>
              )
            })}
          </div>

          {/* Counter */}
          <p className="cs-counter">
            Showing <strong>{visible.length}</strong> of{' '}
            <strong>{filtered.length}</strong> case studies
          </p>

          {/* Grid */}
          {visible.length === 0 ? (
            <div className="cs-empty">
              <p className="cs-empty-text">
                No case studies found for this industry.
              </p>
              <button className="btn-outline cs-empty-btn" onClick={() => handleTagChange('All')}>
                View all
              </button>
            </div>
          ) : (
            <div className="cs-grid">
              {visible.map((study, i) => {
                const tag = TAG_COLORS[study.industry] ?? { bg: '#f9fafb', color: '#6b7280' }
                const initials = study.company.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
                return (
                  <div key={study.id} className={`anim-fadeup delay-${Math.min(i % 3 + 1, 5) as 1 | 2 | 3 | 4 | 5}`}>
                    <article className="card cs-card">
                      <div className="cs-card-header">
                        <div aria-hidden="true" className="cs-card-avatar">
                          {initials}
                        </div>
                        <div>
                          <p className="cs-card-company">{study.company}</p>
                          <p className="cs-card-location">{study.location}</p>
                        </div>
                      </div>
                      <blockquote className="cs-card-quote">
                        <p className="cs-card-quote-text">
                          &ldquo;{study.quote}&rdquo;
                        </p>
                      </blockquote>
                      <div className="cs-card-footer">
                        <span
                          className="cs-industry-tag"
                          style={{ background: tag.bg, color: tag.color }}
                        >
                          {study.industry}
                        </span>
                        <div className="cs-products-row">
                          <span className="cs-products-label">Made possible with:</span>
                          {study.products.map(p => (
                            <span key={p} className="cs-product-name">{p}</span>
                          ))}
                        </div>
                      </div>
                    </article>
                  </div>
                )
              })}
            </div>
          )}

          {/* Load more */}
          {hasMore && (
            <div className="cs-load-more">
              <button
                className="btn-outline cs-load-more-btn"
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="cs-spinner" />
                    Loading...
                  </>
                ) : 'Load more'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA (FEAT-024) ──────────────────────────────────────────── */}
      <section className="cs-cta-section">
        <div className="cs-cta-blob-top" />
        <div className="cs-cta-blob-bottom" />
        <div className="container cs-cta-inner">
          <span className="label-tag anim-fadeup cs-cta-label">{t('ctaTitle')}</span>
          <h2 className="heading-lg anim-fadeup delay-1 cs-cta-heading">
            {t('ctaSubtitle')}
          </h2>
          <div className="cs-cta-buttons anim-fadeup delay-2">
            <a href="/contact?ref=case-studies-cta" className="btn-primary cs-cta-btn" aria-label={t('ctaPrimary')}>
              {t('ctaPrimary')}
            </a>
            <a href="/overview" className="btn-ghost-white cs-cta-btn" aria-label={t('ctaSecondary')}>
              {t('ctaSecondary')}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
