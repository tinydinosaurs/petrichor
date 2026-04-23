# Petrichor Design System — AI Instructions

Read this file at the start of every session before writing or modifying any code.

---

## What is Petrichor?

Petrichor is a schema-first, MCP-ready design system. It serves two apps:

- **Raindrop** — a sports ranking app (blue, technical, data-dense)
- **Dusk Rose** — a collaborative surrealist writing app (rose, editorial, literary)

Both apps are built from the same component library (`@petrichor/react`) with visual personality driven entirely by token overrides. The same `<Button>` component looks and feels different in each brand — no component-level branching.

**Code is the source of truth. There is no Figma.**

---

## Repository structure

```
petrichor/
├── packages/
│   ├── tokens/          ← @petrichor/tokens — YAML → Style Dictionary → CSS/JS
│   ├── react/           ← @petrichor/react — components
│   │   └── src/
│   │       └── components/
│   │           ├── atoms/
│   │           ├── molecules/
│   │           └── organisms/
│   ├── docs/            ← @petrichor/docs — Storybook
│   └── mcp-server/      ← @petrichor/mcp-server (not yet implemented)
├── notes/               ← architectural decisions, process docs, reference
├── specs/               ← LLM-readable token and foundation specs
├── scripts/             ← token-audit.js and other tooling
├── CLAUDE.md            ← this file
└── pnpm-workspace.yaml
```

**Package manager:** pnpm. Always use `pnpm`, never `npm` or `yarn`.
**Monorepo:** Turborepo. Run tasks with `pnpm --filter @petrichor/[package] [command]`.

---

## The token system — most important section

### Never write hardcoded values

Every color, spacing value, radius, shadow, font, and transition in CSS must reference a `--ptr-*` token. No exceptions.

```css
/* WRONG — never do this */
.button {
  background: #2563eb;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
}

/* RIGHT — always do this */
.button {
  background: var(--ptr-color-brand-primary);
  padding: var(--ptr-spacing-2xs) var(--ptr-spacing-xs);
  border-radius: var(--ptr-radius-component-button);
  font-size: var(--ptr-typography-size-base);
}
```

**This is enforced by `scripts/token-audit.js`. Zero violations required before committing.**

### Token naming convention

All tokens follow the pattern `--ptr-{category}-{path}`:

```
--ptr-color-brand-primary
--ptr-color-bg-page
--ptr-color-text-secondary
--ptr-spacing-sm
--ptr-radius-lg
--ptr-typography-size-base
--ptr-typography-font-ui
--ptr-motion-transition-micro
--ptr-border-hairline
--ptr-shadow-sm
```

### Token layers

Tokens are built in three layers. Components reference Layer 2 only — never Layer 1.

```
Layer 1 — base.yaml         raw scale values
              ↓
Layer 2 — semantic.yaml     meaningful aliases → --ptr-color-bg-page, --ptr-color-brand-primary
              ↓
Layer 3 — components        reference Layer 2 tokens only
```

Brand overrides (`brands/raindrop.yaml`, `brands/dusk-rose.yaml`) override Layer 2 values. This is what makes brand swapping work — a button component never knows which brand it's in.

### Theming via data attributes

Theme is applied by setting attributes on `<html>`:

```html
<html data-brand="raindrop" data-color-scheme="dark">
<html data-brand="dusk-rose" data-color-scheme="light">
```

Never apply theme attributes to a wrapper div. They must be on the root element. The reason is portals — tooltips, modals, and dropdowns rendered via `ReactDOM.createPortal` attach to `<body>`, outside any interior wrapper. If the attribute is on a div, portaled elements lose access to the tokens entirely and render without brand styles.

### Default color scheme is per-brand

Each brand has its own default color scheme — do not assume dark is always the default.

| Brand | Default | Dark override |
|---|---|---|
| Raindrop | **light** | `data-color-scheme="dark"` |
| Dusk Rose | **dark** | `data-color-scheme="light"` |
| Medi-pal | **light** (planned) | `data-color-scheme="dark"` |

**How it works:** `raindrop.yaml` includes light mode token values directly in the `[data-brand="raindrop"]` selector. The Style Dictionary build also outputs a `[data-brand="raindrop"][data-color-scheme="dark"]` block that restores dark values when the user explicitly chooses dark. Dusk Rose has no light overrides in its brand file — it inherits the dark defaults from `semantic.yaml`.

