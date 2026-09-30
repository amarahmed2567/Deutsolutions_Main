import { useLanguage } from '../../i18n/LanguageContext.jsx'
import SectionIntro from '../SectionIntro.jsx'
import useScrollReveal from '../../hooks/useScrollReveal.js'
import './CertifiedTranslations.css'

function CertifiedTranslations() {
  const { content } = useLanguage()
  const section = content.certified
  const sectionRef = useScrollReveal()

  return (
    <section className="translation-site-certified" id={section.id} aria-labelledby="translation-certified-title" ref={sectionRef}>
      <div className="translation-site-certified__inner">
        <div className="translation-site-certified__copy">
          <div data-reveal>
            <SectionIntro eyebrow={section.eyebrow} title={section.title} description={section.description} titleId="translation-certified-title" />
          </div>
          <h3 data-reveal>{section.useCasesTitle}</h3>
          <ul className="translation-site-certified__uses" data-reveal>
            {section.useCases.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <a className="translation-site-certified__cta" href="#kontakt" data-reveal>{section.cta}<span aria-hidden="true">↗</span></a>
        </div>
        <article className="translation-site-certified__document" aria-label={section.documentTitle} data-reveal>
          <div className="translation-site-certified__doc-top"><span>DS</span><span>DE · AR</span></div>
          <div className="translation-site-certified__seal" aria-hidden="true"><i /><i /><i /></div>
          <div className="translation-site-certified__doc-rule" />
          <span className="translation-site-certified__doc-label">{section.eyebrow}</span>
          <h3>{section.documentTitle}</h3>
          <div className="translation-site-certified__doc-lines" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <div className="translation-site-certified__doc-bottom"><span>{section.documentMeta}</span><b aria-hidden="true">✓</b></div>
        </article>
      </div>
    </section>
  )
}

export default CertifiedTranslations
