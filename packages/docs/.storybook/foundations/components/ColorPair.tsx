interface ColorPairProps {
  name: string;
  bgToken: string;
  textToken: string;
  borderToken?: string;
  description: string;
}

export const ColorPair = ({
  name,
  bgToken,
  textToken,
  borderToken,
  description,
}: ColorPairProps) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '8px 0',
      borderBottom: '0.5px solid var(--ptr-color-border-subtle)',
    }}
  >
    {/* Pair preview — bg with text on top */}
    <div
      style={{
        width: 80,
        height: 48,
        borderRadius: '6px',
        background: `var(${bgToken})`,
        border: borderToken
          ? `1.5px solid var(${borderToken})`
          : '0.5px solid rgba(128,128,128,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontSize: '12px',
          fontWeight: 500,
          color: `var(${textToken})`,
          fontFamily: 'var(--ptr-typography-font-ui, sans-serif)',
        }}
      >
        {name}
      </span>
    </div>

    {/* Token names */}
    <div style={{ minWidth: 0 }}>
      <div style={{ marginBottom: '4px' }}>
        <code
          style={{
            fontSize: '11px',
            fontFamily: 'var(--ptr-typography-font-mono, monospace)',
            color: 'var(--ptr-color-text-secondary)',
          }}
        >
          bg: {bgToken}
        </code>
      </div>
      <div style={{ marginBottom: '4px' }}>
        <code
          style={{
            fontSize: '11px',
            fontFamily: 'var(--ptr-typography-font-mono, monospace)',
            color: 'var(--ptr-color-text-secondary)',
          }}
        >
          text: {textToken}
        </code>
      </div>
      {borderToken && (
        <div style={{ marginBottom: '4px' }}>
          <code
            style={{
              fontSize: '11px',
              fontFamily: 'var(--ptr-typography-font-mono, monospace)',
              color: 'var(--ptr-color-text-secondary)',
            }}
          >
            border: {borderToken}
          </code>
        </div>
      )}
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
    </div>
  </div>
);
