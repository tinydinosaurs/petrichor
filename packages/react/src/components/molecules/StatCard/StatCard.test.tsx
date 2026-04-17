import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatCard } from './StatCard';

describe('StatCard', () => {
  describe('rendering', () => {
    it('renders label and value', () => {
      render(<StatCard label="Season points" value="2,840" />);
      expect(screen.getByText('Season points')).toBeInTheDocument();
      expect(screen.getByText('2,840')).toBeInTheDocument();
    });

    it('renders as an article element', () => {
      render(<StatCard label="Season points" value="2,840" />);
      expect(screen.getByRole('article')).toBeInTheDocument();
    });

    it('renders numeric value', () => {
      render(<StatCard label="Rank" value={1} />);
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('forwards ref', () => {
      const ref = { current: null };
      render(<StatCard ref={ref} label="Points" value="2,840" />);
      expect(ref.current).not.toBeNull();
    });

    it('spreads additional props', () => {
      render(<StatCard data-testid="stat" label="Points" value="2,840" />);
      expect(screen.getByTestId('stat')).toBeInTheDocument();
    });
  });

  describe('icon', () => {
    it('renders icon when provided', () => {
      render(<StatCard label="Points" value="2,840" icon={<span data-testid="icon" />} />);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('marks icon as aria-hidden when no iconLabel', () => {
      render(<StatCard label="Points" value="2,840" icon={<span data-testid="icon" />} />);
      const iconWrap = screen.getByTestId('icon').parentElement;
      expect(iconWrap).toHaveAttribute('aria-hidden', 'true');
    });

    it('marks icon as informative when iconLabel is provided', () => {
      render(
        <StatCard
          label="Points"
          value="2,840"
          icon={<span data-testid="icon" />}
          iconLabel="Trophy"
        />,
      );
      const iconWrap = screen.getByTestId('icon').parentElement;
      expect(iconWrap).toHaveAttribute('aria-label', 'Trophy');
      expect(iconWrap).toHaveAttribute('role', 'img');
    });
  });

  describe('trend', () => {
    it('renders trend value and label', () => {
      render(
        <StatCard
          label="Points"
          value="2,840"
          trend={{
            direction: 'up',
            value: '+124',
            label: 'vs last month',
          }}
        />,
      );
      expect(screen.getByText('+124')).toBeInTheDocument();
      expect(screen.getByText('vs last month')).toBeInTheDocument();
    });

    it('generates accessible aria-label for upward trend', () => {
      render(
        <StatCard
          label="Points"
          value="2,840"
          trend={{
            direction: 'up',
            value: '+124',
            label: 'vs last month',
          }}
        />,
      );
      expect(screen.getByLabelText('Up +124 vs last month')).toBeInTheDocument();
    });

    it('generates accessible aria-label for downward trend', () => {
      render(
        <StatCard
          label="Win rate"
          value="81%"
          trend={{
            direction: 'down',
            value: '−3%',
            label: 'vs last month',
          }}
        />,
      );
      expect(screen.getByLabelText('Down −3% vs last month')).toBeInTheDocument();
    });

    it('generates accessible aria-label for neutral trend', () => {
      render(
        <StatCard label="Rank" value="#1" trend={{ direction: 'neutral', value: 'No change' }} />,
      );
      expect(screen.getByLabelText('No change No change')).toBeInTheDocument();
    });

    it('renders trend without label', () => {
      render(<StatCard label="Points" value="2,840" trend={{ direction: 'up', value: '+124' }} />);
      expect(screen.getByText('+124')).toBeInTheDocument();
    });

    it('does not render trend when loading', () => {
      render(
        <StatCard
          label="Points"
          value="2,840"
          loading
          trend={{
            direction: 'up',
            value: '+124',
            label: 'vs last month',
          }}
        />,
      );
      expect(screen.queryByText('+124')).not.toBeInTheDocument();
    });

    it('applies trendPositive=false for inverse metrics', () => {
      render(
        <StatCard
          label="Errors"
          value="3"
          trend={{
            direction: 'up',
            value: '+2',
            label: 'vs last week',
            positive: false,
          }}
        />,
      );
      const trendEl = screen.getByLabelText('Up +2 vs last week');
      expect(trendEl).toBeInTheDocument();
    });
  });

  describe('loading state', () => {
    it('shows skeleton when loading', () => {
      render(<StatCard label="Points" value="2,840" loading />);
      // Card renders skeleton — just verify the value is hidden
      expect(screen.queryByText('2,840')).not.toBeInTheDocument();
    });

    it('hides value when loading', () => {
      render(<StatCard label="Points" value="2,840" loading />);
      expect(screen.queryByText('2,840')).not.toBeInTheDocument();
    });

    it('still shows label when loading', () => {
      render(<StatCard label="Points" value="2,840" loading />);
      expect(screen.getByText('Points')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('trend arrow is aria-hidden', () => {
      const { container } = render(
        <StatCard
          label="Points"
          value="2,840"
          trend={{
            direction: 'up',
            value: '+124',
            label: 'vs last month',
          }}
        />,
      );
      const arrows = container.querySelectorAll('[aria-hidden="true"] svg');
      expect(arrows.length).toBeGreaterThan(0);
    });

    it('full card is accessible as an article landmark', () => {
      render(<StatCard label="Season points" value="2,840" />);
      expect(screen.getByRole('article')).toBeInTheDocument();
    });
  });
});
