import Navbar from '@/app/components/layout/Navbar'
import Footer from '@/app/components/layout/Footer'
import ProductDetailPage from '@/app/components/products/ProductDetailPage'
import { locales } from '@/src/i18n'

const PRODUCT_SLUGS = [
  'deadbolt-go',
  'keybox-3',
  'padlock-2',
  'cellular-deadbolt',
  'padlock-lite',
  'mortise-touch',
  'gate-lock',
] as const

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 0 }}>
        <ProductDetailPage slug={slug} />
      </main>
      <Footer />
    </>
  )
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    PRODUCT_SLUGS.map((slug) => ({ locale, slug }))
  )
}
