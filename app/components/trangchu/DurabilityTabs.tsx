'use client'
import { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'

const tabs = [
  {
    id: 'shock',
    video: '/video/2-2-padlock.mp4',
  },
  {
    id: 'subzero',
    video: '/video/2-1-padlock.mp4',
  },
  {
    id: 'weather',
    video: '/video/2-3-padlock.mp4',
  },
] as const

type TabId = (typeof tabs)[number]['id']

export default function DurabilityTabs() {
  const [active, setActive] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const t = useTranslations('home')
  const current = tabs[active]

  // Khi đổi tab: load lại video và play từ đầu
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.load()
    v.play().catch(() => {})
  }, [active])

  const getTabConfig = (id: TabId) => {
    const all = (t.raw('durabilityTabs') as unknown) as { id: TabId; label: string; desc: string }[]
    return all.find(tab => tab.id === id)!
  }

  const currentConfig = getTabConfig(current.id)

  return (
    <section className="dtabs-section">
      <div className="container">

        {/* Heading */}
        <div className="dtabs-heading">
          <span className="label-tag durability-label-color">{t('durabilityLabel')}</span>
          <h2 className="heading-lg dtabs-title">
            {t('durabilityHeadingLine1')}<br />
            <span className="gradient-text">{t('durabilityHeadingHighlight')}</span>
          </h2>
          <div className="dtabs-divider" />
        </div>

        {/* Video frame */}
        <div className="dtabs-media">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="dtabs-video"
          >
            <source src={current.video} type="video/mp4" />
          </video>
          <div className="dtabs-vignette" />
        </div>

        {/* Tab bar */}
        <div className="dtabs-bar">
          {tabs.map((tab, i) => {
            const config = getTabConfig(tab.id)
            return (
              <button
                key={tab.id}
                className={`dtabs-tab ${active === i ? 'dtabs-tab--active' : ''}`}
                onClick={() => setActive(i)}
              >
                {config.label}
                <span className="dtabs-tab-line" />
              </button>
            )
          })}
        </div>

        {/* Description */}
        <p key={current.id} className="dtabs-desc">
          {currentConfig.desc}
        </p>

      </div>
    </section>
  )
}
