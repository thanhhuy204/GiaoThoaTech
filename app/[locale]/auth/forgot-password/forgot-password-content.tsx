'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import {
  apiFindAccount,
  apiSendOtp,
  apiVerifyOtp,
  apiResetPassword,
  type FindAccountData,
  type SendOtpData,
} from '@/lib/authApi'
import './forgot-password.css'

/* ─── Password validation (matches backend pattern) ──────── */
// ^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$
const PW_PATTERN = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/

/* ─── Types ──────────────────────────────────────────────── */
type Step = 1 | 2 | 3 | 4 | 'success'
type Method = 'email' | 'sms' | 'password'

/* ─── Eye Icon ───────────────────────────────────────────── */
function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

/* ─── Password Strength (matches backend requirements) ──────
   Backend: must have >=1 uppercase, >=1 special char, >=8 chars
   Strength levels:
     0 = empty
     1 = weak  (len < 8 OR no uppercase OR no special)
     2 = medium (passes pattern but no digit)
     3 = strong (passes pattern + has digit)
*/
function getStrength(pw: string): 0 | 1 | 2 | 3 {
  if (!pw) return 0
  const hasLen = pw.length >= 8
  const hasUpper = /[A-Z]/.test(pw)
  const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pw)
  const hasDigit = /[0-9]/.test(pw)
  if (!hasLen || !hasUpper || !hasSpecial) return 1
  if (!hasDigit) return 2
  return 3
}

/* ─── Step Indicator ─────────────────────────────────────── */
function StepIndicator({ current }: { current: number }) {
  return (
    <div className="fp-steps" aria-label="Tiến độ">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className={`fp-step ${s < current ? 'done' : s === current ? 'active' : ''}`}>
          <div className="fp-step-dot">
            {s < current ? (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5L4.2 7.5L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : s}
          </div>
          {s < 4 && <div className="fp-step-line" />}
        </div>
      ))}
    </div>
  )
}

/* ─── OTP Input ──────────────────────────────────────────── */
function OTPInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  function handleKey(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !value[i] && i > 0) {
      inputRefs[i - 1].current?.focus()
    }
  }

  function handleChange(i: number, v: string) {
    const digit = v.replace(/\D/g, '').slice(-1)
    const next = [...value]
    next[i] = digit
    onChange(next)
    if (digit && i < 5) inputRefs[i + 1].current?.focus()
  }

  function handlePaste(e: React.ClipboardEvent) {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!text) return
    e.preventDefault()
    const next = Array(6).fill('')
    text.split('').forEach((c, i) => { next[i] = c })
    onChange(next)
    inputRefs[Math.min(text.length, 5)].current?.focus()
  }

  return (
    <div className="fp-otp-wrap" onPaste={handlePaste}>
      {value.map((digit, i) => (
        <input
          key={i}
          ref={inputRefs[i]}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKey(i, e)}
          className={`fp-otp-cell ${digit ? 'filled' : ''}`}
          aria-label={`Ký tự OTP thứ ${i + 1}`}
          autoComplete="one-time-code"
        />
      ))}
    </div>
  )
}

