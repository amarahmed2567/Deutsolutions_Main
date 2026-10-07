import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { LuArrowUpRight } from 'react-icons/lu'
import SectionIntro from '../SectionIntro.jsx'
import './Contact.css'

function Contact() {
  const { content } = useLanguage()
  const section = content.contact
  const labels = section.labels
  function handleSubmit(event) {
    event.preventDefault()
    // TODO: Connect the form to the enquiry API when a backend is available.
  }

  return (
    <section className="translation-site-contact" id={section.id} aria-labelledby="translation-contact-title">
      <div className="translation-site-contact__inner">
        <SectionIntro eyebrow={section.eyebrow} title={section.title} description={section.description} titleId="translation-contact-title" />
        <form className="translation-site-contact__form" onSubmit={handleSubmit}>
          <div className="translation-site-contact__fields">
            <label>{labels.name}<input name="name" type="text" autoComplete="name" required /></label>
            <label>{labels.email}<input name="email" type="email" autoComplete="email" required /></label>
            <label>{labels.phone}<input name="phone" type="tel" autoComplete="tel" /></label>
            <label>{labels.type}<select name="documentType" defaultValue="" required><option value="" disabled>{labels.choose}</option>{section.documentTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>{labels.source}<select name="sourceLanguage" defaultValue="" required><option value="" disabled>{labels.choose}</option>{section.languages.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>{labels.target}<select name="targetLanguage" defaultValue="" required><option value="" disabled>{labels.choose}</option>{section.languages.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label className="translation-site-contact__message">{labels.message}<textarea name="message" rows="4" /></label>
            <label className="translation-site-contact__upload">
              <span>{labels.upload}</span>
              <input name="document" type="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" />
              <small>{labels.fileHint}</small>
            </label>
          </div>
          <div className="translation-site-contact__submit-row">
            <p>{labels.privacy}</p>
            <button type="submit">{labels.submit}<LuArrowUpRight aria-hidden="true" size={18} /></button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Contact
