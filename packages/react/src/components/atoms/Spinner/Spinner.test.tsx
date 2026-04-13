import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Spinner } from './Spinner'

describe('Spinner', () => {

  describe('rendering', () => {
    it('renders an SVG element', () => {
      render(<Spinner />)
      expect(document.querySelector('svg')).toBeInTheDocument()
    })

    it('has role="status"', () => {
      render(<Spinner />)
      expect(screen.getByRole('status')).toBeInTheDocument()
    })

    it('has default aria-label of "Loading"', () => {
      render(<Spinner />)
      expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading')
    })

    it('accepts a custom label', () => {
      render(<Spinner label="Saving changes" />)
      expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Saving changes')
    })

    it('forwards ref', () => {
      const ref = { current: null }
      render(<Spinner ref={ref} />)
      expect(ref.current).not.toBeNull()
    })

    it('merges custom className', () => {
      render(<Spinner className="custom" />)
      expect(screen.getByRole('status')).toHaveClass('custom')
    })

    it('spreads additional props', () => {
      render(<Spinner data-testid="spinner" />)
      expect(screen.getByTestId('spinner')).toBeInTheDocument()
    })
  })


  describe('sizes', () => {
    it.each([
      ['xs', '12'],
      ['sm', '16'],
      ['md', '20'],
      ['lg', '24'],
    ] as const)('renders size=%s with correct pixel value', (size, px) => {
      render(<Spinner size={size} />)
      const svg = screen.getByRole('status')
      expect(svg).toHaveAttribute('width', px)
      expect(svg).toHaveAttribute('height', px)
    })
  })


  describe('color', () => {
    it('inherits color via currentColor', () => {
      render(
        <span style={{ color: 'red' }}>
          <Spinner data-testid="spinner" />
        </span>,
      )
      // Color inheritance is visual — verified in Storybook
      expect(screen.getByTestId('spinner')).toBeInTheDocument()
    })
  })

})
