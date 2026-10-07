import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { FaWhatsapp } from 'react-icons/fa'
import './WhatsAppButton.css'

export const WHATSAPP_NUMBER = '+4915129281633'

const whatsappMessages = {
  de: 'Hallo, ich möchte eine Übersetzungsanfrage stellen.',
  en: 'Hello, I would like to request a translation.',
  ar: 'مرحبًا، أود الاستفسار عن خدمة ترجمة.',
}

const tooltipText = {
  de: 'WhatsApp Chat',
  en: 'Chat on WhatsApp',
  ar: 'تواصل عبر واتساب',
}

const ariaLabels = {
  de: 'Chat auf WhatsApp',
  en: 'Chat on WhatsApp',
  ar: 'الدردشة عبر واتساب',
}

function WhatsAppButton() {
  const { language, content } = useLanguage()
  const message = whatsappMessages[language] ?? whatsappMessages.en
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  const label = ariaLabels[language] ?? ariaLabels.en
  const tooltip = tooltipText[language] ?? tooltipText.en

  return (
    <a
      className="translation-whatsapp-button"
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label || content.nav?.chat || 'Chat on WhatsApp'}
      title={tooltip}
    >
      <span className="translation-whatsapp-button__tooltip">{tooltip}</span>
      <FaWhatsapp className="translation-whatsapp-button__icon" aria-hidden="true" focusable="false" />
    </a>
  )
}

export default WhatsAppButton
