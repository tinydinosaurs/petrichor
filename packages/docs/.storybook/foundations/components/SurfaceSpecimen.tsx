import React from 'react';

// Shared styles
const s = {
	mono: {
		fontFamily: 'var(--ptr-typography-font-mono, monospace)',
		fontSize: '11px',
		color: 'var(--ptr-color-text-secondary)',
	},
	label: {
		fontFamily: 'var(--ptr-typography-font-ui, sans-serif)',
		fontSize: '12px',
		fontWeight: 500,
		color: 'var(--ptr-color-text-primary)',
	},
	description: {
		fontFamily: 'var(--ptr-typography-font-ui, sans-serif)',
		fontSize: '11px',
		color: 'var(--ptr-color-text-tertiary)',
		marginTop: '2px',
	},
	groupTitle: {
		fontSize: '11px',
		fontWeight: 500,
		textTransform: 'uppercase' as const,
		letterSpacing: '0.06em',
		color: 'var(--ptr-color-text-tertiary)',
		fontFamily: 'var(--ptr-typography-font-ui, sans-serif)',
		marginBottom: '12px',
	},
};

// ─────────────────────────────────────────────────────────────────────────────
// RadiusScale — shows the raw radius scale with visual specimens
// ─────────────────────────────────────────────────────────────────────────────

interface RadiusScaleProps {
	tokens: Array<{
		token: string;
		label: string;
		value: string;
	}>;
}

export const RadiusScale = ({ tokens }: RadiusScaleProps) => (
	<div
		style={{
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
			gap: '16px',
			marginBottom: '24px',
		}}
	>
		{tokens.map(({ token, label, value }) => (
			<div key={token} style={{ textAlign: 'center' }}>
				<div
					style={{
						width: '64px',
						height: '64px',
						margin: '0 auto 8px',
						background: 'var(--ptr-color-bg-surface)',
						border: '1px solid var(--ptr-color-border-default)',
						borderRadius: `var(${token})`,
					}}
				/>
				<div style={s.label}>{label}</div>
				<code style={s.mono}>{value}</code>
			</div>
		))}
	</div>
);

// ─────────────────────────────────────────────────────────────────────────────
// ComponentRadius — shows how radius maps to components, updating per brand
// ─────────────────────────────────────────────────────────────────────────────

interface ComponentRadiusProps {
	components: Array<{
		name: string;
		token: string;
	}>;
}

export const ComponentRadius = ({ components }: ComponentRadiusProps) => (
	<div
		style={{
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
			gap: '20px',
			marginBottom: '24px',
		}}
	>
		{components.map(({ name, token }) => (
			<div key={token}>
				<div
					style={{
						height: '56px',
						background: 'var(--ptr-color-bg-surface)',
						border: '1px solid var(--ptr-color-border-default)',
						borderRadius: `var(${token})`,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						marginBottom: '8px',
					}}
				>
					<span
						style={{
							...s.label,
							color: 'var(--ptr-color-text-secondary)',
						}}
					>
						{name}
					</span>
				</div>
				<code style={{ ...s.mono, display: 'block' }}>{token}</code>
			</div>
		))}
	</div>
);

// ─────────────────────────────────────────────────────────────────────────────
// ElevationScale — shows shadow/elevation tokens
// ─────────────────────────────────────────────────────────────────────────────

interface ElevationScaleProps {
	tokens: Array<{
		token: string;
		label: string;
		description: string;
	}>;
}

export const ElevationScale = ({ tokens }: ElevationScaleProps) => (
	<div
		style={{
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
			gap: '24px',
			marginBottom: '24px',
		}}
	>
		{tokens.map(({ token, label, description }) => (
			<div key={token}>
				<div
					style={{
						height: '80px',
						background: 'var(--ptr-color-bg-surface)',
						borderRadius: 'var(--ptr-radius-md)',
						boxShadow: `var(${token})`,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						marginBottom: '12px',
					}}
				>
					<span style={{ ...s.label, color: 'var(--ptr-color-text-secondary)' }}>
						{label}
					</span>
				</div>
				<code style={{ ...s.mono, display: 'block', marginBottom: '4px' }}>
					{token}
				</code>
				<div style={s.description}>{description}</div>
			</div>
		))}
	</div>
);

// ─────────────────────────────────────────────────────────────────────────────
// BorderScale — shows border width tokens
// ─────────────────────────────────────────────────────────────────────────────

interface BorderScaleProps {
	tokens: Array<{
		token: string;
		label: string;
		value: string;
	}>;
}

