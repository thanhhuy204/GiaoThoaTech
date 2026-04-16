'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useAppDispatch, useAppSelector } from '@/lib/store'
import { login, selectAuthStatus, clearError } from '@/lib/authSlice'
import './login.css'

/* ─── Types ───────────────────────────────────────────── */
interface LoginValues {
  email: string
  password: string
}

interface LoginErrors {
  email?: string
  password?: string
  form?: string
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
export default function LoginContent() {
  const locale = useLocale()
  const t = useTranslations('auth')
  const router = useRouter()
  const dispatch = useAppDispatch()
  const authStatus = useAppSelector(selectAuthStatus)

  const [values, setValues] = useState<LoginValues>({ email: '', password: '' })
  const [errors, setErrors] = useState<LoginErrors>({})
  const [showPassword, setShowPassword] = useState(false)

  const loading = authStatus === 'loading'

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof LoginErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
    dispatch(clearError())
  }

  function validate(): LoginErrors {
    const errs: LoginErrors = {}
    if (!values.email.trim()) {
      errs.email = t('errEmailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errs.email = t('errEmailInvalid')
    }
    if (!values.password.trim()) {
      errs.password = t('errPasswordRequired')
    }
    return errs
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    const result = await dispatch(login({ email: values.email, password: values.password }))
    if (login.fulfilled.match(result)) {
      const payloadData = result.payload.data
      const user = (payloadData && typeof payloadData === 'object' && 'user' in (payloadData as any)
        ? (payloadData as any).user
        : payloadData) as any

      const roles = user?.roles || []
      const isAdmin = roles.some((r: any) => r.code === 'SUPER_ADMIN')

      if (isAdmin) {
        router.push(`/${locale}/admin`)
      } else {
        router.push(`/${locale}`)
      }
    } else {
      const message = result.payload as string
      setErrors({ form: message ?? t('loginError') })
    }
  }

  const isDisabled = !values.email.trim() || !values.password.trim() || loading

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
              {t('brandHeadline')}<br />
              <span className="auth-brand-accent">{t('brandAccent')}</span>
            </h2>
            <p className="auth-brand-sub">
              {t('brandSub')}
            </p>

            <ul className="auth-brand-features">
              {[t('brandFeature1'), t('brandFeature2')].map(f => (
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
          <Link href="/vi/auth/login" className={`auth-lang-btn${locale === 'vi' ? ' active' : ''}`}>VI</Link>
          <span className="auth-lang-sep">|</span>
          <Link href="/en/auth/login" className={`auth-lang-btn${locale === 'en' ? ' active' : ''}`}>EN</Link>
        </div>

        <div className="auth-form-box">
          {/* Mobile logo */}
          <Link href={`/${locale}`} className="auth-mobile-logo">
            <Image src="/images/logo/Logo-footer.png" alt="MobiSure" width={120} height={32} unoptimized />
          </Link>

          <h1 className="auth-form-title">{t('loginTitle')}</h1>

          {errors.form && (
            <div className="auth-form-alert" role="alert">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="7" stroke="#EF4444" strokeWidth="1.5"/>
                <path d="M8 5v3.5M8 10.5v.5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="auth-form">
            {/* Email */}
            <div className="auth-field">
              <label htmlFor="email" className="auth-label">{t('loginEmail')}</label>
              <input
                id="email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`auth-input${errors.email ? ' auth-input-error' : ''}`}
                autoComplete="email"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" role="alert" className="auth-error">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="auth-field">
              <label htmlFor="password" className="auth-label">{t('loginPassword')}</label>
              <div className="auth-input-wrap">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`auth-input auth-input-with-icon${errors.password ? ' auth-input-error' : ''}`}
                  autoComplete="current-password"
                  aria-required="true"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
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
              {errors.password && (
                <p id="password-error" role="alert" className="auth-error">{errors.password}</p>
              )}
              <Link href={`/${locale}/auth/forgot-password`} className="auth-forgot-link">
                {t('loginForgot')}
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="auth-submit-btn"
              disabled={isDisabled}
              aria-busy={loading}
            >
              {loading ? <><Spinner /> {t('loginSubmit')}…</> : t('loginSubmit')}
            </button>
          </form>

          <p className="auth-switch-text">
            {t('loginNoAccount')}{' '}
            <Link href={`/${locale}/auth/register`} className="auth-switch-link">
              {t('loginRegisterLink')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
