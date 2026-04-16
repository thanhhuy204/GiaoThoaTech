import { NextRequest, NextResponse } from 'next/server'
import { authSessionCookieBase } from '@/lib/authSessionCookies'

const BE_URL = process.env.API_URL ?? 'https://giaothoatech.cloud/api'

function getBearerToken(req: NextRequest): string | null {
  return req.cookies.get('auth_token')?.value ?? null
}

export async function POST(req: NextRequest) {
  // Gọi backend logout nếu có token (best-effort, không chặn nếu lỗi)
  const token = getBearerToken(req)
  if (token) {
    fetch(`${BE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Cookie': req.headers.get('cookie') ?? '',
      },
    }).catch(() => {/* ignore */})
  }

  const res = NextResponse.json({ message: 'Logged out' })

  // Nhập opts chuẩn giống lúc login (chuẩn Secure và SameSite)
  const baseOpts = authSessionCookieBase(req)

  const allCookies = req.cookies.getAll()
  allCookies.forEach(c => {
    if (c.name !== 'NEXT_LOCALE') {
      res.cookies.set(c.name, '', { ...baseOpts, maxAge: 0 })
    }
  })

  return res
}
