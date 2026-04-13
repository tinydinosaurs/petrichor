# Button

The foundational interactive element. Every action a user can take is expressed through a Button.

**Status:** `draft`

---

## When to use

- Triggering an action (save, submit, delete, export)
- Opening a dialog or panel
- Navigating to a new page (use `asChild` with an anchor)

## When not to use

- Navigation within a page — use a link instead
- Toggling a boolean setting — use `Toggle` or `Switch`
- Selecting from a set of options — use `Select` or `RadioGroup`
- Two primary buttons side by side — only one primary per surface section

---

## Variants

| Variant | Use for |
|---|---|
| `primary` | The single highest-emphasis action on a surface. One per section. |
| `secondary` | Supporting action alongside a primary. Cancel, Export, Back. |
| `ghost` | Tertiary actions, toolbar controls, inline actions. |
| `danger` | Destructive, irreversible actions only. Delete, Remove, Revoke. |
| `ghost-danger` | Destructive but low-emphasis. Inline list row removals. |

## Sizes

| Size | Height | Use for |
|---|---|---|
| `sm` | 32px | Filter bars, table actions, compact UIs |
| `md` | 40px | Default. Forms, cards, page actions. |
| `lg` | 48px | Hero sections, prominent single CTAs |

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger' \| 'ghost-danger'` | `'primary'` | Visual style and semantic emphasis |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height and padding |
| `loading` | `boolean` | `false` | Shows spinner, disables interaction, sets `aria-busy` |
| `disabled` | `boolean` | `false` | Native disabled — removes from tab order |
| `aria-disabled` | `boolean` | — | ARIA disabled — stays in tab order. Use for form submit buttons not yet ready. |
| `iconStart` | `ReactNode` | — | Icon before label. Hidden during loading. |
| `iconEnd` | `ReactNode` | — | Icon after label. Hidden during loading. |
| `iconOnly` | `boolean` | `false` | Square button. Requires `aria-label`. |
| `asChild` | `boolean` | `false` | Renders as child element. Use for link buttons. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type. Always explicit — never accidentally a submit. |

All native `<button>` attributes are supported and forwarded.

---

## Usage

### Basic

```tsx
<Button variant="primary" onClick={handleSave}>
  Save changes
</Button>
```

### With icon

```tsx
<Button variant="primary" iconStart={<DownloadIcon />}>
  Export
</Button>

<Button variant="secondary" iconEnd={<ArrowRightIcon />}>
  Next step
</Button>
```

### Icon only

```tsx
<Button iconOnly aria-label="Close dialog">
  <XIcon />
</Button>
```

### As a link

```tsx
<Button asChild variant="primary">
  <a href="/dashboard">Go to dashboard</a>
</Button>
```

### Loading state

```tsx
<Button loading={isSaving}>
  {isSaving ? 'Saving...' : 'Save changes'}
</Button>
```

### Disabled — form submit not ready

Use `aria-disabled` (not `disabled`) so the button stays in the tab order and screen readers can discover it:

```tsx
<Button
  variant="primary"
  aria-disabled={!isFormValid}
  onClick={isFormValid ? handleSubmit : undefined}
>
  Submit
</Button>
```

---

## Accessibility

- Renders a native `<button>` element — keyboard accessible and screen-reader friendly by default
- Defaults to `type="button"` — never accidentally submits a form
- Focus ring uses a double-ring pattern: 2px gap + 4px brand color ring — visible on any background
- `loading` sets both `disabled` and `aria-busy="true"` — screen readers announce the busy state
- `iconOnly` buttons require `aria-label` — the label is read by screen readers in place of the invisible text
- Icon wrappers have `aria-hidden="true"` — icons are decorative, labels do the communicating
- Touch target for `sm` size is expanded to 44×44px via an invisible pseudo-element — the visual size stays 32px

### Keyboard

| Key | Action |
|---|---|
| `Tab` | Move focus to button |
| `Enter` | Activate button |
| `Space` | Activate button |

### disabled vs aria-disabled

Use `disabled` when the action is genuinely unavailable and doesn't need to be discovered.

Use `aria-disabled` when the button needs to stay visible and discoverable — particularly for form submit buttons that aren't ready yet. Combine with `onClick` guard to prevent the action from firing.

---

## Composition rules

### Button can contain
- Text (required unless `iconOnly`)
- A single icon via `iconStart` or `iconEnd`
- A single icon as `children` when `iconOnly` is true

### Button can be placed inside
- `form` elements
- `Card` (as a CTA)
- `FormFooter` molecule
- `Dialog` action areas
- Navigation bars
- Toolbars

### Never do
- Two `primary` buttons side by side
- A `Button` inside another `Button`
- A `danger` button for any non-destructive action
- `iconOnly` without `aria-label`
- Omitting `type="submit"` on form submit buttons (and relying on the default)
- Using `disabled` on a form submit button where the user needs to discover it exists

---

## Known limitations

- The `sm` size touch target expansion uses `::before` — this may conflict with `overflow: hidden` on a parent container
- `asChild` with a React Router `<Link>` component works correctly; ensure the router's link component forwards refs