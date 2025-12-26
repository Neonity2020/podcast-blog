import { type ReactNode, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'
import { isValidLocale, type Locale } from '@/i18n/config'

interface LanguageProviderProps {
  children: ReactNode
  language?: Locale
}

export function LanguageProvider({
  children,
  language,
}: LanguageProviderProps) {
  // Initialize language synchronously to avoid hydration mismatch
  if (language && isValidLocale(language) && i18n.language !== language) {
    i18n.changeLanguage(language)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateLangAttribute = (lng: string) => {
        document.documentElement.lang = lng
      }

      updateLangAttribute(i18n.language)

      i18n.on('languageChanged', updateLangAttribute)

      return () => {
        i18n.off('languageChanged', updateLangAttribute)
      }
    }
  }, [])

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
