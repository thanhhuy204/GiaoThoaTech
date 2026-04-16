'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslations } from 'next-intl'

interface Story {
  id: string
  company: string
  initials: string
  products: string[]
}

const STORIES: Story[] = [
  { id: 'loftaffair',  company: 'Loftaffair',        initials: 'LA', products: ['Keybox 3', 'Padlock 2'] },
  { id: 'kayakomat',  company: 'Kayakomat',           initials: 'KM', products: ['Padlock 2', 'Cellular Deadbolt'] },
  { id: 'hornbach',   company: 'Hornbach',             initials: 'HB', products: ['Retrofit Lock', 'MobiSureWork'] },
  { id: 'grand-view', company: 'Grand View Hotels',   initials: 'GV', products: ['Mortise Touch', 'MobiSureHome'] },
  { id: 'stayking',   company: 'StayKing',             initials: 'SK', products: ['Deadbolt 2S', 'MobiSureAccess'] },
  { id: 'urbanest',   company: 'UrbanNest',            initials: 'UN', products: ['Push-Pull Mortise', 'MobiSureWork'] },
]

const VISIBLE = 3

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const t = useTranslations()

  const total = STORIES.length
  const maxIndex = total - VISIBLE

  const prev = useCallback(() => {
    setIndex(i => (i <= 0 ? maxIndex : i - 1))
  }, [maxIndex])

  const next = useCallback(() => {
    setIndex(i => (i >= maxIndex ? 0 : i + 1))
  }, [maxIndex])

  useEffect(() => {
    if (!autoplay) return
    const timeoutId = setTimeout(next, 5000)
    return () => clearTimeout(timeoutId)
  }, [index, autoplay, next])

  const visible = STORIES.slice(index, index + VISIBLE)

  return (
    <section
      className="testimonials-section"
      id="testimonials"
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      <div className="container">

        {/* Header */}
        <div className="testimonials-header">
          <span className="label-tag anim-fadeup">{t('home.testimonialsLabel')}</span>
          <h2 className="heading-lg anim-fadeup delay-1 testimonials-heading">
            {t('home.testimonialsHeadingLine1')}<br />
            <span className="gradient-text">{t('home.testimonialsHeadingHighlight')}</span>
          </h2>
          <div className="divider testimonials-divider" />
        </div>

        {/* Carousel */}
        <div
          role="region"
          aria-label={t('home.testimonialsRegionLabel')}
          className="testimonials-carousel"
        >
          <div className="stories-grid">
            {visible.map(s => (
              <StoryCard key={s.id} story={s} />
            ))}
          </div>

          {/* Navigation arrows */}
          <div className="testimonials-nav">
            <button
              onClick={prev}
              aria-label={t('home.testimonialsPrev')}
              className="testimonials-nav-btn"
            >
              ←
            </button>

            {/* Dots */}
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={t('home.testimonialsDot', { index: i + 1 })}
                className="testimonials-dot"
                style={{
                  background: i === index ? 'var(--primary)' : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}

            <button
              onClick={next}
              aria-label={t('home.testimonialsNext')}
              className="testimonials-nav-btn"
            >
              →
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="testimonials-cta">
          <a href="/case-studies" className="btn-primary" aria-label={t('home.testimonialsCta')}>
            {t('home.testimonialsCta')}
          </a>
        </div>

      </div>
    </section>
  )
}

function StoryCard({ story: s }: { story: Story }) {
  const [hovered, setHovered] = useState(false)
  const t = useTranslations('home')
  return (
    <article
      className="testimonials-card"
      style={{
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Logo / Initials */}
      <div className="testimonials-initials">
        {s.initials}
      </div>

      {/* Company */}
      <p className="testimonials-company">
        {s.company}
      </p>

      {/* Quote */}
      <blockquote className="testimonials-blockquote">
        <p className="testimonials-quote">
          &ldquo;{t(`story_${s.id}_testimonial` as 'story_loftaffair_testimonial')}&rdquo;
        </p>
      </blockquote>

      {/* Tags */}
      <div className="testimonials-tags">
        <span className="testimonials-tag-industry">
          {t(`story_${s.id}_industry` as 'story_loftaffair_industry')}
        </span>
        {s.products.map(p => (
          <span key={p} className="testimonials-tag-product">
            {p}
          </span>
        ))}
      </div>
    </article>
  )
}
