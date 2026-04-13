# Divider

A thin decorative line for separating content. Always `aria-hidden` — purely visual. Whitespace should handle most separation; reach for Divider only when a visible line adds genuine clarity.

**Status:** `draft`

---

## When to use

- Separating unrelated sections in a toolbar or nav bar (vertical)
- Separating major content sections when whitespace alone isn't enough
- The Exquisite Corpse rich text editor toolbar — separating formatting groups

## When not to use

- Inside a Card — use `Card.Divider` instead (it handles padding correctly)
- When spacing between elements is sufficient — don't add visual noise
- To separate list items — use gap/padding instead
- As a page-width rule below a page header — use whitespace and hierarchy

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction of the line |
| `spacing` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'none'` | Margin added on both sides |

All native `<hr>` attributes are supported and forwarded.

---

## Usage

### Horizontal with spacing

```tsx
<section>
  <p>First section content</p>
  <Divider spacing="md" />
  <p>Second section content</p>
</section>
```

### Vertical in a toolbar

```tsx
<div style={{ display: 'flex', alignItems: 'center', height: '36px' }}>
  <button>Bold</button>
  <button>Italic</button>
  <Divider orientation="vertical" spacing="sm" />
  <button>H1</button>
  <button>H2</button>
</div>
```

Vertical dividers require a flex parent with a defined height. `align-self: stretch` (applied automatically) makes the divider fill the parent height.

---

## Divider vs Card.Divider

`Card.Divider` is a pre-configured version for use inside Card components. It handles horizontal margin to align with Card body padding automatically.

```tsx
// Inside a Card — use Card.Divider
<Card>
  <Card.Body>First section</Card.Body>
  <Card.Divider />
  <Card.Body>Second section</Card.Body>
</Card>

// Outside a Card — use Divider
<Divider spacing="md" />
```

---

## Accessibility

- `aria-hidden="true"` is set automatically — screen readers ignore it entirely
- Never use Divider to convey meaning — it is purely decorative
- Section separation should be expressed through heading hierarchy, not visual lines

---

## Known limitations

- Vertical dividers require a flex parent with a defined height — they have no intrinsic height of their own
- The `spacing` prop adds equal margin on both sides — for asymmetric spacing, use `className` with custom margin
