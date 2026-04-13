import type { Meta, StoryObj } from '@storybook/react'
import { StoryCard } from './StoryCard'

const cats = [
  { name: 'Neo', src: 'https://placecats.com/neo/150/150' },
  { name: 'Bella', src: 'https://placecats.com/bella/150/150' },
  { name: 'Molly', src: 'https://placecats.com/molly/150/150' },
  { name: 'Luna', src: 'https://placecats.com/luna/150/150' },
  { name: 'Millie' },
]

const meta = {
  title: 'Molecules/StoryCard',
  component: StoryCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A story card for the Exquisite Corpse story feed. Three modes: anonymous (logged-out readers), completed (logged-in, finished stories), and active (logged-in, stories in progress).',
      },
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['anonymous', 'completed', 'active'],
    },
    status: {
      control: 'select',
      options: ['draft', 'in_progress', 'completed', 'abandoned', 'moderated'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '340px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StoryCard>

export default meta
type Story = StoryObj<typeof meta>


/* ============================================================
   ANONYMOUS MODE
   ============================================================ */

export const Anonymous: Story = {
  name: 'Anonymous — logged out reader',
  args: {
    mode: 'anonymous',
    title: "The Clockmaker's Last Dream",
    status: 'completed',
    excerpt: 'The door opened onto a street that hadn\'t existed yesterday. She stepped through anyway, because the rain smelled of copper and every clockmaker knows that time runs backwards on Tuesdays.',
    coverSrc: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=640&q=80',
    coverAlt: 'Stormy landscape',
    tags: ['surrealist', 'mystery', 'time travel'],
    href: '/stories/1',
  },
  parameters: {
    docs: {
      description: {
        story: 'What logged-out readers see — image, title, truncated excerpt, genre tags, and a read CTA. No contributor metadata.',
      },
    },
  },
}

export const AnonymousNoImage: Story = {
  name: 'Anonymous — no cover image',
  args: {
    mode: 'anonymous',
    title: "The Last Train to Nowhere",
    status: 'completed',
    excerpt: 'The conductor punched my ticket and smiled with too many teeth. I counted them twice, just to be sure, and then sat down next to the window where the countryside was moving in the wrong direction.',
    tags: ['horror', 'absurdist'],
    href: '/stories/2',
  },
}


/* ============================================================
   COMPLETED MODE
   ============================================================ */

export const Completed: Story = {
  name: 'Completed — logged in',
  args: {
    mode: 'completed',
    title: "The Clockmaker's Last Dream",
    status: 'completed',
    excerpt: 'The door opened onto a street that hadn\'t existed yesterday. She stepped through anyway, because the rain smelled of copper.',
    coverSrc: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=640&q=80',
    coverAlt: 'Stormy landscape',
    tags: ['surrealist', 'mystery'],
    contributors: cats.slice(0, 4),
    currentSegments: 6,
    maxSegments: 10,
    completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    href: '/stories/1',
  },
  parameters: {
    docs: {
      description: {
        story: 'Full metadata for logged-in users — contributors, segment count, completion date.',
      },
    },
  },
}

export const CompletedManyContributors: Story = {
  name: 'Completed — overflow avatars',
  args: {
    mode: 'completed',
    title: "The Parliament of Clocks",
    status: 'completed',
    excerpt: 'Five clocks agreed to settle the matter once and for all. The grandfather clock called the meeting to order.',
    tags: ['absurdist', 'comedy'],
    contributors: cats,
    currentSegments: 8,
    maxSegments: 8,
    completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    href: '/stories/3',
  },
  parameters: {
    docs: {
      description: {
        story: 'With 5 contributors, 3 avatars show with a +2 overflow count.',
      },
    },
  },
}


/* ============================================================
   ACTIVE MODE
   ============================================================ */

export const ActiveContinue: Story = {
  name: 'Active — continue story',
  args: {
    mode: 'active',
    title: "The Parliament of Clocks",
    status: 'in_progress',
    tags: ['absurdist', 'comedy'],
    contributors: cats.slice(0, 2),
    currentSegments: 3,
    minSegments: 5,
    maxSegments: 8,
    href: '/stories/3/contribute',
  },
  parameters: {
    docs: {
      description: {
        story: 'In-progress story below minimum segments — CTA is "Continue story". No excerpt shown — that\'s part of the game.',
      },
    },
  },
}

export const ActiveComplete: Story = {
  name: 'Active — complete story',
  args: {
    mode: 'active',
    title: "The Parliament of Clocks",
    status: 'in_progress',
    tags: ['absurdist', 'comedy'],
    contributors: cats.slice(0, 4),
    currentSegments: 5,
    minSegments: 5,
    maxSegments: 8,
    href: '/stories/3/contribute',
  },
  parameters: {
    docs: {
      description: {
        story: 'In-progress story at minimum segments — CTA becomes "Complete story".',
      },
    },
  },
}


/* ============================================================
   ALL STATUS VALUES
   ============================================================ */

export const AllStatuses: Story = {
  name: 'All status badges',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '340px' }}>
      {(['draft', 'in_progress', 'completed', 'abandoned', 'moderated'] as const).map((status) => (
        <StoryCard
          key={status}
          mode="completed"
          title="The Clockmaker's Last Dream"
          status={status}
          tags={['surrealist']}
          href="/stories/1"
        />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All five status values and their badge treatments.',
      },
    },
  },
}


/* ============================================================
   STORY FEED — how cards look in context
   ============================================================ */

export const StoryFeed: Story = {
  name: 'Story feed — mixed modes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '340px' }}>
      <StoryCard
        mode="active"
        title="The Parliament of Clocks"
        status="in_progress"
        tags={['absurdist', 'comedy']}
        contributors={cats.slice(0, 3)}
        currentSegments={3}
        minSegments={5}
        maxSegments={8}
        href="/stories/3/contribute"
      />
      <StoryCard
        mode="completed"
        title="The Clockmaker's Last Dream"
        status="completed"
        excerpt="The door opened onto a street that hadn't existed yesterday."
        tags={['surrealist', 'mystery']}
        contributors={cats.slice(0, 4)}
        currentSegments={6}
        maxSegments={10}
        completedAt={new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)}
        href="/stories/1"
      />
      <StoryCard
        mode="completed"
        title="The Last Train to Nowhere"
        status="completed"
        excerpt="The conductor punched my ticket and smiled with too many teeth."
        tags={['horror', 'absurdist']}
        contributors={cats.slice(0, 2)}
        currentSegments={4}
        completedAt={new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)}
        href="/stories/2"
      />
    </div>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Mixed feed showing active and completed stories as a logged-in user would see them.',
      },
    },
  },
}


/* ============================================================
   LOADING
   ============================================================ */

export const Loading: Story = {
  args: {
    mode: 'completed',
    title: 'Loading...',
    status: 'completed',
    href: '/stories/1',
    loading: true,
  },
}
