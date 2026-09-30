import { useLanguage } from '../../i18n/LanguageContext.jsx'
import SectionIntro from '../SectionIntro.jsx'
import useScrollReveal from '../../hooks/useScrollReveal.js'
import './About.css'

function About() {
  const { content } = useLanguage()
  const section = content.about
  const sectionRef = useScrollReveal()

  return (
    <section className="translation-site-about" id={section.id} aria-labelledby="translation-about-title" ref={sectionRef}>
      <div className="translation-site-about__inner">
        <div className="translation-site-about__overview">
          <div data-reveal>
            <SectionIntro eyebrow={section.eyebrow} title={section.title} description={section.description} titleId="translation-about-title" />
          </div>
          <p className="translation-site-about__note" data-reveal>{section.note}</p>
        </div>
        <div className="translation-site-about__values">
          {section.values.map(([title, description], index) => (
            <article key={title} data-reveal>
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
