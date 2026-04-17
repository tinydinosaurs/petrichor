import type { Meta, StoryObj } from '@storybook/react';
import { CloudRainIcon, BookOpenIcon, PlusIcon } from '@phosphor-icons/react';
import { Card } from './Card';
import { Badge, Button, Icon } from '../../../index';

const meta: Meta<typeof Card> = {
  title: 'Atoms/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A compound surface component. Use Card bare as a container, or compose with Card.Header, Card.Body, Card.Footer, Card.Image, Card.Divider, and Card.Empty. One topic per card.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/* ============================================================
   BARE CARD
   ============================================================ */

export const Bare: Story = {
  render: () => (
    <Card>
      <div
        style={{
          padding: '16px',
          color: 'var(--ptr-color-text-primary)',
          fontSize: '14px',
        }}
      >
        Bare card — just the surface. No sub-components. Add your own padding and layout.
      </div>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The card surface without any sub-components. Use when you need full control over the interior layout.',
      },
    },
  },
};

/* ============================================================
   WITH SUB-COMPONENTS
   ============================================================ */

export const WithHeader: Story = {
  name: 'With header',
  render: () => (
    <Card>
      <Card.Header>
        <div>
          <div
            style={{
              fontSize: '15px',
              fontWeight: 500,
              color: 'var(--ptr-color-text-primary)',
            }}
          >
            Season Rankings
          </div>
          <div
            style={{
              fontSize: '12px',
              color: 'var(--ptr-color-text-secondary)',
              marginTop: '2px',
            }}
          >
            Updated after each match
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <p
          style={{
            margin: 0,
            fontSize: '14px',
            color: 'var(--ptr-color-text-secondary)',
          }}
        >
          Card body content goes here.
        </p>
      </Card.Body>
    </Card>
  ),
};

export const WithHeaderAndFooter: Story = {
  name: 'With header and footer',
  render: () => (
    <Card>
      <Card.Header bordered>
        <div
          style={{
            fontSize: '15px',
            fontWeight: 500,
            color: 'var(--ptr-color-text-primary)',
          }}
        >
          The Clockmaker's Last Dream
        </div>
      </Card.Header>
      <Card.Body>
        <p
          style={{
            margin: 0,
            fontSize: '14px',
            color: 'var(--ptr-color-text-secondary)',
            lineHeight: 1.6,
          }}
        >
          The door opened onto a street that hadn't existed yesterday. She stepped through anyway...
        </p>
      </Card.Body>
      <Card.Footer bordered>
        <Button variant="primary" size="sm">
          Read story
        </Button>
        <Button variant="ghost" size="sm">
          Save
        </Button>
      </Card.Footer>
    </Card>
  ),
};

export const WithDivider: Story = {
  name: 'With divider',
  render: () => (
    <Card>
      <Card.Body>
        <p
          style={{
            margin: 0,
            fontSize: '14px',
            color: 'var(--ptr-color-text-primary)',
          }}
        >
          First section
        </p>
      </Card.Body>
      <Card.Divider />
      <Card.Body>
        <p
          style={{
            margin: 0,
            fontSize: '14px',
            color: 'var(--ptr-color-text-secondary)',
          }}
        >
          Second section — use dividers sparingly. Let whitespace do the work.
        </p>
      </Card.Body>
    </Card>
  ),
};

/* ============================================================
   WITH IMAGE
   ============================================================ */

export const WithImageTop: Story = {
  name: 'With image — top',
  render: () => (
    <Card>
      <Card.Image
        src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=640&q=80"
        alt="Stormy landscape"
        aspectRatio="16/9"
      />
      <Card.Header>
        <div
          style={{
            fontSize: '15px',
            fontWeight: 500,
            color: 'var(--ptr-color-text-primary)',
          }}
        >
          The Storm Before
        </div>
      </Card.Header>
      <Card.Body>
        <p
          style={{
            margin: 0,
            fontSize: '13px',
            color: 'var(--ptr-color-text-secondary)',
          }}
        >
          4 contributors · 6 segments
        </p>
      </Card.Body>
    </Card>
  ),
};

