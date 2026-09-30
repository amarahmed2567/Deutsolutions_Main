import { useLanguage } from '../../i18n/LanguageContext.jsx'
import SectionIntro from '../SectionIntro.jsx'
import useScrollReveal from '../../hooks/useScrollReveal.js'
import './MedicalTranslations.css'

function MedicalTranslations() {
  const { content } = useLanguage()
  const section = content.medical
  const sectionRef = useScrollReveal()

  return (
    <section className="translation-site-medical" id={section.id} aria-labelledby="translation-medical-title" ref={sectionRef}>
      <div className="translation-site-medical__inner">
        <div data-reveal>
          <SectionIntro eyebrow={section.eyebrow} title={section.title} description={section.description} titleId="translation-medical-title" />
        </div>
        <div className="translation-site-medical__layout">
          <aside className="translation-site-medical__audience" data-reveal>
            <span className="translation-site-medical__mark" aria-hidden="true">+</span>
            <h3>{section.audienceTitle}</h3>
            <ul>{section.audience.map((item) => <li key={item}>{item}</li>)}</ul>
            <p>{section.note}</p>
          </aside>
          <div className="translation-site-medical__documents" data-reveal>
            <h3>{section.servicesTitle}</h3>
            <ul>{section.services.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MedicalTranslations
