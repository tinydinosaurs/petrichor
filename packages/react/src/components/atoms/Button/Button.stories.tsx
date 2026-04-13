import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
	title: 'Atoms/Button',
	component: Button,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'The foundational interactive element. Every action a user can take is expressed through a Button. Use the variant to communicate hierarchy and consequence.',
			},
		},
	},
	argTypes: {
		variant: {
			control: 'select',
			options: [
				'primary',
				'secondary',
				'ghost',
				'danger',
				'ghost-danger',
			],
			description: 'Visual hierarchy and semantic meaning',
			table: { defaultValue: { summary: 'primary' } },
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
			description: 'Height and padding scale',
			table: { defaultValue: { summary: 'md' } },
		},
		loading: {
			control: 'boolean',
			description:
				'Shows a spinner and disables interaction. Sets aria-busy.',
			table: { defaultValue: { summary: 'false' } },
		},
		disabled: {
			control: 'boolean',
			description: 'Removes from tab order and blocks interaction.',
			table: { defaultValue: { summary: 'false' } },
		},
		iconOnly: {
			control: 'boolean',
			description:
				'Square button — requires aria-label for accessibility.',
			table: { defaultValue: { summary: 'false' } },
		},
		asChild: {
			control: 'boolean',
			description: 'Renders as the child element. Use for link buttons.',
			table: { defaultValue: { summary: 'false' } },
		},
		children: {
			control: 'text',
			description: 'Button label text',
		},
	},
	args: {
		children: 'Button label',
		variant: 'primary',
		size: 'md',
		loading: false,
		disabled: false,
		iconOnly: false,
		asChild: false,
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

/* ============================================================
   DEFAULT
   ============================================================ */

export const Default: Story = {};

/* ============================================================
   VARIANTS
   ============================================================ */

export const Primary: Story = {
	args: { variant: 'primary', children: 'Save changes' },
};

export const Secondary: Story = {
	args: { variant: 'secondary', children: 'Cancel' },
};

export const Ghost: Story = {
	args: { variant: 'ghost', children: 'View details' },
};

export const Danger: Story = {
	args: { variant: 'danger', children: 'Delete account' },
	parameters: {
		docs: {
			description: {
				story: 'Use only for destructive, irreversible actions. Never for anything non-destructive.',
			},
		},
	},
};

export const GhostDanger: Story = {
	name: 'Ghost danger',
	args: { variant: 'ghost-danger', children: 'Remove' },
	parameters: {
		docs: {
			description: {
				story: 'Destructive but low emphasis — for inline list actions where a filled danger button would be too alarming.',
			},
		},
	},
};

/* ============================================================
   SIZES
   ============================================================ */

export const Sizes: Story = {
	render: () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
			<Button size="sm">Small</Button>
			<Button size="md">Medium</Button>
			<Button size="lg">Large</Button>
		</div>
	),
};

/* ============================================================
   STATES
   ============================================================ */

export const Loading: Story = {
	args: { loading: true, children: 'Saving...' },
};

export const Disabled: Story = {
	args: { disabled: true, children: 'Save changes' },
};

/* ============================================================
   ICONS
   ============================================================ */

const IconPlaceholder = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="currentColor"
		aria-hidden="true"
	>
		<rect x="2" y="2" width="12" height="12" rx="2" opacity="0.8" />
	</svg>
);

export const WithIconStart: Story = {
	name: 'Icon start',
	args: {
		iconStart: <IconPlaceholder />,
		children: 'Export',
	},
};

export const WithIconEnd: Story = {
	name: 'Icon end',
	args: {
		iconEnd: <IconPlaceholder />,
		children: 'Next',
	},
};

export const IconOnlyStory: Story = {
	name: 'Icon only',
	args: {
		iconOnly: true,
		'aria-label': 'Close dialog',
		children: <IconPlaceholder />,
	},
	parameters: {
		docs: {
			description: {
				story: 'Always provide an aria-label when using iconOnly. The label is read by screen readers.',
			},
		},
	},
};

/* ============================================================
   COMPOSITION PATTERNS
   ============================================================ */

export const AsLink: Story = {
	name: 'As link',
	render: () => (
		<Button asChild variant="primary">
			<a href="https://example.com">Visit site</a>
		</Button>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use asChild to render button styles on an anchor element. The button renders as an <a> tag — correct semantics, correct styles.',
			},
		},
	},
};

export const AllVariants: Story = {
	name: 'All variants',
	render: () => (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '12px',
				alignItems: 'flex-start',
			}}
		>
			<Button variant="primary">Primary</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="danger">Danger</Button>
			<Button variant="ghost-danger">Ghost danger</Button>
		</div>
	),
};
