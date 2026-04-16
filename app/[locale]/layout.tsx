import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { Providers } from '../providers'
import { locales } from '@/src/i18n'
import ScrollRevealInit from '@/app/components/ui/ScrollRevealInit'
import AuthInit from '@/app/components/ui/AuthInit'

export const metadata: Metadata = {
  title: 'giaothoatech — Smart Protection Technology',
  description: 'Award-winning smart locks. Stress tested to the absolute limit. Nothing but the best.',
  icons: {
    icon: '/images/logo/logo1.jpg',
    shortcut: '/images/logo/logo1.jpg',
    apple: '/images/logo/logo1.jpg',
  },
}

type LocaleLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params
  const validLocale = locales.includes(locale as (typeof locales)[number])
    ? (locale as (typeof locales)[number])
    : 'vi'
  const messages = (await import(`@/messages/${validLocale}.json`)).default

  return (
    <html lang={validLocale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={validLocale} messages={messages}>
          <Providers>
            <AuthInit />
            <ScrollRevealInit />
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

