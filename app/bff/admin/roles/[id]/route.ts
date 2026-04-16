import { NextRequest, NextResponse } from 'next/server'

const BE_URL = process.env.API_URL ?? 'https://giaothoatech.cloud/api'

function getBearerToken(req: NextRequest): string | null {
  return req.cookies.get('auth_token')?.value ?? null
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
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

  // Define strategy: Try plural, singular, and different methods
  const endpoints = [
    { url: `${BE_URL}/admin/roles/${id}`, method: 'PATCH' },
    { url: `${BE_URL}/admin/roles/${id}`, method: 'PUT' },
    { url: `${BE_URL}/admin/role/${id}`, method: 'PATCH' },
    { url: `${BE_URL}/admin/role/${id}`, method: 'PUT' },
  ]

  let lastStatus = 404
  let lastData = { message: 'None of the tested endpoints succeeded' }

  for (const endpoint of endpoints) {
    try {
      console.log(`[BFF DEBUG] Trying ${endpoint.method} ${endpoint.url}`)
      const beRes = await fetch(endpoint.url, {
        method: endpoint.method,
        headers,
        body: JSON.stringify(body),
        cache: 'no-store'
      })

      if (beRes.ok) {
        const data = await beRes.json().catch(() => ({}))
        console.log(`[BFF DEBUG] SUCCESS: ${endpoint.method} ${endpoint.url}`)
        return NextResponse.json(data, { status: beRes.status })
      }
      
      lastStatus = beRes.status
      lastData = await beRes.json().catch(() => ({}))
      console.warn(`[BFF DEBUG] FAILED (${beRes.status}): ${endpoint.method} ${endpoint.url}`)
      
      // If we got something else like 401, 403, 500, we should probably stop and return that error
      if (beRes.status !== 404 && beRes.status !== 405) {
        return NextResponse.json(lastData, { status: beRes.status })
      }
    } catch (e) {
      console.error(`[BFF DEBUG] ERROR connecting to ${endpoint.url}:`, e)
    }
  }

  return NextResponse.json(lastData, { status: lastStatus })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const requestCookies = req.headers.get('cookie') || ''
  const token = getBearerToken(req)
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Cookie': requestCookies,
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  // Strategy: Try plural, singular
  const endpoints = [
    { url: `${BE_URL}/admin/roles/${id}` },
    { url: `${BE_URL}/admin/role/${id}` },
  ]

  for (const endpoint of endpoints) {
    try {
      const beRes = await fetch(endpoint.url, {
        method: 'DELETE',
        headers,
      })

      if (beRes.ok) {
        const data = await beRes.json().catch(() => ({}))
        return NextResponse.json(data, { status: beRes.status })
      }
    } catch {
      // Continue to next endpoint
    }
  }

  return NextResponse.json({ message: 'Role deletion failed on all suspected endpoints' }, { status: 404 })
}
