import { createContext, useContext, useEffect, useState } from 'react'
import { supportedLanguages, translations } from './translations.js'

const LanguageContext = createContext(null)

function getInitialLanguage() {
  try {
    const stored = window.localStorage.getItem('deutsolutions-language')
    return supportedLanguages.includes(stored) ? stored : 'de'
  } catch {
    return 'de'
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage)

  useEffect(() => {
    try {
      window.localStorage.setItem('deutsolutions-language', language)
    } catch {
      // Language selection remains available when browser storage is disabled.
    }
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, content: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}
