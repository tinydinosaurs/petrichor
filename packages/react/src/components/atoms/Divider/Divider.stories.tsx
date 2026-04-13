import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from './Divider'

const meta = {
  title: 'Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A thin decorative line for separating content sections. Always aria-hidden — purely visual. For structural separation inside Card, use Card.Divider instead.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      table: { defaultValue: { summary: 'horizontal' } },
    },
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      table: { defaultValue: { summary: 'none' } },
    },
  },
  args: {
    orientation: 'horizontal',
    spacing: 'none',
  },
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>


export const Default: Story = {}


export const WithSpacing: Story = {
  name: 'With spacing',
  render: () => (
    <div style={{ width: '320px' }}>
      <p style={{ margin: 0, fontSize: 'var(--ptr-typography-size-sm)', color: 'var(--ptr-color-text-secondary)', fontFamily: 'var(--ptr-typography-font-ui)' }}>
        Section above
      </p>
      <Divider spacing="md" />
      <p style={{ margin: 0, fontSize: 'var(--ptr-typography-size-sm)', color: 'var(--ptr-color-text-secondary)', fontFamily: 'var(--ptr-typography-font-ui)' }}>
        Section below
      </p>
    </div>
  ),
}


export const Vertical: Story = {
  name: 'Vertical',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', height: '40px', gap: '0' }}>
      <span style={{ fontSize: 'var(--ptr-typography-size-sm)', color: 'var(--ptr-color-text-secondary)', fontFamily: 'var(--ptr-typography-font-ui)', padding: '0 12px' }}>
        Left
      </span>
      <Divider orientation="vertical" />
      <span style={{ fontSize: 'var(--ptr-typography-size-sm)', color: 'var(--ptr-color-text-secondary)', fontFamily: 'var(--ptr-typography-font-ui)', padding: '0 12px' }}>
        Right
      </span>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Vertical divider separates inline content. Requires a flex parent with a defined height. align-self: stretch makes it fill the parent height automatically.',
      },
    },
  },
}


export const InContext: Story = {
  name: 'In context — nav toolbar',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', height: '36px', padding: '0 8px', background: 'var(--ptr-color-bg-surface)', borderRadius: 'var(--ptr-radius-md)', width: 'fit-content' }}>
      {['Bold', 'Italic', 'Strike'].map((label) => (
        <button key={label} style={{ padding: '4px 8px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 'var(--ptr-typography-size-sm)', color: 'var(--ptr-color-text-secondary)', fontFamily: 'var(--ptr-typography-font-ui)', borderRadius: 'var(--ptr-radius-sm)' }}>
          {label}
        </button>
      ))}
      <Divider orientation="vertical" spacing="sm" />
      {['H1', 'H2'].map((label) => (
        <button key={label} style={{ padding: '4px 8px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 'var(--ptr-typography-size-sm)', color: 'var(--ptr-color-text-secondary)', fontFamily: 'var(--ptr-typography-font-ui)', borderRadius: 'var(--ptr-radius-sm)' }}>
          {label}
        </button>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Vertical divider in a toolbar — separates related groups of actions. This pattern appears in the Exquisite Corpse rich text editor toolbar.',
      },
    },
  },
}
