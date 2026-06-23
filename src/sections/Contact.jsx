import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { SOCIAL_LINKS } from '../constants/social'
import { EmailIcon, GitHubIcon, LinkedInIcon, ResumeIcon, ArrowRightIcon } from '../components/ui/icons'

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const SOCIAL_ICONS = {
  linkedin: <LinkedInIcon size={15} />,
  github: <GitHubIcon size={15} />,
  resume: <ResumeIcon size={15} />,
}

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
      style={{ width: 280, height: 280, top: -50, left: -50, zIndex: 0, opacity: 1, animation: 'spin 200s linear infinite', transformOrigin: 'center' }}
    >
      <polygon points={pts} fill="#a8f0b8" />
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
  const [status, setStatus] = useState('idle')

  function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')

    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      { name, subject, message, time: new Date().toLocaleString() },
      EMAILJS_PUBLIC_KEY,
    ).then(() => {
      setStatus('sent')
      setName('')
      setSubject('')
      setMessage('')
    }).catch(() => {
      setStatus('error')
    })
  }

  const isReady = name.trim() && subject.trim() && message.trim() && status !== 'sending'

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

      <div className="relative z-10 flex flex-col lg:flex-row flex-1 px-4 md:px-16 lg:px-24 py-20 md:py-28 gap-10 lg:gap-16 max-w-7xl mx-auto w-full items-stretch overflow-visible">

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

          {/* Contact link pills — mobile: icons only row, md: 2x2 grid, lg: stacked */}
          <div className="flex justify-between sm:grid sm:grid-cols-2 sm:justify-normal lg:flex lg:flex-col w-full gap-3 lg:gap-4">
            <a
              href="mailto:dev.bryanfernandez@gmail.com"
              aria-label="Email"
              className="inline-flex items-center justify-center sm:justify-start gap-3 px-3 sm:px-4 py-3 bg-white font-mono text-sm text-[#212121] font-medium transition-transform duration-100"
              style={PILL_STYLE}
              onMouseEnter={handlePillEnter}
              onMouseLeave={handlePillLeave}
            >
              <EmailIcon size={15} />
              <span className="hidden sm:inline">dev.bryanfernandez@gmail.com</span>
            </a>

            {SOCIAL_LINKS.map(link => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="inline-flex items-center justify-center sm:justify-start gap-3 px-3 sm:px-4 py-3 bg-white font-mono text-sm text-[#212121] font-medium transition-transform duration-100"
                style={PILL_STYLE}
                onMouseEnter={handlePillEnter}
                onMouseLeave={handlePillLeave}
              >
                {SOCIAL_ICONS[link.id]}
                <span className="hidden sm:inline">{link.value}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right — form card */}
        <div className="lg:w-3/5 w-full self-stretch flex flex-col" style={{ marginRight: '8px', marginBottom: '8px' }}>
          <div
            className="bg-[#212121] p-6 md:p-10 flex-1 flex flex-col justify-between"
            style={{
              border: '3px solid #212121',
              boxShadow: '6px 6px 0 #39d353',
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
              <p className="font-mono text-xs font-bold text-[#212121]">GET IN TOUCH</p>
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
                  rows={6}
                  className="border-b border-[#30363d] pb-3 bg-transparent text-[#e6edf3] placeholder-[#8b949e] font-mono text-sm outline-none focus:border-[#39d353] transition-colors duration-200 resize-none"
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-2">
                <p className="hidden md:block font-mono text-xs text-[#8b949e]">
                  {status === 'sent'    ? '// message sent ✓'      :
                   status === 'error'   ? '// something went wrong' :
                   status === 'sending' ? '// sending...'           :
                   isReady             ? '// ready to send_'        :
                                         '// fill in all fields_'}
                </p>
                <button
                  type="submit"
                  disabled={!isReady}
                  className="w-full md:w-auto flex items-center justify-center gap-3 px-6 py-3 font-mono text-sm font-bold transition-all duration-100"
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
                  {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Sent ✓' : 'Send message'}
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
