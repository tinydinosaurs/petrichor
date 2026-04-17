import React from 'react';
import { Card } from '../../atoms/Card/Card';
import styles from './StatCard.module.css';

export interface StatCardTrend {
  direction: 'up' | 'down' | 'neutral';
  value: string;
  label?: string;
  positive?: boolean;
}

export interface StatCardProps extends React.HTMLAttributes<HTMLElement> {
  label: string;
  value: string | number;
  trend?: StatCardTrend;
  icon?: React.ReactNode;
  iconLabel?: string;
  loading?: boolean;
}

const TrendArrow = ({ direction }: { direction: StatCardTrend['direction'] }) => {
  if (direction === 'up') {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path
          d="M6 10V2M6 2L2 6M6 2l4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (direction === 'down') {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path
          d="M6 2v8M6 10L2 6m4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2 6h8M7 3l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const getTrendClass = (direction: StatCardTrend['direction'], positive = true) => {
  if (direction === 'neutral') return styles.trendNeutral;
  if (direction === 'up') return positive ? styles.trendPositive : styles.trendNegative;
  return positive ? styles.trendNegative : styles.trendPositive;
};

const getTrendAriaLabel = (trend: StatCardTrend): string => {
  const directionWord =
    trend.direction === 'up' ? 'Up' : trend.direction === 'down' ? 'Down' : 'No change';
  return [directionWord, trend.value, trend.label].filter(Boolean).join(' ');
};

export const StatCard = React.forwardRef<HTMLElement, StatCardProps>(
  ({ label, value, trend, icon, iconLabel, loading = false, className, ...rest }, ref) => {
    return (
      <Card ref={ref} as="article" className={className} {...rest}>
        <Card.Body>
          <div className={styles.header}>
            <span className={styles.label}>{label}</span>
            {icon && !loading && (
              <span
                className={styles.iconWrap}
                aria-hidden={!iconLabel ? 'true' : undefined}
                aria-label={iconLabel}
                role={iconLabel ? 'img' : undefined}
              >
                {icon}
              </span>
            )}
          </div>

          <div className={styles.valueWrap}>
            {loading ? (
              <span className={styles.skeleton} aria-hidden="true" />
            ) : (
              <span className={styles.value}>{value}</span>
            )}
          </div>

          {trend && !loading && (
            <div
              className={[
                styles.trend,
                getTrendClass(trend.direction, trend.positive ?? true),
              ].join(' ')}
              role="group"
              aria-label={getTrendAriaLabel(trend)}
            >
              <span aria-hidden="true" className={styles.trendArrow}>
                <TrendArrow direction={trend.direction} />
              </span>
              <span aria-hidden="true" className={styles.trendValue}>
                {trend.value}
              </span>
              {trend.label && (
                <span aria-hidden="true" className={styles.trendLabel}>
                  {trend.label}
                </span>
              )}
            </div>
          )}
        </Card.Body>
      </Card>
    );
  },
);

StatCard.displayName = 'StatCard';
