import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { COLORS } from '../../constants/colors'
import SendButton from './SendButton'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const INPUT_CLASS = "contact-input border-b pb-3 bg-transparent font-mono text-xs md:text-sm outline-none transition-colors duration-200"
const INPUT_STYLE = { borderColor: COLORS.dimText, color: COLORS.primaryText }

const STATUS_LABEL = {
  sent:    '// message sent ✓',
  error:   '// something went wrong',
  sending: '// sending...',
}

function handleInputFocus(e) {
  e.currentTarget.style.borderColor = COLORS.primaryText
  e.currentTarget.style.boxShadow = `0 1px 0 0 ${COLORS.primaryText}`
}
function handleInputBlur(e) {
  e.currentTarget.style.borderColor = COLORS.dimText
  e.currentTarget.style.boxShadow = 'none'
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 flex-1 justify-between">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <label className="font-mono text-xs uppercase tracking-widest" style={{ color: COLORS.primaryText }}>Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} onFocus={handleInputFocus} onBlur={handleInputBlur} placeholder="Your name" className={INPUT_CLASS} style={INPUT_STYLE} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-mono text-xs uppercase tracking-widest" style={{ color: COLORS.primaryText }}>Subject</label>
          <input type="text" value={subject} onChange={e => setSubject(e.target.value)} onFocus={handleInputFocus} onBlur={handleInputBlur} placeholder="What's this about?" className={INPUT_CLASS} style={INPUT_STYLE} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-mono text-xs uppercase tracking-widest" style={{ color: COLORS.mutedText }}>Message</label>
        <textarea value={message} onChange={e => setMessage(e.target.value)} onFocus={handleInputFocus} onBlur={handleInputBlur} placeholder="Tell me about your project, role, or idea..." rows={6} className={`${INPUT_CLASS} resize-none`} style={INPUT_STYLE} />
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-2">
        <p className="hidden md:block font-mono text-xs" style={{ color: COLORS.mutedText }}>{statusLabel}</p>
        <SendButton isReady={isReady} status={status} />
      </div>
    </form>
  )
}

export default ContactForm