The system-wide `light.css` still works as expected — `data-color-scheme="light"` and `prefers-color-scheme: light` continue to apply light values to any brand that hasn't set its own default.

### Token reference

Before writing a component, read `specs/tokens/token-reference.md` for the complete list of available tokens. Do not invent token names — pick from the closed set.

---

## Component rules

### Before writing any component

1. Read the component's `.ai.yaml` contract if it exists
2. Read `specs/tokens/token-reference.md` to know which tokens to use
3. Check `src/index.ts` for existing exports — never rebuild what exists

### Component file structure

Every component lives in its own folder with exactly six files:

```
ComponentName/
  ComponentName.tsx           ← component implementation
  ComponentName.module.css    ← styles — --ptr-* tokens only
  ComponentName.test.tsx      ← Vitest + Testing Library
  ComponentName.stories.tsx   ← Storybook stories
  ComponentName.docs.md       ← human documentation
  ComponentName.ai.yaml       ← AI contract
```

### Component location

```
atoms/      — primitive, single-purpose (Button, Input, Badge, Icon, Card)
molecules/  — composed from atoms (StatCard, FormField, SearchBar)
organisms/  — feature-level compositions (Leaderboard, StoryFeed)
```

Atoms never import from molecules or organisms. Molecules import from atoms. Organisms import from both.

### CSS module rules

- Only `--ptr-*` tokens — never raw values
- Class names use camelCase: `.iconStart`, `.hasError`, `.trendPositive`
- No global selectors
- Compound selectors for state: `.hasError .field { }` not `.field--error { }`

### Accessibility requirements — non-negotiable

- All interactive elements must be keyboard accessible
- Decorative icons: `aria-hidden="true"`
- Informative icons: `role="img"` + `aria-label`
- Form inputs: label associated via `htmlFor`/`id` — use `useId()`, never hardcode ids
- Error messages: `role="alert"` for immediate announcement
- Focus rings: never `outline: none` without a replacement
- Color alone never conveys meaning — always pair with text

### Testing conventions

**Unit tests verify behavior. Storybook verifies appearance.**

Unit tests cover: rendering, prop handling, ARIA attributes, event callbacks, state changes.
Storybook covers: visual correctness, color, spacing, brand/theme combinations.

Do not test CSS values in unit tests. Do not test visual appearance in unit tests.

### Pattern for polymorphic components

When a component needs to render as a different element, use `asChild` via `@radix-ui/react-slot`:

```tsx
const Comp = asChild ? Slot : 'button';
// Uppercase required — JSX treats lowercase as HTML tag
```

When asChild is true, pass children directly — never wrap with internal elements. Slot requires a single child. When asChild is false, render the full internal composition inside a fragment.

---

## Component inventory

### Current components

| Component | Category | Status | File                   |
| --------- | -------- | ------ | ---------------------- |
| Button    | atom     | draft  | `atoms/Button/`        |
| Input     | atom     | draft  | `atoms/Input/`         |
| Badge     | atom     | draft  | `atoms/Badge/`         |
| Icon      | atom     | draft  | `atoms/Icon/`          |
| Card      | atom     | draft  | `atoms/Card/`          |
| Avatar    | atom     | draft  | `atoms/Avatar/`        |
| Spinner   | atom     | draft  | `atoms/Spinner/`       |
| Text      | atom     | draft  | `atoms/Text/`          |
| Divider   | atom     | draft  | `atoms/Divider/`       |
| StatCard  | molecule | draft  | `molecules/StatCard/`  |
| StoryCard | molecule | draft  | `molecules/StoryCard/` |

### Public API

All exports are in `packages/react/src/index.ts`. Import from there within the package (relative path), from `@petrichor/react` externally.

---

## The two brands

### Raindrop

- **Primary color:** `oklch(46% 0.12 240)` — rain blue
- **Radius:** sharp — buttons/inputs use `radius-sm` (2px), cards use `radius-md` (4px)
- **Typography:** Inter, 1.25 (Major Third) scale
- **Icon weight:** regular
- **Tone:** technical, analytical, data-dense

