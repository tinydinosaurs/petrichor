import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Badge } from './Badge'

describe('Badge', () => {

  describe('rendering', () => {
    it('renders children correctly', () => {
      render(<Badge>Stable</Badge>)
      expect(screen.getByText('Stable')).toBeInTheDocument()
    })

    it('renders as a span by default', () => {
      render(<Badge>New</Badge>)
      expect(screen.getByText('New').tagName).toBe('SPAN')
    })

    it('forwards ref correctly', () => {
      const ref = { current: null }
      render(<Badge ref={ref}>New</Badge>)
      expect(ref.current).not.toBeNull()
    })

    it('spreads additional props', () => {
      render(<Badge data-testid="my-badge">New</Badge>)
      expect(screen.getByTestId('my-badge')).toBeInTheDocument()
    })

    it('merges custom className', () => {
      render(<Badge className="custom">New</Badge>)
      expect(screen.getByText('New')).toHaveClass('custom')
    })
  })


  describe('variants', () => {
    it.each([
      'default',
      'info',
      'success',
      'warning',
      'error',
      'brand',
    ] as const)('renders %s variant without error', (variant) => {
      render(<Badge variant={variant}>Label</Badge>)
      expect(screen.getByText('Label')).toBeInTheDocument()
    })
  })


  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)(
      'renders %s size without error',
      (size) => {
        render(<Badge size={size}>Label</Badge>)
        expect(screen.getByText('Label')).toBeInTheDocument()
      },
    )
  })


  describe('iconStart', () => {
    it('renders iconStart', () => {
      render(
        <Badge iconStart={<span data-testid="icon" />}>Label</Badge>,
      )
      expect(screen.getByTestId('icon')).toBeInTheDocument()
    })

    it('marks iconStart as aria-hidden', () => {
      render(
        <Badge iconStart={<span data-testid="icon" />}>Label</Badge>,
      )
      const iconWrapper = screen.getByTestId('icon').parentElement
      expect(iconWrapper).toHaveAttribute('aria-hidden', 'true')
    })
  })


  describe('asChild', () => {
    it('renders as child element when asChild is true', () => {
      render(
        <Badge asChild>
          <a href="/status">Stable</a>
        </Badge>,
      )
      expect(screen.getByRole('link', { name: 'Stable' })).toBeInTheDocument()
      expect(screen.queryByText('Stable')?.tagName).toBe('A')
    })
  })


  describe('accessibility', () => {
    it('has no implicit ARIA role — purely visual', () => {
      render(<Badge>Stable</Badge>)
      const badge = screen.getByText('Stable')
      expect(badge.tagName).toBe('SPAN')
      expect(badge).not.toHaveAttribute('role')
    })

    it('accepts aria-label for context', () => {
      render(<Badge aria-label="Status: stable">Stable</Badge>)
      expect(screen.getByLabelText('Status: stable')).toBeInTheDocument()
    })

    it('color meaning is supplemented by text content', () => {
      render(<Badge variant="error">Offline</Badge>)
      expect(screen.getByText('Offline')).toBeInTheDocument()
    })
  })

})
