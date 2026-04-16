'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useLocale } from 'next-intl'
import './Footer.css'

const cols = {
  PRODUCTS: 'footer.colProducts',
  DISCOVER: 'footer.colDiscover',
  SOLUTIONS: 'footer.colSolutions',
  SUPPORT: 'footer.colSupport',
  'JOIN US': 'footer.colJoinUs',
} as const

type ColKey = keyof typeof cols

export default function Footer() {
  const t = useTranslations()

  const raw = (key: string) => (t.raw(key) as unknown) as string[]

  const getLinks = (col: ColKey) => {
    switch (col) {
      case 'PRODUCTS':  return raw('footer.products')
      case 'DISCOVER':  return raw('footer.discover')
      case 'SOLUTIONS': return raw('footer.solutions')
      case 'SUPPORT':   return raw('footer.support')
      case 'JOIN US':   return raw('footer.joinUs')
    }
  }

  const bottomLinks = raw('footer.bottomLinks')
  const locale = useLocale()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          {/* Brand col */}
          <div>
            <div className="footer-brand">
              <Image
                src="/images/logo/Logo-footer.png"
                alt="giaothoatech"
                width={160}
                height={48}
                unoptimized
                className="footer-logo-img"
              />
              <span className="footer-brand-name">giaothoaTech</span>
            </div>

            <p className="footer-description">
              {t('footer.description')}
            </p>

            {/* Subscribe */}
            <div className="footer-subscribe">
              <p className="footer-subscribe-title">{t('footer.subscribeTitle')}</p>
              <p className="footer-subscribe-desc">{t('footer.subscribeDescription')}</p>
              <div className="footer-subscribe-form">
                <input type="email" placeholder={t('footer.subscribePlaceholder')} className="footer-input" />
                <button className="btn-primary footer-btn">
                  {t('footer.subscribeButton')}
                </button>
              </div>
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(cols).map(([cat, key]) => (
            <div key={cat} className="footer-column">
              <h4>{t(key)}</h4>
              <ul>
                {getLinks(cat as ColKey).map(l => (
                  <li key={l}>
                    <a href="#" className="footer-link">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            {t('footer.bottomCopyright')}
          </p>
          <div className="footer-links">
            {bottomLinks.map((text, i) => {
              const href = i === 0 ? `/${locale}/privacy-policy` : '#'
              return (
                <Link key={text} href={href} className="footer-policy-link">{text}</Link>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}