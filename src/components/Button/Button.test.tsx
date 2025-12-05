import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(<Button onClick={handleClick}>Click me</Button>)

    await user.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByText('Disabled')).toBeDisabled()
  })

  it('applies variant classes correctly', () => {
    const { container: primaryContainer } = render(<Button variant="primary">Primary</Button>)
    expect(primaryContainer.querySelector('.button--primary')).toBeInTheDocument()

    const { container: secondaryContainer } = render(
      <Button variant="secondary">Secondary</Button>
    )
    expect(secondaryContainer.querySelector('.button--secondary')).toBeInTheDocument()
  })

  it('applies fullWidth class when fullWidth is true', () => {
    const { container } = render(<Button fullWidth>Full Width</Button>)
    expect(container.querySelector('.button--full-width')).toBeInTheDocument()
  })
})

