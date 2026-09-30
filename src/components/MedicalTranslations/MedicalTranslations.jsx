import { useLanguage } from '../../i18n/LanguageContext.jsx'
import SectionIntro from '../SectionIntro.jsx'
import './MedicalTranslations.css'

function MedicalTranslations() {
  const { content } = useLanguage()
  const section = content.medical

  return (
    <section className="translation-site-medical" id={section.id} aria-labelledby="translation-medical-title">
      <div className="translation-site-medical__inner">
        <SectionIntro eyebrow={section.eyebrow} title={section.title} description={section.description} titleId="translation-medical-title" />
        <div className="translation-site-medical__layout">
          <aside className="translation-site-medical__audience">
            <span className="translation-site-medical__mark" aria-hidden="true">+</span>
            <h3>{section.audienceTitle}</h3>
            <ul>{section.audience.map((item) => <li key={item}>{item}</li>)}</ul>
            <p>{section.note}</p>
          </aside>
          <div className="translation-site-medical__documents">
            <h3>{section.servicesTitle}</h3>
            <ul>{section.services.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MedicalTranslations
