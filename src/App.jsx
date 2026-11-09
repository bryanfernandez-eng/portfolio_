import { PROFILE } from './data'
import { useDocumentTitle } from './hooks/useDocumentTitle'
import { usePointerTracking } from './hooks/usePointerTracking'
import CustomCursor from './components/CustomCursor'
import SectionBridge from './components/SectionBridge'
import Hero from './sections/Hero'
import About from './sections/About'
import Work from './sections/Work'
import Experience from './sections/Experience'
import Contact from './sections/Contact'

function App() {
  useDocumentTitle(PROFILE.name)
  usePointerTracking()

  return (
    <>
      <CustomCursor />
      <main>
        <Hero />
        <About />
        <Work />
        <SectionBridge />
        <Experience />
        <SectionBridge isMirrored />
        <Contact />
      </main>
    </>
  )
}

export default App