### Dusk Rose

- **Primary color:** `oklch(44% 0.13 355)` — rose
- **Radius:** soft — buttons/inputs use `radius-md` (4px), cards use `radius-lg` (8px), badges use `radius-pill` (999px)
- **Typography:** Cabinet Grotesk (UI) + Fraunces (display), 1.333 (Perfect Fourth) scale
- **Icon weight:** light
- **Tone:** editorial, literary, expressive

Brand differences are expressed entirely through token overrides. Component code has zero brand-specific logic.

---

## Color system

All colors are OKLCH. Never write hex or rgb color values in component CSS.

### Semantic color roles

| Token                             | Usage                                              |
| --------------------------------- | -------------------------------------------------- |
| `--ptr-color-brand-primary`       | Primary brand color — buttons, links, focus rings  |
| `--ptr-color-brand-primary-tint`  | Subtle brand background — icon wraps, hover states |
| `--ptr-color-bg-page`             | Page background                                    |
| `--ptr-color-bg-surface`          | Card and panel surfaces                            |
| `--ptr-color-bg-elevated`         | Elevated surfaces, skeleton loading                |
| `--ptr-color-bg-input`            | Input field background                             |
| `--ptr-color-text-primary`        | Primary text                                       |
| `--ptr-color-text-secondary`      | Secondary/muted text                               |
| `--ptr-color-text-tertiary`       | Placeholder, disabled text                         |
| `--ptr-color-border-subtle`       | Subtle structural borders                          |
| `--ptr-color-border-default`      | Default input borders                              |
| `--ptr-color-border-strong`       | Hover/active borders                               |
| `--ptr-color-status-info-bg`      | Info tinted background                             |
| `--ptr-color-status-info-text`    | Info text and icons                                |
| `--ptr-color-status-success-bg`   | Success tinted background                          |
| `--ptr-color-status-success-text` | Success text and icons                             |
| `--ptr-color-status-warning-bg`   | Warning tinted background                          |
| `--ptr-color-status-warning-text` | Warning text and icons                             |
| `--ptr-color-status-error-bg`     | Error tinted background                            |
| `--ptr-color-status-error-text`   | Error text and icons                               |
| `--ptr-color-status-danger-bg`    | Danger tinted background — destructive actions     |
| `--ptr-color-status-danger-text`  | Danger text and icons                              |

### error vs danger

These are semantically distinct — do not conflate them:

- **error** — something went wrong (reactive). Form validation, network failure, system unavailable.
- **danger** — destructive consequence (proactive). Delete, revoke, irreversible action. User hasn't done anything wrong — they're about to.

---

## Spacing scale

| Token               | Value | Common use                                 |
| ------------------- | ----- | ------------------------------------------ |
| `--ptr-spacing-px`  | 1px   | Borders only                               |
| `--ptr-spacing-3xs` | 4px   | Icon-to-label gap                          |
| `--ptr-spacing-2xs` | 8px   | Button padding (vertical), badge padding   |
| `--ptr-spacing-xs`  | 12px  | Button padding (horizontal), input padding |
| `--ptr-spacing-sm`  | 16px  | Card padding, form field gap ✦             |
| `--ptr-spacing-md`  | 24px  | Section gap, card-to-card ✦                |
| `--ptr-spacing-lg`  | 32px  | Section padding                            |
| `--ptr-spacing-xl`  | 48px  | Page section gap                           |
| `--ptr-spacing-2xl` | 64px  | Page-level rhythm                          |
| `--ptr-spacing-3xl` | 96px  | Layout margins                             |

✦ Workhorses — use these when unsure.

---

## Typography tokens

| Token                               | Usage                                             |
| ----------------------------------- | ------------------------------------------------- |
| `--ptr-typography-font-ui`          | UI text — labels, buttons, inputs, body           |
| `--ptr-typography-font-display`     | Display text — headings, story titles (Dusk Rose) |
| `--ptr-typography-font-mono`        | Monospace — code, token values, character counts  |
| `--ptr-typography-size-sm`          | Small labels, helper text, badges                 |
| `--ptr-typography-size-base`        | Default body text                                 |
| `--ptr-typography-size-md`          | Slightly larger body                              |
| `--ptr-typography-size-lg`          | Section headings                                  |
| `--ptr-typography-size-xl`          | Page headings                                     |
| `--ptr-typography-size-2xl`         | Stat values, hero numbers                         |
| `--ptr-typography-weight-body`      | 400 — regular text                                |
| `--ptr-typography-weight-label`     | 500 — labels, buttons, headings                   |
| `--ptr-typography-line-height-ui`   | Tight — UI elements                               |
| `--ptr-typography-line-height-body` | Comfortable — reading                             |

