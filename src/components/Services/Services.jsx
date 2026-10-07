import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { LuArrowUpRight } from 'react-icons/lu'
import SectionIntro from '../SectionIntro.jsx'
import Icon from '../Icon.jsx'
import './Services.css'

const cardIcons = ['file', 'education', 'scales', 'medical', 'business', 'document']
const cardLinks = ['beglaubigte-uebersetzungen', 'beglaubigte-uebersetzungen', 'beglaubigte-uebersetzungen', 'aerzte-medizin', 'kontakt', 'kontakt']

function Services() {
  const { content } = useLanguage()
  const section = content.services

  return (
    <section className="translation-site-services" id={section.id} aria-labelledby="translation-services-title">
      <div className="translation-site-services__inner">
        <SectionIntro eyebrow={section.eyebrow} title={section.title} description={section.description} />
        <div className="translation-site-services__grid">
          {section.cards.map(([title, description], index) => (
            <a className="translation-site-services__item" href={`#${cardLinks[index]}`} key={title}>
              <span className="translation-site-services__icon"><Icon name={cardIcons[index]} size={22} /></span>
              <span className="translation-site-services__number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <LuArrowUpRight className="translation-site-services__arrow" aria-hidden="true" size={18} />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
