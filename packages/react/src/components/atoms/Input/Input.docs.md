# Input

A composite text input component — label, field, helper text, error message, and character count in one.

**Status:** `draft`

---

## When to use

- Any time a user needs to type short-form text
- Form fields — name, email, password, search, phone, URL
- Inline data entry — quantities, amounts, units
- Character-limited writing surfaces (with `maxLength`)

## When not to use

- Long-form text — use `Textarea` instead
- Selecting from a predefined list — use `Select`
- Boolean choices — use `Checkbox` or `Toggle`
- Date/time input — use a dedicated date picker (planned)

---

## Props

| Prop           | Type                                                                        | Default  | Description                                                                                                              |
| -------------- | --------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| `label`        | `string`                                                                    | required | Always required. Visible label and screen reader label.                                                                  |
| `type`         | `'text' \| 'email' \| 'password' \| 'number' \| 'search' \| 'tel' \| 'url'` | `'text'` | HTML input type                                                                                                          |
| `size`         | `'sm' \| 'md' \| 'lg'`                                                      | `'md'`   | Height and padding                                                                                                       |
| `helperText`   | `string`                                                                    | —        | Assistive text below field. Replaced by errorMessage when both present.                                                  |
| `errorMessage` | `string`                                                                    | —        | Error text below field. Presence drives the error state — no separate state prop needed.                                 |
| `placeholder`  | `string`                                                                    | —        | Hint text inside field. Never replaces the label.                                                                        |
| `required`     | `boolean`                                                                   | `false`  | Shows `*` indicator. Sets HTML `required` and `aria-required`.                                                           |
| `disabled`     | `boolean`                                                                   | `false`  | Disables the input.                                                                                                      |
| `hideLabel`    | `boolean`                                                                   | `false`  | Visually hides the label while keeping it in the DOM for screen readers.                                                 |
| `prefix`       | `ReactNode`                                                                 | —        | Content inside the field on the left. Icons, currency symbols, units.                                                    |
| `suffix`       | `ReactNode`                                                                 | —        | Content inside the field on the right. Icons, units, actions. Not shown when `type="password"` (toggle takes that slot). |
| `maxLength`    | `number`                                                                    | —        | Enforces character limit. Shows `count/max` counter below field.                                                         |
| `showCount`    | `boolean`                                                                   | `false`  | Shows character count without enforcing a limit.                                                                         |

All native `<input>` attributes are supported and forwarded. The `id` is generated internally via `useId()` — do not pass it manually.

---

## Usage

### Basic

```tsx
<Input label="Email address" type="email" placeholder="you@example.com" />
```

### With helper text

```tsx
<Input label="Email address" type="email" helperText="We'll never share your email." />
```

### Required field

```tsx
<Input label="Full name" required placeholder="Jane Smith" />
```

### Error state

```tsx
<Input
  label="Email address"
  type="email"
  value={email}
  errorMessage={emailError}
  onChange={(e) => setEmail(e.target.value)}
/>
```

### Password

```tsx
<Input label="Password" type="password" helperText="Must be at least 8 characters." />
```

Password inputs include a built-in visibility toggle. No additional configuration needed.

### Search with hidden label

```tsx
<Input
  label="Search players"
  type="search"
  hideLabel
  prefix={<SearchIcon />}
  placeholder="Search..."
/>
```

### With prefix/suffix

```tsx
<Input label="Amount" type="number" prefix="$" suffix="USD" />
```

### Character count

```tsx
<Input label="Bio" maxLength={160} helperText="Shown on your public profile." />
```

### Character count without limit (Exquisite Corpse editor)

```tsx
<Input
  label="Your segment"
  showCount
  maxLength={500}
  placeholder="Continue the story..."
  helperText="Pick up from the last sentence above."
/>
```

---

## Accessibility

- `id` is generated internally via `useId()` — label association is automatic
- `aria-describedby` links helper text and/or error message to the input
- `aria-invalid="true"` set automatically when `errorMessage` is present
- `aria-required="true"` set when `required` is true
- Error message uses `role="alert"` — announced immediately by screen readers
- Character count uses `aria-live="polite"` — announced after a pause
- `hideLabel` uses `.srOnly` CSS — label remains in the accessibility tree
- Password toggle button has explicit `aria-label` and `aria-controls`
- Prefix and suffix are `aria-hidden="true"` — decorative only

### Keyboard

| Key                | Action                             |
| ------------------ | ---------------------------------- |
| `Tab`              | Move focus to input                |
| `Shift+Tab`        | Move focus backwards               |
| `Tab` (from input) | Move to password toggle if present |
| `Enter` / `Space`  | Activate password toggle           |

---

## Composition rules

### Input can be placed inside

- `form` elements
- `FormField` molecule (for additional layout control)
- Any layout surface

### Input should never be used without a label

- `hideLabel` exists for cases where context provides the label visually (search bars)
- Never omit the label prop — it is required

### Never do

- Pass an `id` prop — it's generated internally
- Use placeholder text as a substitute for a label
- Show `errorMessage` without a meaningful, actionable message
- Put a suffix on a `type="password"` input — the toggle occupies that slot

---

## Known limitations

- `type="number"` shows browser-native spinner arrows. Suppressing them requires additional CSS that is left to the consumer.
- Autofill styles from browsers may override border and background colors in some browsers. This is a browser behavior and cannot be fully controlled via CSS.