---

## Motion tokens

| Token                 | Value                | Usage                    |
| --------------------- | -------------------- | ------------------------ |
| `--ptr-motion-micro`  | `all 80ms ease-out`  | Focus rings, hover color |
| `--ptr-motion-appear` | `all 200ms ease-out` | Dropdowns, tooltips      |
| `--ptr-motion-enter`  | `all 300ms ease-out` | Modals, toasts           |
| `--ptr-motion-reveal` | `all 500ms spring`   | Exquisite Corpse reveal  |

Use CSS transitions for all standard interactions. Framer Motion only for spring physics and stagger timing in Exquisite Corpse.

---

## Radius tokens

| Token               | Value | Raindrop default | Dusk Rose default |
| ------------------- | ----- | ---------------- | ----------------- |
| `--ptr-radius-sm`   | 2px   | buttons, inputs  | —                 |
| `--ptr-radius-md`   | 4px   | cards            | buttons, inputs   |
| `--ptr-radius-lg`   | 8px   | —                | cards             |
| `--ptr-radius-xl`   | 12px  | modals           | —                 |
| `--ptr-radius-2xl`  | 16px  | —                | modals            |
| `--ptr-radius-pill` | 999px | —                | badges            |

Brand-specific component radius tokens (e.g. `--ptr-radius-component-button`) exist and should be used in components — they resolve to the correct brand value automatically.

---

## Icon system

**Library:** Phosphor Icons (`@phosphor-icons/react`)
**Wrapper:** Always use the `<Icon>` component — never use Phosphor components directly.

```tsx
import { Trophy } from '@phosphor-icons/react'
import { Icon } from '@petrichor/react'

// Decorative (aria-hidden by default)
<Icon icon={Trophy} size="sm" />

// Informative (when icon is the only signal)
<Icon icon={Warning} size="sm" label="Warning" />

// Expressive — empty states, hero moments only
<Icon icon={CloudRain} size="xl" duotone />
```

Sizes: `xs`=12px, `sm`=16px (default), `md`=20px, `lg`=24px, `xl`=32px.
Pass the component class (`Trophy`), never an instance (`<Trophy />`).

---

## What not to do

- Never write `padding: 16px` — use `var(--ptr-spacing-sm)`
- Never write `color: #xxx` or `color: oklch(...)` — use a semantic token
- Never import from `@petrichor/tokens` in component CSS — token CSS is globally loaded
- Never use `outline: none` without a replacement focus style
- Never use color alone to convey meaning
- Never use `aria-hidden` on interactive elements
- Never nest a Card inside a Card
- Never put two unrelated topics in one Card
- Never use `iconOnly` on a Button without `aria-label`
- Never use `placeholder` as a substitute for a label
- Never build a component that already exists — check the inventory above
- Never use `margin` on a component's root element — let consumers handle spacing

---

## Before committing

1. Run `pnpm --filter @petrichor/react test` — all tests must pass
2. Run `node scripts/token-audit.js` — zero violations required
3. Run `pnpm --filter @petrichor/tokens build` if you changed any YAML token files

---

## Where to find things

| What you need           | Where to look                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------- |
| All available tokens    | `specs/tokens/token-reference.md`                                                                 |
| Component contract      | `packages/react/src/components/[atoms\|molecules\|organisms]/ComponentName/ComponentName.ai.yaml` |
| Component human docs    | `...ComponentName/ComponentName.docs.md`                                                          |
| Architectural decisions | `notes/001-foundation.md`                                                                         |
| Deferred items          | `notes/petrichor-future-items.md`                                                                 |
| Foundation design brief | `petrichor-design-brief.md`                                                                       |
| Full context document   | `petrichor-context.md`                                                                            |
