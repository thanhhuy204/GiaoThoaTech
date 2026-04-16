import { getRequestConfig } from 'next-intl/server'

export const locales = ['en', 'vi'] as const

export type Locale = (typeof locales)[number]

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !locales.includes(locale as Locale)) {
    locale = 'vi'
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})

