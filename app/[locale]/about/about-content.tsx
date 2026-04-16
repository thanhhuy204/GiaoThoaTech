'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import './about.css'

// ─── Static data ──────────────────────────────────────────────────────────────

const CORE_VALUES = [
  {
    title: 'Have Fun',
    description: 'We believe great work happens when people enjoy what they do. Celebrations, laughter, and playfulness are part of how we build.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E8614A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/>
        <line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
  },
  {
    title: 'Resilient',
    description: 'We embrace challenges as opportunities. When things get hard, we dig deeper, adapt quickly, and come back stronger.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E8614A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
  {
    title: 'Empathy',
    description: 'We listen before we act. Understanding our customers, teammates, and partners drives every decision we make.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E8614A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    title: 'Teamwork',
    description: 'Diverse perspectives make us stronger. We collaborate openly across borders, disciplines, and time zones.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E8614A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: 'Action-oriented',
    description: 'We move fast and learn by doing. Thoughtful speed beats prolonged deliberation — progress over perfection.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E8614A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
]

const TEAM = [
  { initials: 'SC', name: 'Sarah Chen',    role: 'Chief Executive Officer', tenure: '7 years', color: '#2d2d2b' },
  { initials: 'JL', name: 'James Lim',     role: 'Chief Technology Officer', tenure: '6 years', color: '#374151' },
  { initials: 'MS', name: 'Maria Santos',  role: 'Head of Product',          tenure: '4 years', color: '#1f2937' },
  { initials: 'DK', name: 'David Kim',     role: 'VP Engineering',           tenure: '5 years', color: '#111827' },
]

const MISSION_STATS = [
  { value: '40%+', label: 'Women in leadership' },
  { value: '20+',  label: 'Nationalities' },
  { value: '100%', label: 'Equal pay' },
]

const PIN_TYPES = [
  { title: 'One-time',   description: 'Single-use PIN that expires immediately after use. Perfect for delivery or guest access.' },
  { title: 'Duration',   description: 'Valid for a set time window. Ideal for short-term rentals and contractors.' },
  { title: 'Recurring',  description: 'Repeats on a schedule — daily, weekly, or custom. Great for regular visitors.' },
  { title: 'Permanent',  description: 'Always valid until revoked. For trusted users like family or permanent staff.' },
]

// ─── Content Component ────────────────────────────────────────────────────────

export default function AboutContent() {
  const t = useTranslations('about')
  const [ctaHovered, setCtaHovered] = useState(false)

  return (
    <>
      {/* ── HERO ── */}
      <section className="about-hero">
        <div className="about-hero-glow" aria-hidden="true" />
        <div className="about-hero-grid"  aria-hidden="true" />
        <div className="about-hero-content">
          <nav className="about-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <span className="current">About</span>
          </nav>
          <div className="anim-fadeup delay-1">
            <span className="label-tag">{t('badge')}</span>
          </div>
          <h1 className="heading-xl anim-fadeup delay-2 about-hero-title">
            {t('heroTitle')}{' '}
            <span className="gradient-text">{t('heroHighlight')}</span>
          </h1>
          <p className="anim-fadeup delay-3 about-hero-subtitle">
            {t('heroSubtitle')}
          </p>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="about-values">
        <div className="container">
          <div className="about-values-header">
            <span className="label-tag">{t('valuesLabel')}</span>
            <h2 className="heading-lg about-values-heading">{t('valuesTitle')}</h2>
            <div className="divider about-values-divider" />
          </div>
          <div className="about-values-grid">
            {CORE_VALUES.map(v => (
              <div key={v.title} className="about-value-card">
                <div className="about-value-icon">{v.icon}</div>
                <h3 className="about-value-title">{v.title}</h3>
                <p className="about-value-desc">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="about-team">
        <div className="container">
          <div className="about-team-header">
            <span className="label-tag">{t('teamLabel')}</span>
            <h2 className="heading-lg about-team-heading">{t('teamTitle')}</h2>
            <div className="divider about-team-divider" />
          </div>
          <div className="about-team-grid">
            {TEAM.map(m => (
              <div key={m.name} className="about-team-card">
                <div className="about-team-avatar" style={{ background: m.color }}>
                  <span className="about-team-initials">{m.initials}</span>
                </div>
                <h3 className="about-team-name">{m.name}</h3>
                <p className="about-team-role">{m.role}</p>
                <span className="about-team-tenure">{m.tenure}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION / DIVERSITY ── */}
      <section className="about-mission">
        <div className="container">
          <div className="about-mission-grid">
            <div>
              <span className="label-tag">{t('missionLabel')}</span>
              <h2 className="heading-lg about-mission-heading">{t('missionTitle')}</h2>
              <div className="about-mission-accent" />
              <p className="about-mission-para">{t('missionBody')}</p>
            </div>
            <div className="about-mission-stats">
              {MISSION_STATS.map(s => (
                <div key={s.label} className="about-mission-stat">
                  <span className="about-mission-stat-value">{s.value}</span>
                  <span className="about-mission-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── JOIN CTA ── */}
      <section className="about-cta">
        <div className="container about-cta-inner">
          <h2 className="heading-lg anim-fadeup about-cta-heading">{t('ctaTitle')}</h2>
          <p className="anim-fadeup delay-1 about-cta-para">{t('ctaSubtitle')}</p>
          <div className="about-cta-buttons anim-fadeup delay-2">
            <a
              href="/careers"
              className="about-cta-btn-outline"
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
              style={{ background: ctaHovered ? '#fff' : 'transparent', color: ctaHovered ? '#E8614A' : '#fff' }}
            >
              {t('ctaPrimary')}
            </a>
            <a href="/contact" className="btn-ghost-white">{t('ctaSecondary')}</a>
          </div>
        </div>
      </section>

      {/* ── TECH TEASER ── */}
      <section className="about-tech">
        <div className="container">
          <div className="about-tech-grid">
            <div className="about-tech-text">
              <span className="label-tag">Powered by MobiSure</span>
              <h2 className="about-tech-title">
                <span className="heading-lg gradient-text about-algo-block">algoPIN&trade;</span>
                <span className="about-tech-subtitle">access without limits</span>
              </h2>
              <div className="about-tech-divider" />
              <p className="about-tech-para">
                Our patented algoPIN technology generates time-sensitive PIN codes entirely offline. No internet required. No cloud dependency. Just reliable, secure access that works everywhere.
              </p>
              <p className="about-tech-para-last">
                This is the foundation that makes MobiSure the trusted choice for enterprises operating across remote and high-security environments worldwide.
              </p>
              <a href="/technology" className="about-tech-link">
                Learn more about our technology
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
            </div>
            <div className="about-pin-grid">
              {PIN_TYPES.map(p => (
                <div key={p.title} className="about-pin-card">
                  <h4 className="about-pin-title">{p.title}</h4>
                  <p className="about-pin-desc">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
