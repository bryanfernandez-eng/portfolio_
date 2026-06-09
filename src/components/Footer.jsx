import DotGrid from './backgrounds/DotGrid'

function Footer() {
  return (
    <footer className="relative bg-[#212121] overflow-hidden">
      <DotGrid />

      <div className="relative px-8 md:px-16 lg:px-24 py-10 flex items-end justify-between">
        <h2
          className="font-bold leading-none tracking-tight text-[#2a2a2a] select-none"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 'clamp(3rem, 10vw, 5rem)',
          }}
        >
          Bryan Fernandez
        </h2>
      </div>
    </footer>
  )
}

export default Footer