export const BorderScale = ({ tokens }: BorderScaleProps) => (
	<div style={{ marginBottom: '24px' }}>
		{tokens.map(({ token, label, value }) => (
			<div
				key={token}
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '16px',
					padding: '12px 0',
					borderBottom: '0.5px solid var(--ptr-color-border-subtle)',
				}}
			>
				<div
					style={{
						width: '80px',
						height: '40px',
						background: 'var(--ptr-color-bg-surface)',
						borderRadius: 'var(--ptr-radius-sm)',
						borderWidth: `var(${token})`,
						borderStyle: 'solid',
						borderColor: 'var(--ptr-color-border-strong)',
					}}
				/>
				<div>
					<code style={{ ...s.mono, display: 'block', marginBottom: '2px' }}>
						{token}
					</code>
					<div style={s.label}>
						{label} <span style={{ ...s.mono, marginLeft: '8px' }}>{value}</span>
					</div>
				</div>
			</div>
		))}
	</div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SurfaceComposition — shows how bg, border, radius, shadow compose
// ─────────────────────────────────────────────────────────────────────────────

interface SurfaceCompositionProps {
	name: string;
	bg: string;
	border?: string;
	radius: string;
	shadow?: string;
	description: string;
}

export const SurfaceComposition = ({
	name,
	bg,
	border,
	radius,
	shadow,
	description,
}: SurfaceCompositionProps) => (
	<div
		style={{
			display: 'flex',
			gap: '20px',
			alignItems: 'flex-start',
			padding: '16px 0',
			borderBottom: '0.5px solid var(--ptr-color-border-subtle)',
		}}
	>
		<div
			style={{
				width: '120px',
				height: '80px',
				flexShrink: 0,
				background: `var(${bg})`,
				borderRadius: `var(${radius})`,
				border: border ? `1px solid var(${border})` : 'none',
				boxShadow: shadow ? `var(${shadow})` : 'none',
			}}
		/>
		<div style={{ minWidth: 0 }}>
			<div style={{ ...s.label, marginBottom: '4px' }}>{name}</div>
			<div style={s.description}>{description}</div>
			<div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
				<code style={s.mono}>bg: {bg}</code>
				{border && <code style={s.mono}>border: {border}</code>}
				<code style={s.mono}>radius: {radius}</code>
				{shadow && <code style={s.mono}>shadow: {shadow}</code>}
			</div>
		</div>
	</div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SurfaceGroup — wrapper with title
// ─────────────────────────────────────────────────────────────────────────────

interface SurfaceGroupProps {
	title: string;
	children: React.ReactNode;
}

export const SurfaceGroup = ({ title, children }: SurfaceGroupProps) => (
	<div style={{ marginBottom: '32px' }}>
		<div style={s.groupTitle}>{title}</div>
		{children}
	</div>
);

// ─────────────────────────────────────────────────────────────────────────────
// BrandRadiusCompare — side-by-side brand comparison
// ─────────────────────────────────────────────────────────────────────────────

export const BrandRadiusCompare = () => (
	<div
		style={{
			display: 'grid',
			gridTemplateColumns: '1fr 1fr',
			gap: '24px',
			marginBottom: '24px',
		}}
	>
		{/* These update live when brand switches */}
		<div style={{ textAlign: 'center' }}>
			<div
				style={{
					padding: '10px 20px',
					background: 'var(--ptr-color-brand-primary)',
					color: 'var(--ptr-color-text-on-brand)',
					borderRadius: 'var(--ptr-radius-component-button)',
					fontFamily: 'var(--ptr-typography-font-ui)',
					fontSize: '14px',
					fontWeight: 500,
					display: 'inline-block',
					marginBottom: '8px',
				}}
			>
				Button
			</div>
			<code style={{ ...s.mono, display: 'block' }}>--ptr-radius-component-button</code>
		</div>
		<div style={{ textAlign: 'center' }}>
			<div
				style={{
					padding: '4px 10px',
					background: 'var(--ptr-color-brand-primary-tint)',
					color: 'var(--ptr-color-brand-primary-text)',
					borderRadius: 'var(--ptr-radius-component-badge)',
					fontFamily: 'var(--ptr-typography-font-ui)',
					fontSize: '12px',
					fontWeight: 500,
					display: 'inline-block',
					marginBottom: '8px',
				}}
			>
				Badge
			</div>
			<code style={{ ...s.mono, display: 'block' }}>--ptr-radius-component-badge</code>
		</div>
	</div>
);
