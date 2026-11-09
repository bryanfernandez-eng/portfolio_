import { CONTACT } from '../data'
import { classNames } from '../utils/classNames'
import MessageForm from './MessageForm'
import './ContactPanel.css'

function ContactPanel({ dialogRef, isOpen, isShown, onClose }) {
  function handleCancel(event) {
    event.preventDefault()
    onClose()
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className={classNames('note', isShown && 'is-shown')}
      aria-labelledby="note-title"
      onCancel={handleCancel}
      onClick={handleBackdropClick}
    >
      <div className="note-card">
        <header className="note-head">
          <h2 className="wide" id="note-title">{CONTACT.title}</h2>
          <button className="note-close" type="button" onClick={onClose} aria-label={CONTACT.closeLabel}>&times;</button>
        </header>
        <p className="note-intro">{CONTACT.intro}</p>
        {isOpen && <MessageForm onSent={onClose} />}
      </div>
    </dialog>
  )
}

export default ContactPanel