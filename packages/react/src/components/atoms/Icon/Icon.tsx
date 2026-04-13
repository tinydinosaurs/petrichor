import React from 'react'
import type { Icon as PhosphorIcon } from '@phosphor-icons/react'
import styles from './Icon.module.css'

export type IconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface IconProps {
  /**
   * The Phosphor icon component to render.
   * Pass the icon component itself, not an instance.
   *
   * @example
   * import { Trophy } from '@phosphor-icons/react'
   * <Icon icon={Trophy} />
   */
  icon: typeof PhosphorIcon

  /**
   * Icon size — maps to our spacing scale.
   * xs=12px, sm=16px (default), md=20px, lg=24px, xl=32px
   */
  size?: IconSize

  /**
   * Override the brand default weight.
   * Brand weight tokens: Raindrop=regular, Dusk Rose=light
   * Usually leave unset and let the brand token control it.
   */
  weight?: IconWeight

  /**
   * Use the duotone weight — a deliberate expressive choice.
   * Overrides weight prop. Use for empty states, hero moments, decorative contexts.
   * Not for standard UI icons.
   */
  duotone?: boolean

  /**
   * Accessible label for informative icons.
   * When provided: role="img" + aria-label set, icon is announced by screen readers.
   * When omitted: aria-hidden="true", icon is decorative and ignored.
   *
   * Most icons are decorative — nearby text provides the context.
   * Only provide label when the icon conveys meaning not expressed elsewhere.
   */
  label?: string

  /**
   * CSS color — defaults to currentColor (inherits from parent).
   * Usually leave unset and control color via the parent element's CSS.
   */
  color?: string

  className?: string
}

const sizeMap: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    {
      icon: PhosphorIconComponent,
      size = 'sm',
      weight,
      duotone = false,
      label,
      color,
      className,
      ...rest
    },
    ref,
  ) => {
    const resolvedWeight: IconWeight = duotone
      ? 'duotone'
      : weight ?? 'regular'

    const resolvedSize = sizeMap[size]
    const isDecorative = !label

    const classes = [styles.icon, className ?? ''].filter(Boolean).join(' ')

    return (
      <PhosphorIconComponent
        ref={ref}
        size={resolvedSize}
        weight={resolvedWeight}
        color={color ?? 'currentColor'}
        aria-hidden={isDecorative ? true : undefined}
        aria-label={label}
        role={label ? 'img' : undefined}
        className={classes}
        {...rest}
      />
    )
  },
)

Icon.displayName = 'Icon'
