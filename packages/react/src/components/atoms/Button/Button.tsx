import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Spinner } from '../Spinner/Spinner';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'ghost-danger';
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
    const Comp = asChild ? Slot : 'button';

    const isDisabled = disabled || loading;
    const isAriaDisabled = ariaDisabled ?? (loading ? true : undefined);

    const variantClass: Record<ButtonVariant, string | undefined> = {
      primary: styles.primary,
      secondary: styles.secondary,
      ghost: styles.ghost,
      danger: styles.danger,
      'ghost-danger': styles.ghostDanger,
    };

    const classes = [
      styles.button,
      variantClass[variant],
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
            {loading && <Spinner size="sm" label="Loading" className={styles.spinner} />}
            {!loading && iconStart && (
              <span className={styles.iconStart} aria-hidden="true">
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
