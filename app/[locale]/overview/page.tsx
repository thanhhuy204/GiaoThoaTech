import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Navbar from '@/app/components/layout/Navbar'
import Footer from '@/app/components/layout/Footer'
import { getTranslations } from 'next-intl/server'
import { locales } from '@/src/i18n'
import './overview.css'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata() {
  const t = await getTranslations('meta.overview')
  return { title: t('title'), description: t('description') }
}

interface Product {
  name: string
  slug: string
  image: string
  hasAward: boolean
}

const products: Product[] = [
  {
    name: 'Deadbolt Go',
    slug: 'deadbolt-go',
    image: '/images/Products/Details-deadbolt-go/deadbolt-go-black-3d-diagonal.webp',
    hasAward: true,
  },
  {
    name: 'Keybox 3',
    slug: 'keybox-3',
    image: '/images/Products/Details-Keybox-3/keybox-3-close-open.webp',
    hasAward: true,
  },
  {
    name: 'Padlock 2',
    slug: 'padlock-2',
    image: '/images/Products/Details-Padlock-2/padlock-2-1.webp',
    hasAward: false,
  },
  {
    name: 'Cellular Deadbolt',
    slug: 'cellular-deadbolt',
    image: '/images/Products/Details-cellular-deadbolt/cellular-deadbolt-and-keys.webp',
    hasAward: false,
  },
  {
    name: 'Padlock Lite',
    slug: 'padlock-lite',
    image: '/images/Products/Details-padlock-lite/sp3.webp',
    hasAward: false,
  },
]

const mediaNames: string[] = [
  'Digital Trends',
  'TechCrunch',
  'WSJ',
  'HuffPost',
  'GQ',
  'Forbes',
  'PC Magazine',
]

export default function Page() {
  const t = useTranslations('overview')

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="overview-hero">
          <div className="container overview-hero-inner">
            <span className="label-tag anim-fadeup">{t('badge')}</span>
            <h1 className="heading-xl anim-fadeup delay-1 overview-hero-heading">
              {t('heroTitle')}{' '}
              <span className="gradient-text">{t('heroHighlight')}</span>
            </h1>
            <p className="anim-fadeup delay-2 overview-hero-para">
              {t('heroSubtitle')}
            </p>
          </div>
        </section>

        {/* FEAT-007: Product List */}
        <section className="overview-lineup-section">
          <div className="container">
            <div className="overview-lineup-header">
              <span className="label-tag">{t('badge')}</span>
              <h2 className="heading-lg overview-lineup-heading">
                {t('heroTitle')}
              </h2>
            </div>
            <div className="overview-products-grid">
              {products.map((product) => (
                <a
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="overview-product-card"
                >
                  {/* Product image */}
                  <div className="overview-product-img">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  {/* Award badge */}
                  {product.hasAward && (
                    <div className="overview-award-wrap">
                      <span className="overview-award-badge">
                        {t(`products.${product.slug}.award`)}
                      </span>
                    </div>
                  )}
                  {/* Product name */}
                  <h3 className="overview-product-name">{product.name}</h3>
                  {/* Description */}
                  <p className="overview-product-desc">
                    {t(`products.${product.slug}.description`)}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FEAT-008: Media Logos */}
        <section className="overview-media-section">
          <div className="container overview-media-inner">
            <p className="overview-media-label">{t('mediaLabel')}</p>
            <div className="overview-media-logos">
              {mediaNames.map((name) => (
                <span key={name} className="overview-media-name">{name}</span>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
