'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('hero')

  useEffect(() => {
    const timeoutId = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(timeoutId)
  }, [])

  const cls = (base: string, anim: string) =>
    mounted ? `${base} ${anim}` : base

  return (
    <section className="hero-section">
      {/* Cosmic background layers */}
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-stars-a" aria-hidden="true" />
      <div className="hero-stars-b" aria-hidden="true" />
      <div className="hero-stars-c" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      {/* Floating lock — left */}
      <div
        className={cls('hero-lock-left', 'anim-float-b')}
        aria-hidden="true"
      >
        <Image
          src="/images/Products/ChatGPT.png"
          alt=""
          width={150}
          height={250}
        />
      </div>

      {/* Main content */}
      <div className="hero-inner">

        {/* Badge */}
        <div className={cls('hero-badge', 'anim-fadeup delay-1')}>
          <span className="hero-badge-dot" aria-hidden="true" />
          {t('badge')}
        </div>

        {/* H1 */}
        <h1 className={cls('heading-xl hero-title', 'anim-fadeup delay-2')}>
          {t('titleLine1')}
          <br />
          <span className="hero-title-gradient">{t('titleHighlight')}</span>
          <br />
          {t('titleLine2')}
        </h1>

        {/* Subtitle */}
        <p className={cls('hero-subtitle', 'anim-fadeup delay-3')}>
          {t('subtitlePrefix')}{' '}
          <em className="hero-subtitle-em">{t('subtitleEmphasis')}</em>
        </p>

        {/* CTAs */}
        <div className={cls('hero-cta', 'anim-fadeup delay-4')}>
          <Link
            href="/contact?ref=hero-banner"
            className="btn-primary"
            aria-label={t('ctaPrimary')}
          >
            {t('ctaPrimary')}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2.5 7h9M8 3.5 11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link
            href="/products?ref=hero-banner"
            className="btn-ghost-white"
            aria-label={t('ctaSecondary')}
          >
            {t('ctaSecondary')}
          </Link>
        </div>

      </div>

      {/* Floating lock — right */}
      <div
        className={cls('hero-lock-right', 'anim-float-a')}
        aria-hidden="true"
      >
        <Image
          src="/images/Products/padlock-2.webp"
          alt=""
          width={150}
          height={250}
          priority
        />
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll" aria-hidden="true">
        <span className="hero-scroll-text">Scroll</span>
        <span className="hero-scroll-line" />
      </div>

      {/* Stats bar */}
      <div className={cls('hero-stats', 'anim-fadeup delay-5')}>
        <div className="hero-stat">
          <span className="hero-stat-value">100K+</span>
          <span className="hero-stat-label">{t('statTestingCycles')}</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-value">50+</span>
          <span className="hero-stat-label">{t('statCountries')}</span>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-value">8+</span>
          <span className="hero-stat-label">{t('statAwards')}</span>
        </div>
      </div>
    </section>
  )
}
