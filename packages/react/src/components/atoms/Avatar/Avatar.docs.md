# Avatar

Represents a person with a photo, initials, or generic icon fallback. Circle shape only — square avatars are for organizations and groups, which Petrichor doesn't currently support.

**Status:** `draft`

---

## When to use

- Representing a person in a UI — player profiles, contributor lists, comment threads
- Identifying the current user in navigation
- Showing contributors in Exquisite Corpse story cards
- Anywhere a face or identity indicator is needed compactly

## When not to use

- Representing organizations, teams, or non-person entities — use an icon or logo instead
- Decorative illustration — use Icon with duotone instead
- When you need a full profile photo — use an `<img>` directly

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | — | Image URL |
| `alt` | `string` | — | Alt text — required when `src` is provided |
| `name` | `string` | — | Person's full name — drives initials and `aria-label` |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Avatar size |
| `status` | `'online' \| 'offline' \| 'away' \| 'busy'` | — | Status indicator dot |
| `asChild` | `boolean` | `false` | Renders as child element — use for linked avatars |

---

## Fallback cascade

Avatar always shows something — never a blank circle.

```
1. Image   — src provided and loads successfully
2. Initials — src not provided or fails to load, name is available
3. Icon    — neither src nor name provided — shows Phosphor User icon
```

The cascade is automatic. Provide `src` and `name` together so the fallback is meaningful if the image fails.

---

## Sizes

| Size | Pixels | Use for |
|---|---|---|
| `xs` | 24px | Tight spaces — contribution chips, dense lists |
| `sm` | 32px | List rows, table cells, compact cards |
| `md` | 40px | Default — cards, comments, nav |
| `lg` | 48px | Profile headers, featured contributors |
| `xl` | 64px | Player profile hero, prominent identity moments |

At `xs` size, only one initial is shown — the container is too small for two characters.

---

## Usage

### Basic with image

```tsx
<Avatar
  src="/photo.jpg"
  alt="Neo"
  name="Neo"
  size="md"
/>
```

### Initials fallback

```tsx
<Avatar name="Neo" size="md" />
// Renders "N" (single name) or "JS" for "Jane Smith"
```

### With status

```tsx
<Avatar
  src="https://placecats.com/neo/150/150"
  alt="Neo"
  name="Neo"
  size="md"
  status="online"
/>
```

### As a link

```tsx
<Avatar
  asChild
  src="https://placecats.com/neo/150/150"
  alt="Neo"
  name="Neo"
  aria-label="View Neo's profile"
>
  <a href="/profile/neo" />
</Avatar>
```

### Avatar group (stacked)

```tsx
<div style={{ display: 'flex' }}>
  {contributors.map((cat, i) => (
    <div key={i} style={{
      marginLeft: i === 0 ? 0 : '-8px',
      borderRadius: '999px',
      border: '2px solid var(--ptr-color-bg-page)',
      zIndex: contributors.length - i,
      position: 'relative',
    }}>
      <Avatar src={cat.src} alt={cat.name} name={cat.name} size="sm" />
    </div>
  ))}
</div>
```

The border color matches the page background to create visual separation between overlapping avatars. An `AvatarGroup` molecule is planned to encapsulate this pattern.

### Contribution chip (Exquisite Corpse)

```tsx
<div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ptr-spacing-2xs)' }}>
  <Avatar src={src} alt={name} name={name} size="xs" />
  <span style={{ fontSize: 'var(--ptr-typography-size-sm)' }}>{name}</span>
</div>
```

---

## Initials rules

- Derived automatically from the `name` prop
- Maximum 2 characters — first letter of first word + first letter of last word
- Single-word names use only the first letter
- Always uppercase
- `xs` size shows only 1 initial

```
"Neo"          → "N"
"Jane Smith"   → "JS"
"Jane Marie Smith" → "JS" (first + last only)
"madonna"      → "M"
```

---

## Status indicator

The `status` prop adds a colored dot in the bottom-right corner.

| Status | Color | Use for |
|---|---|---|
| `online` | Success teal | Active, available |
| `offline` | Tertiary grey | Inactive, unavailable |
| `away` | Warning gold | Away, idle |
| `busy` | Error amber | Busy, do not disturb |

The dot has `aria-label="Status: {status}"` — announced by screen readers.

---

## Accessibility

- `name` prop sets `aria-label` on the container automatically — always provide it when known
- Override with explicit `aria-label` for link context: `aria-label="View Neo's profile"`
- When avatar is adjacent to the person's name in text, `aria-label` can be omitted — the text provides the accessible name
- Initials span is `aria-hidden="true"` — the container's `aria-label` provides the accessible name
- Icon fallback is `aria-hidden="true"` — same reason
- Image `alt` is required when `src` is provided. Use empty string `alt=""` when adjacent text already identifies the person
- Status dot has `aria-label="Status: {status}"` — screen readers announce it

---

## Composition rules

### Avatar can be placed inside
- Card.Header — player profiles, story cards
- Contribution chip molecule (planned)
- Comment threads
- Navigation bars (current user)
- Data table rows
- Avatar group patterns

### Never do
- Use Avatar for non-person entities — use an icon instead
- Expect more than 2 initials — the component always derives first + last
- Put a suffix on `asChild` Avatar — internal content doesn't render when `asChild` is true

---

## Known limitations

- `AvatarGroup` molecule is planned but not yet built — the stacked group pattern requires manual CSS for now
- No built-in tooltip on hover showing the person's full name — add a `title` attribute or a Tooltip component (planned) when needed
- Square shape variant (for organizations) is not supported — circle only
