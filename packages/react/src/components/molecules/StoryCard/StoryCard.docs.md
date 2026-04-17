# StoryCard

A story card for the Exquisite Corpse story feed. Three display modes adapt the card to different viewer contexts — anonymous readers, logged-in readers viewing completed stories, and logged-in contributors viewing active stories.

**Status:** `draft`

---

## When to use

- Displaying stories in the Exquisite Corpse story feed
- Any surface that needs to represent a story as a browsable item

## When not to use

- Full story display — use the story detail page
- Story editing or contribution interface — that's a separate screen

---

## The three modes

Mode is the most important prop — it controls which elements render.

### `anonymous` — logged-out readers

Shows enough to entice without spoiling. Cover image, title, truncated excerpt, genre tags, and a "Read story" CTA. No contributor metadata — that's a logged-in experience.

```tsx
<StoryCard
  mode="anonymous"
  title="The Clockmaker's Last Dream"
  status="completed"
  excerpt="The door opened onto a street that hadn't existed yesterday..."
  coverSrc="/covers/story-1.jpg"
  coverAlt="Stormy landscape"
  tags={['surrealist', 'mystery']}
  href="/stories/1"
/>
```

### `completed` — logged-in reader, finished story

Full metadata. Cover image, title, excerpt, tags, contributor avatars, segment count, completion date, and "Read story" CTA.

```tsx
<StoryCard
  mode="completed"
  title="The Clockmaker's Last Dream"
  status="completed"
  excerpt="The door opened onto a street that hadn't existed yesterday..."
  tags={['surrealist', 'mystery']}
  contributors={[
    { name: 'Neo', src: '/avatars/neo.jpg' },
    { name: 'Bella', src: '/avatars/bella.jpg' },
  ]}
  currentSegments={6}
  maxSegments={10}
  completedAt={story.completed_at}
  href="/stories/1"
/>
```

### `active` — logged-in contributor, in-progress story

No excerpt — seeing the story content before contributing breaks the Exquisite Corpse game mechanic. Shows title, tags, contributors so far, segment progress, and a CTA that adapts based on how far along the story is.

```tsx
<StoryCard
  mode="active"
  title="The Parliament of Clocks"
  status="in_progress"
  tags={['absurdist', 'comedy']}
  contributors={[{ name: 'Neo' }, { name: 'Bella' }]}
  currentSegments={3}
  minSegments={5}
  maxSegments={8}
  href="/stories/3/contribute"
/>
```

---

## Props

| Prop              | Type                                     | Default  | Description                                                     |
| ----------------- | ---------------------------------------- | -------- | --------------------------------------------------------------- |
| `mode`            | `'anonymous' \| 'completed' \| 'active'` | required | Controls which elements render                                  |
| `title`           | `string`                                 | required | Story title                                                     |
| `status`          | `StoryStatus`                            | required | Drives the status badge                                         |
| `href`            | `string`                                 | required | Navigation URL for the CTA                                      |
| `excerpt`         | `string`                                 | —        | First paragraph — shown in anonymous and completed modes only   |
| `coverSrc`        | `string`                                 | —        | Cover image URL — shown in anonymous and completed modes only   |
| `coverAlt`        | `string`                                 | —        | Cover image alt text — defaults to title                        |
| `tags`            | `string[]`                               | `[]`     | Genre/topic tags — shown in all modes                           |
| `contributors`    | `StoryContributor[]`                     | `[]`     | Contributor list — shown in completed and active modes          |
| `currentSegments` | `number`                                 | —        | Current segment count                                           |
| `minSegments`     | `number`                                 | —        | Minimum segments to complete — drives CTA label in active mode  |
| `maxSegments`     | `number`                                 | —        | Maximum segments — shows "X / Y segments" when set              |
| `completedAt`     | `Date \| string`                         | —        | Completion timestamp — shown as relative date in completed mode |
| `loading`         | `boolean`                                | `false`  | Skeleton loading state                                          |

### StoryContributor

```ts
interface StoryContributor {
  name: string;
  src?: string; // avatar image URL
}
```

---

## Status badges

| Status        | Badge   | Label       |
| ------------- | ------- | ----------- |
| `draft`       | default | Draft       |
| `in_progress` | info    | In progress |
| `completed`   | success | Complete    |
| `abandoned`   | warning | Abandoned   |
| `moderated`   | danger  | Moderated   |

Maps directly to the `StoryStatus` enum in the Story entity.

---

## CTA logic

The CTA label is derived automatically:

- `anonymous` or `completed` mode → **"Read story"**
- `active` mode, `currentSegments < minSegments` → **"Continue story"**
- `active` mode, `currentSegments >= minSegments` → **"Complete story"**

The CTA always navigates to `href` — action decisions happen on the story detail page, not the card.

---

## Contributors

Up to 3 contributor avatars are shown. If there are more, an overflow count appears (`+2`, `+5`, etc.). The avatar group has an accessible label announcing the total contributor count.

```tsx
// 5 contributors → shows 3 avatars + "+2"
contributors={[
  { name: 'Neo', src: '...' },
  { name: 'Bella', src: '...' },
  { name: 'Molly', src: '...' },
  { name: 'Luna', src: '...' },
  { name: 'Millie' },  // no src — shows initials
]}
```

---

## Tags

Tags are rendered as `default` Badge components. Use a consistent set of genre tags across stories so they work as useful filters.

Suggested tag set: `surrealist`, `horror`, `comedy`, `mystery`, `romance`, `sci-fi`, `absurdist`, `thriller`, `fantasy`, `historical`

```tsx
tags={['surrealist', 'mystery', 'time travel']}
```

---

## The active mode teaser

In `active` mode, instead of an excerpt, a fixed teaser line appears:

> "Pick up where the last writer left off — you'll see their final sentence when you join."

This is intentional. The Exquisite Corpse mechanic means contributors should only see the last sentence of the previous segment when they start writing — not the full story. The card hints at this without spoiling anything.

---

## Mode × element matrix

| Element         | anonymous | completed | active |
| --------------- | --------- | --------- | ------ |
| Cover image     | optional  | optional  | never  |
| Title           | ✓         | ✓         | ✓      |
| Status badge    | ✓         | ✓         | ✓      |
| Excerpt         | optional  | optional  | never  |
| Teaser text     | never     | never     | ✓      |
| Tags            | ✓         | ✓         | ✓      |
| Contributors    | never     | ✓         | ✓      |
| Segment count   | never     | ✓         | ✓      |
| Completion date | never     | ✓         | never  |
| CTA             | ✓         | ✓         | ✓      |

---

## Accessibility

- Renders as `<article>` with `aria-label="Story: {title}"`
- CTA renders as an `<a>` element via Button `asChild` — correct link semantics
- Contributor avatar group has `aria-label="{N} contributors"`
- Overflow count has `aria-label="{N} more contributors"`
- Status badge text conveys meaning — color is reinforcement, not the only signal
- Tags are labeled by their text content

---

## Composition rules

### StoryCard can be placed inside

- Story feed organism (planned)
- CardGrid molecule (planned)
- Any layout surface

### Never do

- Pass `excerpt` in `active` mode — it won't render, but it signals a misunderstanding of the game mechanic
- Omit `href` — the CTA must navigate somewhere
- Use StoryCard for non-story content — use Card directly instead

---

## Known limitations

- Tags are not interactive — no click-to-filter behavior yet. That belongs in the Story feed organism with proper filter state management.
- The contributor avatar group has no tooltip on hover showing full names — add a Tooltip component (planned) when that detail matters.
- `isPublic` from the Story entity is not reflected in the card — reserved for when group/private story mechanics are built.
