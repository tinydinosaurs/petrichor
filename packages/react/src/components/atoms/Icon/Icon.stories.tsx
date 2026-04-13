import type { Meta, StoryObj } from '@storybook/react';
import {
	TrophyIcon,
	StarIcon,
	CloudIcon,
	CloudRainIcon,
	LightningIcon,
	WindIcon,
	SnowflakeIcon,
	SunIcon,
	RainbowIcon,
	DropIcon,
	FlowerIcon,
	LeafIcon,
	BookOpenIcon,
	PencilSimpleIcon,
	ChatCircleIcon,
	UsersIcon,
	ArrowUpIcon,
	ArrowDownIcon,
	CheckIcon,
	XIcon,
	WarningIcon,
	InfoIcon,
	MagnifyingGlassIcon,
	BellIcon,
	GearIcon,
	UserIcon,
} from '@phosphor-icons/react';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
	title: 'Atoms/Icon',
	component: Icon,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A normalized wrapper around Phosphor Icons. Handles size, weight, color inheritance, and accessibility automatically. Decorative by default — provide a label to make it informative.',
			},
		},
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
			table: { defaultValue: { summary: 'sm' } },
		},
		weight: {
			control: 'select',
			options: ['thin', 'light', 'regular', 'bold', 'fill', 'duotone'],
		},
		duotone: {
			control: 'boolean',
			table: { defaultValue: { summary: 'false' } },
		},
		label: {
			control: 'text',
			description: 'Accessible label. Omit for decorative icons.',
		},
		color: {
			control: 'color',
		},
	},
	args: {
		icon: TrophyIcon,
		size: 'md',
		duotone: false,
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

/* ============================================================
   DEFAULT
   ============================================================ */

export const Default: Story = {};

/* ============================================================
   WEIGHTS
   ============================================================ */

export const Weights: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
			{(
				['thin', 'light', 'regular', 'bold', 'fill', 'duotone'] as const
			).map((weight) => (
				<div
					key={weight}
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '16px',
					}}
				>
					<span
						style={{
							fontSize: '11px',
							color: 'var(--color-text-secondary)',
							width: '64px',
							flexShrink: 0,
						}}
					>
						{weight}
					</span>
					<div
						style={{
							display: 'flex',
							gap: '12px',
							alignItems: 'center',
						}}
					>
						<Icon icon={TrophyIcon} weight={weight} size="md" />
						<Icon icon={CloudRainIcon} weight={weight} size="md" />
						<Icon icon={LightningIcon} weight={weight} size="md" />
						<Icon icon={StarIcon} weight={weight} size="md" />
						<Icon icon={BookOpenIcon} weight={weight} size="md" />
					</div>
				</div>
			))}
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'All six Phosphor weights. Duotone is reserved for expressive moments — empty states, hero sections. Regular is the Raindrop default, Light is the Dusk Rose default.',
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
					<Icon icon={TrophyIcon} size={size} />
					<span
						style={{
							fontSize: '10px',
							color: 'var(--color-text-secondary)',
						}}
					>
						{size}
					</span>
				</div>
			))}
		</div>
	),
};

/* ============================================================
   DUOTONE — expressive moments
   ============================================================ */

export const Duotone: Story = {
	render: () => (
		<div
			style={{
				display: 'flex',
				gap: '24px',
				flexWrap: 'wrap',
				alignItems: 'center',
			}}
		>
			<Icon icon={CloudRainIcon} duotone size="xl" />
			<Icon icon={RainbowIcon} duotone size="xl" />
			<Icon icon={LightningIcon} duotone size="xl" />
			<Icon icon={CloudIcon} duotone size="xl" />
			<Icon icon={WindIcon} duotone size="xl" />
			<Icon icon={DropIcon} duotone size="xl" />
			<Icon icon={SunIcon} duotone size="xl" />
			<Icon icon={SnowflakeIcon} duotone size="xl" />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Duotone at xl size — the expressive register. Weather icons feel especially at home in the Petrichor palette.',
			},
		},
	},
};

/* ============================================================
   COLOR INHERITANCE
   ============================================================ */

export const ColorInheritance: Story = {
	name: 'Color inheritance',
	render: () => (
		<div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
			{[
				{ color: 'oklch(65% 0.11 240)', label: 'rain' },
				{ color: 'oklch(64% 0.11 175)', label: 'teal' },
				{ color: 'oklch(72% 0.14 90)', label: 'gold' },
				{ color: 'oklch(58% 0.12 355)', label: 'rose' },
				{ color: 'oklch(58% 0.12 300)', label: 'violet' },
			].map(({ color, label }) => (
				<div
					key={label}
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: '6px',
						color,
					}}
				>
					<Icon icon={TrophyIcon} size="lg" />
					<span style={{ fontSize: '10px', opacity: 0.7 }}>
						{label}
					</span>
				</div>
			))}
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Icon inherits color from the parent element via currentColor. Set color on the parent, not the icon.',
			},
		},
	},
};

/* ============================================================
   PETRICHOR WEATHER PALETTE
   ============================================================ */

export const WeatherPalette: Story = {
	name: 'Weather palette',
	render: () => (
		<div
			style={{
				display: 'flex',
				gap: '16px',
				flexWrap: 'wrap',
				alignItems: 'center',
			}}
		>
			<Icon icon={CloudRainIcon} size="lg" duotone />
			<Icon icon={RainbowIcon} size="lg" duotone />
			<Icon icon={LightningIcon} size="lg" />
			<Icon icon={WindIcon} size="lg" />
			<Icon icon={DropIcon} size="lg" />
			<Icon icon={CloudIcon} size="lg" />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'The weather icon set — thematically aligned with the Petrichor palette.',
			},
		},
	},
};

/* ============================================================
   ACCESSIBILITY
   ============================================================ */

export const Decorative: Story = {
	args: {
		icon: TrophyIcon,
		size: 'md',
	},
	parameters: {
		docs: {
			description: {
				story: 'No label — aria-hidden="true". Screen reader ignores it. Use when nearby text already conveys the meaning.',
			},
		},
	},
};

export const Informative: Story = {
	args: {
		icon: WarningIcon,
		size: 'md',
		label: 'Warning Icon',
	},
	parameters: {
		docs: {
			description: {
				story: 'With label — role="img" + aria-label set. Screen reader announces "Warning, image". Use when the icon conveys meaning not expressed in nearby text.',
			},
		},
	},
};

/* ============================================================
   IN CONTEXT — UI icons
   ============================================================ */

export const UIIcons: Story = {
	name: 'UI icons',
	render: () => (
		<div
			style={{
				display: 'flex',
				gap: '12px',
				flexWrap: 'wrap',
				alignItems: 'center',
			}}
		>
			<Icon icon={MagnifyingGlassIcon} size="sm" />
			<Icon icon={BellIcon} size="sm" />
			<Icon icon={GearIcon} size="sm" />
			<Icon icon={UserIcon} size="sm" />
			<Icon icon={CheckIcon} size="sm" />
			<Icon icon={XIcon} size="sm" />
			<Icon icon={ArrowUpIcon} size="sm" />
			<Icon icon={ArrowDownIcon} size="sm" />
			<Icon icon={InfoIcon} size="sm" />
			<Icon icon={WarningIcon} size="sm" />
			<Icon icon={ChatCircleIcon} size="sm" />
			<Icon icon={UsersIcon} size="sm" />
			<Icon icon={PencilSimpleIcon} size="sm" />
			<Icon icon={FlowerIcon} size="sm" />
			<Icon icon={LeafIcon} size="sm" />
		</div>
	),
};
