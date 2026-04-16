'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'

const awards = [
  { img: '/images/logo-doitac/anh1.jpg' },
  { img: '/images/logo-doitac/anh2.png' },
  { img: '/images/logo-doitac/anh3.png' },
  { img: '/images/logo-doitac/anh4.png' },
]

export default function Awards() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const t = useTranslations()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="awards-section">
      <div className="container">

        {/* Header với animation stagger */}
        <div className="awards-header" ref={ref}>
          <span className="label-tag">{t('home.awardsLabel')}</span>
          <h2 className="heading-lg awards-title">
            <span className={`awards-word awards-word-delay-0 ${visible ? 'awards-word--in' : ''}`}>
              {t('home.awardsTitleWord1')}
            </span>
            {' '}
            <span className={`awards-word gradient-text awards-word-delay-320 ${visible ? 'awards-word--in' : ''}`}>
              {t('home.awardsTitleWord2')}
            </span>
          </h2>
          <p className={`awards-sub ${visible ? 'awards-sub--in' : ''}`}>
            {t('home.awardsSubtitleLine1')}
            {' '}
            {t('home.awardsSubtitleLine2')}
            {' '}
            <span className="awards-highlight">{t('home.awardsSubtitleHighlight')}</span>
          </p>
        </div>

        {/* Ticker */}
        <div className="awards-ticker-wrap">
          <div className="awards-fade awards-fade--left" />
          <div className="awards-fade awards-fade--right" />
          <div className="anim-ticker">
            {[...awards, ...awards].map((a, i) => (
              <div key={i} className="award-card">
                <div className="award-img-wrap">
                  <Image
                    src={a.img}
                    alt="Award"
                    fill
                    sizes="108px"
                    className="awards-img-object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
