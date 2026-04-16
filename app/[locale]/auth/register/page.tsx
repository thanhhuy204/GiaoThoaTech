import { getTranslations } from 'next-intl/server'
import { locales } from '@/src/i18n'
import RegisterContent from './register-content'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata() {
  const t = await getTranslations('meta.register')
  return { title: t('title'), description: t('description') }
}

export default function Page() {
  return <RegisterContent />
}
