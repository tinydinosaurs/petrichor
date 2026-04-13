import type { Meta, StoryObj } from '@storybook/react'
import { Text } from './Text'

const meta = {
  title: 'Atoms/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Typography component. variant controls visual style, as controls semantic element. Smart defaults pair each variant with its most common semantic element — override as only when document hierarchy and visual hierarchy need to diverge.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'display', 'heading1', 'heading2', 'heading3', 'heading4',
        'body-lg', 'body', 'body-sm', 'label', 'caption', 'mono',
      ],
    },
    as: {
      control: 'select',
      options: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'span', 'div', 'label', 'code',
        'strong', 'em', 'small', 'blockquote',
      ],
    },
    truncate: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    variant: 'body',
    children: 'The quick brown fox jumps over the lazy dog.',
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>


/* ============================================================
   DEFAULT
   ============================================================ */

export const Default: Story = {}


/* ============================================================
   TYPE SCALE
   ============================================================ */

export const TypeScale: Story = {
  name: 'Full type scale',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <Text variant="caption" style={{ color: 'var(--ptr-color-text-tertiary)', marginBottom: '4px', display: 'block' }}>
          display — font-display, size-3xl
        </Text>
        <Text variant="display">The Storm Before</Text>
      </div>
      <div>
        <Text variant="caption" style={{ color: 'var(--ptr-color-text-tertiary)', marginBottom: '4px', display: 'block' }}>
          heading1 — font-ui, size-2xl
        </Text>
        <Text variant="heading1">Season Rankings</Text>
      </div>
      <div>
        <Text variant="caption" style={{ color: 'var(--ptr-color-text-tertiary)', marginBottom: '4px', display: 'block' }}>
          heading2 — font-ui, size-xl
        </Text>
        <Text variant="heading2">Top Players</Text>
      </div>
      <div>
        <Text variant="caption" style={{ color: 'var(--ptr-color-text-tertiary)', marginBottom: '4px', display: 'block' }}>
          heading3 — font-ui, size-lg
        </Text>
        <Text variant="heading3">This Season</Text>
      </div>
      <div>
        <Text variant="caption" style={{ color: 'var(--ptr-color-text-tertiary)', marginBottom: '4px', display: 'block' }}>
          heading4 — font-ui, size-md
        </Text>
        <Text variant="heading4">Match Results</Text>
      </div>
      <div>
        <Text variant="caption" style={{ color: 'var(--ptr-color-text-tertiary)', marginBottom: '4px', display: 'block' }}>
          body-lg — font-ui, size-md
        </Text>
        <Text variant="body-lg">Your win rate is trending upward this season. Three consecutive wins have moved you into the top 10.</Text>
      </div>
      <div>
        <Text variant="caption" style={{ color: 'var(--ptr-color-text-tertiary)', marginBottom: '4px', display: 'block' }}>
          body — font-ui, size-base
        </Text>
        <Text variant="body">Regular body text for descriptions, card content, and general reading surfaces.</Text>
      </div>
      <div>
        <Text variant="caption" style={{ color: 'var(--ptr-color-text-tertiary)', marginBottom: '4px', display: 'block' }}>
          body-sm — font-ui, size-sm
        </Text>
        <Text variant="body-sm">Smaller body text for secondary content, helper text, and supporting information.</Text>
      </div>
      <div>
        <Text variant="caption" style={{ color: 'var(--ptr-color-text-tertiary)', marginBottom: '4px', display: 'block' }}>
          label — font-ui, size-sm, weight-label
        </Text>
        <Text variant="label">Email address</Text>
      </div>
      <div>
        <Text variant="caption" style={{ color: 'var(--ptr-color-text-tertiary)', marginBottom: '4px', display: 'block' }}>
          caption — font-ui, size-xs
        </Text>
        <Text variant="caption">Updated 2 minutes ago</Text>
      </div>
      <div>
        <Text variant="caption" style={{ color: 'var(--ptr-color-text-tertiary)', marginBottom: '4px', display: 'block' }}>
          mono — font-mono, size-sm
        </Text>
        <Text variant="mono">const score = 2840</Text>
      </div>
    </div>
  ),
}


/* ============================================================
   BRAND DIFFERENCE — display variant
   ============================================================ */

export const DisplayVariant: Story = {
  name: 'Display — brand personality',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Text variant="display">The Clockmaker's Last Dream</Text>
      <Text variant="body-sm">
        The display variant uses font-display — Fraunces on Dusk Rose, Inter on Raindrop.
        Switch brands in the toolbar to see the personality difference.
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The display variant is where brand personality is most visible. Fraunces on Dusk Rose has intentional wonkiness suited to surrealist fiction. Inter on Raindrop is clean and technical.',
      },
    },
  },
}


/* ============================================================
   POLYMORPHISM — the key feature
   ============================================================ */

export const Polymorphism: Story = {
  name: 'as prop — semantic override',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <Text variant="caption" style={{ color: 'var(--ptr-color-text-tertiary)', display: 'block', marginBottom: '4px' }}>
          Default — heading2 renders as h2
        </Text>
        <Text variant="heading2">Section title</Text>
      </div>
      <div>
        <Text variant="caption" style={{ color: 'var(--ptr-color-text-tertiary)', display: 'block', marginBottom: '4px' }}>
          Override — heading2 style, h3 element (correct outline when nested under an h2)
        </Text>
        <Text variant="heading2" as="h3">Section title</Text>
      </div>
      <div>
        <Text variant="caption" style={{ color: 'var(--ptr-color-text-tertiary)', display: 'block', marginBottom: '4px' }}>
          label variant used as a real &lt;label&gt; element
        </Text>
        <Text variant="label" as="label" htmlFor="email-input">
          Email address
        </Text>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use the as prop when visual hierarchy and document outline diverge. Both examples above look identical — but their semantic elements differ. Screen readers and search engines see the correct structure.',
      },
    },
  },
}


/* ============================================================
   IN CONTEXT — Raindrop
   ============================================================ */

export const RaindropContext: Story = {
  name: 'In context — Raindrop dashboard',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxWidth: '400px' }}>
      <Text variant="heading2">Season Rankings</Text>
      <Text variant="body-sm">Division 1 · Spring 2025</Text>
      <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <Text variant="label">Current rank</Text>
        <Text variant="heading1">#1</Text>
        <Text variant="caption">↑ Up 2 from last month</Text>
      </div>
    </div>
  ),
}


/* ============================================================
   IN CONTEXT — Dusk Rose
   ============================================================ */

export const DuskRoseContext: Story = {
  name: 'In context — Exquisite Corpse story',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '480px' }}>
      <Text variant="display">The Clockmaker's Last Dream</Text>
      <Text variant="body-sm">4 contributors · 6 segments · Complete</Text>
      <Text variant="body-lg">
        The door opened onto a street that hadn't existed yesterday.
        She stepped through anyway, because the rain smelled of copper
        and every clockmaker knows that time runs backwards on Tuesdays.
      </Text>
      <Text variant="caption">Written by Neo, Bella, Molly, and Luna</Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Switch to Dusk Rose brand to see Fraunces render for the display variant — editorial, slightly wonky, suited to surrealist fiction.',
      },
    },
  },
}


/* ============================================================
   TRUNCATION
   ============================================================ */

export const Truncation: Story = {
  name: 'Truncation',
  render: () => (
    <div style={{ width: '240px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Text variant="body" truncate>
        This is a very long piece of text that will be truncated with an ellipsis when it overflows.
      </Text>
      <Text variant="heading3" truncate>
        A very long heading that gets cut off
      </Text>
    </div>
  ),
}
