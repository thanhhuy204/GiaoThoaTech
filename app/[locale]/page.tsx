import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../components/trangchu/Hero'
import Awards from '../components/trangchu/Awards'
import Products from '../components/trangchu/Products'
import Solutions from '../components/trangchu/Solutions'
import Testimonials from '../components/trangchu/Testimonials'
import ComingSoon from '../components/trangchu/Comingsoon'
import DurabilityTabs from '../components/trangchu/DurabilityTabs'
import PrivacyCommitmentBlock from '../components/trangchu/PrivacyCommitmentBlock'
import HomeCareBlock from '../components/trangchu/HomeCareBlock'
import '../components/trangchu/trangchu.css'
import { locales } from '@/src/i18n'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function LocaleHomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ComingSoon />
      <HomeCareBlock />
      <Awards />
      <DurabilityTabs />
      <Products />
      <Solutions />
      <Testimonials />
      <PrivacyCommitmentBlock />
      <Footer />
    </main>
  )
}

