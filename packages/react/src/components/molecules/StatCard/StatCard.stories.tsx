import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from './StatCard';

const TrophyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <path d="M3 8l3.5 3.5L13 4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <rect x="2" y="9" width="3" height="5" rx="1" />
    <rect x="6.5" y="6" width="3" height="8" rx="1" />
    <rect x="11" y="3" width="3" height="11" rx="1" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <circle cx="8" cy="8" r="6" />
    <path d="M8 5v3l2 2" strokeLinecap="round" />
  </svg>
);

const meta: Meta<typeof StatCard> = {
  title: 'Molecules/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A metric display card for dashboards. Shows a single key value with optional trend indicator and icon. Trend direction color is contextual — use trendPositive=false for metrics where up is bad (errors, losses).',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    loading: { control: 'boolean' },
  },
  args: {
    label: 'Season points',
    value: '2,840',
    loading: false,
  },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ============================================================
   DEFAULT
   ============================================================ */

export const Default: Story = {
  decorators: [(Story) => <div style={{ width: '220px' }}><Story /></div>],
};

/* ============================================================
   WITH TREND
   ============================================================ */

export const TrendUp: Story = {
  name: 'Trend — up (positive)',
  decorators: [(Story) => <div style={{ width: '220px' }}><Story /></div>],
  args: {
    label: 'Season points',
    value: '2,840',
    trend: { direction: 'up', value: '+124', label: 'vs last month' },
    icon: <TrophyIcon />,
  },
};

export const TrendDown: Story = {
  name: 'Trend — down (negative)',
  decorators: [(Story) => <div style={{ width: '220px' }}><Story /></div>],
  args: {
    label: 'Win rate',
    value: '81%',
    trend: { direction: 'down', value: '−3%', label: 'vs last month' },
    icon: <CheckIcon />,
  },
};

export const TrendNeutral: Story = {
  name: 'Trend — neutral',
  decorators: [(Story) => <div style={{ width: '220px' }}><Story /></div>],
  args: {
    label: 'Current rank',
    value: '#1',
    trend: {
      direction: 'neutral',
      value: 'No change',
      label: 'vs last month',
    },
    icon: <ChartIcon />,
  },
};

export const TrendInverse: Story = {
  name: 'Trend — up is bad (inverse)',
  decorators: [(Story) => <div style={{ width: '220px' }}><Story /></div>],
  args: {
    label: 'Errors this month',
    value: '3',
    trend: {
      direction: 'up',
      value: '+2',
      label: 'vs last month',
      positive: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Set positive=false on trend when up means bad — errors, losses, timeouts. The arrow still points up but renders in error color.',
      },
    },
  },
};

/* ============================================================
   LOADING
   ============================================================ */

export const Loading: Story = {
  decorators: [(Story) => <div style={{ width: '220px' }}><Story /></div>],
  args: {
    label: 'Season points',
    value: '2,840',
    loading: true,
    trend: { direction: 'up', value: '+124', label: 'vs last month' },
    icon: <TrophyIcon />,
  },
};

/* ============================================================
   GRID PATTERN — how stat cards are actually used
   ============================================================ */

export const DashboardGrid: Story = {
  name: 'Dashboard grid (Raindrop)',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        width: '460px',
      }}
    >
      <StatCard
        label="Season points"
        value="2,840"
        trend={{
          direction: 'up',
          value: '+124',
          label: 'vs last month',
        }}
        icon={<TrophyIcon />}
      />
      <StatCard
        label="Win rate"
        value="81%"
        trend={{
          direction: 'down',
          value: '−3%',
          label: 'vs last month',
        }}
        icon={<CheckIcon />}
      />
      <StatCard
        label="Current rank"
        value="#1"
        trend={{
          direction: 'neutral',
          value: 'No change',
          label: 'vs last month',
        }}
        icon={<ChartIcon />}
      />
      <StatCard
        label="Matches played"
        value="22"
        trend={{ direction: 'up', value: '+4', label: 'this season' }}
        icon={<ClockIcon />}
      />
    </div>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'The standard 2×2 or 4-column grid pattern for sports app dashboards.',
      },
    },
  },
};

export const LoadingGrid: Story = {
  name: 'Loading grid',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        width: '460px',
      }}
    >
      <StatCard label="Season points" value="" loading />
      <StatCard label="Win rate" value="" loading />
      <StatCard label="Current rank" value="" loading />
      <StatCard label="Matches played" value="" loading />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skeleton loading state — labels visible while values load. Prevents layout shift.',
      },
    },
  },
};
