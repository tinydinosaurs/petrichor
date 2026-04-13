import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { User } from '@phosphor-icons/react';
import styles from './Avatar.module.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
	/** Image source URL */
	src?: string | undefined;
	/** Alt text — required when src is provided */
	alt?: string;
	/**
	 * Person's name — used to derive initials when no image is available.
	 * Also used as aria-label when no adjacent text describes the avatar.
	 */
	name?: string;
	/** Avatar size */
	size?: AvatarSize;
	/** Optional status indicator dot */
	status?: AvatarStatus;
	/** Renders as child element — use for linked avatars */
	asChild?: boolean;
}

/** Derives up to 2 initials from a name string */
const getInitials = (name: string): string => {
	const parts = name.trim().split(/\s+/);
	if (parts.length === 1) return parts[0]?.charAt(0).toUpperCase() ?? '';
	return (
		(parts[0]?.charAt(0) ?? '') + (parts[parts.length - 1]?.charAt(0) ?? '')
	).toUpperCase();
};

const sizeToIconSize: Record<AvatarSize, number> = {
	xs: 12,
	sm: 16,
	md: 20,
	lg: 24,
	xl: 32,
};

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
	(
		{
			src,
			alt,
			name,
			size = 'md',
			status,
			asChild = false,
			className,
			children,
			...rest
		},
		ref,
	) => {
		const [imgError, setImgError] = React.useState(false);

		const Comp = asChild ? Slot : 'span';
		const showImage = Boolean(src) && !imgError;
		const showInitials = !showImage && Boolean(name);
		const showIcon = !showImage && !showInitials;

		const initials = name ? getInitials(name) : '';
		const iconSize = sizeToIconSize[size];

		// For xs size, only show one initial
		const displayInitials = size === 'xs' ? initials.charAt(0) : initials;

		const ariaLabel = rest['aria-label'] ?? name;

		const classes = [
			styles.avatar,
			styles[size],
			showInitials ? styles.withInitials : '',
			showIcon ? styles.withIcon : '',
			className ?? '',
		]
			.filter(Boolean)
			.join(' ');

		return (
			<Comp
				ref={ref}
				className={classes}
				aria-label={ariaLabel}
				{...rest}
			>
				{asChild ? (
					children
				) : (
					<>
						{showImage && (
							<img
								src={src}
								alt={alt ?? name ?? ''}
								className={styles.image}
								onError={() => setImgError(true)}
							/>
						)}

						{showInitials && (
							<span
								className={styles.initials}
								aria-hidden="true"
							>
								{displayInitials}
							</span>
						)}

						{showIcon && (
							<User
								size={iconSize}
								weight="regular"
								aria-hidden="true"
								className={styles.icon}
							/>
						)}

						{status && (
							<span
								className={[
									styles.status,
									styles[`status-${status}`],
								].join(' ')}
								aria-label={`Status: ${status}`}
							/>
						)}
					</>
				)}
			</Comp>
		);
	},
);

Avatar.displayName = 'Avatar';
