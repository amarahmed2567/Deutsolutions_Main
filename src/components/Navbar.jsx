import { useEffect, useState } from 'react'
import companyLogo from '/public/logo.png'
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

	useEffect(() => {
		if (!menuOpen) return undefined

		const handleKeyDown = (event) => {
			if (event.key === 'Escape') setMenuOpen(false)
		}

		const previousOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		window.addEventListener('keydown', handleKeyDown)

		return () => {
			document.body.style.overflow = previousOverflow
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [menuOpen])

	useEffect(() => {
		if (!menuOpen) return undefined

		const handlePointerDown = (event) => {
			const panel = document.getElementById('mobile-navigation-panel')
			const button = document.querySelector('.translation-site-menu-toggle')
			const clickedInsidePanel = panel && panel.contains(event.target)
			const clickedToggle = button && button.contains(event.target)

			if (!clickedInsidePanel && !clickedToggle) {
				setMenuOpen(false)
			}
		}

		document.addEventListener('mousedown', handlePointerDown)
		return () => document.removeEventListener('mousedown', handlePointerDown)
	}, [menuOpen])

	useEffect(() => {
		const desktopViewport = window.matchMedia('(min-width: 1121px)')
		const closeMenuOnDesktop = (event) => {
			if (event.matches) setMenuOpen(false)
		}

		desktopViewport.addEventListener('change', closeMenuOnDesktop)
		return () => desktopViewport.removeEventListener('change', closeMenuOnDesktop)
	}, [])

	return (
		<header className="translation-site-header">
			<div className="translation-site-header__inner">
				<a className="translation-site-brand" href="#start" aria-label="DeutSolutions">
					<img src={companyLogo} alt="DeutSolutions" className="logo-deut" />
				</a>

				<div className="translation-site-header__actions">
					<a className="translation-site-icon-link" href="#kontakt" aria-label={content.nav.profile}>
						<Icon name="user" />
					</a>
					<a className="translation-site-icon-link" href="#kontakt" aria-label={content.nav.chat}>
						<Icon name="chat" />
					</a>
					<LanguageSwitcher className="translation-site-header__language" />
					<button
						className={`translation-site-menu-toggle${menuOpen ? ' is-open' : ''}`}
						type="button"
						aria-label={menuOpen ? content.nav.closeMenu : content.nav.openMenu}
						aria-expanded={menuOpen}
						aria-controls="mobile-navigation-panel"
						onClick={() => setMenuOpen(!menuOpen)}
					>
						<span className="translation-site-menu-toggle__lines" aria-hidden="true">
							<span />
							<span />
							<span />
						</span>
					</button>
				</div>

				<nav className="translation-site-nav" aria-label={content.nav.links.map(([label]) => label).join(', ')}>
					{content.nav.links.map(([label, id]) => (
						<a key={id} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{label}</a>
					))}
				</nav>
			</div>

			<div
				className={`translation-site-mobile-panel${menuOpen ? ' is-open' : ''}`}
				id="mobile-navigation-panel"
				role="dialog"
				aria-modal="true"
				aria-hidden={!menuOpen}
				aria-label={content.nav.openMenu}
			>
				<div className="translation-site-mobile-panel__header">
					<a className="translation-site-brand translation-site-brand--mobile" href="#start" aria-label="DeutSolutions">
						<img src={companyLogo} alt="DeutSolutions" className="logo-deut" />
					</a>
					<button
						className="translation-site-menu-toggle translation-site-menu-toggle--drawer"
						type="button"
						aria-label={content.nav.closeMenu}
						onClick={() => setMenuOpen(false)}
					>
						<span className="translation-site-menu-toggle__lines" aria-hidden="true">
							<span />
							<span />
							<span />
						</span>
					</button>
				</div>

				<div className="translation-site-mobile-panel__content">
					<nav className="translation-site-mobile-nav" aria-label={content.nav.links.map(([label]) => label).join(', ')}>
						{content.nav.links.map(([label, id]) => (
							<a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
						))}
					</nav>
					<LanguageSwitcher className="translation-site-mobile-language" />
					<a className="translation-site-request translation-site-mobile-request" href="#kontakt" onClick={() => setMenuOpen(false)}>{content.nav.cta}</a>
				</div>
			</div>

			{menuOpen && (
				<button
					type="button"
					className="translation-site-backdrop"
					aria-label={content.nav.closeMenu}
					onClick={() => setMenuOpen(false)}
				/>
			)}
		</header>
	)
}

export default Navbar
