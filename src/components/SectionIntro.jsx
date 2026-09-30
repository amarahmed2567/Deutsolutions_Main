import './SectionIntro.css'

function SectionIntro({ eyebrow, title, description, align = 'start', titleId }) {
  return (
    <div className={`translation-section-intro translation-section-intro--${align}`}>
      <p className="translation-section-intro__eyebrow">{eyebrow}</p>
      <h2 className="translation-section-intro__title" id={titleId}>{title}</h2>
      {description && <p className="translation-section-intro__description">{description}</p>}
    </div>
  )
}

export default SectionIntro
