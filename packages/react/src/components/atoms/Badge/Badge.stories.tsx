import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const DotIcon = () => (
  <svg width="6" height="6" viewBox="0 0 6 6" aria-hidden="true">
    <circle cx="3" cy="3" r="3" fill="currentColor" />
  </svg>
)

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A static display label for status, category, or metadata. Badge is purely visual — it has no implicit role and no interactive behavior. For interactive dismissible tags, see Tag (planned).',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error', 'danger', 'brand'],
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: 'md' } },
    },
    children: {
      control: 'text',
    },
  },
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'md',
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>


/* ============================================================
   DEFAULT
   ============================================================ */

export const Default: Story = {}


/* ============================================================
   VARIANTS
   ============================================================ */

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="brand">New</Badge>
    </div>
  ),
}

export const WithDotIcon: Story = {
  name: 'With dot icon',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="success" iconStart={<DotIcon />}>Online</Badge>
      <Badge variant="error" iconStart={<DotIcon />}>Offline</Badge>
      <Badge variant="warning" iconStart={<DotIcon />}>Degraded</Badge>
      <Badge variant="info" iconStart={<DotIcon />}>Live</Badge>
    </div>
  ),
}


/* ============================================================
   SIZES
   ============================================================ */

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
}


/* ============================================================
   COMPOSITION PATTERNS
   ============================================================ */

export const ComponentStatusTaxonomy: Story = {
  name: 'Component status taxonomy',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="default">Draft</Badge>
      <Badge variant="warning">Beta</Badge>
      <Badge variant="success">Stable</Badge>
      <Badge variant="error">Deprecated</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'How Petrichor uses Badge to communicate component status in its own documentation.',
      },
    },
  },
}

export const StoryCardBadges: Story = {
  name: 'Story card badges (Exquisite Corpse)',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="brand">New</Badge>
      <Badge variant="success" iconStart={<DotIcon />}>Complete</Badge>
      <Badge variant="info">4 contributors</Badge>
      <Badge variant="default">6 segments</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge usage in the Exquisite Corpse story card — metadata and status at a glance.',
      },
    },
  },
}

export const LeaderboardBadges: Story = {
  name: 'Leaderboard badges (Raindrop)',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="brand" size="sm">1st</Badge>
      <Badge variant="default" size="sm">2nd</Badge>
      <Badge variant="default" size="sm">3rd</Badge>
      <Badge variant="success" size="sm" iconStart={<DotIcon />}>Active</Badge>
      <Badge variant="error" size="sm" iconStart={<DotIcon />}>Suspended</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge usage in the sports ranking leaderboard.',
      },
    },
  },
}

export const AsLink: Story = {
  name: 'As link',
  render: () => (
    <Badge asChild variant="info">
      <a href="/changelog">v2.4.0</a>
    </Badge>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use asChild to render badge styles on an anchor element. The badge becomes a link — correct semantics, correct styles.',
      },
    },
  },
}
