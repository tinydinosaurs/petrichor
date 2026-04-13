# Card

A compound surface component. Provides the container, structure, and surface for content cards. One topic per card.

**Status:** `draft`

---

## When to use

- Grouping related content into a visually distinct unit
- Story cards, player profiles, stat displays, settings panels
- Any content that benefits from visual separation from the surrounding layout
- Empty states within a bounded region

## When not to use

- Full-page layout sections — use layout primitives instead
- Inline content that doesn't need visual separation
- Two unrelated topics — use two separate cards

---

## Sub-components

Card is a compound component. Import once, use all parts.

```tsx
import { Card } from '@petrichor/react'

<Card>
  <Card.Header>...</Card.Header>
  <Card.Body>...</Card.Body>
  <Card.Footer>...</Card.Footer>
</Card>
```

| Sub-component | Purpose |
|---|---|
| `Card` | The surface — background, border, radius, overflow |
| `Card.Header` | Top content area — title, metadata, thumbnail |
| `Card.Body` | Main content area — expands to fill available space |
| `Card.Footer` | Bottom content area — actions, status badges |
| `Card.Image` | Full-bleed image — clips to card border radius |
| `Card.Divider` | Thin horizontal rule — use sparingly |
| `Card.Empty` | Empty state — icon + message + optional CTA |

All sub-components are optional. Use Card bare when you need full control over interior layout.

---

## Props

### Card

| Prop | Type | Default | Description |
|---|---|---|---|
| `as` | `'div' \| 'article' \| 'section' \| 'li'` | `'div'` | Semantic element |
| `loading` | `boolean` | `false` | Shows shimmer skeleton, hides children |

### Card.Header

| Prop | Type | Default | Description |
|---|---|---|---|
| `bordered` | `boolean` | `false` | Adds hairline bottom border |

### Card.Footer

| Prop | Type | Default | Description |
|---|---|---|---|
| `bordered` | `boolean` | `false` | Adds hairline top border |

### Card.Image

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | required | Image source URL |
| `alt` | `string` | required | Alt text — empty string for decorative images |
| `orientation` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Image position relative to content |
| `aspectRatio` | `string` | — | CSS aspect-ratio value e.g. `"16/9"` |

### Card.Empty

| Prop | Type | Default | Description |
|---|---|---|---|
| `message` | `string` | required | Primary empty state message |
| `icon` | `ReactNode` | — | Icon — use `<Icon duotone size="xl" />` |
| `description` | `string` | — | Supporting explanation |
| `action` | `ReactNode` | — | CTA — pass a Button component |

All sub-components accept and forward native HTML attributes.

---

## Usage

### Bare card

```tsx
<Card>
  <div style={{ padding: '16px' }}>
    Full control over interior layout.
  </div>
</Card>
```

### Standard content card

```tsx
<Card as="article" aria-label="Story: The Clockmaker's Last Dream">
  <Card.Header bordered>
    <h2>The Clockmaker's Last Dream</h2>
  </Card.Header>
  <Card.Body>
    <p>The door opened onto a street that hadn't existed yesterday...</p>
  </Card.Body>
  <Card.Footer bordered>
    <Button variant="primary" size="sm">Read story</Button>
  </Card.Footer>
</Card>
```

### With image

```tsx
<Card>
  <Card.Image
    src="/cover.jpg"
    alt="Story cover"
    aspectRatio="16/9"
  />
  <Card.Header>
    <h3>The Clockmaker's Last Dream</h3>
  </Card.Header>
  <Card.Body>
    <p>4 contributors · 6 segments</p>
  </Card.Body>
</Card>
```

### Horizontal layout

```tsx
<Card>
  <Card.Image
    src="/cover.jpg"
    alt="Story cover"
    orientation="left"
  />
  <Card.Body>
    <h3>The Clockmaker's Last Dream</h3>
    <p>4 contributors</p>
  </Card.Body>
</Card>
```

### Empty state

```tsx
<Card>
  <Card.Empty
    icon={<Icon icon={CloudRain} size="xl" duotone />}
    message="No stories yet"
    description="Start by creating your first story."
    action={<Button variant="primary">Start a story</Button>}
  />
</Card>
```

### Loading state

```tsx
<Card loading>
  {/* Children hidden while loading */}
</Card>
```

---

## Choosing the right `as` value

| Context | `as` value | Why |
|---|---|---|
| Story card, player profile | `article` | Standalone content — navigable by screen reader |
| Card grid items | `li` | Items in a list — correct list semantics |
| Settings panel | `section` | Grouped content within a page |
| Stat card, UI panel | `div` | No standalone meaning — generic container |

---

## Accessibility

- `as="article"` creates a landmark navigable by screen readers with `aria-label` or `aria-labelledby`
- `as="li"` requires a parent `<ul>` or `<ol>`
- `Card.Image` requires `alt` — use empty string `alt=""` only for genuinely decorative images
- `Card.Divider` is `aria-hidden` — purely visual
- `Card.Empty` icon is `aria-hidden` — the message text conveys the meaning
- Loading skeleton is `aria-hidden` — the card's label (if visible) identifies the loading region

---

## Composition rules

### One topic per card

```tsx
// Wrong — two unrelated topics
<Card>
  <Card.Header>Player Stats</Card.Header>
  ...
  <Card.Header>Match History</Card.Header>
  ...
</Card>

// Right — separate cards
<Card><Card.Header>Player Stats</Card.Header>...</Card>
<Card><Card.Header>Match History</Card.Header>...</Card>
```

### Use `bordered` instead of `Card.Divider` for structural separation

```tsx
// Preferred — bordered header/footer
<Card>
  <Card.Header bordered>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer bordered>Actions</Card.Footer>
</Card>

// Card.Divider is for mid-body separation only
<Card>
  <Card.Body>
    <p>First section</p>
    <Card.Divider />
    <p>Second section</p>
  </Card.Body>
</Card>
```

### Never nest cards

```tsx
// Wrong
<Card>
  <Card.Body>
    <Card>Nested card</Card>
  </Card.Body>
</Card>
```

---

## Brand radius behavior

Card border radius is driven by `--ptr-radius-component-card`:

- **Raindrop:** `radius-md` (4px) — precise, technical
- **Dusk Rose:** `radius-lg` (8px) — softer, editorial

---

## Known limitations

- Horizontal orientation (`Card.Image` with `orientation="left"` or `"right"`) uses CSS `:has()` which has full modern browser support but no IE support — consistent with Petrichor's modern browser stance.
- `Card.Empty` icon size is not enforced — using `<Icon size="xl" duotone />` is strongly recommended for visual consistency.
