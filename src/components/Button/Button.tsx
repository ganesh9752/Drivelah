import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  fullWidth?: boolean
}

const Button = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`button button--${variant} ${fullWidth ? 'button--full-width' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

