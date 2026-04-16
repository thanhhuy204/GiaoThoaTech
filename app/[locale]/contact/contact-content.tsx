'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import './contact.css'

/* ─── Types ──────────────────────────────────────────── */
interface FormValues {
  name: string
  email: string
  phone: string
  description: string
}

interface FormErrors {
  name?: string
  email?: string
  description?: string
}

/* ─── Constants ──────────────────────────────────────── */
const COUNTRY_OPTIONS = ['Singapore', 'USA', 'UK', 'Australia', 'Germany', 'Japan', 'Other']
const PROFILE_OPTIONS = ['Property Manager', 'Hotel/Hospitality', 'Developer/API', 'Enterprise', 'Other']

const TRUST_POINTS = [
  'Cam kết sản phẩm chính hãng và đầy đủ chứng từ',
  'Đội ngũ kỹ thuật lắp đặt trực tiếp và bảo hành tận nơi',
  'Tư vấn giải pháp lắp đặt đầy đủ',
]

/* ─── Sub-components ─────────────────────────────────── */

function OrangeCheck() {
  return (
    <span className="contact-orange-check">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M2 6.5L4.8 9.3L10 3" stroke="#E8614A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  )
}

function SuccessCard() {
  const t = useTranslations('contact')
  return (
    <div className="anim-fadeup contact-success-card">
      <div className="contact-success-icon">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M7 16.5L13 22.5L25 10" stroke="#E8614A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h2 className="heading-lg contact-success-heading">{t('successTitle')}</h2>
      <p className="contact-success-para">{t('successDesc')}</p>
      <Link href="/products" className="contact-success-link">
        Explore our products
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="#E8614A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>
    </div>
  )
}

/* ─── FieldGroup helper ──────────────────────────────── */
function FieldGroup({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error: string | undefined
  children: React.ReactNode
}) {
  return (
    <div className="form-group contact-field-group">
      <label className={`form-label${required ? ' form-label-required' : ''}`}>
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="form-error">{error}</p>
      )}
    </div>
  )
}

/* ─── Main Content Component ─────────────────────────── */
export default function ContactContent() {
  const t = useTranslations('contact')
  const [values, setValues] = useState<FormValues>({
    name: '', email: '', phone: '', description: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const target = e.target
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value
    setValues(prev => ({ ...prev, [target.name]: value }))
    if (errors[target.name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [target.name]: undefined }))
    }
  }

  function validate(): FormErrors {
    const errs: FormErrors = {}
    if (!values.name.trim()) errs.name = 'Name is required.'
    if (!values.email.trim()) {
      errs.email = 'Work email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errs.email = 'Please enter a valid email address.'
    }
    if (!values.description.trim()) errs.description = 'Project description is required.'
    return errs
  }

  const isDisabled =
    !values.name.trim() ||
    !values.email.trim() ||
    !values.description.trim() ||
    loading

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  return (
    <>
      {/* ── Hero + Form ──────────────────────────────── */}
      <section className="contact-section-hero">
        <div className="container">
          <div className="contact-hero-grid">

            {/* Left: Form */}
            <div className="contact-form-col">
              {submitted ? (
                <SuccessCard />
              ) : (
                <>
                  <span className="label-tag anim-fadeup">{t('badge')}</span>
                  <h2 className="heading-lg anim-fadeup delay-1 contact-form-heading">
                    {t('heroTitle')} <span className="gradient-text">{t('heroHighlight')}</span>
                  </h2>
                  <p className="anim-fadeup delay-2 contact-form-intro">
                    {t('heroSubtitle')}
                  </p>

                  <form onSubmit={handleSubmit} noValidate>

                    {/* Row 1: Name + Email */}
                    <div className="form-row-2col">
                      <FieldGroup label={t('formName')} required error={errors.name}>
                        <input
                          type="text"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          placeholder={t('formNamePlaceholder')}
                          className="form-input"
                          autoComplete="name"
                          aria-required="true"
                          aria-invalid={!!errors.name}
                        />
                      </FieldGroup>
                      <FieldGroup label={t('formEmail')} required error={errors.email}>
                        <input
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          placeholder={t('formEmailPlaceholder')}
                          className="form-input"
                          autoComplete="email"
                          aria-required="true"
                          aria-invalid={!!errors.email}
                        />
                      </FieldGroup>
                    </div>

                    {/* Row 2: Phone */}
                    <FieldGroup label="Số điện thoại" error={undefined}>
                      <input
                        type="tel"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        placeholder="Nhập số điện thoại của bạn"
                        className="form-input"
                        autoComplete="tel"
                      />
                    </FieldGroup>

                    {/* Row 4: Description (full width) */}
                    <FieldGroup label={t('formMessage')} required error={errors.description}>
                      <textarea
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder={t('formMessagePlaceholder')}
                        className="form-input form-textarea"
                        aria-required="true"
                        aria-invalid={!!errors.description}
                      />
                    </FieldGroup>

                    {/* Submit */}
                    <div className="contact-submit-row">
                      <button
                        type="submit"
                        className="btn-primary contact-submit-btn"
                        disabled={isDisabled}
                        aria-busy={loading}
                      >
                        {loading ? (
                          <>
                            <svg
                              width="16" height="16" viewBox="0 0 16 16" fill="none"
                              aria-hidden="true"
                              className="contact-spinner"
                            >
                              <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.35)" strokeWidth="2"/>
                              <path d="M8 2a6 6 0 0 1 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            {t('formSubmitting')}
                          </>
                        ) : (
                          t('formSubmit')
                        )}
                      </button>

                    </div>
                  </form>
                </>
              )}
            </div>

            {/* Right: Info */}
            <div className="contact-info-col">
              <div className="contact-info-panel">
                <h3 className="contact-info-heading">Tại sao nên chọn Giao Thoa Tech?</h3>

                <ul className="contact-trust-list">
                  {TRUST_POINTS.map(point => (
                    <li key={point} className="contact-trust-item">
                      <OrangeCheck />
                      <span className="contact-trust-text">{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="contact-details">
                  {/* Email */}
                  {/* VN Office */}
                  <div className="contact-detail-row">
                    <div className="contact-detail-icon">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6c0 3.75 4.5 8.5 4.5 8.5s4.5-4.75 4.5-8.5c0-2.485-2.015-4.5-4.5-4.5z" stroke="#E8614A" strokeWidth="1.4"/>
                        <circle cx="8" cy="6" r="1.5" stroke="#E8614A" strokeWidth="1.2"/>
                      </svg>
                    </div>
                    <div>
                      <p className="contact-detail-label">VN Office</p>
                      <p className="contact-detail-address">
                        138 Trần Lựu, phường Bình Trưng,<br/>TP Hồ Chí Minh, Việt Nam
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </>
  )
}
