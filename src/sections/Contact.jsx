import { useState } from 'react'
import { SOCIAL_LINKS } from '../constants/social'
import { EmailIcon, ExternalLinkIcon, ArrowRightIcon } from '../components/ui/icons'

function Starburst() {
  const points = 16
  const cx = 120, cy = 120
  const r1 = 110, r2 = 80
  const pts = Array.from({ length: points * 2 }, (_, i) => {
    const angle = (Math.PI / points) * i - Math.PI / 2
    const r = i % 2 === 0 ? r1 : r2
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`
  }).join(' ')

  return (
    <svg
      viewBox="0 0 240 240"
      aria-hidden="true"
      className="absolute pointer-events-none select-none"
      style={{ width: 280, height: 280, top: -50, left: -50, zIndex: 0, opacity: 0.22 }}
    >
      <polygon points={pts} fill="#39d353" />
    </svg>
  )
}

const PILL_STYLE = {
  border: '2px solid #212121',
  borderRadius: '4px',
  boxShadow: '4px 4px 0 #212121',
  marginRight: '4px',
  marginBottom: '4px',
}

function handlePillEnter(e) {
  e.currentTarget.style.boxShadow = '2px 2px 0 #212121'
  e.currentTarget.style.transform = 'translate(2px,2px)'
}

function handlePillLeave(e) {
  e.currentTarget.style.boxShadow = '4px 4px 0 #212121'
  e.currentTarget.style.transform = 'translate(0,0)'
}

function Contact() {
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const body = `Hi Bryan,\n\n${message}\n\n— ${name}`
    const mailto = `mailto:bfern152@fiu.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
  }

  const isReady = name.trim() && subject.trim() && message.trim()

  return (
    <section
      id="contact"
      className="relative z-30 bg-[#e8eaed] min-h-screen flex flex-col"
      style={{
        borderTop: '4px solid #212121',
        backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.18) 2px, transparent 2px)`,
        backgroundSize: '28px 28px',
      }}
    >
      {/* Halftone fade mask */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, #e8eaed 0%, transparent 12%, transparent 88%, #e8eaed 100%)`,
          zIndex: 1,
        }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row flex-1 px-8 md:px-16 lg:px-24 py-28 gap-16 max-w-7xl mx-auto w-full items-stretch overflow-visible">

        {/* Left — info */}
        <div className="lg:w-2/5 flex flex-col self-stretch gap-10">
          <div className="relative">
            <Starburst />
            <div className="relative z-10">
              {/* Sticker badge */}
              <span
                className="inline-block font-mono text-xs font-bold text-white bg-[#212121] px-3 py-1 mb-4"
                style={{ transform: 'rotate(-2deg)', display: 'inline-block', borderRadius: '2px' }}
              >
                // contact
              </span>
              <h2
                className="font-bold leading-none tracking-tight text-[#212121] mb-6"
                style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(2.8rem, 6vw, 5.5rem)' }}
              >
                Let's build<br />something.
              </h2>
              <p className="text-[#4a5260] text-base leading-relaxed">
                Open to internships, new grad roles, and interesting projects. Let's make something great together.
              </p>
            </div>
          </div>

          {/* Contact link pills */}
          <div className="flex flex-col gap-3 self-start w-full">
            <a
              href="mailto:bfern152@fiu.edu"
              className="inline-flex items-center gap-3 px-4 py-3 bg-white font-mono text-sm text-[#212121] font-medium transition-transform duration-100"
              style={PILL_STYLE}
              onMouseEnter={handlePillEnter}
              onMouseLeave={handlePillLeave}
            >
              <EmailIcon size={15} />
              bfern152@fiu.edu
            </a>

            {SOCIAL_LINKS.map(link => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-4 py-3 bg-white font-mono text-sm text-[#212121] font-medium transition-transform duration-100"
                style={PILL_STYLE}
                onMouseEnter={handlePillEnter}
                onMouseLeave={handlePillLeave}
              >
                <ExternalLinkIcon size={13} />
                {link.value}
              </a>
            ))}
          </div>
        </div>

        {/* Right — form card */}
        <div className="lg:w-3/5 w-full self-stretch flex flex-col" style={{ marginRight: '8px', marginBottom: '8px' }}>
          <div
            className="bg-[#212121] p-8 md:p-10 flex-1 flex flex-col justify-between"
            style={{
              border: '3px solid #212121',
              boxShadow: '8px 8px 0 #39d353',
              borderRadius: '4px',
            }}
          >
            {/* Caption box */}
            <div
              className="inline-flex items-center px-3 py-1 mb-8 self-start"
              style={{
                background: '#FFE033',
                border: '2px solid #212121',
                borderRadius: '2px',
              }}
            >
              <p className="font-mono text-xs font-bold text-[#212121]">SEND A MESSAGE</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-9 flex-1 justify-between">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs text-[#e6edf3] uppercase tracking-widest">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your name"
                    className="border-b border-[#30363d] pb-3 bg-transparent text-[#e6edf3] placeholder-[#8b949e] font-mono text-sm outline-none focus:border-[#39d353] transition-colors duration-200"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs text-[#e6edf3] uppercase tracking-widest">Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    placeholder="What's this about?"
                    className="border-b border-[#30363d] pb-3 bg-transparent text-[#e6edf3] placeholder-[#8b949e] font-mono text-sm outline-none focus:border-[#39d353] transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-[#8b949e] uppercase tracking-widest">Message</label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Tell me about your project, role, or idea..."
                  rows={15}
                  className="border-b border-[#30363d] pb-3 bg-transparent text-[#e6edf3] placeholder-[#8b949e] font-mono text-sm outline-none focus:border-[#39d353] transition-colors duration-200 resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="font-mono text-xs text-[#8b949e]">
                  {isReady ? '// ready to send_' : '// fill in all fields_'}
                </p>
                <button
                  type="submit"
                  disabled={!isReady}
                  className="flex items-center gap-3 px-6 py-3 font-mono text-sm font-bold transition-all duration-100"
                  style={{
                    background: isReady ? '#FFE033' : 'transparent',
                    color: isReady ? '#212121' : '#8b949e',
                    border: '2px solid',
                    borderColor: isReady ? '#212121' : '#30363d',
                    borderRadius: '4px',
                    boxShadow: isReady ? '4px 4px 0 #39d353' : 'none',
                    cursor: isReady ? 'pointer' : 'not-allowed',
                  }}
                  onMouseEnter={e => { if (isReady) { e.currentTarget.style.boxShadow = '2px 2px 0 #39d353'; e.currentTarget.style.transform = 'translate(2px,2px)' } }}
                  onMouseLeave={e => { if (isReady) { e.currentTarget.style.boxShadow = '4px 4px 0 #39d353'; e.currentTarget.style.transform = 'translate(0,0)' } }}
                >
                  Send message
                  <ArrowRightIcon />
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Contact
