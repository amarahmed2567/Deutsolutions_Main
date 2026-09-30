import Home from './pages/Home.jsx'
import { LanguageProvider } from './i18n/LanguageContext.jsx'

function App() {
  return (
    <LanguageProvider>
      <Home />
    </LanguageProvider>
  )
}

export default App
