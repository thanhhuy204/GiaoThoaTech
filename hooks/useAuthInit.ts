'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useAppDispatch, useAppSelector } from '@/lib/store'
import { setUser, initAuth, selectAuthInitialized, selectAuthUser } from '@/lib/authSlice'
import type { AuthUser, Role } from '@/lib/authApi'

function readAuthUserCookie(): AuthUser | null {
  if (typeof document === 'undefined') return null
  const entry = document.cookie
    .split('; ')
    .find(c => c.startsWith('auth_user='))
  if (!entry) return null
  try {
    let raw = entry.slice('auth_user='.length)
    // Loại bỏ dấu ngoặc kép bọc ngoài nếu auth_user="..."
    if (raw.startsWith('"') && raw.endsWith('"')) {
      raw = raw.slice(1, -1)
    }
    const decoded = decodeURIComponent(raw)
    const user = JSON.parse(decoded) as AuthUser
    return user?.id ? user : null
  } catch (err) {
    console.error('Lỗi parse auth_user cookie:', err)
    return null
  }
}

function isAdmin(user: AuthUser): boolean {
  return (user.roles as Role[] | undefined)
    ?.some(r => r.code === 'ADMIN' || r.code === 'SUPER_ADMIN') ?? false
}

export function useAuthInit() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const locale = useLocale()
  const initialized = useAppSelector(selectAuthInitialized)
  const user = useAppSelector(selectAuthUser)
  const didRedirect = useRef(false)

  // Bước 1: Khôi phục auth state khi mount (chỉ chạy 1 lần)
  useEffect(() => {
    const cookieUser = readAuthUserCookie()
    if (cookieUser) {
      dispatch(setUser(cookieUser))
    } else {
      dispatch(initAuth())
    }
  }, [dispatch])

  // Bước 2: Redirect sau khi auth initialized xong (chỉ từ trang gốc)
  useEffect(() => {
    if (!initialized || !user || didRedirect.current) return

    const currentPath = window.location.pathname
    const rootPath = `/${locale}`
    const isRootPage = currentPath === rootPath || currentPath === `${rootPath}/`

    if (isRootPage && isAdmin(user)) {
      didRedirect.current = true
      router.push(`/${locale}/admin`)
    }
  }, [initialized, user, router, locale])
}
