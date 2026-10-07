import { useLanguage } from '../../i18n/LanguageContext.jsx'
import SectionIntro from '../SectionIntro.jsx'
import './Process.css'

function Process() {
  const { content } = useLanguage()
  const section = content.process

  return (
    <section className="translation-site-process" id={section.id} aria-labelledby="translation-process-title">
      <div className="translation-site-process__inner">
        <SectionIntro eyebrow={section.eyebrow} title={section.title} titleId="translation-process-title" />
        <ol className="translation-site-process__steps">
          {section.steps.map(([title, description], index) => (
            <li key={title}>
              <span className="translation-site-process__number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Process
