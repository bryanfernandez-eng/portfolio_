import Navbar from './components/Navbar'
import Landing from './sections/Landing'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import Footer from './components/Footer'
import GrainOverlay from './components/ui/GrainOverlay'
import { COLORS } from './constants/colors'

function App() {
  return (
    <div style={{ background: COLORS.dark }}>
      <GrainOverlay />
      <Navbar />
      <Landing />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
