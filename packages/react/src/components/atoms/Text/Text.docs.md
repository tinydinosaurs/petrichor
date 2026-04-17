# Text

Typography component. `variant` controls visual style. `as` controls semantic element. Smart defaults pair each variant with its most common element — override `as` only when document hierarchy and visual style need to diverge.

**Status:** `draft`

---

## The key concept

Most typography systems conflate two concerns into one prop. Petrichor separates them:

- **`variant`** — what the text _looks like_ (font, size, weight, line-height)
- **`as`** — what HTML element it _is_ in the document (h1, h2, p, span...)

```tsx
// Common case — visual and semantic match, no override needed
<Text variant="heading2">Top Players</Text>
// renders <h2> with heading2 styles ✓

// Override case — card section nested under a page h2
<Text variant="heading2" as="h3">Top Players</Text>
// renders <h3> with heading2 styles ✓ (correct outline)
```

This matters for accessibility. A screen reader user navigating by headings needs a logical hierarchy. The `as` prop lets the visual design and document structure stay independent.

---

## Variants

| Variant    | Default element | Font         | Size | Weight  | Use for                                    |
| ---------- | --------------- | ------------ | ---- | ------- | ------------------------------------------ |
| `display`  | `h1`            | font-display | 3xl  | display | Hero moments, story titles                 |
| `heading1` | `h1`            | font-ui      | 2xl  | label   | Page titles                                |
| `heading2` | `h2`            | font-ui      | xl   | label   | Section headings                           |
| `heading3` | `h3`            | font-ui      | lg   | label   | Subsection headings                        |
| `heading4` | `h4`            | font-ui      | md   | label   | Card headings, group labels                |
| `body-lg`  | `p`             | font-ui      | md   | body    | Lead paragraphs, prominent descriptions    |
| `body`     | `p`             | font-ui      | base | body    | Default body text                          |
| `body-sm`  | `p`             | font-ui      | sm   | body    | Secondary content, metadata                |
| `label`    | `span`          | font-ui      | sm   | label   | UI labels, stat names, metadata keys       |
| `caption`  | `span`          | font-ui      | xs   | body    | Timestamps, fine print, image captions     |
| `mono`     | `code`          | font-mono    | sm   | body    | Inline code, token names, technical values |

---

## Props

| Prop       | Type          | Default         | Description                          |
| ---------- | ------------- | --------------- | ------------------------------------ |
| `variant`  | `TextVariant` | required        | Visual style — closed enum           |
| `as`       | `TextElement` | variant default | Semantic element override            |
| `truncate` | `boolean`     | `false`         | Single-line truncation with ellipsis |

All native HTML attributes for the rendered element are supported and forwarded.

---

## Usage

### Basic — defaults handle the common case

```tsx
<Text variant="heading1">Season Rankings</Text>
<Text variant="body">Regular body text for reading surfaces.</Text>
<Text variant="caption">Updated 2 minutes ago</Text>
<Text variant="mono">const score = 2840</Text>
```

### Semantic override — card section titles

```tsx
// Page structure: <h1> Season Rankings → <h2> Top Players → cards

// ✓ Card heading is visually heading2 but semantically heading3
// because it's nested under the page's h2
<Text variant="heading2" as="h3">
  Match History
</Text>
```

### Form label

```tsx
// Use as="label" with htmlFor to create a real <label> element
<Text variant="label" as="label" htmlFor="email-input">
  Email address
</Text>
<Input id="email-input" type="email" />
```

Note: Input has its own built-in label. Use `Text as="label"` only when you need a label outside of the Input composite component.

### Story hero (Exquisite Corpse)

```tsx
<Text variant="display">The Clockmaker's Last Dream</Text>
<Text variant="body-lg">
  The door opened onto a street that hadn't existed yesterday.
  She stepped through anyway, because the rain smelled of copper.
</Text>
<Text variant="caption">4 contributors · 6 segments</Text>
```

### Stat card label pattern

```tsx
<Text variant="label">Season points</Text>
<Text variant="heading1">2,840</Text>
<Text variant="caption">↑ +124 vs last month</Text>
```

### Truncation

```tsx
<Text variant="body" truncate>
  This long text will be cut off with an ellipsis when it overflows.
</Text>
```

Requires a width constraint on the element or a parent. Without a constrained width, there's nothing to overflow against.

---

## The display variant

`display` is special — it uses `font-display` which resolves differently per brand:

- **Raindrop:** Inter, same as all other variants
- **Dusk Rose:** Fraunces — a variable serif with intentional quirks, optical size axis, suited to literary and editorial contexts

Use `display` for hero moments only — story titles, dashboard page headers, onboarding screens. One per view maximum. For structural headings, use `heading1`–`heading4`.

---

## Accessibility

### Document outline

Every page should have:

- Exactly one `h1`
- No skipped heading levels (h1 → h3 is wrong; h1 → h2 → h3 is correct)

```tsx
// ✗ Wrong — skips from h1 to h3
<Text variant="heading1">Page</Text>
<Text variant="heading3">Section</Text>

// ✓ Right — sequential hierarchy
<Text variant="heading1">Page</Text>
<Text variant="heading2">Section</Text>
<Text variant="heading3">Subsection</Text>
```

### When as is needed

```tsx
// A card sits inside a page section that already has an h2.
// The card title should be h3, not h2.
<section>
  <Text variant="heading2">Top Players</Text> {/* page-level h2 */}
  <Card>
    {/* visually heading2, semantically heading3 */}
    <Text variant="heading2" as="h3">
      Match History
    </Text>
  </Card>
</section>
```

---

## Composition rules

### Text can be placed inside

- Any layout surface
- Card.Header, Card.Body, Card.Footer
- Any component that needs text

### Never do

- Skip heading levels for visual reasons — use `as` to fix the semantic level
- Use `display` for more than one element per screen
- Override text color with hardcoded values — use semantic tokens or CSS variables
- Use `body` or `heading` variants for form labels — use `label` variant with `as="label"`

---

## Known limitations

- `truncate` requires a width constraint on the element or parent — it has no effect on elements that grow to fit their content
- No responsive variant switching — if you need different sizes at different breakpoints, apply className with media query overrides
- `display` variant looks the same as `heading1` on Raindrop — the brand differentiation only appears on Dusk Rose where Fraunces is active
