import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Text } from './Text';

describe('Text', () => {
  describe('default elements', () => {
    it('renders display as h1', () => {
      render(<Text variant="display">Title</Text>);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('renders heading1 as h1', () => {
      render(<Text variant="heading1">Title</Text>);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('renders heading2 as h2', () => {
      render(<Text variant="heading2">Title</Text>);
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('renders heading3 as h3', () => {
      render(<Text variant="heading3">Title</Text>);
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });

    it('renders heading4 as h4', () => {
      render(<Text variant="heading4">Title</Text>);
      expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();
    });

    it('renders body as p', () => {
      render(<Text variant="body">Text</Text>);
      expect(document.querySelector('p')).toBeInTheDocument();
    });

    it('renders body-lg as p', () => {
      render(<Text variant="body-lg">Text</Text>);
      expect(document.querySelector('p')).toBeInTheDocument();
    });

    it('renders body-sm as p', () => {
      render(<Text variant="body-sm">Text</Text>);
      expect(document.querySelector('p')).toBeInTheDocument();
    });

    it('renders label as span', () => {
      render(<Text variant="label">Label</Text>);
      expect(document.querySelector('span')).toBeInTheDocument();
    });

    it('renders caption as span', () => {
      render(<Text variant="caption">Caption</Text>);
      expect(document.querySelector('span')).toBeInTheDocument();
    });

    it('renders mono as code', () => {
      render(<Text variant="mono">const x = 1</Text>);
      expect(document.querySelector('code')).toBeInTheDocument();
    });
  });

  describe('as prop overrides default element', () => {
    it('renders heading2 variant as h3 element', () => {
      render(
        <Text variant="heading2" as="h3">
          Title
        </Text>,
      );
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });

    it('renders body variant as span element', () => {
      render(
        <Text variant="body" as="span">
          Text
        </Text>,
      );
      expect(document.querySelector('span')).toBeInTheDocument();
      expect(document.querySelector('p')).not.toBeInTheDocument();
    });

    it('renders label variant as label element', () => {
      render(
        <Text variant="label" as="label" htmlFor="email">
          Email
        </Text>,
      );
      expect(screen.getByText('Email').tagName).toBe('LABEL');
    });

    it('renders caption as div', () => {
      render(
        <Text variant="caption" as="div">
          Small text
        </Text>,
      );
      expect(document.querySelector('div')).toBeInTheDocument();
    });
  });

  describe('rendering', () => {
    it('renders children', () => {
      render(<Text variant="body">Hello world</Text>);
      expect(screen.getByText('Hello world')).toBeInTheDocument();
    });

    it('forwards ref', () => {
      const ref = { current: null };
      render(
        <Text ref={ref} variant="body">
          Text
        </Text>,
      );
      expect(ref.current).not.toBeNull();
    });

    it('merges custom className', () => {
      render(
        <Text variant="body" className="custom" data-testid="text">
          Text
        </Text>,
      );
      expect(screen.getByTestId('text')).toHaveClass('custom');
    });

    it('spreads additional props', () => {
      render(
        <Text variant="body" data-testid="text">
          Text
        </Text>,
      );
      expect(screen.getByTestId('text')).toBeInTheDocument();
    });

    it('renders with truncate prop', () => {
      render(
        <Text variant="body" truncate data-testid="text">
          Long text
        </Text>,
      );
      expect(screen.getByTestId('text')).toHaveClass('truncate');
    });
  });

  describe('all variants render without error', () => {
    const variants = [
      'display',
      'heading1',
      'heading2',
      'heading3',
      'heading4',
      'body-lg',
      'body',
      'body-sm',
      'label',
      'caption',
      'mono',
    ] as const;

    it.each(variants)('renders variant=%s', (variant) => {
      render(
        <Text variant={variant} data-testid="text">
          Content
        </Text>,
      );
      expect(screen.getByTestId('text')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('heading variants are navigable by screen readers', () => {
      render(
        <div>
          <Text variant="heading1">Page title</Text>
          <Text variant="heading2">Section</Text>
          <Text variant="heading3">Subsection</Text>
        </div>,
      );
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });

    it('preserves document outline when as prop overrides element', () => {
      render(
        <div>
          <Text variant="heading1">Page title</Text>
          <Text variant="heading2" as="h3">
            Visually h2, semantically h3
          </Text>
        </div>,
      );
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
    });
  });
});
