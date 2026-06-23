import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { ArrowRightIcon } from './icons'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const INPUT_CLASS = "border-b border-[#30363d] pb-3 bg-transparent text-[#e6edf3] placeholder-[#8b949e] font-mono text-xs md:text-sm outline-none focus:border-[#39d353] transition-colors duration-200"

const STATUS_LABEL = {
  sent:    '// message sent ✓',
  error:   '// something went wrong',
  sending: '// sending...',
}

function ContactForm() {
  const [name, setName]       = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus]   = useState('idle')

  const isReady = name.trim() && subject.trim() && message.trim() && status !== 'sending'

  function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    emailjs.send(SERVICE_ID, TEMPLATE_ID, { name, subject, message, time: new Date().toLocaleString() }, PUBLIC_KEY)
      .then(() => { setStatus('sent'); setName(''); setSubject(''); setMessage('') })
      .catch(() => setStatus('error'))
  }

  const statusLabel = STATUS_LABEL[status] ?? (isReady ? '// ready to send_' : '// fill in all fields_')

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-9 flex-1 justify-between">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <div className="flex flex-col gap-2">
          <label className="font-mono text-xs text-[#e6edf3] uppercase tracking-widest">Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className={INPUT_CLASS} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-mono text-xs text-[#e6edf3] uppercase tracking-widest">Subject</label>
          <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="What's this about?" className={INPUT_CLASS} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-mono text-xs text-[#8b949e] uppercase tracking-widest">Message</label>
        <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell me about your project, role, or idea..." rows={6} className={`${INPUT_CLASS} resize-none`} />
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-2">
        <p className="hidden md:block font-mono text-xs text-[#8b949e]">{statusLabel}</p>
        <button
          type="submit"
          disabled={!isReady}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-3 font-mono text-xs md:text-sm font-bold transition-all duration-100"
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
  )
}

export default ContactForm
