function GrainOverlay() {
  return (
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
        opacity: 0.90,
        mixBlendMode: 'soft-light',
      }}
    />
  )
}

export default GrainOverlay
