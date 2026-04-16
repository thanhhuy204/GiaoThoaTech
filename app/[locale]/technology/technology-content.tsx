'use client'

import { useTranslations } from 'next-intl'
import './technology.css'

export default function TechnologyContent() {
  const t = useTranslations('technology')

  const handleScrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const flows = [
    {
      titleKey: 'flow1Title' as const,
      steps: [
        { titleKey: 'step1Title' as const, descKey: 'step1Desc' as const },
        { titleKey: 'step2Title' as const, descKey: 'step2Desc' as const },
        { titleKey: 'step3Title' as const, descKey: 'step3Desc' as const },
      ],
    },
    {
      titleKey: 'flow2Title' as const,
      steps: [
        { titleKey: 'step4Title' as const, descKey: 'step4Desc' as const },
        { titleKey: 'step5Title' as const, descKey: 'step5Desc' as const },
        { titleKey: 'step6Title' as const, descKey: 'step6Desc' as const },
      ],
    },
  ]

  const pinTypes = [
    { number: 1, titleKey: 'onePinTitle' as const, descKey: 'onePinDesc' as const },
    { number: 2, titleKey: 'timePinTitle' as const, descKey: 'timePinDesc' as const },
    { number: 3, titleKey: 'recurringPinTitle' as const, descKey: 'recurringPinDesc' as const },
    { number: 4, titleKey: 'permanentPinTitle' as const, descKey: 'permanentPinDesc' as const },
  ]

  return (
    <>
      {/* Hero */}
      <section className="tech-hero">
        <div className="container tech-hero-inner">
          <span className="label-tag anim-fadeup">{t('badge')}</span>
          <h1 className="heading-xl anim-fadeup delay-1 tech-hero-heading">
            {t('heroTitle')}{' '}
            <span className="gradient-text">{t('heroHighlight')}</span>
          </h1>
          <p className="anim-fadeup delay-2 tech-hero-para">{t('heroSubtitle')}</p>
          <div className="anim-fadeup delay-3">
            <button className="btn-primary" onClick={handleScrollToHowItWorks}>
              {t('heroCta')}
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="tech-how-section">
        <div className="container">
          <div className="tech-how-header">
            <span className="label-tag">{t('howItWorksLabel')}</span>
            <h2 className="heading-lg tech-how-heading">{t('howItWorksTitle')}</h2>
            <p className="tech-how-para">{t('howItWorksPara')}</p>
          </div>
          <div className="tech-flows-grid">
            {flows.map((flow) => (
              <div key={flow.titleKey}>
                <h3 className="tech-flow-heading">{t(flow.titleKey)}</h3>
                <div className="tech-flow-steps">
                  {flow.steps.map((step, index) => (
                    <div key={step.titleKey}>
                      <div className="tech-step-row">
                        <div className="tech-step-badge">{index + 1}</div>
                        <div>
                          <p className="tech-step-name">{t(step.titleKey)}</p>
                          <p className="tech-step-desc">{t(step.descKey)}</p>
                        </div>
                      </div>
                      {index < flow.steps.length - 1 && <div className="tech-step-connector" />}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PIN Types */}
      <section className="tech-pin-section">
        <div className="container">
          <div className="tech-pin-header">
            <span className="label-tag">{t('pinTypesLabel')}</span>
            <h2 className="heading-lg tech-pin-heading">{t('pinTypesTitle')}</h2>
          </div>
          <div className="tech-pin-grid">
            {pinTypes.map((pin) => (
              <div key={pin.number} className="tech-pin-card">
                <div className="tech-pin-badge">{pin.number}</div>
                <h3 className="tech-pin-name">{t(pin.titleKey)}</h3>
                <p className="tech-pin-desc">{t(pin.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tech-cta-section">
        <div className="container tech-cta-inner">
          <h2 className="heading-lg tech-cta-heading">{t('ctaTitle')}</h2>
          <p className="tech-cta-para">{t('ctaSubtitle')}</p>
          <div className="tech-cta-buttons">
            <a href="/contact?ref=technology-cta" className="btn-primary tech-cta-btn">{t('ctaPrimary')}</a>
            <a href="/overview" className="btn-ghost-white tech-cta-btn">{t('ctaSecondary')}</a>
          </div>
        </div>
      </section>
    </>
  )
}
