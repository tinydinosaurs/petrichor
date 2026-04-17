# Badge

A static display label for status, category, or metadata. Purely visual — no implicit role, no interactive behavior.

**Status:** `draft`

---

## When to use

- Component or content status (Draft, Beta, Stable, Deprecated)
- Online/offline indicators with a dot icon
- Content metadata (4 contributors, 6 segments)
- "New" or "Featured" labels on content
- Version numbers and release tags

## When not to use

- Interactive filtering — use Tag (planned) instead
- Dismissible labels — use Tag (planned) instead
- Notification counts on icons — use a dedicated notification indicator
- Communicating status through color alone — always pair color with text

---

## Props

| Prop        | Type                                                                              | Default     | Description                                                |
| ----------- | --------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------- |
| `variant`   | `'default' \| 'info' \| 'success' \| 'warning' \| 'error' \| 'danger' \| 'brand'` | `'default'` | Color and semantic meaning                                 |
| `size`      | `'sm' \| 'md' \| 'lg'`                                                            | `'md'`      | Height and padding                                         |
| `iconStart` | `ReactNode`                                                                       | —           | Icon before label. Always `aria-hidden` — decorative only. |
| `asChild`   | `boolean`                                                                         | `false`     | Renders as child element. Use for linked badges.           |

All native `<span>` attributes are supported and forwarded.

---

## Variants

| Variant   | Color         | Use for                                                        |
| --------- | ------------- | -------------------------------------------------------------- |
| `default` | Neutral grey  | No semantic meaning — category labels, metadata                |
| `info`    | Rain blue     | Informational status                                           |
| `success` | Teal          | Positive status — complete, online, stable                     |
| `warning` | Gold          | Caution — beta, deprecated, degraded                           |
| `error`   | Amber         | Problem state — something went wrong, offline, suspended       |
| `danger`  | Amber         | Destructive consequence — permanent action, irreversible state |
| `brand`   | Brand primary | Brand moments — New, Featured, highlighted items               |

---

## Usage

### Basic

```tsx
<Badge variant="success">Stable</Badge>
```

### With dot icon

```tsx
<Badge variant="success" iconStart={<DotIcon />}>Online</Badge>
<Badge variant="error" iconStart={<DotIcon />}>Offline</Badge>
```

### Component status taxonomy

```tsx
<Badge variant="default">Draft</Badge>
<Badge variant="warning">Beta</Badge>
<Badge variant="success">Stable</Badge>
<Badge variant="error">Deprecated</Badge>
```

### As a link

```tsx
<Badge asChild variant="info">
  <a href="/changelog">v2.4.0</a>
</Badge>
```

---

## Accessibility

- Renders as `<span>` — no implicit ARIA role
- No keyboard interaction by default
- Color is never the sole carrier of meaning — text content always conveys the status
- `iconStart` is `aria-hidden="true"` — decorative only
- For additional context, use `aria-label`: `<Badge aria-label="Status: stable">Stable</Badge>`
- When used as a link via `asChild`, the anchor element provides the interactive semantics

### Color alone is not enough

```tsx
// Wrong — color is the only signal
<Badge variant="error" />

// Right — text conveys meaning, color reinforces it
<Badge variant="error">Offline</Badge>
```

---

## Composition rules

### Badge can be placed inside

- Card headers and footers
- Table cells
- Nav items (version numbers, counts)
- Story cards (Exquisite Corpse)
- Leaderboard rows (Raindrop)
- Anywhere inline text appears

### Badge should never

- Be used as the only signal for critical information
- Contain more than 3–4 words — use a different component for longer labels
- Be interactive without `asChild` — use Button or Tag instead

---

## Brand radius behavior

Badge radius is driven by the brand token `--ptr-radius-component-badge`:

- **Raindrop:** `radius-sm` (2px) — rectangular, technical
- **Dusk Rose:** `radius-pill` (999px) — full pill, editorial

The same Badge component renders differently in each brand context without any code changes.

---

## Known limitations

- No dark mode contrast audit completed yet — all variants need WebAIM contrast verification. Deferred to visual polish phase.
