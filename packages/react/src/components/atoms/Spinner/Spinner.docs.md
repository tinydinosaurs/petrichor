# Spinner

A loading indicator. Inherits color from its parent via `currentColor`. Announces its state to screen readers via `role="status"` and `aria-label`.

**Status:** `draft`

---

## When to use

- Indicating an async operation is in progress — data fetching, form submission, file upload
- Inside Button via the `loading` prop (handled automatically — no need to use Spinner directly)
- Full-page or section loading states
- Inline loading indicators alongside text

## When not to use

- Skeleton loading for known content shapes — use skeleton CSS instead (Card has a built-in loading state)
- Progress with a known percentage — use a progress bar
- Very short operations under 300ms — avoid showing a spinner for imperceptibly fast operations

---

## Props

| Prop    | Type                           | Default     | Description                                      |
| ------- | ------------------------------ | ----------- | ------------------------------------------------ |
| `size`  | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'sm'`      | Spinner size                                     |
| `label` | `string`                       | `'Loading'` | Accessible label — provide context when possible |

All native SVG attributes are supported and forwarded.

---

## Sizes

| Size | Pixels | Use for                                    |
| ---- | ------ | ------------------------------------------ |
| `xs` | 12px   | Very tight spaces                          |
| `sm` | 16px   | Default — inline with text, inside buttons |
| `md` | 20px   | Slightly larger contexts                   |
| `lg` | 24px   | Section and page loading states            |

---

## Usage

### Basic

```tsx
<Spinner />
```

### With context-specific label

```tsx
<Spinner label="Saving changes" />
<Spinner label="Loading results" />
<Spinner label="Submitting form" />
```

Always provide a meaningful label when the context is known. `"Loading"` is acceptable as a fallback but `"Saving changes"` is better.

### Inline with text

```tsx
<div
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--ptr-spacing-2xs)',
    color: 'var(--ptr-color-text-secondary)',
  }}
>
  <Spinner size="sm" label="Loading results" />
  <span>Loading results...</span>
</div>
```

### Section loading state

```tsx
<div
  style={{
    display: 'flex',
    justifyContent: 'center',
    padding: 'var(--ptr-spacing-xl)',
    color: 'var(--ptr-color-text-tertiary)',
  }}
>
  <Spinner size="lg" label="Loading dashboard" />
</div>
```

### Inside Button

Don't use Spinner directly inside buttons — use the `loading` prop on Button instead. It handles the spinner, disabled state, and `aria-busy` automatically:

```tsx
<Button loading={isSaving}>Save changes</Button>
```

---

## Color

Spinner inherits color from its parent element via `currentColor`. Control the color by setting it on the parent — never pass a `color` prop directly.

```tsx
// Tertiary — subtle loading
<span style={{ color: 'var(--ptr-color-text-tertiary)' }}>
  <Spinner />
</span>

// Brand — prominent loading
<span style={{ color: 'var(--ptr-color-brand-primary)' }}>
  <Spinner size="lg" />
</span>
```

---

## Accessibility

- `role="status"` — announces the loading state to screen readers
- `aria-label` defaults to `"Loading"` — override with context-specific text
- When paired with visible loading text, the spinner can be `aria-hidden="true"` to avoid announcing the same thing twice:

```tsx
<div role="status">
  <Spinner aria-hidden="true" />
  <span>Loading results...</span>
</div>
```

---

## Known limitations

- Animation respects `prefers-reduced-motion` via CSS — the spin animation will be suppressed for users who prefer reduced motion. Consider showing a static indicator or alternative text in those cases.
- No built-in timeout handling — if a loading state persists unexpectedly, that's the consumer's responsibility to handle.
