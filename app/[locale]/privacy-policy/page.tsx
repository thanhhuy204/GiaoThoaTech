import Navbar from '@/app/components/layout/Navbar'
import Footer from '@/app/components/layout/Footer'
import { locales } from '@/src/i18n'
import PrivacyPolicyContent from './privacy-policy-content'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata() {
  return {
    title: 'Chính sách Bảo mật — Giaothoatech',
    description: 'Tìm hiểu cách Giaothoatech thu thập, sử dụng và bảo vệ dữ liệu cá nhân của bạn.',
  }
}

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <PrivacyPolicyContent />
      </main>
      <Footer />
    </>
  )
}
