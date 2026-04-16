import { NextRequest, NextResponse } from 'next/server'
import { authSessionCookieBase, isRequestHttps } from '@/lib/authSessionCookies'

const BE_URL = process.env.API_URL ?? 'https://giaothoatech.cloud/api'

export async function POST(req: NextRequest) {
  const cookieOpts = authSessionCookieBase(req)
  const body = await req.json()
  let beRes: Response
  try {
    beRes = await fetch(`${BE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    return NextResponse.json({ message: 'Cannot connect to server' }, { status: 503 })
  }

  const data = await beRes.json().catch(() => ({}))
  const res = NextResponse.json(data, { status: beRes.status })

  // Tránh lỗi Vercel/NextJS Header flatttening khi mix res.headers.append và res.cookies.set
  // Bóc tách backend cookies và dùng res.cookies.set để quản lý đồng nhất
  const setCookies = beRes.headers.getSetCookie()
  setCookies.forEach(c => {
    const parts = c.split(';')
    const firstPart = parts[0].trim()
    const eqIdx = firstPart.indexOf('=')
    if (eqIdx === -1) return
    const name = firstPart.slice(0, eqIdx)
    const rawVal = firstPart.slice(eqIdx + 1)
    
    // Fallback: copy cookie từ backend vào nextjs cookie store, ưu tiên xài cookieOpts của NextJS
    if (name.toLowerCase() !== 'domain' && name.toLowerCase() !== 'path' && name.toLowerCase() !== 'secure') {
        try {
          res.cookies.set(name, rawVal, {
            ...cookieOpts,
            httpOnly: c.toLowerCase().includes('httponly'),
          })
        } catch (e) {}
    }
  })

  if (beRes.ok) {
    const payload = data.data
    const userData = payload?.user ?? (payload?.id ? payload : null)
    
    // Extract accessToken from JSON body or from Backend's Set-Cookie header
    let accessToken: string | undefined = 
      payload?.accessToken ?? 
      payload?.user?.accessToken ?? 
      payload?.token ?? 
      payload?.user?.token ??
      data?.accessToken ?? 
      data?.token

    if (!accessToken && setCookies.length > 0) {
      const tokenCookie = setCookies.find(c => c.toLowerCase().includes('token=') || c.toLowerCase().includes('jwt='))
      if (tokenCookie) {
        const match = tokenCookie.match(/(?:token|jwt)=([^;]+)/i)
        if (match) {
          accessToken = match[1]
        }
      }
    }

    if (accessToken) {
      res.cookies.set('auth_token', accessToken, {
        httpOnly: true,
        ...cookieOpts,
      })
    }

    if (userData && typeof userData === 'object' && userData.id) {
      // Lưu user data (không có token) vào non-httpOnly cookie cho client JS
      const { accessToken: _omit, ...userWithoutToken } = userData
      void _omit
      res.cookies.set('auth_user', JSON.stringify(userWithoutToken), {
        httpOnly: false,
        ...cookieOpts,
      })
    }
  }

  return res
}
