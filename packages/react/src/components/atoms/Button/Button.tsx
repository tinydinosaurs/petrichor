import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Spinner } from '../Spinner/Spinner';
import styles from './Button.module.css';

export type ButtonVariant =
	| 'primary'
	| 'secondary'
	| 'ghost'
	| 'danger'
	| 'ghost-danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	loading?: boolean;
	iconOnly?: boolean;
	iconStart?: React.ReactNode;
	iconEnd?: React.ReactNode;
	asChild?: boolean;
}

// const Spinner = () => (
// 	<svg
// 		width="14"
// 		height="14"
// 		viewBox="0 0 14 14"
// 		fill="none"
// 		aria-hidden="true"
// 		className={styles.spinner}
// 	>
// 		<circle
// 			cx="7"
// 			cy="7"
// 			r="5"
// 			stroke="currentColor"
// 			strokeWidth="2"
// 			strokeLinecap="round"
// 			strokeDasharray="20"
// 			strokeDashoffset="10"
// 		/>
// 	</svg>
// );

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = 'primary',
			size = 'md',
			loading = false,
			iconOnly = false,
			iconStart,
			iconEnd,
			asChild = false,
			disabled,
			'aria-disabled': ariaDisabled,
			className,
			children,
			type = 'button',
			...rest
		},
		ref,
	) => {
		// Dynamic component that can hold primitive HTML or other components.
		// Uppercase required — JSX treats lowercase as HTML tag, uppercase as component
		const Comp = asChild ? Slot : 'button';

		const isDisabled = disabled || loading;
		const isAriaDisabled = ariaDisabled ?? (loading ? true : undefined);

		const classes = [
			styles.button,
			styles[variant],
			styles[size],
			iconOnly ? styles.iconOnly : '',
			loading ? styles.loading : '',
			className ?? '',
		]
			.filter(Boolean)
			.join(' ');

		return (
			<Comp
				ref={ref}
				type={asChild ? undefined : type}
				disabled={asChild ? undefined : isDisabled}
				aria-disabled={isAriaDisabled}
				aria-busy={loading ? true : undefined}
				className={classes}
				{...rest}
			>
				{asChild ? (
					children
				) : (
					<>
						{loading && (
							<Spinner
								size="sm"
								aria-hidden="true"
								label="Loading"
								className={styles.spinner}
							/>
						)}
						{!loading && iconStart && (
							<span
								className={styles.iconStart}
								aria-hidden="true"
							>
								{iconStart}
							</span>
						)}
						{!iconOnly && children}
						{!loading && iconEnd && (
							<span className={styles.iconEnd} aria-hidden="true">
								{iconEnd}
							</span>
						)}
					</>
				)}
			</Comp>
		);
	},
);

Button.displayName = 'Button';
