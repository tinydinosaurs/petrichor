import type { Meta, StoryObj } from '@storybook/react'
import { Spinner } from './Spinner'

const meta = {
  title: 'Atoms/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A loading indicator. Inherits color from its parent via currentColor. Use inside Button (built-in via loading prop), or standalone for page/section loading states.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      table: { defaultValue: { summary: 'sm' } },
    },
    label: {
      control: 'text',
      table: { defaultValue: { summary: 'Loading' } },
    },
  },
  args: {
    size: 'md',
    label: 'Loading',
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>


export const Default: Story = {}


export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
        <div
          key={size}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
        >
          <Spinner size={size} />
          <span style={{ fontSize: '10px', color: 'var(--ptr-color-text-secondary)' }}>{size}</span>
        </div>
      ))}
    </div>
  ),
}


export const ColorInheritance: Story = {
  name: 'Color inheritance',
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      {[
        { color: 'var(--ptr-color-text-primary)', label: 'primary' },
        { color: 'var(--ptr-color-text-secondary)', label: 'secondary' },
        { color: 'var(--ptr-color-brand-primary)', label: 'brand' },
        { color: 'var(--ptr-color-status-error-text)', label: 'error' },
      ].map(({ color, label }) => (
        <div
          key={label}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color }}
        >
          <Spinner size="md" />
          <span style={{ fontSize: '10px', opacity: 0.7 }}>{label}</span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Spinner inherits color from the parent element. Set color on the parent, not the spinner.',
      },
    },
  },
}


export const InContext: Story = {
  name: 'In context — loading state',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '240px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: 'var(--ptr-color-text-secondary)',
        fontSize: 'var(--ptr-typography-size-sm)',
        fontFamily: 'var(--ptr-typography-font-ui)',
      }}>
        <Spinner size="sm" label="Loading results" />
        <span>Loading results...</span>
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        color: 'var(--ptr-color-text-tertiary)',
      }}>
        <Spinner size="lg" label="Loading dashboard" />
      </div>
    </div>
  ),
}
