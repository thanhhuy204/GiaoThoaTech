import { setRequestLocale } from 'next-intl/server'
import EditContent from './edit-content'

export default async function AccountEditPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <EditContent />
}