export const WithImageLeft: Story = {
  name: 'With image — left (horizontal)',
  render: () => (
    <Card>
      <Card.Image
        src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=320&q=80"
        alt="Stormy landscape"
        orientation="left"
      />
      <Card.Body>
        <div
          style={{
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--ptr-color-text-primary)',
            marginBottom: '4px',
          }}
        >
          The Storm Before
        </div>
        <div
          style={{
            fontSize: '12px',
            color: 'var(--ptr-color-text-secondary)',
          }}
        >
          4 contributors
        </div>
      </Card.Body>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Horizontal card layout — image on the left. Good for list-style browsing.',
      },
    },
  },
};

/* ============================================================
   EMPTY STATE
   ============================================================ */

export const EmptyState: Story = {
  name: 'Empty state',
  render: () => (
    <Card>
      <Card.Empty
        icon={<Icon icon={CloudRainIcon} size="xl" duotone />}
        message="No stories yet"
        description="Be the first to start a story. Pick up the pen and see where it goes."
        action={
          <Button variant="primary" iconStart={<Icon icon={PlusIcon} size="sm" />}>
            Start a story
          </Button>
        }
      />
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Empty state with duotone icon, message, description, and CTA. Always tell users why the card is empty and what they can do about it.',
      },
    },
  },
};

export const EmptyStateMinimal: Story = {
  name: 'Empty state — minimal',
  render: () => (
    <Card>
      <Card.Empty
        icon={<Icon icon={BookOpenIcon} size="xl" duotone />}
        message="No matches found"
      />
    </Card>
  ),
};

/* ============================================================
   LOADING
   ============================================================ */

export const Loading: Story = {
  render: () => <Card loading>This content is hidden while loading</Card>,
  parameters: {
    docs: {
      description: {
        story:
          'Skeleton loading state. Content hidden, shimmer animation shows while data fetches.',
      },
    },
  },
};

/* ============================================================
   SEMANTIC ELEMENT
   ============================================================ */

export const AsArticle: Story = {
  name: 'As article',
  render: () => (
    <Card as="article" aria-label="Story: The Clockmaker's Last Dream">
      <Card.Header>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%',
          }}
        >
          <div
            style={{
              fontSize: '15px',
              fontWeight: 500,
              color: 'var(--ptr-color-text-primary)',
            }}
          >
            The Clockmaker's Last Dream
          </div>
          <Badge variant="success">Complete</Badge>
        </div>
      </Card.Header>
      <Card.Body>
        <p
          style={{
            margin: 0,
            fontSize: '13px',
            color: 'var(--ptr-color-text-secondary)',
            lineHeight: 1.6,
          }}
        >
          The door opened onto a street that hadn't existed yesterday...
        </p>
      </Card.Body>
      <Card.Footer>
        <Badge variant="default">4 contributors</Badge>
        <Badge variant="default">6 segments</Badge>
      </Card.Footer>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Use as="article" for standalone content cards. Adds a semantic article landmark navigable by screen readers.',
      },
    },
  },
};

/* ============================================================
   STAT CARD — shows StatCard using Card base
   ============================================================ */

export const StatCardPattern: Story = {
  name: 'StatCard built on Card',
  render: () => (
    <Card>
      <Card.Body>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <span
            style={{
              fontSize: '12px',
              color: 'var(--ptr-color-text-secondary)',
            }}
          >
            Season points
          </span>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              background: 'var(--ptr-color-status-info-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ptr-color-status-info-text)',
            }}
          >
            ★
          </div>
        </div>
        <div
          style={{
            fontSize: '28px',
            fontWeight: 500,
            color: 'var(--ptr-color-text-primary)',
            lineHeight: 1,
            marginTop: 8,
          }}
        >
          2,840
        </div>
        <div
          style={{
            fontSize: '12px',
            color: 'var(--ptr-color-text-success)',
            marginTop: 8,
          }}
        >
          ↑ +124 vs last month
        </div>
      </Card.Body>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'StatCard will be refactored to use Card as its surface. This shows the pattern.',
      },
    },
  },
};
