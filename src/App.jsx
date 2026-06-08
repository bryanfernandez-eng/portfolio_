import Navbar from './components/Navbar'
import Landing from './components/Landing'

function App() {
  return (
    <div>
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          backgroundImage: 'url(/grain-bg.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          opacity: 0.40,
          mixBlendMode: 'soft-light',
        }}
      />
      <Navbar />
      <Landing />
    </div>
  )
}

export default App
