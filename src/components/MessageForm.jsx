import { useEffect, useState } from 'react'
import { CONTACT } from '../data'
import { sendMessage } from '../services/email'
import { classNames } from '../utils/classNames'
import FormField from './FormField'
import PaperPlane from './PaperPlane'

const EMPTY_FIELDS = Object.fromEntries(CONTACT.fields.map(({ name }) => [name, '']))
const SENT_MS = 2600

function MessageForm({ onSent }) {
  const [fields, setFields] = useState(EMPTY_FIELDS)
  const [status, setStatus] = useState('idle')
  const isSent = status === 'sent'
  const isReady = Object.values(fields).every(value => value.trim()) && status !== 'sending'

  useEffect(() => {
    if (!isSent) return undefined
    const timer = setTimeout(onSent, SENT_MS)
    return () => clearTimeout(timer)
  }, [isSent, onSent])

  function handleChange(event) {
    const { name, value } = event.target
    setFields(previous => ({ ...previous, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('sending')
    try {
      await sendMessage({ ...fields, subject: `${CONTACT.subjectPrefix} ${fields.name}` })
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="note-body">
      <form className={classNames('note-form', isSent && 'is-sent')} onSubmit={handleSubmit}>
        {CONTACT.fields.map((field, index) => (
          <FormField key={field.name} {...field} hasFocus={index === 0} value={fields[field.name]} onChange={handleChange} />
        ))}
        <button className="note-send" type="submit" disabled={!isReady}>{CONTACT.submitLabel}</button>
        <p className="note-status" role="status">{isSent ? '' : CONTACT.statuses[status]}</p>
      </form>
      {isSent && <p className="note-done" role="status">{CONTACT.statuses.sent}</p>}
      {isSent && <PaperPlane />}
    </div>
  )
}

export default MessageForm