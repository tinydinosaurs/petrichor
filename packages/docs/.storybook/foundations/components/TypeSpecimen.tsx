import React from 'react';

interface TypeSpecimenProps {
  /** The variant name — display, heading1, body, etc. */
  variant: string;
  /** The text to render as the specimen */
  sample?: string;
  /** Token values to show in the metadata row */
  tokens: {
    font: string;
    size: string;
    weight: string;
    lineHeight: string;
    letterSpacing?: string;
  };
  /** Default HTML element this variant maps to */
  element: string;
  /** Additional notes shown below the specimen */
  note?: string;
  /** If true, renders a longer multi-line sample to show line-height */
  multiLine?: boolean;
}

const MONO: React.CSSProperties = {
  fontFamily: 'var(--ptr-typography-font-mono, monospace)',
  fontSize: '11px',
  color: 'var(--ptr-color-text-tertiary)',
};

const TokenTag = ({ label, value }: { label: string; value: string }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      marginRight: '12px',
      marginBottom: '4px',
    }}
  >
    <span style={{ ...MONO, color: 'var(--ptr-color-text-tertiary)' }}>{label}</span>
    <code
      style={{
        ...MONO,
        color: 'var(--ptr-color-text-secondary)',
        background: 'var(--ptr-color-bg-elevated)',
        padding: '1px 5px',
        borderRadius: '3px',
      }}
    >
      {value}
    </code>
  </span>
);

export const TypeSpecimen = ({
  variant,
  sample,
  tokens,
  element,
  note,
  multiLine = false,
}: TypeSpecimenProps) => {
  const defaultSample = multiLine
    ? 'The rain had a particular smell — copper and old paper — that she had learned to associate with change. Not the dramatic kind. The quiet kind, where you wake up one morning and something small is different and you can never remember exactly when it shifted.'
    : "The clockmaker's last dream";

  const displaySample = sample ?? defaultSample;

  const specimenStyle: React.CSSProperties = {
    font: 'unset',
    fontFamily: `var(--ptr-typography-font-${tokens.font})`,
    fontSize: `var(--ptr-typography-size-${tokens.size})`,
    fontWeight: `var(--ptr-typography-weight-${tokens.weight})`,
    lineHeight: `var(--ptr-typography-line-height-${tokens.lineHeight})`,
    letterSpacing: tokens.letterSpacing
      ? `var(--ptr-typography-letter-spacing-${tokens.letterSpacing})`
      : undefined,
    color: 'var(--ptr-color-text-primary)',
    margin: 0,
    padding: 0,
  };

  return (
    <div
      style={{
        borderBottom: '0.5px solid var(--ptr-color-border-subtle)',
        padding: '20px 0',
      }}
    >
      {/* Variant label + element */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '8px',
          marginBottom: '12px',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            fontWeight: 600,
            fontFamily: 'var(--ptr-typography-font-mono, monospace)',
            color: 'var(--ptr-color-text-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          {variant}
        </span>
        <span
          style={{
            fontSize: '11px',
            fontFamily: 'var(--ptr-typography-font-mono, monospace)',
            color: 'var(--ptr-color-text-tertiary)',
          }}
        >
          → &lt;{element}&gt;
        </span>
      </div>

      {/* The specimen */}
      <div style={specimenStyle}>{displaySample}</div>

      {/* Token metadata */}
      <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap' }}>
        <TokenTag label="font" value={`--ptr-typography-font-${tokens.font}`} />
        <TokenTag label="size" value={`--ptr-typography-size-${tokens.size}`} />
        <TokenTag label="weight" value={`--ptr-typography-weight-${tokens.weight}`} />
        <TokenTag label="line-height" value={`--ptr-typography-line-height-${tokens.lineHeight}`} />
        {tokens.letterSpacing && (
          <TokenTag
            label="letter-spacing"
            value={`--ptr-typography-letter-spacing-${tokens.letterSpacing}`}
          />
        )}
      </div>

      {/* Note */}
      {note && (
        <div
          style={{
            marginTop: '8px',
            fontSize: '11px',
            color: 'var(--ptr-color-text-tertiary)',
            fontFamily: 'var(--ptr-typography-font-ui, sans-serif)',
            fontStyle: 'italic',
          }}
        >
          {note}
        </div>
      )}
    </div>
  );
};

interface TypeScaleProps {
  /** Array of { label, size token, weight token } to render as a stacked scale */
  steps: Array<{
    label: string;
    size: string;
    weight: string;
    sample?: string;
  }>;
}

export const TypeScale = ({ steps }: TypeScaleProps) => (
  <div style={{ padding: '8px 0' }}>
    {steps.map(({ label, size, weight, sample }) => (
      <div
        key={label}
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '16px',
          padding: '8px 0',
          borderBottom: '0.5px solid var(--ptr-color-border-subtle)',
        }}
      >
        <span
          style={{
            ...MONO,
            color: 'var(--ptr-color-text-tertiary)',
            width: '72px',
            flexShrink: 0,
            fontSize: '11px',
          }}
        >
          {label}
        </span>
        <span
          style={{
            font: 'unset',
            fontFamily: 'var(--ptr-typography-font-ui)',
            fontSize: `var(--ptr-typography-size-${size})`,
            fontWeight: `var(--ptr-typography-weight-${weight})`,
            lineHeight: 'var(--ptr-typography-line-height-ui)',
            color: 'var(--ptr-color-text-primary)',
            margin: 0,
          }}
        >
          {sample ?? "The clockmaker's last dream"}
        </span>
      </div>
    ))}
  </div>
);

interface BrandCompareProps {
  /** Sample text to render in both fonts */
  sample?: string;
}

export const BrandCompare = ({ sample }: BrandCompareProps) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '24px',
      padding: '16px 0',
    }}
  >
    {[
      { brand: 'Raindrop', font: 'Inter', hue: '240' },
      { brand: 'Dusk Rose', font: 'Fraunces', hue: '355' },
    ].map(({ brand, font, hue }) => (
      <div
        key={brand}
        style={{
          padding: '20px',
          borderRadius: '8px',
          border: '0.5px solid var(--ptr-color-border-subtle)',
          background: 'var(--ptr-color-bg-surface)',
        }}
      >
        <div
          style={{
            fontSize: '11px',
            fontWeight: 500,
            color: `oklch(58% 0.12 ${hue})`,
            fontFamily: 'var(--ptr-typography-font-ui, sans-serif)',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          {brand}
        </div>
        <div
          style={{
            fontFamily: font === 'Fraunces' ? 'Fraunces, serif' : 'Inter, sans-serif',
            fontSize: '28px',
            fontWeight: font === 'Fraunces' ? 300 : 700,
            color: 'var(--ptr-color-text-primary)',
            lineHeight: 1.2,
            marginBottom: '8px',
          }}
        >
          {sample ?? 'The Storm Before'}
        </div>
        <div
          style={{
            fontSize: '11px',
            fontFamily: 'var(--ptr-typography-font-mono, monospace)',
            color: 'var(--ptr-color-text-tertiary)',
          }}
        >
          font-display → {font}
        </div>
      </div>
    ))}
  </div>
);
