import React from 'react'
import styles from './Card.module.css'

// ============================================================
// CARD ROOT
// ============================================================

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Render as a semantic element. Default: 'div'. Use 'article' for standalone content cards. */
  as?: 'div' | 'article' | 'section' | 'li'
  /** Loading state — renders skeleton surface */
  loading?: boolean
}

const CardRoot = React.forwardRef<HTMLElement, CardProps>(
  ({ as: Element = 'div', loading = false, className, children, ...rest }, ref) => {
    const classes = [
      styles.card,
      loading ? styles.loading : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <Element
        ref={ref as React.Ref<any>}
        className={classes}
        {...rest}
      >
        {loading ? (
          <div className={styles.skeletonWrap} aria-hidden="true">
            <div className={`${styles.skeletonLine} ${styles.skeletonNarrow}`} />
            <div className={`${styles.skeletonLine} ${styles.skeletonWide}`} />
            <div className={`${styles.skeletonLine} ${styles.skeletonMedium}`} />
          </div>
        ) : (
          children
        )}
      </Element>
    )
  },
)

CardRoot.displayName = 'Card'


// ============================================================
// CARD.HEADER
// ============================================================

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Show a bottom border separating header from body */
  bordered?: boolean
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ bordered = false, className, children, ...rest }, ref) => {
    const classes = [
      styles.header,
      bordered ? styles.headerBordered : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    )
  },
)

CardHeader.displayName = 'Card.Header'


// ============================================================
// CARD.BODY
// ============================================================

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...rest }, ref) => {
    const classes = [styles.body, className ?? ''].filter(Boolean).join(' ')

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    )
  },
)

CardBody.displayName = 'Card.Body'


// ============================================================
// CARD.FOOTER
// ============================================================

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Show a top border separating footer from body */
  bordered?: boolean
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ bordered = false, className, children, ...rest }, ref) => {
    const classes = [
      styles.footer,
      bordered ? styles.footerBordered : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div ref={ref} className={classes} {...rest}>
        {children}
      </div>
    )
  },
)

CardFooter.displayName = 'Card.Footer'


// ============================================================
// CARD.IMAGE
// ============================================================

export type CardImageOrientation = 'top' | 'bottom' | 'left' | 'right'

export interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Position of the image relative to card content */
  orientation?: CardImageOrientation
  /** Aspect ratio of the image container — CSS aspect-ratio value */
  aspectRatio?: string
  alt: string
}

const orientationClass: Record<CardImageOrientation, string | undefined> = {
  top: styles.imageTop,
  bottom: styles.imageBottom,
  left: styles.imageLeft,
  right: styles.imageRight,
}

const CardImage = React.forwardRef<HTMLDivElement, CardImageProps>(
  (
    {
      orientation = 'top',
      aspectRatio,
      src,
      alt,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const classes = [
      styles.imageWrap,
      orientationClass[orientation],
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div
        ref={ref}
        className={classes}
        style={{ aspectRatio, ...style }}
      >
        <img src={src} alt={alt} className={styles.image} {...rest} />
      </div>
    )
  },
)

CardImage.displayName = 'Card.Image'


// ============================================================
// CARD.DIVIDER
// ============================================================

export interface CardDividerProps extends React.HTMLAttributes<HTMLHRElement> {}

const CardDivider = React.forwardRef<HTMLHRElement, CardDividerProps>(
  ({ className, ...rest }, ref) => {
    const classes = [styles.divider, className ?? ''].filter(Boolean).join(' ')
    return <hr ref={ref} className={classes} aria-hidden="true" {...rest} />
  },
)

CardDivider.displayName = 'Card.Divider'


// ============================================================
// CARD.EMPTY
// ============================================================

export interface CardEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon to display — use <Icon duotone /> for best results */
  icon?: React.ReactNode
  /** Primary empty state message */
  message: string
  /** Optional supporting text */
  description?: string
  /** Optional CTA — pass a Button component */
  action?: React.ReactNode
}

const CardEmpty = React.forwardRef<HTMLDivElement, CardEmptyProps>(
  ({ icon, message, description, action, className, ...rest }, ref) => {
    const classes = [styles.empty, className ?? ''].filter(Boolean).join(' ')

    return (
      <div ref={ref} className={classes} {...rest}>
        {icon && (
          <div className={styles.emptyIcon} aria-hidden="true">
            {icon}
          </div>
        )}
        <p className={styles.emptyMessage}>{message}</p>
        {description && (
          <p className={styles.emptyDescription}>{description}</p>
        )}
        {action && <div className={styles.emptyAction}>{action}</div>}
      </div>
    )
  },
)

CardEmpty.displayName = 'Card.Empty'


// ============================================================
// COMPOUND EXPORT
// ============================================================

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
  Image: CardImage,
  Divider: CardDivider,
  Empty: CardEmpty,
})
