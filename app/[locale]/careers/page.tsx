import Navbar from '@/app/components/layout/Navbar'
import Footer from '@/app/components/layout/Footer'
import { getTranslations } from 'next-intl/server'
import { locales } from '@/src/i18n'
import CareersContent from './careers-content'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata() {
  const t = await getTranslations('meta.careers')
  return { title: t('title'), description: t('description') }
}

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <CareersContent />
      </main>
      <Footer />
    </>
  )
}
