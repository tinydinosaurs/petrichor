import React from 'react';
import { Card } from '../../atoms/Card/Card';
import { Badge } from '../../atoms/Badge/Badge';
import { Avatar } from '../../atoms/Avatar/Avatar';
import { Text } from '../../atoms/Text/Text';
import { Button } from '../../atoms/Button/Button';
import styles from './StoryCard.module.css';

export type StoryStatus = 'draft' | 'in_progress' | 'completed' | 'abandoned' | 'moderated';

export type StoryCardMode = 'anonymous' | 'completed' | 'active';

export interface StoryContributor {
  name: string;
  src?: string;
}

export interface StoryCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Display mode — controls which elements are shown */
  mode: StoryCardMode;
  /** Story title */
  title: string;
  /** Story status — drives the status badge */
  status: StoryStatus;
  /** First paragraph of the story — shown in anonymous and completed modes */
  excerpt?: string;
  /** Cover image URL */
  coverSrc?: string;
  /** Cover image alt text */
  coverAlt?: string;
  /** Genre/topic tags */
  tags?: string[];
  /** Contributors — shown in completed and active modes */
  contributors?: StoryContributor[];
  /** Current number of segments */
  currentSegments?: number;
  /** Minimum segments required to complete */
  minSegments?: number;
  /** Maximum segments allowed */
  maxSegments?: number;
  /** When the story was completed */
  completedAt?: Date | string;
  /** Navigation href — the card CTA navigates here */
  href: string;
  /** Loading state */
  loading?: boolean;
}

const STATUS_BADGE: Record<
  StoryStatus,
  {
    variant: 'default' | 'info' | 'success' | 'warning' | 'error' | 'danger';
    label: string;
  }
> = {
  draft: { variant: 'default', label: 'Draft' },
  in_progress: { variant: 'info', label: 'In progress' },
  completed: { variant: 'success', label: 'Complete' },
  abandoned: { variant: 'warning', label: 'Abandoned' },
  moderated: { variant: 'danger', label: 'Moderated' },
};

const MAX_VISIBLE_AVATARS = 3;

const formatRelativeDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const days = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 30) return `${days} days ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
};

const ContributorAvatars = ({ contributors }: { contributors: StoryContributor[] }) => {
  const visible = contributors.slice(0, MAX_VISIBLE_AVATARS);
  const overflow = contributors.length - MAX_VISIBLE_AVATARS;

  return (
    <div
      className={styles.avatarGroup}
      role="group"
      aria-label={`${contributors.length} contributor${contributors.length === 1 ? '' : 's'}`}
    >
      {visible.map((contributor, i) => (
        <div key={i} className={styles.avatarWrap} style={{ zIndex: MAX_VISIBLE_AVATARS - i }}>
          <Avatar
            src={contributor.src}
            name={contributor.name}
            size="xs"
            aria-label={contributor.name}
          />
        </div>
      ))}
      {overflow > 0 && (
        <div className={styles.avatarOverflow} aria-label={`${overflow} more contributors`}>
          <Text variant="caption">+{overflow}</Text>
        </div>
      )}
    </div>
  );
};

export const StoryCard = React.forwardRef<HTMLElement, StoryCardProps>(
  (
    {
      mode,
      title,
      status,
      excerpt,
      coverSrc,
      coverAlt,
      tags = [],
      contributors = [],
      currentSegments,
      minSegments,
      maxSegments,
      completedAt,
      href,
      loading = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const badge = STATUS_BADGE[status];

    const ctaLabel = (() => {
      if (mode === 'anonymous' || mode === 'completed') return 'Read story';
      if (
        minSegments !== undefined &&
        currentSegments !== undefined &&
        currentSegments >= minSegments
      ) {
        return 'Complete story';
      }
      return 'Continue story';
    })();

    const segmentLabel = (() => {
      if (currentSegments === undefined) return null;
      if (maxSegments) return `${currentSegments} / ${maxSegments} segments`;
      return `${currentSegments} segment${currentSegments === 1 ? '' : 's'}`;
    })();

    return (
      <Card
        ref={ref}
        as="article"
        loading={loading}
        className={className}
        aria-label={`Story: ${title}`}
        {...rest}
      >
        {/* Cover image — anonymous and completed modes */}
        {(mode === 'anonymous' || mode === 'completed') && coverSrc && (
          <Card.Image src={coverSrc} alt={coverAlt ?? title} aspectRatio="16/9" />
        )}

        {/* Header — title + status badge */}
        <Card.Header>
          <div className={styles.header}>
            <Text variant="heading3" as="h2" className={styles.title}>
              {title}
            </Text>
            <Badge variant={badge.variant} size="sm">
              {badge.label}
            </Badge>
          </div>
        </Card.Header>

        {/* Body */}
        <Card.Body>
          {/* Excerpt — anonymous and completed modes only */}
          {(mode === 'anonymous' || mode === 'completed') && excerpt && (
            <Text variant="body-sm" className={styles.excerpt}>
              {excerpt}
            </Text>
          )}

          {/* Active mode — no excerpt, just a teaser */}
          {mode === 'active' && (
            <Text variant="body-sm" className={styles.teaser}>
              Pick up where the last writer left off — you'll see their final sentence when you
              join.
            </Text>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((tag) => (
                <Badge key={tag} variant="default" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </Card.Body>

        {/* Footer */}
        <Card.Footer className={styles.footer}>
          <div className={styles.footerMeta}>
            {/* Contributors */}
            {(mode === 'completed' || mode === 'active') && contributors.length > 0 && (
              <ContributorAvatars contributors={contributors} />
            )}

            {/* Metadata */}
            <div className={styles.meta}>
              {segmentLabel && <Text variant="caption">{segmentLabel}</Text>}
              {mode === 'completed' && completedAt && (
                <Text variant="caption">{formatRelativeDate(completedAt)}</Text>
              )}
            </div>
          </div>

          {/* CTA */}
          <Button asChild variant={mode === 'active' ? 'primary' : 'ghost'} size="sm">
            <a href={href}>{ctaLabel}</a>
          </Button>
        </Card.Footer>
      </Card>
    );
  },
);

StoryCard.displayName = 'StoryCard';
