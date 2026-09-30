import { useLanguage } from '../../i18n/LanguageContext.jsx'
import SectionIntro from '../SectionIntro.jsx'
import './About.css'

function About() {
  const { content } = useLanguage()
  const section = content.about

  return (
    <section className="translation-site-about" id={section.id} aria-labelledby="translation-about-title">
      <div className="translation-site-about__inner">
        <div className="translation-site-about__overview">
          <SectionIntro eyebrow={section.eyebrow} title={section.title} description={section.description} titleId="translation-about-title" />
          <p className="translation-site-about__note">{section.note}</p>
        </div>
        <div className="translation-site-about__values">
          {section.values.map(([title, description], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
