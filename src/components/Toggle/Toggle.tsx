import type { InputHTMLAttributes } from 'react'
import './Toggle.scss'

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

const Toggle = ({ label, className = '', ...props }: ToggleProps) => {
  return (
    <label className={`toggle ${className}`}>
      <input type="checkbox" className="toggle__input" {...props} />
      <span className="toggle__slider" aria-hidden="true" />
      {label && <span className="toggle__label">{label}</span>}
    </label>
  )
}

export default Toggle

