function FormField({ name, label, type, rows, value, onChange }) {
  const isTextarea = type === 'textarea'
  const Control = isTextarea ? 'textarea' : 'input'
  const controlProps = isTextarea ? { rows } : { type }

  return (
    <p>
      <label>
        {label}<br />
        <Control name={name} value={value} onChange={onChange} {...controlProps} />
      </label>
    </p>
  )
}

export default FormField
