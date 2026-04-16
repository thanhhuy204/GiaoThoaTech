import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Navbar from '@/app/components/layout/Navbar'
import Footer from '@/app/components/layout/Footer'
import { getTranslations } from 'next-intl/server'
import { locales } from '@/src/i18n'
import './integrations.css'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata() {
  const t = await getTranslations('meta.integrations')
  return { title: t('title'), description: t('description') }
}

interface Solution {
  name: string
  badgeColor: string
  image: string
  href: string
}

const solutions: Solution[] = [
  { name: 'MobiSureHome',    badgeColor: '#4CAF50', image: '/images/Integration/igloohome.webp',    href: '/integrations/mobisurehome' },
  { name: 'MobiSureAccess',  badgeColor: '#2196F3', image: '/images/Integration/iglooaccess.webp',  href: '/integrations/mobisureaccess' },
  { name: 'MobiSureConnect', badgeColor: '#9C27B0', image: '/images/Integration/iglooconnect.webp', href: '/integrations/mobisureconnect' },
  { name: 'MobiSureWork',    badgeColor: '#E8614A', image: '/images/Integration/iglooworks.webp',   href: '/integrations/mobisurework' },
]

const FEATURE_KEYS = ['feature1', 'feature2', 'feature3', 'feature4', 'feature5', 'feature6'] as const

export default function Page() {
  const t = useTranslations('integrations')

  return (
    <>
      <Navbar />
      <main>
        {/* FEAT-011: Hero */}
        <section className="integrations-hero">
          <div className="container integrations-hero-inner">
            <span className="label-tag anim-fadeup">{t('badge')}</span>
            <h1 className="integrations-hero-heading anim-fadeup delay-1">
              {t('heroTitle')}{' '}
              <span className="integrations-hero-heading-accent">{t('heroHighlight')}</span>
            </h1>
            <p className="integrations-hero-para anim-fadeup delay-2">
              {t('heroSubtitle')}
            </p>
          </div>
        </section>

        {/* FEAT-012: Four Solution Blocks */}
        <section className="integrations-solutions-section">
          <div className="container">
            <div className="integrations-solutions-header">
              <span className="label-tag">{t('pmsTitle')}</span>
              <h2 className="heading-lg integrations-solutions-heading">
                {t('pmsDesc')}
              </h2>
            </div>
            <div className="integrations-solutions-grid">
              {solutions.map((sol) => (
                <a
                  key={sol.name}
                  href={sol.href}
                  className="integrations-solution-card"
                >
                  {/* Badge */}
                  <div className="integrations-badge-wrap">
                    <span
                      className="integrations-badge"
                      style={{
                        backgroundColor: `${sol.badgeColor}26`,
                        color: sol.badgeColor,
                      }}
                    >
                      {t(`solutions.${sol.name}.badge`)}
                    </span>
                  </div>
                  {/* Solution image */}
                  <div className="integrations-solution-img">
                    <Image
                      src={sol.image}
                      alt={sol.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  {/* Title */}
                  <h3 className="integrations-solution-title">{sol.name}</h3>
                  {/* Description */}
                  <p className="integrations-solution-desc">{t(`solutions.${sol.name}.description`)}</p>
                  {/* Link */}
                  <span className="integrations-solution-link">{t('learnMore')}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FEAT-013: Key Features */}
        <section className="integrations-features-section">
          <div className="container">
            <div className="integrations-features-grid">
              {/* Left: heading */}
              <div>
                <span className="label-tag">{t('featuresLabel')}</span>
                <h2 className="heading-lg integrations-features-heading">
                  {t('featuresTitle')}
                </h2>
              </div>
              {/* Right: feature list */}
              <div className="integrations-feature-list">
                {FEATURE_KEYS.map((key) => (
                  <div key={key} className="integrations-feature-item">
                    <div className="integrations-check-circle">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="#E8614A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="integrations-feature-text">{t(key)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FEAT-014: CTA */}
        <section className="integrations-cta-section">
          <div className="container integrations-cta-inner">
            <span className="label-tag integrations-cta-label">{t('ctaTitle')}</span>
            <h2 className="heading-lg integrations-cta-heading">
              {t('ctaSubtitle')}
            </h2>
            <p className="integrations-cta-para">
              {t('heroSubtitle')}
            </p>
            <a
              href="/contact?ref=integrations-cta"
              className="btn-primary integrations-cta-btn"
            >
              {t('ctaPrimary')}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
