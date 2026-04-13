import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { StoryCard } from './StoryCard'

const baseProps = {
  title: 'The Clockmaker\'s Last Dream',
  status: 'completed' as const,
  href: '/stories/1',
  mode: 'completed' as const,
}

describe('StoryCard', () => {

  describe('rendering', () => {
    it('renders the story title', () => {
      render(<StoryCard {...baseProps} />)
      expect(screen.getByText("The Clockmaker's Last Dream")).toBeInTheDocument()
    })

    it('renders as an article element', () => {
      render(<StoryCard {...baseProps} />)
      expect(screen.getByRole('article')).toBeInTheDocument()
    })

    it('has accessible aria-label', () => {
      render(<StoryCard {...baseProps} />)
      expect(screen.getByRole('article')).toHaveAttribute(
        'aria-label',
        "Story: The Clockmaker's Last Dream",
      )
    })

    it('renders the CTA link', () => {
      render(<StoryCard {...baseProps} />)
      expect(screen.getByRole('link')).toHaveAttribute('href', '/stories/1')
    })

    it('forwards ref', () => {
      const ref = { current: null }
      render(<StoryCard ref={ref} {...baseProps} />)
      expect(ref.current).not.toBeNull()
    })
  })


  describe('status badge', () => {
    it.each([
      ['draft', 'Draft'],
      ['in_progress', 'In progress'],
      ['completed', 'Complete'],
      ['abandoned', 'Abandoned'],
      ['moderated', 'Moderated'],
    ] as const)('renders status=%s with label=%s', (status, label) => {
      render(<StoryCard {...baseProps} status={status} />)
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })


  describe('anonymous mode', () => {
    const anonProps = { ...baseProps, mode: 'anonymous' as const }

    it('renders CTA as "Read story"', () => {
      render(<StoryCard {...anonProps} />)
      expect(screen.getByRole('link', { name: 'Read story' })).toBeInTheDocument()
    })

    it('renders excerpt when provided', () => {
      render(<StoryCard {...anonProps} excerpt="The door opened..." />)
      expect(screen.getByText('The door opened...')).toBeInTheDocument()
    })

    it('renders cover image when provided', () => {
      render(<StoryCard {...anonProps} coverSrc="/cover.jpg" coverAlt="Story cover" />)
      expect(screen.getByAltText('Story cover')).toBeInTheDocument()
    })

    it('does not render contributors', () => {
      render(
        <StoryCard
          {...anonProps}
          contributors={[{ name: 'Neo' }, { name: 'Bella' }]}
        />,
      )
      expect(screen.queryByLabelText('2 contributors')).not.toBeInTheDocument()
    })
  })


  describe('completed mode', () => {
    const completedProps = { ...baseProps, mode: 'completed' as const }

    it('renders CTA as "Read story"', () => {
      render(<StoryCard {...completedProps} />)
      expect(screen.getByRole('link', { name: 'Read story' })).toBeInTheDocument()
    })

    it('renders contributors', () => {
      render(
        <StoryCard
          {...completedProps}
          contributors={[{ name: 'Neo' }, { name: 'Bella' }]}
        />,
      )
      expect(screen.getByLabelText('2 contributors')).toBeInTheDocument()
    })

    it('renders segment count', () => {
      render(<StoryCard {...completedProps} currentSegments={6} maxSegments={10} />)
      expect(screen.getByText('6 / 10 segments')).toBeInTheDocument()
    })

    it('renders segment count without max', () => {
      render(<StoryCard {...completedProps} currentSegments={6} />)
      expect(screen.getByText('6 segments')).toBeInTheDocument()
    })

    it('renders relative date when completedAt provided', () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      render(<StoryCard {...completedProps} completedAt={yesterday} />)
      expect(screen.getByText('Yesterday')).toBeInTheDocument()
    })
  })


  describe('active mode', () => {
    const activeProps = {
      ...baseProps,
      mode: 'active' as const,
      status: 'in_progress' as const,
    }

    it('renders "Continue story" CTA when below min segments', () => {
      render(
        <StoryCard
          {...activeProps}
          currentSegments={3}
          minSegments={5}
        />,
      )
      expect(screen.getByRole('link', { name: 'Continue story' })).toBeInTheDocument()
    })

    it('renders "Complete story" CTA when at or above min segments', () => {
      render(
        <StoryCard
          {...activeProps}
          currentSegments={5}
          minSegments={5}
        />,
      )
      expect(screen.getByRole('link', { name: 'Complete story' })).toBeInTheDocument()
    })

    it('does not render excerpt', () => {
      render(<StoryCard {...activeProps} excerpt="Secret content" />)
      expect(screen.queryByText('Secret content')).not.toBeInTheDocument()
    })

    it('renders teaser text instead of excerpt', () => {
      render(<StoryCard {...activeProps} />)
      expect(screen.getByText(/pick up where the last writer left off/i)).toBeInTheDocument()
    })

    it('does not render cover image', () => {
      render(<StoryCard {...activeProps} coverSrc="/cover.jpg" coverAlt="Cover" />)
      expect(screen.queryByAltText('Cover')).not.toBeInTheDocument()
    })
  })


  describe('tags', () => {
    it('renders tags as badges', () => {
      render(<StoryCard {...baseProps} tags={['surrealist', 'horror']} />)
      expect(screen.getByText('surrealist')).toBeInTheDocument()
      expect(screen.getByText('horror')).toBeInTheDocument()
    })

    it('renders no tags when empty', () => {
      render(<StoryCard {...baseProps} tags={[]} />)
      expect(screen.queryByRole('term')).not.toBeInTheDocument()
    })
  })


  describe('avatar overflow', () => {
    it('shows up to 3 avatars', () => {
      render(
        <StoryCard
          {...baseProps}
          contributors={[
            { name: 'Neo' },
            { name: 'Bella' },
            { name: 'Molly' },
          ]}
        />,
      )
      expect(screen.queryByText('+0')).not.toBeInTheDocument()
    })

    it('shows overflow count when more than 3 contributors', () => {
      render(
        <StoryCard
          {...baseProps}
          contributors={[
            { name: 'Neo' },
            { name: 'Bella' },
            { name: 'Molly' },
            { name: 'Luna' },
            { name: 'Millie' },
          ]}
        />,
      )
      expect(screen.getByText('+2')).toBeInTheDocument()
    })
  })


  describe('loading state', () => {
    it('renders loading skeleton', () => {
      render(<StoryCard {...baseProps} loading />)
      expect(screen.getByRole('article')).toBeInTheDocument()
    })
  })

})
