'use client'

import { useState, ChangeEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useAppDispatch, useAppSelector } from '@/lib/store'
import { register, selectAuthStatus, clearError } from '@/lib/authSlice'
import '../login/login.css'
import './register.css'

/* ─── Types ───────────────────────────────────────────── */
interface RegisterValues {
  username: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

interface RegisterErrors {
  username?: string
  email?: string
  phone?: string
  password?: string
  confirmPassword?: string
  form?: string
}

/* ─── Password strength ───────────────────────────────── */
type StrengthLevel = 0 | 1 | 2 | 3 | 4

function getStrength(pw: string): StrengthLevel {
  if (!pw) return 0
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[!@#$%^&*(),.?":{}|<>]/.test(pw)) score++
  if (pw.length >= 12) score++
  return score as StrengthLevel
}

const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong']
const STRENGTH_CLASSES: Record<StrengthLevel, string> = {
  0: '',
  1: 'weak',
  2: 'fair',
  3: 'good',
  4: 'strong',
}

/* ─── Eye Icon ────────────────────────────────────────── */
function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

/* ─── Spinner ─────────────────────────────────────────── */
function Spinner() {
  return (
    <svg className="auth-spinner" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.35)" strokeWidth="2"/>
      <path d="M9 2a7 7 0 0 1 7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

/* ─── Main ────────────────────────────────────────────── */
export default function RegisterContent() {
  const locale = useLocale()
  const t = useTranslations('auth')
  const router = useRouter()
  const dispatch = useAppDispatch()
  const authStatus = useAppSelector(selectAuthStatus)

  const [values, setValues] = useState<RegisterValues>({
    username: '', email: '', phone: '', password: '', confirmPassword: '',
  })
  const [errors, setErrors] = useState<RegisterErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const loading = authStatus === 'loading'
  const strength = getStrength(values.password)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof RegisterErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
    dispatch(clearError())
  }

  function validate(): RegisterErrors {
    const errs: RegisterErrors = {}

    if (!values.username.trim()) {
      errs.username = t('errUsernameRequired')
    } else if (values.username.trim().length < 3) {
      errs.username = t('errUsernameMin')
    }

    if (!values.email.trim()) {
      errs.email = t('errEmailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errs.email = t('errEmailInvalid')
    }

    if (!values.password) {
      errs.password = t('errPasswordRequired')
    } else if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(values.password)) {
      errs.password = t('errPasswordWeak')
    }

    if (!values.confirmPassword) {
      errs.confirmPassword = t('errConfirmRequired')
    } else if (values.confirmPassword !== values.password) {
      errs.confirmPassword = t('errConfirmMismatch')
    }

    return errs
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    const payload = {
      userName: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      phoneNumber: values.phone.trim(),
    }
    const result = await dispatch(register(payload))
    if (register.fulfilled.match(result)) {
      router.push(`/${locale}`)
    } else {
      const message = result.payload as string
      setErrors({ form: message ?? t('registerError') })
    }
  }

  const isDisabled =
    !values.username.trim() ||
    !values.email.trim() ||
    !values.password ||
    !values.confirmPassword ||
    loading

  return (
    <div className="auth-page">
      {/* ── Left: Branding ── */}
      <div className="auth-brand-col">
        <div className="auth-brand-inner">
          <Link href={`/${locale}`} className="auth-logo-link">
            <Image
              src="/images/logo/Logo-footer.png"
              alt="MobiSure"
              width={140}
              height={36}
              unoptimized
            />
          </Link>

          <div className="auth-brand-body">
            <div className="auth-brand-img-wrap">
              <Image
                src="/images/logo/Logo-Login.png"
                alt="giaothoatech branding"
                width={260}
                height={260}
                unoptimized
                className="auth-brand-img"
              />
            </div>
            <h2 className="auth-brand-headline">
              {t('registerBrandHeadline')}<br />
              <span className="auth-brand-accent">{t('registerBrandAccent')}</span>
            </h2>
            <p className="auth-brand-sub">
              {t('registerBrandSub')}
            </p>

            <ul className="auth-brand-features">
              {[t('registerBrandFeature1'), t('registerBrandFeature2'), t('registerBrandFeature3')].map(f => (
                <li key={f} className="auth-brand-feature-item">
                  <span className="auth-brand-check" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7.5L5.5 10.5L11.5 4" stroke="#E8614A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <p className="auth-brand-footer">
            © 2026 giaothoatech. All rights reserved.
          </p>
        </div>
      </div>

      {/* ── Right: Form ── */}
      <div className="auth-form-col">
        {/* Language switcher */}
        <div className="auth-lang-switch">
          <Link href="/vi/auth/register" className={`auth-lang-btn${locale === 'vi' ? ' active' : ''}`}>VI</Link>
          <span className="auth-lang-sep">|</span>
          <Link href="/en/auth/register" className={`auth-lang-btn${locale === 'en' ? ' active' : ''}`}>EN</Link>
        </div>

        <div className="auth-form-box">
          {/* Mobile logo */}
          <Link href={`/${locale}`} className="auth-mobile-logo">
            <Image src="/images/logo/Logo-footer.png" alt="MobiSure" width={120} height={32} unoptimized />
          </Link>

          <h1 className="auth-form-title">{t('registerTitle')}</h1>

          {errors.form && (
            <div className="auth-form-alert" role="alert">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="7" stroke="#EF4444" strokeWidth="1.5"/>
                <path d="M8 5v3.5M8 10.5v.5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="auth-form reg-form">

            {/* Username */}
            <div className="auth-field">
              <label htmlFor="username" className="auth-label auth-label-required">{t('registerUsername')}</label>
              <input
                id="username"
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                placeholder={t('registerUsernamePlaceholder')}
                className={`auth-input${errors.username ? ' auth-input-error' : ''}`}
                autoComplete="username"
                aria-required="true"
                aria-invalid={!!errors.username}
                aria-describedby={errors.username ? 'username-error' : undefined}
              />
              {errors.username && (
                <p id="username-error" role="alert" className="auth-error">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div className="auth-field">
              <label htmlFor="reg-email" className="auth-label auth-label-required">{t('registerEmailLabel')}</label>
              <input
                id="reg-email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder={t('registerEmailPlaceholder')}
                className={`auth-input${errors.email ? ' auth-input-error' : ''}`}
                autoComplete="email"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'reg-email-error' : undefined}
              />
              {errors.email && (
                <p id="reg-email-error" role="alert" className="auth-error">{errors.email}</p>
              )}
            </div>

            {/* Phone (optional) */}
            <div className="auth-field">
              <label htmlFor="phone" className="auth-label">
                {t('registerPhoneLabel')}
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                placeholder={t('registerPhonePlaceholder')}
                className="auth-input"
                autoComplete="tel"
                aria-label={t('registerPhoneLabel')}
              />
            </div>

            {/* Password */}
            <div className="auth-field">
              <label htmlFor="reg-password" className="auth-label auth-label-required">{t('registerPasswordLabel')}</label>
              <div className="auth-input-wrap">
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`auth-input auth-input-with-icon${errors.password ? ' auth-input-error' : ''}`}
                  autoComplete="new-password"
                  aria-required="true"
                  aria-invalid={!!errors.password}
                  aria-describedby="reg-password-error reg-password-hint"
                />
                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>

              {/* Strength bar */}
              {values.password && (
                <div className="reg-strength-wrap">
                  <div className="auth-strength-bar">
                    {[1, 2, 3, 4].map(seg => (
                      <div
                        key={seg}
                        className={`auth-strength-seg${strength >= seg ? ` ${STRENGTH_CLASSES[strength]}` : ''}`}
                      />
                    ))}
                  </div>
                  <span className={`reg-strength-label reg-strength-${STRENGTH_CLASSES[strength]}`}>
                    {STRENGTH_LABELS[strength]}
                  </span>
                </div>
              )}

              {errors.password && (
                <p id="reg-password-error" role="alert" className="auth-error">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="auth-field">
              <label htmlFor="confirmPassword" className="auth-label auth-label-required">{t('registerConfirmPasswordLabel')}</label>
              <div className="auth-input-wrap">
                <input
                  id="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`auth-input auth-input-with-icon${errors.confirmPassword ? ' auth-input-error' : ''}`}
                  autoComplete="new-password"
                  aria-required="true"
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={errors.confirmPassword ? 'confirm-error' : undefined}
                />
                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setShowConfirm(v => !v)}
                  aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                >
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
              {errors.confirmPassword && (
                <p id="confirm-error" role="alert" className="auth-error">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="auth-submit-btn"
              disabled={isDisabled}
              aria-busy={loading}
            >
              {loading ? <><Spinner /> {t('registerSubmit')}…</> : t('registerSubmit')}
            </button>
          </form>

          <p className="auth-switch-text">
            {t('registerHaveAccount')}{' '}
            <Link href={`/${locale}/auth/login`} className="auth-switch-link">
              {t('registerLoginLink')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
