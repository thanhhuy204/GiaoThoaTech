import type { NextRequest } from 'next/server'

export const AUTH_SESSION_MAX_AGE = 60 * 60 * 24 * 7

/**
 * Trình duyệt chỉ chấp nhận cookie `Secure` khi trang được mở qua HTTPS.
 * Sau Ingress / load balancer, Next thường thấy request nội bộ là http — cần
 * `X-Forwarded-Proto: https` để bật `secure` đúng lúc.
 *
 * Nếu cố `secure: true` mà user vào bằng http://, cookie sẽ không được lưu.
 */
export function isRequestHttps(req: NextRequest): boolean {
  if (process.env.COOKIE_FORCE_INSECURE === 'true') {
    return false
  }
  if (process.env.COOKIE_FORCE_SECURE === 'true') {
    return true
  }

  const forwarded = req.headers.get('x-forwarded-proto')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim().toLowerCase()
    if (first === 'https' || first === 'http') {
      return first === 'https'
    }
  }

  return req.nextUrl.protocol === 'https:'
}

export function authSessionCookieBase(req: NextRequest) {
  return {
    sameSite: 'lax' as const,
    path: '/',
    maxAge: AUTH_SESSION_MAX_AGE,
    secure: isRequestHttps(req),
  }
}

/** Dùng khi xóa cookie — path/secure/sameSite phải khớp lúc set. */
export function authSessionClearCookieBase(req: NextRequest) {
  return {
    secure: isRequestHttps(req),
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 0,
  }
}
