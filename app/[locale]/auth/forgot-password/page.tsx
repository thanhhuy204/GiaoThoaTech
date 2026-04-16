import { getTranslations } from 'next-intl/server'
import { locales } from '@/src/i18n'
import ForgotPasswordContent from './forgot-password-content'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata() {
  const t = await getTranslations('meta.forgotPassword')
  return { title: t('title'), description: t('description') }
}

export default function Page() {
  return <ForgotPasswordContent />
}
