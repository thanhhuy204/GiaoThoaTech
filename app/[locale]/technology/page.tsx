import Navbar from '@/app/components/layout/Navbar'
import Footer from '@/app/components/layout/Footer'
import { getTranslations } from 'next-intl/server'
import { locales } from '@/src/i18n'
import TechnologyContent from './technology-content'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata() {
  const t = await getTranslations('meta.technology')
  return { title: t('title'), description: t('description') }
}

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <TechnologyContent />
      </main>
      <Footer />
    </>
  )
}
