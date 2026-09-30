import { useLanguage } from '../../i18n/LanguageContext.jsx'
import './LanguageSwitcher.css'

function LanguageSwitcher({ className = '' }) {
  const { language, setLanguage, content } = useLanguage()

  return (
    <div className={`translation-language-switcher ${className}`} role="group" aria-label={content.nav.language}>
      {[
        ['de', 'DE'],
        ['en', 'EN'],
        ['ar', 'AR'],
      ].map(([code, label]) => (
        <button
          className={language === code ? 'is-active' : ''}
          key={code}
          type="button"
          aria-pressed={language === code}
          onClick={() => setLanguage(code)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitcher
