import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import styles from './Badge.module.css';

export type BadgeVariant =
	| 'default'
	| 'info'
	| 'success'
	| 'warning'
	| 'error'
	| 'danger'
	| 'brand';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
	variant?: BadgeVariant;
	size?: BadgeSize;
	iconStart?: React.ReactNode;
	asChild?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
	(
		{
			variant = 'default',
			size = 'md',
			iconStart,
			asChild = false,
			className,
			children,
			...rest
		},
		ref,
	) => {
		const Comp = asChild ? Slot : 'span';

		const classes = [
			styles.badge,
			styles[variant],
			styles[size],
			className ?? '',
		]
			.filter(Boolean)
			.join(' ');

		return (
			<Comp ref={ref} className={classes} {...rest}>
				{asChild ? (
					children
				) : (
					<>
						{iconStart && (
							<span
								className={styles.iconStart}
								aria-hidden="true"
							>
								{iconStart}
							</span>
						)}
						{children}
					</>
				)}
			</Comp>
		);
	},
);

Badge.displayName = 'Badge';
