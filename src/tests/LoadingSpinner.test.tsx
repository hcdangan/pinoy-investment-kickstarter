import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders with aria-label', () => {
    render(<LoadingSpinner />)
    expect(screen.getByRole('status', { name: 'Loading' })).toBeDefined()
  })

  it('applies size classes', () => {
    const { container } = render(<LoadingSpinner size="lg" />)
    const spinner = container.firstChild as HTMLElement
    expect(spinner.className).toContain('h-12')
  })
})
