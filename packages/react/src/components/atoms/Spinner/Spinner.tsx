import React from 'react';
import styles from './Spinner.module.css';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg';

export interface SpinnerProps extends React.SVGAttributes<SVGElement> {
  /** Spinner size */
  size?: SpinnerSize;
  /**
   * Accessible label. Defaults to "Loading".
   * Provide a more specific label when context requires it:
   * "Saving changes", "Loading results", etc.
   */
  label?: string;
}

const sizeMap: Record<SpinnerSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
};

export const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ size = 'sm', label = 'Loading', className, ...rest }, ref) => {
    const px = sizeMap[size];
    const classes = [styles.spinner, styles[size], className ?? ''].filter(Boolean).join(' ');

    return (
      <svg
        ref={ref}
        width={px}
        height={px}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={classes}
        role="status"
        aria-label={label}
        {...rest}
      >
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
        <path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  },
);

Spinner.displayName = 'Spinner';
