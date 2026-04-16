import createMiddleware from 'next-intl/middleware'
import { type NextRequest, NextResponse } from 'next/server'
import { locales } from './src/i18n'

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'vi',
  localeDetection: false,
})

const AUTH_PAGES = ['/auth/login', '/auth/register']

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Explicit guard: skip API routes entirely
  if (pathname.startsWith('/api/') || pathname.startsWith('/bff/')) {
    return NextResponse.next()
  }

  const locale = locales.find(l => pathname.startsWith(`/${l}/`) || pathname === `/${l}`) ?? 'vi'
  const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), '') || '/'

  const token    = req.cookies.get('auth_token')?.value
  const authUser = req.cookies.get('auth_user')?.value
  const isAuthPage = AUTH_PAGES.some(p => pathWithoutLocale.startsWith(p))

  // Đã đăng nhập (cả 2 cookies hợp lệ) → không cho vào trang auth
  if (token && authUser && isAuthPage) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url))
  }

  return intlMiddleware(req)
}

export const config = {
  matcher: ['/((?!_next|api|bff|.*\\..*).*)', '/'],
}
