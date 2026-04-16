import { getTranslations } from 'next-intl/server'
import { locales } from '@/src/i18n'
import Navbar from '@/app/components/layout/Navbar'
import Footer from '@/app/components/layout/Footer'
import AccountContent from './account-content'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata() {
  const t = await getTranslations('meta.account')
  return { title: t('title'), description: t('description') }
}

export default function Page() {
  return (
    <>
      <Navbar />
      <main><AccountContent /></main>
      <Footer />
    </>
  )
}
