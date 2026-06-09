import { useState } from 'react'
import { SOCIAL_LINKS } from '../constants/social'
import { EmailIcon, ExternalLinkIcon, ArrowRightIcon } from '../components/ui/icons'

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
      className="relative z-30 bg-[#e8eaed]  min-h-screen flex flex-col"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.065) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.065) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
      }}
    >
      {/* Grid fade mask */}
      <div
        className="absolute inset-0 pointer-events-none rounded-t-3xl"
        style={{
          background: `linear-gradient(to bottom, #e8eaed 0%, transparent 20%, transparent 80%, #e8eaed 100%)`,
          zIndex: 1,
        }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row flex-1 px-8 md:px-16 lg:px-24 py-28 gap-16 max-w-7xl mx-auto w-full items-stretch">

        {/* Left — info */}
        <div className="lg:w-2/5 flex flex-col justify-between self-stretch gap-8">
          <div>
            <p className="font-mono text-xs text-[#9098a3] mb-3">// contact</p>
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

          <div className="flex flex-col gap-5">
            <a
              href="mailto:bfern152@fiu.edu"
              className="group flex items-center gap-3 text-[#212121] hover:text-[#39d353] transition-colors duration-200"
            >
              <span className="w-9 h-9 rounded-full border-2 border-current flex items-center justify-center shrink-0 group-hover:bg-[#212121] group-hover:border-[#212121] transition-all duration-200">
                <EmailIcon />
              </span>
              <span className="font-mono text-sm">bfern152@fiu.edu</span>
            </a>

            {SOCIAL_LINKS.map(link => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-[#212121] hover:text-[#39d353] transition-colors duration-200"
              >
                <span className="w-9 h-9 rounded-full border-2 border-current flex items-center justify-center shrink-0 group-hover:bg-[#212121] group-hover:border-[#212121] transition-all duration-200">
                  <ExternalLinkIcon size={12} />
                </span>
                <span className="font-mono text-sm">{link.value}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right — form card */}
        <div className="lg:w-3/5 w-full self-stretch flex flex-col">
          <div className="rounded-2xl bg-[#212121] p-8 md:p-10 flex-1 flex flex-col justify-between">
            <p className="font-mono text-xs text-[#8b949e] mb-8">// send a message</p>
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
                  className="flex items-center gap-3 px-6 py-3 rounded-full font-mono text-sm font-medium transition-all duration-200"
                  style={{
                    background: isReady ? '#39d353' : 'transparent',
                    color: isReady ? '#212121' : '#8b949e',
                    border: '2px solid',
                    borderColor: isReady ? '#39d353' : '#30363d',
                    cursor: isReady ? 'pointer' : 'not-allowed',
                  }}
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
