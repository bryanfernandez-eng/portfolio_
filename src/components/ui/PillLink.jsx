const PILL_STYLE = {
  border: '2px solid #212121',
  borderRadius: '4px',
  boxShadow: '4px 4px 0 #212121',
  marginRight: '4px',
  marginBottom: '4px',
}

function handleEnter(e) {
  e.currentTarget.style.boxShadow = '2px 2px 0 #212121'
  e.currentTarget.style.transform = 'translate(2px,2px)'
}

function handleLeave(e) {
  e.currentTarget.style.boxShadow = '4px 4px 0 #212121'
  e.currentTarget.style.transform = 'translate(0,0)'
}

function PillLink({ href, label, icon, text, target, rel }) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      aria-label={label}
      className="inline-flex items-center justify-center sm:justify-start gap-2 px-3 py-2 bg-white font-mono text-xs text-[#212121] font-medium transition-transform duration-100"
      style={PILL_STYLE}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {icon}
      {text && <span className="hidden sm:inline">{text}</span>}
    </a>
  )
}

export default PillLink
