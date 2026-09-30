import { useLanguage } from '../i18n/LanguageContext.jsx'
import About from '../components/About/About.jsx'
import CertifiedTranslations from '../components/CertifiedTranslations/CertifiedTranslations.jsx'
import Contact from '../components/Contact/Contact.jsx'
import Footer from '../components/Footer.jsx'
import MedicalTranslations from '../components/MedicalTranslations/MedicalTranslations.jsx'
import Navbar from '../components/Navbar.jsx'
import Process from '../components/Process/Process.jsx'
import RecognitionVisa from '../components/RecognitionVisa/RecognitionVisa.jsx'
import Services from '../components/Services/Services.jsx'
import TranslationTransform from '../components/TranslationTransform.jsx'
import WhatsAppButton from '../components/WhatsAppButton/WhatsAppButton.jsx'
import './Home.css'

function Home() {
  const { language } = useLanguage()

  return (
    <div className="translation-site-root" id="start" lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar />
      <main className="translation-site-main">
        <TranslationTransform />
        <Services />
        <CertifiedTranslations />
        <RecognitionVisa />
        <MedicalTranslations />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default Home
