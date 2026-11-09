import { PROFILE, EXPERIENCE, EDUCATION } from './data'
import { useDocumentTitle } from './hooks/useDocumentTitle'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Landing from './sections/Landing'
import About from './sections/About'
import Projects from './sections/Projects'
import Timeline from './sections/Timeline'
import Contact from './sections/Contact'

function App() {
  useDocumentTitle(PROFILE.name)

  return (
    <>
      <Navbar />
      <main>
        <Landing />
        <About />
        <Projects />
        <Timeline id="experience" items={EXPERIENCE} />
        <Timeline id="education" items={EDUCATION} />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
