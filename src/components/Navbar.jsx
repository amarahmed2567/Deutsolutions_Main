import { useState } from 'react'
import Icon from './Icon.jsx'
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import './Navbar.css'

function Navbar() {
  const { content } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="translation-site-header">
      <div className="translation-site-header__inner">
        <a className="translation-site-brand" href="#start" aria-label="DeutSolutions">
          <span>Deut<span>Solutions</span></span>
        </a>

        <button
          className="translation-site-menu-toggle"
          type="button"
          aria-label={menuOpen ? content.nav.closeMenu : content.nav.openMenu}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} />
        </button>

        <nav className={`translation-site-nav${menuOpen ? ' is-open' : ''}`} aria-label={content.nav.links.map(([label]) => label).join(', ')}>
          {content.nav.links.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <LanguageSwitcher className="translation-site-mobile-language" />
        </nav>

        <div className="translation-site-actions">
          <a className="translation-site-icon-link" href="#kontakt" aria-label={content.nav.profile}><Icon name="user" /></a>
          <a className="translation-site-icon-link" href="#kontakt" aria-label={content.nav.chat}><Icon name="chat" /></a>
          <LanguageSwitcher className="translation-site-desktop-language" />
        </div>
      </div>
    </header>
  )
}

export default Navbar