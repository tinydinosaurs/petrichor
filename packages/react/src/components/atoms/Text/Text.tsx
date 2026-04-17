import React from 'react';
import styles from './Text.module.css';

export type TextVariant =
  | 'display'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'body-lg'
  | 'body'
  | 'body-sm'
  | 'label'
  | 'caption'
  | 'mono';

export type TextElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'div'
  | 'label'
  | 'code'
  | 'strong'
  | 'em'
  | 'small'
  | 'blockquote';

/**
 * Default semantic element for each variant.
 * Override with the `as` prop when visual style and
 * document hierarchy need to diverge.
 */
const defaultElement: Record<TextVariant, TextElement> = {
  display: 'h1',
  heading1: 'h1',
  heading2: 'h2',
  heading3: 'h3',
  heading4: 'h4',
  'body-lg': 'p',
  body: 'p',
  'body-sm': 'p',
  label: 'span',
  caption: 'span',
  mono: 'code',
};

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Visual style variant — controls font, size, weight, line-height.
   * Required. Pick from the closed set; don't invent combinations.
   */
  variant: TextVariant;

  /**
   * Semantic HTML element — overrides the default for this variant.
   * Use when visual style and document hierarchy need to diverge.
   *
   * @example
   * // Visually heading2, but semantically heading3 in the outline
   * <Text variant="heading2" as="h3">Section title</Text>
   *
   * @example
   * // Body-sized text that is semantically a label
   * <Text variant="body" as="label" htmlFor="email">Email</Text>
   */
  as?: TextElement;

  /**
   * Truncate text to a single line with ellipsis.
   */
  truncate?: boolean;

  /**
   * Associates the element with a form input — only meaningful when as="label".
   */
  htmlFor?: string;
}

const variantClass: Record<TextVariant, string | undefined> = {
  display: styles.display,
  heading1: styles.heading1,
  heading2: styles.heading2,
  heading3: styles.heading3,
  heading4: styles.heading4,
  'body-lg': styles.bodyLg,
  body: styles.body,
  'body-sm': styles.bodySm,
  label: styles.label,
  caption: styles.caption,
  mono: styles.mono,
};

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ variant, as, truncate = false, className, children, ...rest }, ref) => {
    const Element = (as ?? defaultElement[variant]) as React.ElementType;

    const classes = [
      styles.text,
      variantClass[variant],
      truncate ? styles.truncate : '',
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Element ref={ref} className={classes} {...rest}>
        {children}
      </Element>
    );
  },
);

Text.displayName = 'Text';
