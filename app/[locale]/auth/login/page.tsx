import { getTranslations } from 'next-intl/server'
import { locales } from '@/src/i18n'
import LoginContent from './login-content'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata() {
  const t = await getTranslations('meta.login')
  return { title: t('title'), description: t('description') }
}

export default function Page() {
  return <LoginContent />
}
