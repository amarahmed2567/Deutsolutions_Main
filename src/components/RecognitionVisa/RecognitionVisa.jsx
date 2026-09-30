import { useLanguage } from '../../i18n/LanguageContext.jsx'
import SectionIntro from '../SectionIntro.jsx'
import './RecognitionVisa.css'

function RecognitionVisa() {
  const { content } = useLanguage()
  const section = content.visa

  return (
    <section className="translation-site-visa" id={section.id} aria-labelledby="translation-visa-title">
      <div className="translation-site-visa__inner">
        <SectionIntro eyebrow={section.eyebrow} title={section.title} description={section.description} titleId="translation-visa-title" />
        <ul className="translation-site-visa__list">
          {section.items.map((item, index) => (
            <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>
          ))}
        </ul>
        <p className="translation-site-visa__disclaimer">{section.disclaimer}</p>
      </div>
    </section>
  )
}

export default RecognitionVisa
