import { useEffect, useState } from 'react'
import companyLogo from '../assets/logo.png'
import Icon from './Icon.jsx'
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import './Navbar.css'

function Navbar() {
  const { content } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const sections = content.nav.links
      .map(([, id]) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length) return undefined

    const observer = new IntersectionObserver((entries) => {
      const visibleSection = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top)[0]
      if (visibleSection) setActiveSection(visibleSection.target.id)
    }, { rootMargin: '-25% 0px -65% 0px', threshold: 0 })

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [content.nav.links])

  return (
    <header className="translation-site-header">
      <div className="translation-site-header__inner">
        <a className="translation-site-brand" href="#start" aria-label="DeutSolutions">
          <img src={companyLogo} alt="DeutSolutions" className="logo-deut" />
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
            <a key={id} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <LanguageSwitcher className="translation-site-mobile-language" />
          <a className="translation-site-request translation-site-mobile-request" href="#kontakt" onClick={() => setMenuOpen(false)}>{content.nav.cta}</a>
        </nav>

        <div className="translation-site-actions">
          <a className="translation-site-icon-link" href="#kontakt" aria-label={content.nav.profile}><Icon name="user" /></a>
          <a className="translation-site-icon-link" href="#kontakt" aria-label={content.nav.chat}><Icon name="chat" /></a>
          <a className="translation-site-request translation-site-desktop-request" href="#kontakt">{content.nav.cta}</a>
          <LanguageSwitcher className="translation-site-desktop-language" />
        </div>
      </div>
    </header>
  )
}

export default Navbar