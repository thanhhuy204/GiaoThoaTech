import { NextRequest, NextResponse } from 'next/server'

const BE_URL = process.env.API_URL ?? 'https://giaothoatech.cloud/api'

export async function POST(req: NextRequest) {
  const body = await req.json()
  let beRes: Response
  try {
    beRes = await fetch(`${BE_URL}/auth/forgot-password/find-account`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  } catch {
    return NextResponse.json({ message: 'Cannot connect to server' }, { status: 503 })
  }
  const data = await beRes.json().catch(() => ({}))
  return NextResponse.json(data, { status: beRes.status })
}
