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
    const classes = [
      styles.divider,
      styles[orientation],
      spacing !== 'none' ? styles[`spacing-${spacing}`] : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <hr
        ref={ref}
        className={classes}
        aria-hidden="true"
        {...rest}
      />
    )
  },
)

Divider.displayName = 'Divider'
