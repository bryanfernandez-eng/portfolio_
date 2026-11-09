function FormField({ name, label, type, rows, autoComplete, hasFocus, value, onChange }) {
  const isTextarea = type === 'textarea'
  const Control = isTextarea ? 'textarea' : 'input'
  const controlProps = isTextarea ? { rows } : { type, autoComplete }

  return (
    <label className="note-field">
      <span>{label}</span>
      <Control name={name} value={value} onChange={onChange} autoFocus={hasFocus} required {...controlProps} />
    </label>
  )
}

export default FormField