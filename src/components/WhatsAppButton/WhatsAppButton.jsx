import { useLanguage } from '../../i18n/LanguageContext.jsx'
import './WhatsAppButton.css'

export const WHATSAPP_NUMBER = 'YOUR_WHATSAPP_NUMBER'

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
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M20.52 3.48A11.46 11.46 0 0 0 12.1 1a11.37 11.37 0 0 0-9.93 17.28L1 23l4.9-1.28A11.35 11.35 0 0 0 12.1 23a11.46 11.46 0 0 0 8.42-19.52ZM12.1 20.7a9.38 9.38 0 0 1-4.78-1.32l-.34-.2-2.9.76.77-2.82-.22-.36A9.38 9.38 0 0 1 12.1 3.3a9.4 9.4 0 1 1 0 18.8Zm5.14-7.04c-.28-.14-1.67-.82-1.92-.91-.26-.1-.44-.14-.63.14-.2.29-.76.91-.94 1.1-.17.2-.35.22-.64.07a7.68 7.68 0 0 1-2.27-1.4 8.5 8.5 0 0 1-1.57-1.96c-.17-.29-.02-.45.13-.59.12-.12.29-.35.43-.52.14-.17.19-.29.29-.48.1-.2.05-.37-.03-.52-.08-.14-.63-1.52-.87-2.08-.23-.56-.46-.47-.63-.48h-.54c-.18 0-.48.07-.73.35-.25.29-1 1-.1 2.95 1.01 1.4 2.15 2.83 3.2 3.81.4.42.7.69 1 .91.57.43.99.68 1.38.76.58.14 1.12.12 1.53-.08.46-.14 1.44-.6 1.64-1.18.2-.58.2-1.08.14-1.18-.07-.1-.24-.14-.52-.28Z"/>
      </svg>
    </a>
  )
}

export default WhatsAppButton
