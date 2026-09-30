import './Footer.css'
import { useLanguage } from '../i18n/LanguageContext.jsx'

function Footer() {
  const { content, language, setLanguage } = useLanguage()

  return (
    <footer className="translation-site-footer">
      <div className="translation-site-footer__main">
        <div className="translation-site-footer__brand-block">
          <a className="translation-site-footer__brand" href="#start">
            <span>Deut<span>Solutions</span></span>
          </a>
          <p>{content.footer.tagline}</p>
        </div>
        <div className="translation-site-footer__column">
          <h2>{content.footer.services}</h2>
          {content.nav.links.slice(0, 4).map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </div>
        <div className="translation-site-footer__column">
          <h2>{content.footer.company}</h2>
          {content.nav.links.slice(4).map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </div>
        <div className="translation-site-footer__column">
          <h2>{content.footer.languages}</h2>
          {[
            ['de', 'Deutsch'],
            ['ar', 'العربية'],
            ['en', 'English'],
          ].map(([code, label]) => (
            <button className={language === code ? 'is-active' : ''} key={code} type="button" aria-pressed={language === code} onClick={() => setLanguage(code)}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="translation-site-footer__bottom">
        <span>© {new Date().getFullYear()} DeutSolutions</span>
        <div>
          <a href="#impressum">{content.footer.imprint}</a>
          <a href="#datenschutz">{content.footer.privacy}</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer