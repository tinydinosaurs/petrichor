import React, { useState, useEffect } from 'react';

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
// DurationScale — visualizes duration tokens with animated bars
// ─────────────────────────────────────────────────────────────────────────────

interface DurationScaleProps {
	tokens: Array<{
		token: string;
		label: string;
		value: string;
		description: string;
	}>;
}

export const DurationScale = ({ tokens }: DurationScaleProps) => {
	// Phase 1: reset (width 0, no transition)
	// Phase 2: animate (width 100%, with transition)
	const [phase, setPhase] = useState<'idle' | 'reset' | 'animate'>('idle');

	const play = () => {
		// First reset to 0%
		setPhase('reset');
	};

	useEffect(() => {
		if (phase === 'reset') {
			// After browser paints the reset state, start animating
			const frame = requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					setPhase('animate');
				});
			});
			return () => cancelAnimationFrame(frame);
		}
		if (phase === 'animate') {
			// Reset to idle after animations complete
			const timeout = setTimeout(() => setPhase('idle'), 1200);
			return () => clearTimeout(timeout);
		}
	}, [phase]);

	const isPlaying = phase === 'reset' || phase === 'animate';

	return (
		<div style={{ marginBottom: '24px' }}>
			<button
				onClick={play}
				disabled={isPlaying}
				style={{
					padding: '8px 16px',
					marginBottom: '16px',
					background: isPlaying
						? 'var(--ptr-color-bg-elevated)'
						: 'var(--ptr-color-brand-primary)',
					color: isPlaying
						? 'var(--ptr-color-text-secondary)'
						: 'var(--ptr-color-text-on-brand)',
					border: 'none',
					borderRadius: 'var(--ptr-radius-component-button)',
					fontFamily: 'var(--ptr-typography-font-ui)',
					fontSize: '13px',
					fontWeight: 500,
					cursor: isPlaying ? 'default' : 'pointer',
				}}
			>
				{isPlaying ? 'Playing...' : 'Play all'}
			</button>

			{tokens.map(({ token, label, value, description }) => (
				<div
					key={token}
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '16px',
						padding: '10px 0',
						borderBottom: '0.5px solid var(--ptr-color-border-subtle)',
					}}
				>
					<div style={{ width: '90px', flexShrink: 0 }}>
						<div style={s.label}>{label}</div>
						<code style={s.mono}>{value}</code>
					</div>
					<div
						style={{
							flex: 1,
							height: '8px',
							background: 'var(--ptr-color-bg-elevated)',
							borderRadius: '4px',
							overflow: 'hidden',
						}}
					>
						<div
							style={{
								width: phase === 'animate' ? '100%' : '0%',
								height: '100%',
								background: 'var(--ptr-color-brand-primary)',
								borderRadius: '4px',
								transition:
									phase === 'animate'
										? `width var(${token}) ease-out`
										: 'none',
							}}
						/>
					</div>
					<div style={{ width: '200px', flexShrink: 0 }}>
						<div style={s.description}>{description}</div>
					</div>
				</div>
			))}
		</div>
	);
};

// ─────────────────────────────────────────────────────────────────────────────
// EasingCurve — visualizes an easing curve with animated preview
// ─────────────────────────────────────────────────────────────────────────────

interface EasingCurveProps {
	token: string;
	label: string;
	value: string;
	description: string;
}

export const EasingCurve = ({
	token,
	label,
	value,
	description,
}: EasingCurveProps) => {
	const [phase, setPhase] = useState<'idle' | 'reset' | 'animate'>('idle');

	const play = () => {
		if (phase !== 'idle') return;
		setPhase('reset');
	};

	useEffect(() => {
		if (phase === 'reset') {
			const frame = requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					setPhase('animate');
				});
			});
			return () => cancelAnimationFrame(frame);
		}
		if (phase === 'animate') {
			const timeout = setTimeout(() => setPhase('idle'), 800);
			return () => clearTimeout(timeout);
		}
	}, [phase]);

	return (
		<div
			style={{
				padding: '16px',
				background: 'var(--ptr-color-bg-surface)',
				borderRadius: 'var(--ptr-radius-md)',
				border: '1px solid var(--ptr-color-border-subtle)',
				cursor: 'pointer',
			}}
			onClick={play}
		>
			<div
				style={{
					height: '60px',
					marginBottom: '12px',
					position: 'relative',
					background: 'var(--ptr-color-bg-page)',
					borderRadius: 'var(--ptr-radius-sm)',
					overflow: 'hidden',
				}}
			>
				<div
					style={{
						position: 'absolute',
						left: phase === 'animate' ? 'calc(100% - 24px)' : '8px',
						top: '50%',
						transform: 'translateY(-50%)',
						width: '16px',
						height: '16px',
						borderRadius: '50%',
						background: 'var(--ptr-color-brand-primary)',
						transition:
							phase === 'animate'
								? `left 600ms var(${token})`
								: 'none',
					}}
				/>
			</div>
			<div style={s.label}>{label}</div>
			<code style={{ ...s.mono, display: 'block', marginTop: '4px' }}>
				{value}
			</code>
			<div style={{ ...s.description, marginTop: '8px' }}>
				{description}
			</div>
		</div>
	);
};

interface EasingGridProps {
	tokens: Array<{
		token: string;
		label: string;
		value: string;
		description: string;
	}>;
}

export const EasingGrid = ({ tokens }: EasingGridProps) => (
	<div
		style={{
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
			gap: '16px',
			marginBottom: '24px',
		}}
	>
		{tokens.map((props) => (
			<EasingCurve key={props.token} {...props} />
		))}
	</div>
);

// ─────────────────────────────────────────────────────────────────────────────
// TransitionDemo — shows composed transition tokens in action
// ─────────────────────────────────────────────────────────────────────────────

interface TransitionDemoProps {
	token: string;
	label: string;
	description: string;
}

export const TransitionDemo = ({
	token,
	label,
	description,
}: TransitionDemoProps) => {
	const [active, setActive] = useState(false);

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: '20px',
				padding: '16px 0',
				borderBottom: '0.5px solid var(--ptr-color-border-subtle)',
			}}
		>
			<div
				style={{
					width: '120px',
					height: '60px',
					background: active
						? 'var(--ptr-color-brand-primary)'
						: 'var(--ptr-color-bg-surface)',
					border: `1px solid ${active ? 'transparent' : 'var(--ptr-color-border-default)'}`,
					borderRadius: 'var(--ptr-radius-md)',
					transition: `var(${token})`,
					cursor: 'pointer',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
				onMouseEnter={() => setActive(true)}
				onMouseLeave={() => setActive(false)}
			>
				<span
					style={{
						...s.label,
						color: active
							? 'var(--ptr-color-text-on-brand)'
							: 'var(--ptr-color-text-secondary)',
						transition: `var(${token})`,
					}}
				>
					Hover me
				</span>
			</div>
			<div style={{ flex: 1 }}>
				<div style={s.label}>{label}</div>
				<code style={{ ...s.mono, display: 'block', margin: '4px 0' }}>
					{token}
				</code>
				<div style={s.description}>{description}</div>
			</div>
		</div>
	);
};

// ─────────────────────────────────────────────────────────────────────────────
// MotionPrinciple — illustrates a motion principle with before/after
// ─────────────────────────────────────────────────────────────────────────────

interface MotionPrincipleProps {
	title: string;
	description: string;
	good: string;
	bad: string;
}

export const MotionPrinciple = ({
	title,
	description,
	good,
	bad,
}: MotionPrincipleProps) => (
	<div
		style={{
			padding: '16px',
			background: 'var(--ptr-color-bg-surface)',
			borderRadius: 'var(--ptr-radius-md)',
			marginBottom: '16px',
		}}
	>
		<div style={{ ...s.label, marginBottom: '8px' }}>{title}</div>
		<div
			style={{
				...s.description,
				marginBottom: '12px',
				color: 'var(--ptr-color-text-secondary)',
			}}
		>
			{description}
		</div>
		<div style={{ display: 'flex', gap: '16px', fontSize: '12px' }}>
			<div style={{ flex: 1 }}>
				<div
					style={{
						color: 'var(--ptr-color-status-success-text)',
						fontWeight: 500,
						marginBottom: '4px',
					}}
				>
					✓ Do
				</div>
				<div style={{ color: 'var(--ptr-color-text-secondary)' }}>
					{good}
				</div>
			</div>
			<div style={{ flex: 1 }}>
				<div
					style={{
						color: 'var(--ptr-color-status-error-text)',
						fontWeight: 500,
						marginBottom: '4px',
					}}
				>
					✗ Don't
				</div>
				<div style={{ color: 'var(--ptr-color-text-secondary)' }}>
					{bad}
				</div>
			</div>
		</div>
	</div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MotionGroup — wrapper with title
// ─────────────────────────────────────────────────────────────────────────────

interface MotionGroupProps {
	title: string;
	children: React.ReactNode;
}

export const MotionGroup = ({ title, children }: MotionGroupProps) => (
	<div style={{ marginBottom: '32px' }}>
		<div style={s.groupTitle}>{title}</div>
		{children}
	</div>
);
