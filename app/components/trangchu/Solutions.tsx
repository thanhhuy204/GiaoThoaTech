'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface Integration {
  id: string
  nameKey: string
  badgeKey: string
  badgeColor: string
  descriptionKey: string
  expandContentKey: string
  imageUrl: string
}

const INTEGRATIONS: Integration[] = [
  {
    id: 'mobisurehome',
    nameKey: 'home.integrations.mobisurehome.name',
    badgeKey: 'home.integrations.mobisurehome.badge',
    badgeColor: '#16a34a',
    descriptionKey: 'home.integrations.mobisurehome.description',
    expandContentKey: 'home.integrations.mobisurehome.expand',
    imageUrl: '/images/Integration/igloohome.webp',
  },
  {
    id: 'mobisureaccess',
    nameKey: 'home.integrations.mobisureaccess.name',
    badgeKey: 'home.integrations.mobisureaccess.badge',
    badgeColor: '#2563eb',
    descriptionKey: 'home.integrations.mobisureaccess.description',
    expandContentKey: 'home.integrations.mobisureaccess.expand',
    imageUrl: '/images/Integration/iglooaccess.webp',
  },
  {
    id: 'mobisureconnect',
    nameKey: 'home.integrations.mobisureconnect.name',
    badgeKey: 'home.integrations.mobisureconnect.badge',
    badgeColor: '#7c3aed',
    descriptionKey: 'home.integrations.mobisureconnect.description',
    expandContentKey: 'home.integrations.mobisureconnect.expand',
    imageUrl: '/images/Integration/iglooconnect.webp',
  },
  {
    id: 'mobisurework',
    nameKey: 'home.integrations.mobisurework.name',
    badgeKey: 'home.integrations.mobisurework.badge',
    badgeColor: '#E8614A',
    descriptionKey: 'home.integrations.mobisurework.description',
    expandContentKey: 'home.integrations.mobisurework.expand',
    imageUrl: '/images/Integration/iglooworks.webp',
  },
]

export default function Solutions() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const t = useTranslations()

  function toggle(id: string) {
    setExpanded(prev => (prev === id ? null : id))
  }

  return (
    <section className="solutions-section" id="integrations">
      <div className="container">

        {/* Header */}
        <div className="solutions-header">
          <span className="label-tag anim-fadeup">{t('home.solutionsLabel')}</span>
          <h2 className="heading-lg anim-fadeup delay-1 solutions-heading">
            {t('home.solutionsHeadingLine1')}<br />
            <span className="gradient-text">{t('home.solutionsHeadingHighlight')}</span>
          </h2>
          <div className="divider solutions-divider" />
        </div>

        {/* Cards */}
        <div className="integrations-grid">
          {INTEGRATIONS.map((item, i) => {
            const name = t(item.nameKey)
            const badge = t(item.badgeKey)
            const description = t(item.descriptionKey)
            const expandContent = t(item.expandContentKey)

            return (
              <article
                key={item.id}
                className={`solutions-card anim-fadeup delay-${(i + 1) as 1 | 2 | 3 | 4}`}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                {/* Image */}
                <div className="solutions-card-img-wrap">
                  <Image
                    src={item.imageUrl}
                    alt={name}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="solutions-card-img"
                  />
                </div>

                {/* Badge */}
                <span
                  className="solutions-badge"
                  style={{ background: item.badgeColor }}
                >
                  {badge}
                </span>

                <h3 className="solutions-card-name">
                  {name}
                </h3>

                <p className="solutions-card-desc">
                  {description}
                </p>

                {/* Expand button */}
                <div className="solutions-expand-row">
                  <button
                    onClick={() => toggle(item.id)}
                    aria-label={expanded === item.id ? `Collapse ${name}` : `Expand ${name}`}
                    aria-expanded={expanded === item.id}
                    className="solutions-expand-btn"
                    style={{
                      background: expanded === item.id ? 'var(--primary)' : 'transparent',
                      color: expanded === item.id ? '#fff' : 'var(--primary)',
                    }}
                  >
                    {expanded === item.id ? '−' : '+'}
                  </button>
                </div>

                {/* Expanded content */}
                {expanded === item.id && (
                  <p className="solutions-expanded-content">
                    {expandContent}
                  </p>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
