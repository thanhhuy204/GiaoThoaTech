'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

interface Product {
  nameKey: string
  slug: string
  descriptionKey: string
  img: string
  awardKey: string
}

const PRODUCTS: Product[] = [
  {
    nameKey: 'navbar.productsDeadboltGo',
    slug: 'deadbolt-go',
    descriptionKey: 'home.productsDeadboltGoDesc',
    img: '/images/Products/deadbolt-go.webp',
    awardKey: 'home.productsDeadboltGoAward',
  },
  {
    nameKey: 'navbar.productsKeybox3',
    slug: 'keybox-3',
    descriptionKey: 'home.productsKeybox3Desc',
    img: '/images/Products/keybox-3.webp',
    awardKey: 'home.productsKeybox3Award',
  },
  {
    nameKey: 'navbar.productsPadlock2',
    slug: 'padlock-2',
    descriptionKey: 'home.productsPadlock2Desc',
    img: '/images/Products/padlock-2.webp',
    awardKey: 'home.productsPadlock2Award',
  },
  {
    nameKey: 'navbar.productsCellularDeadbolt',
    slug: 'cellular-deadbolt',
    descriptionKey: 'home.productsCellularDeadboltDesc',
    img: '/images/Products/deadbolt.webp',
    awardKey: 'home.productsCellularDeadboltAward',
  },
  {
    nameKey: 'navbar.productsPadlockLite',
    slug: 'padlock-lite',
    descriptionKey: 'home.productsPadlockLiteDesc',
    img: '/images/Products/padlock-lite.webp',
    awardKey: 'home.productsPadlockLiteAward',
  },
]

export default function Products() {
  const t = useTranslations()

  return (
    <section className="products-section" id="products">
      <div className="container">

        {/* Header */}
        <div className="products-header">
          <span className="label-tag anim-fadeup">{t('home.productsLabel')}</span>
          <h2 className="heading-lg anim-fadeup delay-1 products-heading">
            {t('home.productsHeadingLine1')}<br />
            <span className="gradient-text">{t('home.productsHeadingHighlight')}</span>
          </h2>
          <div className="divider products-divider" />
        </div>

        {/* Grid */}
        <div className="products5-grid">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.slug} product={p} delay={(i + 1) as 1 | 2 | 3 | 4 | 5} />
          ))}
        </div>

      </div>
    </section>
  )
}

function ProductCard({ product: p, delay }: { product: Product; delay: 1 | 2 | 3 | 4 | 5 }) {
  const [hovered, setHovered] = useState(false)
  const t = useTranslations()

  const name = t(p.nameKey)
  const award = t(p.awardKey)
  const description = t(p.descriptionKey)

  return (
    <a
      href={`/products/${p.slug}`}
      aria-label={t('home.productsLearnMore')}
      className={`products-card anim-fadeup delay-${delay}`}
      style={{
        boxShadow: hovered ? '0 12px 28px rgba(0,0,0,0.13)' : '0 1px 4px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="products-card-img-wrap">
        <Image
          src={p.img}
          alt={name}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1024px) 33vw, 20vw"
          className="products-card-img"
          style={{
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        <div className="products-card-img-gradient" />
      </div>

      {/* Footer */}
      <div className="products-card-footer">
        {/* Award badge */}
        <span className="products-award-badge">
          🏆 {award}
        </span>

        <h3 className="products-card-name">
          {name}
        </h3>

        <p className="products-card-desc">
          {description}
        </p>

        <span className="products-card-link">
          {t('home.productsLearnMore')}
        </span>
      </div>
    </a>
  )
}
