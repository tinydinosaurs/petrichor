# Icon

A normalized wrapper around Phosphor Icons. Handles size, weight, color inheritance, and accessibility automatically.

**Status:** `draft`

---

## When to use

- Any icon in the UI — navigation, actions, status indicators, decorative moments
- Empty state illustrations (duotone at xl size)
- Metric category identifiers in StatCard
- Button and Input adornments

## When not to use

- Custom SVG illustrations — use an `<img>` or inline SVG directly
- Brand logos — use an `<img>` with appropriate alt text
- Animated icons — use a dedicated animation library

---

## Props

| Prop      | Type                                                              | Default        | Description                                  |
| --------- | ----------------------------------------------------------------- | -------------- | -------------------------------------------- |
| `icon`    | `typeof PhosphorIcon`                                             | required       | The Phosphor icon component class            |
| `size`    | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                            | `'sm'`         | Icon size                                    |
| `weight`  | `'thin' \| 'light' \| 'regular' \| 'bold' \| 'fill' \| 'duotone'` | `'regular'`    | Icon weight                                  |
| `duotone` | `boolean`                                                         | `false`        | Explicit duotone weight — overrides `weight` |
| `label`   | `string`                                                          | —              | Accessible label — omit for decorative icons |
| `color`   | `string`                                                          | `currentColor` | Icon color — usually leave unset             |

---

## Sizes

| Size | Pixels | Use for                                    |
| ---- | ------ | ------------------------------------------ |
| `xs` | 12px   | Tight spaces, inline with small text       |
| `sm` | 16px   | Default UI icons — buttons, inputs, badges |
| `md` | 20px   | Slightly larger UI contexts                |
| `lg` | 24px   | Navigation, section headers                |
| `xl` | 32px   | Empty states, hero moments                 |

---

## Usage

### Basic decorative icon

```tsx
import { Trophy } from '@phosphor-icons/react';
import { Icon } from '@petrichor/react';

<Icon icon={Trophy} />;
```

No label needed — the surrounding text provides context. Screen reader ignores it.

### Informative icon

```tsx
import { Warning } from '@phosphor-icons/react';

<Icon icon={Warning} label="Warning" />;
```

Provide a label when the icon is the only conveyor of meaning — no nearby text describes it.

### In a Button

```tsx
import { Trophy } from '@phosphor-icons/react';

<Button iconStart={<Icon icon={Trophy} size="sm" />}>View rankings</Button>;
```

### In an Input

```tsx
import { MagnifyingGlass } from '@phosphor-icons/react';

<Input label="Search" type="search" hideLabel prefix={<Icon icon={MagnifyingGlass} size="sm" />} />;
```

### In a StatCard

```tsx
import { Trophy } from '@phosphor-icons/react';

<StatCard label="Season points" value="2,840" icon={<Icon icon={Trophy} size="sm" />} />;
```

### Duotone — expressive moments

```tsx
import { CloudRain } from '@phosphor-icons/react';

// Empty state
<Card>
  <Card.Empty icon={<Icon icon={CloudRain} size="xl" duotone />} message="No stories yet" />
</Card>;
```

Duotone is reserved for empty states, hero sections, and onboarding moments. Not for standard UI icons.

---

## Weights

Phosphor provides six weights. Each expresses a different register:

| Weight    | Character         | Use for                                     |
| --------- | ----------------- | ------------------------------------------- |
| `thin`    | Very delicate     | Illustration-adjacent, large sizes only     |
| `light`   | Soft, editorial   | Dusk Rose brand default                     |
| `regular` | Standard          | Raindrop brand default, most UI contexts    |
| `bold`    | Strong, assertive | High-emphasis moments                       |
| `fill`    | Solid             | Selected states, active indicators          |
| `duotone` | Two-tone depth    | Empty states, hero sections — use sparingly |

---

## Color

Icon color inherits from the parent element via `currentColor`. Control color on the parent, not the icon:

```tsx
// Right — color on parent
<span style={{ color: 'var(--ptr-color-text-secondary)' }}>
  <Icon icon={Trophy} />
</span>

// Works but bypasses the token system
<Icon icon={Trophy} color="oklch(65% 0.11 240)" />
```

This means icon color responds automatically to theme changes, brand token overrides, and any CSS that sets `color` on a parent element.

---

## Decorative vs informative

This is the most important decision when using Icon.

**Decorative** — nearby text already conveys the meaning. Omit `label`. Screen reader ignores the icon entirely.

```tsx
// The button label "Save" conveys the meaning — disk icon is decorative
<Button iconStart={<Icon icon={FloppyDisk} />}>Save</Button>

// The stat label "Season points" conveys the meaning — trophy is decorative
<StatCard label="Season points" value="2,840" icon={<Icon icon={Trophy} />} />
```

**Informative** — icon is the only conveyor of meaning. Provide `label`. Screen reader announces `"[label], image"`.

```tsx
// Warning icon standing alone with no nearby text
<Icon icon={Warning} label="Warning" />

// Status indicator with no text label
<Icon icon={CheckCircle} label="Verified account" />
```

When in doubt — if there's text nearby that describes what the icon means, the icon is decorative. If the icon is the only signal, it's informative.

---

## Accessibility

- Decorative (no label): `aria-hidden="true"` set automatically
- Informative (with label): `role="img"` + `aria-label` set automatically
- Never set `aria-hidden` manually — pass or omit `label` and let Icon handle it
- Color alone is never sufficient — informative icons must have a label

---

## Composition rules

### Icon can be placed inside

- Button (`iconStart`, `iconEnd`, `iconOnly` patterns)
- Input (`prefix`, `suffix` props)
- Badge (`iconStart` prop)
- StatCard (`icon` prop)
- Card.Empty (`icon` prop)
- Any element where an icon adds meaning or visual identity

### Pass the component class, not an instance

```tsx
// Wrong — passing an instance
<Icon icon={<Trophy />} />

// Right — passing the component class
<Icon icon={Trophy} />
```

Icon needs the component class to pass `size` and `weight` props through to Phosphor.

---

## Finding icons

Browse the full Phosphor library at [phosphoricons.com](https://phosphoricons.com). The site shows all 9000+ icons across all six weights — use it to find the right icon before importing.

Import by name from `@phosphor-icons/react`:

```tsx
import { Trophy, CloudRain, MagnifyingGlass, Warning } from '@phosphor-icons/react';
```

Imports are tree-shaken — only the icons you import end up in your bundle.

---

## Known limitations

- Brand weight defaults (Raindrop = regular, Dusk Rose = light) are not yet driven by tokens. Currently `regular` is the default for both brands. Token-driven brand weight is planned.
- No built-in animation support — for animated icons, wrap in a motion component.
