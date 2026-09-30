import { useLanguage } from '../../i18n/LanguageContext.jsx'
import SectionIntro from '../SectionIntro.jsx'
import useScrollReveal from '../../hooks/useScrollReveal.js'
import './RecognitionVisa.css'

function RecognitionVisa() {
  const { content } = useLanguage()
  const section = content.visa
  const sectionRef = useScrollReveal()

  return (
    <section className="translation-site-visa" id={section.id} aria-labelledby="translation-visa-title" ref={sectionRef}>
      <div className="translation-site-visa__inner">
        <div data-reveal>
          <SectionIntro eyebrow={section.eyebrow} title={section.title} description={section.description} titleId="translation-visa-title" />
        </div>
        <ul className="translation-site-visa__list">
          {section.items.map((item, index) => (
            <li key={item} data-reveal><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>
          ))}
        </ul>
        <p className="translation-site-visa__disclaimer" data-reveal>{section.disclaimer}</p>
      </div>
    </section>
  )
}

export default RecognitionVisa
