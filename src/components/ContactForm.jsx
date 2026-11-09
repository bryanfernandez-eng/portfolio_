import { useState } from 'react'
import { CONTACT } from '../data'
import { sendMessage } from '../services/email'
import FormField from './FormField'

const EMPTY_FIELDS = Object.fromEntries(CONTACT.fields.map(({ name }) => [name, '']))

function ContactForm() {
  const [fields, setFields] = useState(EMPTY_FIELDS)
  const [status, setStatus] = useState('idle')

  const isReady = Object.values(fields).every(value => value.trim()) && status !== 'sending'

  function handleChange(e) {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      await sendMessage(fields)
      setFields(EMPTY_FIELDS)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {CONTACT.fields.map(field => (
        <FormField key={field.name} {...field} value={fields[field.name]} onChange={handleChange} />
      ))}
      <button type="submit" disabled={!isReady}>{CONTACT.submitLabel}</button>
      <p role="status">{CONTACT.statuses[status]}</p>
    </form>
  )
}

export default ContactForm
