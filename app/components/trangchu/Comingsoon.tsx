'use client'
import Image from 'next/image'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function ComingSoon() {
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [region, setRegion]   = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)
  const t = useTranslations('home')

  const regions = (t.raw('comingSoonRegions') as unknown) as string[]

  const handleSubmit = () => {
    if (!email || !region) return
    setSubmitted(true)
  }

  return (
    <section className="comingsoon-section" id="coming-soon">
      <div className="container">
        <div className="comingsoon-grid">

          {/* ── Left: Product image ── */}
          <div className="comingsoon-img-wrap">
            <Image
              src="/images/logo/Logo-Login.png"
              alt="giaothoatech"
              fill
              className="comingsoon-img"
            />
          </div>

          {/* ── Right: Form ── */}
          <div className="comingsoon-content-col">
            <h2 className="comingsoon-heading">
              {t('comingSoonHeadingLine1')}<br />{t('comingSoonHeadingLine2')}
            </h2>

            <p className="comingsoon-subtitle">
              {t('comingSoonSubtitle')}
            </p>

            <p className="comingsoon-desc">
              {t('comingSoonDescLine1')}{' '}
              <strong className="comingsoon-desc-strong">{t('comingSoonDescStrong')}</strong>
              {' '}{t('comingSoonDescLine2')}
            </p>

            {!submitted ? (
              <div className="comingsoon-form-col">
                {/* Name */}
                <div>
                  <label className="comingsoon-label">
                    {t('comingSoonName')}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    placeholder="Nhập họ tên của bạn"
                    className="comingsoon-input"
                    style={{
                      border: `1.5px solid ${focused === 'name' ? 'var(--primary)' : '#d1d5db'}`,
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="comingsoon-label">
                    {t('comingSoonEmail')}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    placeholder="Nhập email của bạn"
                    className="comingsoon-input"
                    style={{
                      border: `1.5px solid ${focused === 'email' ? 'var(--primary)' : '#d1d5db'}`,
                    }}
                  />
                </div>

                {/* Region */}
                <div>
                  <label className="comingsoon-label">
                    {t('comingSoonRegion')}
                  </label>
                  <div className="comingsoon-select-wrap">
                    <select
                      value={region}
                      onChange={e => setRegion(e.target.value)}
                      onFocus={() => setFocused('region')}
                      onBlur={() => setFocused(null)}
                      className="comingsoon-select"
                      style={{
                        border: `1.5px solid ${focused === 'region' ? 'var(--primary)' : '#d1d5db'}`,
                        color: region ? 'var(--dark)' : '#9ca3af',
                      }}
                    >
                      <option value="" disabled>{t('comingSoonRegionPlaceholder')}</option>
                      {regions.map(r => (
                        <option key={r} value={r} className="comingsoon-option">{r}</option>
                      ))}
                    </select>
                    {/* Chevron */}
                    <svg
                      className="comingsoon-select-chevron"
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5"
                    >
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={!email || !region}
                  className="comingsoon-submit"
                  style={{
                    background: !email || !region ? '#e5e7eb' : 'var(--primary)',
                    color: !email || !region ? '#9ca3af' : '#fff',
                    cursor: !email || !region ? 'not-allowed' : 'pointer',
                  }}
                  onMouseEnter={e => { if (email && region) e.currentTarget.style.background = 'var(--primary-dark)' }}
                  onMouseLeave={e => { if (email && region) e.currentTarget.style.background = 'var(--primary)' }}
                >
                  {t('comingSoonSubmit')}
                </button>

              </div>
            ) : (
              /* Success state */
              <div className="comingsoon-success">
                <div className="comingsoon-success-emoji">🎉</div>
                <h3 className="comingsoon-success-heading">
                  {t('comingSoonSuccessTitle')}
                </h3>
                <p className="comingsoon-success-text">
                  {t('comingSoonSuccessText', { email })}
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
