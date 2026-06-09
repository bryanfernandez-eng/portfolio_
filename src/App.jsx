import Navbar from './components/Navbar'
import Landing from './sections/Landing'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import Footer from './components/Footer'
import GrainOverlay from './components/ui/GrainOverlay'

function App() {
  return (
    <div style={{ background: '#212121' }}>
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
