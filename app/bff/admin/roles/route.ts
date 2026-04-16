import { NextRequest, NextResponse } from 'next/server'

const BE_URL = process.env.API_URL ?? 'https://giaothoatech.cloud/api'

function getBearerToken(req: NextRequest): string | null {
  return req.cookies.get('auth_token')?.value ?? null
}

export async function GET(req: NextRequest) {
  const requestCookies = req.headers.get('cookie') || ''
  const token = getBearerToken(req)
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Cookie': requestCookies,
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  let beRes: Response
  try {
    beRes = await fetch(`${BE_URL}/admin/roles`, { headers })
  } catch {
    return NextResponse.json({ message: 'Cannot connect to server' }, { status: 503 })
  }

  const data = await beRes.json().catch(() => ({}))
  return NextResponse.json(data, { status: beRes.status })
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const requestCookies = req.headers.get('cookie') || ''
  const token = getBearerToken(req)
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Cookie': requestCookies,
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  let beRes: Response
  try {
    beRes = await fetch(`${BE_URL}/admin/roles`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
  } catch {
    return NextResponse.json({ message: 'Cannot connect to server' }, { status: 503 })
  }

  const data = await beRes.json().catch(() => ({}))
  return NextResponse.json(data, { status: beRes.status })
}
