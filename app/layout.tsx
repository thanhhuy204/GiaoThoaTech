import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'giaothoatech — Smart Protection Technology',
  description: 'Award-winning smart locks. Stress tested to the absolute limit. Nothing but the best.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}

