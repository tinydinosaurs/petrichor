import React from 'react';

// Shared styles
const s = {
  mono: {
    fontFamily: 'var(--ptr-typography-font-mono, monospace)',
    fontSize: '11px',
    color: 'var(--ptr-color-text-secondary)',
  },
  label: {
    fontFamily: 'var(--ptr-typography-font-ui, sans-serif)',
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--ptr-color-text-primary)',
  },
  description: {
    fontFamily: 'var(--ptr-typography-font-ui, sans-serif)',
    fontSize: '11px',
    color: 'var(--ptr-color-text-tertiary)',
    marginTop: '2px',
  },
  groupTitle: {
    fontSize: '11px',
    fontWeight: 500,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.06em',
    color: 'var(--ptr-color-text-tertiary)',
    fontFamily: 'var(--ptr-typography-font-ui, sans-serif)',
    marginBottom: '12px',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SpacingScale — visualizes the full spacing scale with bars
// ─────────────────────────────────────────────────────────────────────────────

interface SpacingScaleProps {
  tokens: Array<{
    token: string;
    label: string;
    value: string;
    description?: string;
  }>;
}

export const SpacingScale = ({ tokens }: SpacingScaleProps) => (
  <div style={{ marginBottom: '24px' }}>
    {tokens.map(({ token, label, value, description }) => (
      <div
        key={token}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '8px 0',
          borderBottom: '0.5px solid var(--ptr-color-border-subtle)',
        }}
      >
        <div style={{ width: '60px', flexShrink: 0 }}>
          <div style={s.label}>{label}</div>
          <code style={s.mono}>{value}</code>
        </div>
        <div
          style={{
            width: `var(${token})`,
            height: '24px',
            background: 'var(--ptr-color-brand-primary)',
            borderRadius: '2px',
            flexShrink: 0,
          }}
        />
        <code style={{ ...s.mono, flexShrink: 0, width: '180px' }}>{token}</code>
        {description && <div style={{ ...s.description, flex: 1 }}>{description}</div>}
      </div>
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SpacingExample — shows spacing in context (padding, gap, margin)
// ─────────────────────────────────────────────────────────────────────────────

interface SpacingExampleProps {
  title: string;
  token: string;
  type: 'padding' | 'gap' | 'margin';
  description: string;
}

export const SpacingExample = ({ title, token, type, description }: SpacingExampleProps) => {
  const renderExample = () => {
    if (type === 'padding') {
      return (
        <div
          style={{
            background: 'var(--ptr-color-brand-primary-tint)',
            borderRadius: 'var(--ptr-radius-md)',
            padding: `var(${token})`,
            display: 'inline-block',
          }}
        >
          <div
            style={{
              background: 'var(--ptr-color-bg-surface)',
              borderRadius: 'var(--ptr-radius-sm)',
              padding: '12px 16px',
              ...s.label,
            }}
          >
            Content
          </div>
        </div>
      );
    }

    if (type === 'gap') {
      return (
        <div
          style={{
            display: 'flex',
            gap: `var(${token})`,
            background: 'var(--ptr-color-bg-surface)',
            padding: '12px',
            borderRadius: 'var(--ptr-radius-md)',
          }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: '48px',
                height: '32px',
                background: 'var(--ptr-color-brand-primary)',
                borderRadius: 'var(--ptr-radius-sm)',
              }}
            />
          ))}
        </div>
      );
    }

    if (type === 'margin') {
      return (
        <div
          style={{
            background: 'var(--ptr-color-bg-surface)',
            borderRadius: 'var(--ptr-radius-md)',
            padding: '12px',
          }}
        >
          <div
            style={{
              background: 'var(--ptr-color-brand-primary-tint)',
              padding: '8px 12px',
              borderRadius: 'var(--ptr-radius-sm)',
              marginBottom: `var(${token})`,
              ...s.label,
            }}
          >
            Item 1
          </div>
          <div
            style={{
              background: 'var(--ptr-color-brand-primary-tint)',
              padding: '8px 12px',
              borderRadius: 'var(--ptr-radius-sm)',
              ...s.label,
            }}
          >
            Item 2
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      style={{
        padding: '16px 0',
        borderBottom: '0.5px solid var(--ptr-color-border-subtle)',
      }}
    >
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        <div style={{ width: '200px', flexShrink: 0 }}>{renderExample()}</div>
        <div style={{ flex: 1 }}>
          <div style={s.label}>{title}</div>
          <code style={{ ...s.mono, display: 'block', margin: '4px 0' }}>{token}</code>
          <div style={s.description}>{description}</div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SpacingComparison — side-by-side comparison of two spacing values
// ─────────────────────────────────────────────────────────────────────────────

interface SpacingComparisonProps {
  title: string;
  items: Array<{
    label: string;
    token: string;
    value: string;
  }>;
  description: string;
}

export const SpacingComparison = ({ title, items, description }: SpacingComparisonProps) => (
  <div
    style={{
      padding: '16px',
      background: 'var(--ptr-color-bg-surface)',
      borderRadius: 'var(--ptr-radius-md)',
      marginBottom: '16px',
    }}
  >
    <div style={{ ...s.label, marginBottom: '12px' }}>{title}</div>
    <div
      style={{
        display: 'flex',
        gap: '24px',
        marginBottom: '12px',
      }}
    >
      {items.map(({ label, token, value }) => (
        <div key={token} style={{ flex: 1 }}>
          <div
            style={{
              background: 'var(--ptr-color-bg-page)',
              borderRadius: 'var(--ptr-radius-sm)',
              padding: `var(${token})`,
              marginBottom: '8px',
            }}
          >
            <div
              style={{
                background: 'var(--ptr-color-brand-primary-tint)',
                borderRadius: 'var(--ptr-radius-sm)',
                padding: '8px 12px',
                textAlign: 'center',
                ...s.mono,
              }}
            >
              {label}
            </div>
          </div>
          <code style={s.mono}>
            {token} ({value})
          </code>
        </div>
      ))}
    </div>
    <div style={s.description}>{description}</div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SpacingGroup — wrapper with title
// ─────────────────────────────────────────────────────────────────────────────

interface SpacingGroupProps {
  title: string;
  children: React.ReactNode;
}

export const SpacingGroup = ({ title, children }: SpacingGroupProps) => (
  <div style={{ marginBottom: '32px' }}>
    <div style={s.groupTitle}>{title}</div>
    {children}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// ComponentSpacing — shows how spacing is used in a component context
// ─────────────────────────────────────────────────────────────────────────────

interface ComponentSpacingProps {
  name: string;
  description: string;
  tokens: Array<{
    property: string;
    token: string;
  }>;
}

export const ComponentSpacing = ({ name, description, tokens }: ComponentSpacingProps) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '16px',
      padding: '12px 0',
      borderBottom: '0.5px solid var(--ptr-color-border-subtle)',
    }}
  >
    <div style={{ width: '100px', flexShrink: 0 }}>
      <div style={s.label}>{name}</div>
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ ...s.description, marginBottom: '8px' }}>{description}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {tokens.map(({ property, token }) => (
          <code key={property} style={s.mono}>
            {property}: {token}
          </code>
        ))}
      </div>
    </div>
  </div>
);
