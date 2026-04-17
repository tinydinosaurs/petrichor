import React from 'react';

interface ColorSwatchProps {
  token: string;
  label: string;
  description?: string;
  size?: 'sm' | 'md';
}

export const ColorSwatch = ({ token, label, description, size = 'md' }: ColorSwatchProps) => {
  const swatchSize = size === 'sm' ? 36 : 48;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px 0',
        borderBottom: '0.5px solid var(--ptr-color-border-subtle)',
      }}
    >
      <div
        style={{
          width: swatchSize,
          height: swatchSize,
          borderRadius: '6px',
          background: `var(${token})`,
          border: '0.5px solid rgba(128,128,128,0.2)',
          flexShrink: 0,
        }}
      />
      <div style={{ minWidth: 0 }}>
        <code
          style={{
            fontSize: '12px',
            fontFamily: 'var(--ptr-typography-font-mono, monospace)',
            color: 'var(--ptr-color-text-primary)',
            display: 'block',
            marginBottom: '2px',
          }}
        >
          {token}
        </code>
        <div
          style={{
            fontSize: '12px',
            color: 'var(--ptr-color-text-secondary)',
            fontFamily: 'var(--ptr-typography-font-ui, sans-serif)',
          }}
        >
          {label}
        </div>
        {description && (
          <div
            style={{
              fontSize: '11px',
              color: 'var(--ptr-color-text-tertiary)',
              fontFamily: 'var(--ptr-typography-font-ui, sans-serif)',
              marginTop: '2px',
            }}
          >
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

interface ColorGroupProps {
  title: string;
  children: React.ReactNode;
}

export const ColorGroup = ({ title, children }: ColorGroupProps) => (
  <div style={{ marginBottom: '32px' }}>
    <div
      style={{
        fontSize: '11px',
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        color: 'var(--ptr-color-text-tertiary)',
        fontFamily: 'var(--ptr-typography-font-ui, sans-serif)',
        marginBottom: '4px',
      }}
    >
      {title}
    </div>
    {children}
  </div>
);
