import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const SearchIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		aria-hidden="true"
	>
		<circle
			cx="7"
			cy="7"
			r="4.5"
			stroke="currentColor"
			strokeWidth="1.25"
		/>
		<path
			d="M10.5 10.5L13 13"
			stroke="currentColor"
			strokeWidth="1.25"
			strokeLinecap="round"
		/>
	</svg>
);

const meta: Meta<typeof Input> = {
	title: 'Atoms/Input',
	component: Input,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A composite text input — includes label, helper text, error message, and character count. Label is always required for accessibility. Error state is driven by the errorMessage prop.',
			},
		},
	},
	argTypes: {
		label: {
			control: 'text',
			description:
				'Always required. Used as the visible label and screen reader label.',
		},
		type: {
			control: 'select',
			options: [
				'text',
				'email',
				'password',
				'number',
				'search',
				'tel',
				'url',
			],
			table: { defaultValue: { summary: 'text' } },
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
			table: { defaultValue: { summary: 'md' } },
		},
		helperText: { control: 'text' },
		errorMessage: { control: 'text' },
		placeholder: { control: 'text' },
		disabled: { control: 'boolean' },
		required: { control: 'boolean' },
		hideLabel: { control: 'boolean' },
		showCount: { control: 'boolean' },
		maxLength: { control: 'number' },
	},
	args: {
		label: 'Label',
		type: 'text',
		size: 'md',
		placeholder: 'Placeholder text',
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
   DEFAULT
   ============================================================ */

export const Default: Story = {};

/* ============================================================
   STATES
   ============================================================ */

export const WithHelperText: Story = {
	name: 'With helper text',
	args: {
		label: 'Email address',
		type: 'email',
		placeholder: 'you@example.com',
		helperText: "We'll never share your email with anyone.",
	},
};

export const WithError: Story = {
	name: 'Error state',
	args: {
		label: 'Email address',
		type: 'email',
		value: 'not-an-email',
		errorMessage: 'Please enter a valid email address.',
	},
};

export const Required: Story = {
	args: {
		label: 'Full name',
		required: true,
		placeholder: 'Jane Smith',
	},
};

export const Disabled: Story = {
	args: {
		label: 'Email address',
		value: 'user@example.com',
		disabled: true,
	},
};

/* ============================================================
   TYPES
   ============================================================ */

export const Password: Story = {
	args: {
		label: 'Password',
		type: 'password',
		placeholder: 'Enter your password',
		helperText: 'Must be at least 8 characters.',
	},
	parameters: {
		docs: {
			description: {
				story: 'Password inputs include a built-in visibility toggle. No extra configuration needed.',
			},
		},
	},
};

export const Search: Story = {
	args: {
		label: 'Search',
		type: 'search',
		placeholder: 'Search players...',
		hideLabel: true,
		prefix: <SearchIcon />,
	},
	parameters: {
		docs: {
			description: {
				story: 'hideLabel keeps the label in the DOM for screen readers without showing it visually. Always provide a meaningful label even when hidden.',
			},
		},
	},
};

/* ============================================================
   ADORNMENTS
   ============================================================ */

export const WithPrefix: Story = {
	name: 'With prefix',
	args: {
		label: 'Amount',
		type: 'number',
		placeholder: '0.00',
		prefix: '$',
	},
};

export const WithSuffix: Story = {
	name: 'With suffix',
	args: {
		label: 'Weight',
		type: 'number',
		placeholder: '0',
		suffix: 'kg',
	},
};

export const WithPrefixAndSuffix: Story = {
	name: 'Prefix and suffix',
	args: {
		label: 'Price range',
		prefix: '$',
		suffix: 'USD',
		placeholder: '0.00',
	},
};

/* ============================================================
   CHARACTER COUNT
   ============================================================ */

export const WithCharacterCount: Story = {
	name: 'Character count',
	args: {
		label: 'Bio',
		maxLength: 160,
		placeholder: 'Tell us about yourself...',
		helperText: 'Shown on your public profile.',
	},
	parameters: {
		docs: {
			description: {
				story: 'Set maxLength to show a character counter. The counter updates as the user types.',
			},
		},
	},
};

export const ExquisiteCorpseEditor: Story = {
	name: 'Story segment editor (Exquisite Corpse)',
	args: {
		label: 'Your segment',
		maxLength: 500,
		showCount: true,
		placeholder: 'Continue the story...',
		helperText: 'Pick up from the last sentence above.',
	},
	parameters: {
		docs: {
			description: {
				story: 'The writing editor pattern for Exquisite Corpse — character count shown as guidance.',
			},
		},
	},
};

/* ============================================================
   SIZES
   ============================================================ */

export const Sizes: Story = {
	render: () => (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '16px',
				width: '320px',
			}}
		>
			<Input label="Small" size="sm" placeholder="32px height" />
			<Input label="Medium" size="md" placeholder="40px height" />
			<Input label="Large" size="lg" placeholder="48px height" />
		</div>
	),
};
