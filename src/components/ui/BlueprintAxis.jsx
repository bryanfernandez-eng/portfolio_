const LABEL_STYLE = { fontSize: 9, color: 'rgba(0,0,0,0.2)', zIndex: 2 }

function BlueprintAxis() {
  return (
    <>
      <span className="absolute font-mono pointer-events-none select-none" style={{ top: 12, left: 14, ...LABEL_STYLE }}>[0,0]</span>
      <span className="absolute font-mono pointer-events-none select-none" style={{ top: 12, right: 14, ...LABEL_STYLE }}>x →</span>
      <span className="absolute font-mono pointer-events-none select-none" style={{ bottom: 12, left: 14, ...LABEL_STYLE }}>y ↓</span>
    </>
  )
}

export default BlueprintAxis
