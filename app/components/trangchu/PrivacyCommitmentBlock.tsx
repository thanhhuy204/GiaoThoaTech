'use client'

import { useTranslations } from 'next-intl'

export default function PrivacyCommitmentBlock() {
  const t = useTranslations('home')

  return (
    <section className="privacy-section">
      <div className="privacy-inner">
        <span className="label-tag anim-fadeup privacy-label">
          {t('privacyLabel')}
        </span>

        <h2 className="heading-lg anim-fadeup delay-1 privacy-heading">
          {t('privacyHeadingLine1')}<br />{t('privacyHeadingLine2')}
        </h2>

        <p className="body-lg anim-fadeup delay-2 privacy-body">
          {t('privacyBody')}
        </p>

        <a
          href="/privacy-policy"
          className="btn-primary anim-fadeup delay-3 privacy-cta"
          aria-label={t('privacyCtaAria')}
        >
          {t('privacyCta')}
        </a>
      </div>
    </section>
  )
}
