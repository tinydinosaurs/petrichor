import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  describe('Card root', () => {
    it('renders as div by default', () => {
      render(<Card data-testid="card">Content</Card>);
      expect(screen.getByTestId('card').tagName).toBe('DIV');
    });

    it('renders as article when as="article"', () => {
      render(
        <Card as="article" data-testid="card">
          Content
        </Card>,
      );
      expect(screen.getByTestId('card').tagName).toBe('ARTICLE');
    });

    it('renders as section when as="section"', () => {
      render(
        <Card as="section" data-testid="card">
          Content
        </Card>,
      );
      expect(screen.getByTestId('card').tagName).toBe('SECTION');
    });

    it('renders as li when as="li"', () => {
      render(
        <ul>
          <Card as="li" data-testid="card">
            Content
          </Card>
        </ul>,
      );
      expect(screen.getByTestId('card').tagName).toBe('LI');
    });

    it('renders children', () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('forwards ref', () => {
      const ref = { current: null };
      render(<Card ref={ref}>Content</Card>);
      expect(ref.current).not.toBeNull();
    });

    it('merges custom className', () => {
      render(
        <Card className="custom" data-testid="card">
          Content
        </Card>,
      );
      expect(screen.getByTestId('card')).toHaveClass('custom');
    });

    it('spreads additional props', () => {
      render(
        <Card data-testid="card" aria-label="Stats">
          Content
        </Card>,
      );
      expect(screen.getByTestId('card')).toHaveAttribute('aria-label', 'Stats');
    });
  });

  describe('Card loading', () => {
    it('hides children when loading', () => {
      render(<Card loading>Real content</Card>);
      expect(screen.queryByText('Real content')).not.toBeInTheDocument();
    });

    it('renders skeleton when loading', () => {
      const { container } = render(<Card loading>Content</Card>);
      expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
    });
  });

  describe('Card.Header', () => {
    it('renders children', () => {
      render(
        <Card>
          <Card.Header>Header content</Card.Header>
        </Card>,
      );
      expect(screen.getByText('Header content')).toBeInTheDocument();
    });

    it('renders without bordered by default', () => {
      render(
        <Card>
          <Card.Header data-testid="header">Header</Card.Header>
        </Card>,
      );
      expect(screen.getByTestId('header')).not.toHaveClass('headerBordered');
    });
  });

  describe('Card.Body', () => {
    it('renders children', () => {
      render(
        <Card>
          <Card.Body>Body content</Card.Body>
        </Card>,
      );
      expect(screen.getByText('Body content')).toBeInTheDocument();
    });
  });

  describe('Card.Footer', () => {
    it('renders children', () => {
      render(
        <Card>
          <Card.Footer>Footer content</Card.Footer>
        </Card>,
      );
      expect(screen.getByText('Footer content')).toBeInTheDocument();
    });
  });

  describe('Card.Image', () => {
    it('renders an image with alt text', () => {
      render(
        <Card>
          <Card.Image src="/photo.jpg" alt="A photo" />
        </Card>,
      );
      expect(screen.getByAltText('A photo')).toBeInTheDocument();
    });

    it('requires alt text', () => {
      render(
        <Card>
          <Card.Image src="/photo.jpg" alt="" />
        </Card>,
      );
      expect(screen.getByRole('presentation')).toHaveAttribute('alt', '');
    });
  });

  describe('Card.Divider', () => {
    it('renders a separator', () => {
      render(
        <Card>
          <Card.Body>Top</Card.Body>
          <Card.Divider />
          <Card.Body>Bottom</Card.Body>
        </Card>,
      );
      expect(document.querySelector('hr')).toBeInTheDocument();
    });

    it('is aria-hidden', () => {
      render(
        <Card>
          <Card.Divider />
        </Card>,
      );
      expect(document.querySelector('hr')).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Card.Empty', () => {
    it('renders message', () => {
      render(
        <Card>
          <Card.Empty message="No stories yet" />
        </Card>,
      );
      expect(screen.getByText('No stories yet')).toBeInTheDocument();
    });

    it('renders description when provided', () => {
      render(
        <Card>
          <Card.Empty message="No stories yet" description="Start by creating a new story" />
        </Card>,
      );
      expect(screen.getByText('Start by creating a new story')).toBeInTheDocument();
    });

    it('renders icon when provided', () => {
      render(
        <Card>
          <Card.Empty message="No stories" icon={<span data-testid="icon" />} />
        </Card>,
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('renders action when provided', () => {
      render(
        <Card>
          <Card.Empty message="No stories" action={<button>Create story</button>} />
        </Card>,
      );
      expect(screen.getByRole('button', { name: 'Create story' })).toBeInTheDocument();
    });

    it('icon container is aria-hidden', () => {
      render(
        <Card>
          <Card.Empty message="No stories" icon={<span data-testid="icon" />} />
        </Card>,
      );
      const iconContainer = screen.getByTestId('icon').parentElement;
      expect(iconContainer).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('compound composition', () => {
    it('renders a fully composed card', () => {
      render(
        <Card as="article">
          <Card.Image src="/photo.jpg" alt="Story cover" />
          <Card.Header>
            <h2>The Clockmaker</h2>
          </Card.Header>
          <Card.Body>
            <p>A story about time.</p>
          </Card.Body>
          <Card.Divider />
          <Card.Footer>
            <button>Read story</button>
          </Card.Footer>
        </Card>,
      );
      expect(screen.getByRole('article')).toBeInTheDocument();
      expect(screen.getByAltText('Story cover')).toBeInTheDocument();
      expect(screen.getByText('The Clockmaker')).toBeInTheDocument();
      expect(screen.getByText('A story about time.')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Read story' })).toBeInTheDocument();
    });
  });
});
