# StatCard

A metric display card for dashboards. Shows a single key value with optional trend indicator and icon. Built on the Card atom.

**Status:** `draft`

---

## When to use

- Dashboard summary metrics — points, win rate, rank, matches played
- Any single key performance indicator that needs trend context
- Player profile stat summaries
- Quick at-a-glance numeric data

## When not to use

- Two metrics at once — use two StatCards side by side
- Non-numeric content — use a regular Card
- Detailed tabular data — use a data table
- Sparkline or chart data — use a chart component (planned)

---

## Props

| Prop        | Type               | Default  | Description                                                 |
| ----------- | ------------------ | -------- | ----------------------------------------------------------- |
| `label`     | `string`           | required | Metric name. Keep short — 1–3 words.                        |
| `value`     | `string \| number` | required | The metric value. Format before passing.                    |
| `trend`     | `StatCardTrend`    | —        | Optional trend indicator                                    |
| `icon`      | `ReactNode`        | —        | Optional metric icon — decorative by default                |
| `iconLabel` | `string`           | —        | Makes icon informative — sets `aria-label` and `role="img"` |
| `loading`   | `boolean`          | `false`  | Shows skeleton, keeps label visible                         |

### StatCardTrend

| Prop        | Type                          | Default  | Description                                          |
| ----------- | ----------------------------- | -------- | ---------------------------------------------------- |
| `direction` | `'up' \| 'down' \| 'neutral'` | required | Direction of change                                  |
| `value`     | `string`                      | required | Formatted delta — `"+124"`, `"−3%"`, `"No change"`   |
| `label`     | `string`                      | —        | Period context — `"vs last month"`, `"this season"`  |
| `positive`  | `boolean`                     | `true`   | Whether up is good. Set `false` for inverse metrics. |

---

## Usage

### Basic

```tsx
<StatCard label="Season points" value="2,840" />
```

### With trend

```tsx
<StatCard
  label="Season points"
  value="2,840"
  trend={{ direction: 'up', value: '+124', label: 'vs last month' }}
/>
```

### With icon

```tsx
import { Trophy } from '@phosphor-icons/react';
import { StatCard, Icon } from '@petrichor/react';

<StatCard
  label="Season points"
  value="2,840"
  trend={{ direction: 'up', value: '+124', label: 'vs last month' }}
  icon={<Icon icon={Trophy} size="sm" />}
/>;
```

### Inverse metric — up is bad

```tsx
<StatCard
  label="Errors this month"
  value="3"
  trend={{
    direction: 'up',
    value: '+2',
    label: 'vs last month',
    positive: false,
  }}
/>
```

Without `positive: false`, an increase in errors renders green (success). Always set `positive: false` for metrics where an increase is bad — errors, losses, timeouts, penalties.

### Loading state

```tsx
<StatCard label="Season points" value="" loading />
```

The label stays visible during loading to prevent layout shift and give the user context about what's loading.

### Dashboard grid

```tsx
<div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
  }}
>
  <StatCard
    label="Season points"
    value="2,840"
    trend={{ direction: 'up', value: '+124', label: 'vs last month' }}
    icon={<Icon icon={Trophy} size="sm" />}
  />
  <StatCard
    label="Win rate"
    value="81%"
    trend={{ direction: 'down', value: '−3%', label: 'vs last month' }}
    icon={<Icon icon={Check} size="sm" />}
  />
  <StatCard
    label="Current rank"
    value="#1"
    trend={{ direction: 'neutral', value: 'No change' }}
    icon={<Icon icon={ChartBar} size="sm" />}
  />
  <StatCard
    label="Matches played"
    value="22"
    trend={{ direction: 'up', value: '+4', label: 'this season' }}
    icon={<Icon icon={Clock} size="sm" />}
  />
</div>
```

---

## Formatting values

Format values before passing — StatCard renders them as-is.

| Metric type   | Example                                                          |
| ------------- | ---------------------------------------------------------------- |
| Large numbers | `"2,840"` not `2840`                                             |
| Percentages   | `"81%"`                                                          |
| Rankings      | `"#1"`                                                           |
| Currency      | `"$1,240"`                                                       |
| Deltas        | `"+124"` or `"−3%"` — include sign, use minus `−` not hyphen `-` |

---

## Accessibility

- Renders as `<article>` — a self-contained piece of content navigable by screen reader
- Trend indicator auto-generates an `aria-label` from direction + value + label. Screen reader announces `"Up +124 vs last month"` rather than reading individual fragments
- Trend arrow SVG and individual trend spans are `aria-hidden` — the wrapper `aria-label` carries the meaning
- Icon is decorative by default (`aria-hidden`). Provide `iconLabel` when the icon conveys meaning not expressed in the label
- Loading skeleton is `aria-hidden`. Label remains visible so screen readers can identify the loading region

### Trend accessibility example

```tsx
// Screen reader announces: "Up +124 vs last month"
<StatCard
  label="Season points"
  value="2,840"
  trend={{ direction: 'up', value: '+124', label: 'vs last month' }}
/>
```

---

## Composition rules

### StatCard can be placed inside

- Dashboard layout grids
- Player profile organisms
- Any surface that needs metric display

### One metric per StatCard

```tsx
// Wrong — two values in one card
<StatCard label="Points / Rank" value="2,840 / #1" />

// Right — separate cards
<StatCard label="Season points" value="2,840" />
<StatCard label="Current rank" value="#1" />
```

### StatCard is display-only

StatCard has no interactive behavior. If clicking a stat card should navigate somewhere, wrap it in a link:

```tsx
<a href="/stats/points" style={{ textDecoration: 'none' }}>
  <StatCard label="Season points" value="2,840" />
</a>
```

---

## Architecture note

StatCard uses Card as its surface — background, border, border-radius, and padding all come from the Card atom. StatCard manages its own loading state rather than delegating to Card, so the label remains visible while the value loads. This prevents layout shift and gives screen reader users context about what's loading.

---

## Known limitations

- No sparkline support yet — chart/trend line variant is planned for a future version
- Value formatting is the consumer's responsibility — StatCard renders the value string as-is
