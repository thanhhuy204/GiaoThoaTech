import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Navbar from '@/app/components/layout/Navbar'
import Footer from '@/app/components/layout/Footer'
import { getTranslations } from 'next-intl/server'
import { locales } from '@/src/i18n'
import './access-control.css'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata() {
  const t = await getTranslations('meta.accessControl')
  return { title: t('title'), description: t('description') }
}

/* ─── Constants ──────────────────────────────────── */
const AC = '/images/Solutions/access-contro'

const PARTNER_LOGOS = [
  { src: `${AC}/logo/apthub-logo.png`,            alt: 'AptHub' },
  { src: `${AC}/logo/behome247-logo-1.png`,        alt: 'BeHome247' },
  { src: `${AC}/logo/geokey-logo.webp`,            alt: 'GeoKey' },
  { src: `${AC}/logo/logo-1.png`,                  alt: 'Partner' },
  { src: `${AC}/logo/logo-peek-1.png`,             alt: 'Peek' },
  { src: `${AC}/logo/smartrent_logo_color-1.webp`, alt: 'SmartRent' },
  { src: `${AC}/logo/swiftlane-logo-1.webp`,       alt: 'Swiftlane' },
  { src: `${AC}/logo/logo-white-1.webp`,           alt: 'Partner' },
]

/* ─── Main Component ─────────────────────────────── */
export default function Page() {
  const t = useTranslations('accessControl')

  return (
    <>
      <Navbar />
      <main>
        {/* ── FEAT-057: Hero ─────────────────────────────── */}
        <section className="ac-hero">
          <Image
            src={`${AC}/hinh-hero.webp`}
            alt="Apartment complex building"
            fill
            className="ac-hero-bg-img"
            priority
            unoptimized
          />
          <div className="ac-hero-overlay" />

          <div className="ac-hero-body">
            <div className="container">
              <div className="ac-hero-content">
                <span className="label-tag ac-label-dark anim-fadeup">{t('heroBadge')}</span>
                <h1 className="ac-hero-h1 anim-fadeup delay-1">{t('heroTitle')}</h1>
                <p className="ac-hero-sub anim-fadeup delay-2">{t('heroSubtitle')}</p>
                <div className="ac-hero-ctas anim-fadeup delay-3">
                  <Link href="/contact?ref=ac-hero" className="btn-primary">{t('heroCta')}</Link>
                  <Link href="/products" className="btn-ghost-white">{t('heroCtaSecondary')}</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEAT-058: Security Essentials ──────────────── */}
        <section className="ac-essentials">
          <div className="container ac-essentials-inner">
            <div className="ac-essentials-header reveal">
              <span className="label-tag">{t('essentialsLabel')}</span>
              <h2 className="ac-essentials-h2">{t('essentialsTitle')}</h2>
            </div>

            <div className="ac-cols reveal-stagger">
              {/* Column 1 */}
              <div className="ac-col hover-lift">
                <div className="ac-col-icon">
                  <Image src={`${AC}/icon/icon-1.svg`} alt="" width={48} height={48} unoptimized />
                </div>
                <h3 className="ac-col-title">{t('col1Title')}</h3>
                <p className="ac-col-desc">{t('col1Desc')}</p>
              </div>

              {/* Column 2 */}
              <div className="ac-col hover-lift">
                <div className="ac-col-icon">
                  <Image src={`${AC}/icon/icon-2.svg`} alt="" width={48} height={48} unoptimized />
                </div>
                <h3 className="ac-col-title">{t('col2Title')}</h3>
                <p className="ac-col-desc">{t('col2Desc')}</p>
              </div>

              {/* Column 3 */}
              <div className="ac-col hover-lift">
                <div className="ac-col-icon">
                  <Image src={`${AC}/icon/icon-3.svg`} alt="" width={48} height={48} unoptimized />
                </div>
                <h3 className="ac-col-title">{t('col3Title')}</h3>
                <p className="ac-col-desc">{t('col3Desc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEAT-059: Products ─────────────────────────── */}
        <section className="ac-products">
          <div className="container ac-products-inner">
            <div className="ac-products-header reveal">
              <span className="label-tag ac-label-light">{t('productsLabel')}</span>
              <h2 className="ac-products-h2">{t('productsTitle')}</h2>
              <p className="ac-products-sub">{t('productsSubtitle')}</p>
            </div>

            <div className="ac-product-grid">
              {/* Card 1 — Switch */}
              <div className="ac-product-card reveal-scale">
                <div className="ac-product-img-wrap">
                  <Image
                    src={`${AC}/product/switch.webp`}
                    alt="Switch Door Controller"
                    width={400}
                    height={300}
                    unoptimized
                    className="ac-product-img"
                  />
                </div>
                <div className="ac-product-info">
                  <span className="ac-product-tag">{t('product1Tag')}</span>
                  <h3 className="ac-product-name">{t('product1Name')}</h3>
                  <p className="ac-product-desc">{t('product1Desc')}</p>
                  <Link href="/products/switch" className="btn-primary">{t('product1Cta')}</Link>
                </div>
              </div>

              {/* Card 2 — MobiSureWork */}
              <div className="ac-product-card reveal-scale d-200">
                <div className="ac-product-img-wrap">
                  <Image
                    src={`${AC}/product/iglooworks-keypad-2.webp`}
                    alt="MobiSureWork software"
                    width={400}
                    height={300}
                    unoptimized
                    className="ac-product-img"
                  />
                </div>
                <div className="ac-product-info">
                  <span className="ac-product-tag">{t('product2Tag')}</span>
                  <h3 className="ac-product-name">{t('product2Name')}</h3>
                  <p className="ac-product-desc">{t('product2Desc')}</p>
                  <Link href="/products/iglooworks" className="btn-primary">{t('product2Cta')}</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEAT-060: Access Points Map ────────────────── */}
        <section className="ac-map">
          <div className="container ac-map-inner">
            <h2 className="ac-map-h2 reveal">{t('mapTitle')}</h2>
            <p className="ac-map-sub reveal d-100">{t('mapSubtitle')}</p>
            <div className="ac-map-img-wrap reveal-scale d-200">
              <Image
                src={`${AC}/0-default-map.webp`}
                alt="3D isometric map of apartment complex access points"
                width={900}
                height={600}
                unoptimized
                className="ac-map-img"
              />
            </div>
          </div>
        </section>

        {/* ── FEAT-061: Integrations ─────────────────────── */}
        <section className="ac-integrations">
          <div className="container ac-integrations-inner">
            <div className="ac-integrations-header reveal">
              <span className="label-tag">{t('integrationsLabel')}</span>
              <h2 className="ac-integrations-h2">{t('integrationsTitle')}</h2>
              <p className="ac-integrations-sub">{t('integrationsSubtitle')}</p>
            </div>

            <div className="ac-logo-grid reveal-stagger">
              {PARTNER_LOGOS.map((logo, i) => (
                <div key={i} className="ac-logo-item">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={140}
                    height={40}
                    unoptimized
                    className="ac-logo-img"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEAT-062: MobiSure's Mission ──────────────── */}
        <section className="ac-mission">
          <div className="container ac-mission-inner">
            <div className="ac-mission-logo reveal">
              <span className="ac-mission-brand">MobiSure</span>
            </div>
            <p className="ac-mission-text reveal d-100">{t('missionStatement')}</p>
            <Link href="/about" className="ac-mission-link reveal d-200" aria-label="Learn about MobiSure's mission">
              {t('missionLink')} →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
