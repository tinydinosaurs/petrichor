import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
	title: 'Atoms/Avatar',
	component: Avatar,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'Represents a person with a photo, initials, or icon fallback. Fallback cascade: image → initials → icon. Status dot is optional.',
			},
		},
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
			table: { defaultValue: { summary: 'md' } },
		},
		status: {
			control: 'select',
			options: [undefined, 'online', 'offline', 'away', 'busy'],
		},
		src: { control: 'text' },
		alt: { control: 'text' },
		name: { control: 'text' },
	},
	args: {
		size: 'md',
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

/* ============================================================
   DEFAULT
   ============================================================ */

export const Default: Story = {
	args: { name: 'Neo' },
};

/* ============================================================
   FALLBACK CASCADE
   ============================================================ */

export const WithImage: Story = {
	name: 'With image',
	args: {
		src: 'https://placecats.com/neo/150/150',
		alt: 'Neo',
		name: 'Neo',
	},
};

export const WithInitials: Story = {
	name: 'Initials fallback',
	args: {
		name: 'Jane Smith',
	},
	parameters: {
		docs: {
			description: {
				story: 'When no image is provided, initials are derived automatically from the name. Max 2 characters — first and last name initials.',
			},
		},
	},
};

export const WithIcon: Story = {
	name: 'Icon fallback',
	args: {},
	parameters: {
		docs: {
			description: {
				story: 'When neither image nor name is provided, a generic person icon is shown. Always provide a name or explicit aria-label when possible.',
			},
		},
	},
};

/* ============================================================
   SIZES
   ============================================================ */

export const Sizes: Story = {
	render: () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
			{(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
				<div
					key={size}
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: '6px',
					}}
				>
					<Avatar
						src="https://placecats.com/bella/150/150"
						alt="Bella"
						name="Bella"
						size={size}
					/>
					<span
						style={{
							fontSize: '10px',
							color: 'var(--ptr-color-text-secondary)',
						}}
					>
						{size}
					</span>
				</div>
			))}
		</div>
	),
};

export const SizesInitials: Story = {
	name: 'Sizes — initials',
	render: () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
			{(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
				<div
					key={size}
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: '6px',
					}}
				>
					<Avatar name="Jane Smith" size={size} />
					<span
						style={{
							fontSize: '10px',
							color: 'var(--ptr-color-text-secondary)',
						}}
					>
						{size}
					</span>
				</div>
			))}
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'At xs size, only one initial is shown to fit the smaller container.',
			},
		},
	},
};

/* ============================================================
   STATUS
   ============================================================ */

export const WithStatus: Story = {
	name: 'With status indicators',
	render: () => (
		<div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
			{(['online', 'offline', 'away', 'busy'] as const).map((status) => (
				<div
					key={status}
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: '6px',
					}}
				>
					<Avatar
						src="https://placecats.com/neo/150/150"
						alt="Neo"
						name="Neo"
						size="md"
						status={status}
					/>
					<span
						style={{
							fontSize: '11px',
							color: 'var(--ptr-color-text-secondary)',
						}}
					>
						{status}
					</span>
				</div>
			))}
		</div>
	),
};

/* ============================================================
   GROUP PATTERN
   ============================================================ */

export const AvatarGroup: Story = {
	name: 'Group pattern',
	render: () => (
		<div style={{ display: 'flex', marginLeft: '8px' }}>
			{[
				{ name: 'Neo', src: 'https://placecats.com/neo/150/150' },
				{ name: 'Bella', src: 'https://placecats.com/bella/150/150' },
				{ name: 'Molly', src: 'https://placecats.com/molly/150/150' },
				{ name: 'Luna', src: 'https://placecats.com/luna/150/150' },
				{ name: 'Millie' },
			].map((cat, i) => (
				<div
					key={i}
					style={{
						marginLeft: i === 0 ? 0 : '-8px',
						borderRadius: '999px',
						border: '2px solid var(--ptr-color-bg-page)',
						zIndex: 5 - i,
						position: 'relative',
					}}
				>
					<Avatar
						src={cat.src}
						alt={cat.name}
						name={cat.name}
						size="sm"
					/>
				</div>
			))}
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Stacked avatar group pattern — negative margin creates the overlap. Border matches page background to create separation.',
			},
		},
	},
};

/* ============================================================
   AS LINK
   ============================================================ */

export const AsLink: Story = {
	name: 'As link',
	render: () => (
		<Avatar
			asChild
			src="https://placecats.com/neo/150/150"
			alt="Neo"
			name="Neo"
			size="md"
			aria-label="View Neo's profile"
		>
			<a href="/profile/neo" />
		</Avatar>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use asChild to render avatar styles on an anchor element. Provide explicit aria-label for the link context.',
			},
		},
	},
};

/* ============================================================
   IN CONTEXT — Exquisite Corpse contribution chip
   ============================================================ */

export const ContributionChip: Story = {
	name: 'In context — contribution chip',
	render: () => (
		<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
			<Avatar
				src="https://placecats.com/bella/150/150"
				alt="Bella"
				name="Bella"
				size="xs"
			/>
			<span
				style={{
					fontSize: 'var(--ptr-typography-size-sm)',
					color: 'var(--ptr-color-text-secondary)',
					fontFamily: 'var(--ptr-typography-font-ui)',
				}}
			>
				Bella
			</span>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'How Avatar appears inside a Contribution chip — xs size, adjacent name text.',
			},
		},
	},
};
