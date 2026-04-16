import { NextRequest, NextResponse } from 'next/server'
import { authSessionCookieBase } from '@/lib/authSessionCookies'

const BE_URL = process.env.API_URL ?? 'https://giaothoatech.cloud/api'

export async function PUT(req: NextRequest) {
  // Transfer full Browser Cookie to Backend
  const requestCookies = req.headers.get('cookie') || ''
  const authUserStr = req.cookies.get('auth_user')?.value

  let userId = ''
  try {
    const userObj = JSON.parse(authUserStr || '{}')
    userId = userObj.id
  } catch {}

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized, user missing. Please login again.' }, { status: 401 })
  }
  
  const body = await req.json()

  const token = req.cookies.get('auth_token')?.value
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Cookie': requestCookies,
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  try {
    const beRes = await fetch(`${BE_URL}/user/${userId}`, { 
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    })

    const data = await beRes.json().catch(() => ({}))
    const res = NextResponse.json(data, { status: beRes.status })

    if (beRes.ok) {
        // Update fast-path Redux cookie
        const userObj = data.data ?? data;
        let oldUser = {}
        if (authUserStr) {
           try { oldUser = JSON.parse(authUserStr) } catch {}
        }

        const newUserInfo = {
           ...oldUser,
           fullName: userObj?.fullName ?? userObj?.name ?? body.fullName,
           phoneNumber: userObj?.phoneNumber ?? body.phoneNumber,
        }
        res.cookies.set('auth_user', JSON.stringify(newUserInfo), {
          httpOnly: false,
          ...authSessionCookieBase(req),
        })
    }

    return res
  } catch {
    return NextResponse.json({ message: 'Cannot connect to server' }, { status: 503 })
  }
}