/* ─── Main Component ─────────────────────────────────────── */
export default function ForgotPasswordContent() {
  const t = useTranslations('forgotPassword')
  const locale = useLocale()
  const router = useRouter()

  const [step, setStep] = useState<Step>(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Step 1
  const [identifier, setIdentifier] = useState('')

  // Step 2 — from API
  const [account, setAccount] = useState<FindAccountData | null>(null)
  const [method, setMethod] = useState<Method | null>(null)

  // Step 3
  const [otp, setOtp] = useState(Array(6).fill(''))
  const [otpMeta, setOtpMeta] = useState<SendOtpData | null>(null)
  const [timer, setTimer] = useState(600)
  const [canResend, setCanResend] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Step 4
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [resetToken, setResetToken] = useState('')
  const [logoutAll, setLogoutAll] = useState(false)
  const strength = getStrength(password)

  /* Start countdown when reaching step 3 */
  useEffect(() => {
    if (step === 3) {
      setTimer((otpMeta?.expiresInMinutes ?? 10) * 60)
      setCanResend(false)
      timerRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) { clearInterval(timerRef.current!); setCanResend(true); return 0 }
          return prev - 1
        })
      }, 1000)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [step])

  const formatTimer = useCallback((s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0')
    const sec = (s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  }, [])

  /* ── Step 1: Find account ── */
  async function handleStep1() {
    if (!identifier.trim()) { setError(t('errIdentifierRequired')); return }
    setError('')
    setLoading(true)
    try {
      const res = await apiFindAccount(identifier.trim())
      setAccount(res.data)
      setStep(2)
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errGeneric'))
    } finally {
      setLoading(false)
    }
  }

  /* ── Step 2: Choose method ── */
  async function handleStep2() {
    if (!method) return
    if (method === 'password') { router.push(`/${locale}/auth/login`); return }
    if (!account) return
    setError('')
    setLoading(true)
    try {
      const res = await apiSendOtp(account.userId, method)
      setOtpMeta(res.data)
      setStep(3)
    } catch (err) {
      // Mask internal server errors (e.g. missing email template on BE)
      const msg = err instanceof Error ? err.message : ''
      setError(msg.startsWith('ENOENT') || msg.includes('template') ? t('errSendOtpFailed') : (msg || t('errGeneric')))
    } finally {
      setLoading(false)
    }
  }

  /* ── Step 3: Verify OTP ── */
  async function handleStep3() {
    const code = otp.join('')
    if (code.length < 6) { setError(t('errOTPIncomplete')); return }
    if (!account) return
    setError('')
    setLoading(true)
    try {
      const res = await apiVerifyOtp(account.userId, code)
      setResetToken(res.data.resetToken)
      setStep(4)
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errOTPInvalid'))
    } finally {
      setLoading(false)
    }
  }

  /* ── Step 4: Reset password ── */
  async function handleStep4() {
    if (!PW_PATTERN.test(password)) { setError(t('errPasswordWeak')); return }
    setError('')
    setLoading(true)
    try {
      await apiResetPassword(resetToken, password, logoutAll)
      setStep('success')
      setTimeout(() => router.push(`/${locale}/auth/login`), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errGeneric'))
    } finally {
      setLoading(false)
    }
  }

  /* ── Resend OTP: back to step 2 ── */
  function handleResend() {
    setOtp(Array(6).fill(''))
    setMethod(null)
    setStep(2)
  }

  const strengthLabel = ['', t('strengthWeak'), t('strengthMedium'), t('strengthStrong')][strength]
  const strengthCls = ['', 'weak', 'medium', 'strong'][strength]

  /* ── Success screen ── */
  if (step === 'success') {
    return (
      <div className="fp-page">
        <div className="fp-card">
          <div className="fp-success">
            <div className="fp-success-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#22c55e" />
                <path d="M9 16.5L13.5 21L23 11" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="fp-success-title">{t('successTitle')}</h1>
            <p className="fp-success-desc">{t('successDesc')}</p>
            <Link href={`/${locale}/auth/login`} className="fp-btn-primary">
              {t('successBtn')}
            </Link>
            <p className="fp-redirect-note">{t('successRedirect')}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fp-page">
      <div className="fp-card">
        {/* Logo */}
        <Link href={`/${locale}`} className="fp-logo-link">
          <Image src="/images/logo/Logo-footer.png" alt="giaothoatech" width={100} height={28} unoptimized />
        </Link>

        {/* Step indicator */}
        <StepIndicator current={typeof step === 'number' ? step : 4} />

        {/* ── Step 1 ── */}
        {step === 1 && (
          <div className="fp-step-body">
            <h1 className="fp-title">{t('step1Title')}</h1>
            <p className="fp-desc">{t('step1Desc')}</p>
            <div className="fp-field">
              <label htmlFor="fp-identifier" className="fp-label">{t('step1Label')}</label>
              <input
                id="fp-identifier"
                type="text"
                value={identifier}
                onChange={e => { setIdentifier(e.target.value); setError('') }}
                placeholder={t('step1Placeholder')}
                className={`fp-input ${error ? 'fp-input-error' : ''}`}
                autoComplete="username"
                onKeyDown={e => e.key === 'Enter' && !loading && handleStep1()}
              />
              {error && <p className="fp-error" role="alert">{error}</p>}
            </div>
            <button className="fp-btn-primary" onClick={handleStep1} disabled={loading || !identifier.trim()}>
              {loading && <span className="fp-spinner" />}
              {t('btnContinue')}
            </button>
            <Link href={`/${locale}/auth/login`} className="fp-back-link">{t('backToLogin')}</Link>
          </div>
        )}

        {/* ── Step 2 ── */}
        {step === 2 && account && (
          <div className="fp-step-body">
            <h1 className="fp-title">{t('step2Title')}</h1>
            <div className="fp-account-preview">
              <div className="fp-account-avatar">{account.userName.charAt(0).toUpperCase()}</div>
              <div>
                <p className="fp-account-name">{account.userName}</p>
                <p className="fp-account-sub">{identifier}</p>
              </div>
            </div>
            <div className="fp-method-list">
              {([
                // Email luôn có
                { key: 'email' as Method, icon: '📧', label: t('methodEmail'), sub: account.maskedEmail },

                // SMS chỉ khi có phone
                ...(account.maskedPhone
                  ? [{ key: 'sms' as Method, icon: '📱', label: t('methodSMS'), sub: account.maskedPhone }]
                  : []),

                // Password luôn có
                { key: 'password' as Method, icon: '🔑', label: t('methodPassword'), sub: '' },
              ] as { key: Method; icon: string; label: string; sub: string }[]).map(opt => (
                <label key={opt.key} className={`fp-method-option ${method === opt.key ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="method"
                    value={opt.key}
                    checked={method === opt.key}
                    onChange={() => setMethod(opt.key)}
                  />
                  <span className="fp-method-icon">{opt.icon}</span>
                  <div className="fp-method-info">
                    <span className="fp-method-label">{opt.label}</span>
                    {opt.sub && <span className="fp-method-sub">{opt.sub}</span>}
                  </div>
                  <div className={`fp-method-radio ${method === opt.key ? 'checked' : ''}`} />
                </label>
              ))}
            </div>
            {error && <p className="fp-error" role="alert">{error}</p>}
            <button className="fp-btn-primary" onClick={handleStep2} disabled={!method || loading}>
              {loading && <span className="fp-spinner" />}
              {t('btnContinue')}
            </button>
            <button className="fp-back-link" onClick={() => { setStep(1); setAccount(null) }}>{t('notYou')}</button>
          </div>
        )}

        {/* ── Step 3 ── */}
        {step === 3 && account && (
          <div className="fp-step-body">
            <h1 className="fp-title">{t('step3Title')}</h1>
            <p className="fp-desc">
              {t('step3Desc')} <strong>{otpMeta?.destination ?? (method === 'email' ? account.maskedEmail : account.maskedPhone)}</strong>
            </p>
            <OTPInput value={otp} onChange={v => { setOtp(v); setError('') }} />
            {error && <p className="fp-error" role="alert">{error}</p>}
            <div className={`fp-timer ${timer === 0 ? 'expired' : ''}`}>
              {timer > 0 ? `${t('timerLabel')} ${formatTimer(timer)}` : t('timerExpired')}
            </div>
            {canResend && (
              <button className="fp-resend-btn" onClick={handleResend}>{t('resendCode')}</button>
            )}
            <button
              className="fp-btn-primary"
              onClick={handleStep3}
              disabled={otp.join('').length < 6 || loading}
            >
              {loading && <span className="fp-spinner" />}
              {t('btnContinue')}
            </button>
            <button className="fp-back-link" onClick={() => setStep(2)}>{t('changeMethod')}</button>
          </div>
        )}

        {/* ── Step 4 ── */}
        {step === 4 && (
          <div className="fp-step-body">
            <h1 className="fp-title">{t('step4Title')}</h1>
            <p className="fp-desc">{t('step4Desc')}</p>
            {account && (
              <div className="fp-account-preview">
                <div className="fp-account-avatar">{account.userName.charAt(0).toUpperCase()}</div>
                <p className="fp-account-name">{account.userName}</p>
              </div>
            )}
            <div className="fp-field">
              <label htmlFor="fp-password" className="fp-label">{t('step4Label')}</label>
              <div className="fp-input-wrap">
                <input
                  id="fp-password"
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError('') }}
                  placeholder="••••••••"
                  className={`fp-input fp-input-icon ${error ? 'fp-input-error' : ''}`}
                  autoComplete="new-password"
                  onKeyDown={e => e.key === 'Enter' && !loading && handleStep4()}
                />
                <button type="button" className="fp-eye-btn" onClick={() => setShowPw(v => !v)} aria-label={showPw ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}>
                  <EyeIcon open={showPw} />
                </button>
              </div>
              {password && (
                <div className="fp-strength">
                  <div className="fp-strength-bar">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`fp-strength-seg ${strength >= i ? strengthCls : ''}`} />
                    ))}
                  </div>
                  <span className={`fp-strength-label ${strengthCls}`}>{strengthLabel}</span>
                </div>
              )}
              {error && <p className="fp-error" role="alert">{error}</p>}
            </div>
            <label className="fp-checkbox">
              <input type="checkbox" checked={logoutAll} onChange={e => setLogoutAll(e.target.checked)} />
              <span className="fp-checkbox-box" />
              <span className="fp-checkbox-label">{t('logoutAll')}</span>
            </label>
            <button
              className="fp-btn-primary"
              onClick={handleStep4}
              disabled={!PW_PATTERN.test(password) || loading}
            >
              {loading && <span className="fp-spinner" />}
              {t('btnContinue')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
