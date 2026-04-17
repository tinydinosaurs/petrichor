import React from 'react'
import styles from './Divider.module.css'

export type DividerOrientation = 'horizontal' | 'vertical'
export type DividerSpacing = 'none' | 'sm' | 'md' | 'lg'

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  /** Orientation of the divider line */
  orientation?: DividerOrientation
  /** Margin on both sides of the divider */
  spacing?: DividerSpacing
}

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  (
    {
      orientation = 'horizontal',
      spacing = 'none',
      className,
      ...rest
    },
    ref,
  ) => {
    const spacingClass: Record<DividerSpacing, string | undefined> = {
      none: '',
      sm: styles.spacingSm,
      md: styles.spacingMd,
      lg: styles.spacingLg,
    }

    const classes = [
      styles.divider,
      styles[orientation],
      spacingClass[spacing],
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <hr
        ref={ref}
        className={classes}
        {...rest}
        aria-hidden="true"
      />
    )
  },
)

Divider.displayName = 'Divider'
