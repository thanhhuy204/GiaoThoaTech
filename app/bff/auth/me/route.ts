import { NextRequest, NextResponse } from 'next/server'
import { authSessionCookieBase } from '@/lib/authSessionCookies'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

const BE_URL = process.env.API_URL ?? 'https://giaothoatech.cloud/api'

export async function GET(req: NextRequest) {
  const requestCookies = req.headers.get('cookie') || ''

  // Fast path: read from cookie if available
  const userJson = req.cookies.get('auth_user')?.value
  if (userJson) {
    try {
      const user = JSON.parse(userJson)
      if (user?.id) return NextResponse.json(user, { status: 200 })
    } catch {}
  }

  // Fallback: call actual BE when auth_user is missing
  try {
    const token = req.cookies.get('auth_token')?.value
    const headers: Record<string, string> = {
      'Cookie': requestCookies,
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const beRes = await fetch(`${BE_URL}/auth/me`, { 
      headers,
      cache: 'no-store'
    })
    
    if (!beRes.ok) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    
    const beData = await beRes.json()
    const payload = beData?.data ?? beData
    const user = payload?.user ?? (payload?.id ? payload : null)

    const res = NextResponse.json(user, { status: 200 })
    if (user && typeof user === 'object' && user.id) {
       const { accessToken: _omit, token: _omit2, ...userWithoutToken } = user as any
       void _omit; void _omit2;
       res.cookies.set('auth_user', JSON.stringify(userWithoutToken), {
         httpOnly: false,
         ...authSessionCookieBase(req),
       })
    }
    return res
  } catch {
    return NextResponse.json({ message: 'Cannot connect to server' }, { status: 503 })
  }
}
