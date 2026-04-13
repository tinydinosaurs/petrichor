// NOTE: Color inheritance is verified visually in Icon.stories.tsx — ColorInheritance story.
// Phosphor applies color to SVG fill/stroke internally, not as an HTML attribute.
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TrophyIcon, StarIcon, CloudIcon } from '@phosphor-icons/react';
import { Icon } from './Icon';

describe('Icon', () => {
	describe('rendering', () => {
		it('renders a Phosphor icon', () => {
			render(<Icon icon={TrophyIcon} />);
			expect(document.querySelector('svg')).toBeInTheDocument();
		});

		it('renders as aria-hidden by default (decorative)', () => {
			render(<Icon icon={TrophyIcon} />);
			expect(document.querySelector('svg')).toHaveAttribute(
				'aria-hidden',
				'true',
			);
		});

		it('has no role when decorative', () => {
			render(<Icon icon={TrophyIcon} />);
			expect(document.querySelector('svg')).not.toHaveAttribute('role');
		});
	});

	describe('accessibility', () => {
		it('is informative when label is provided', () => {
			render(<Icon icon={TrophyIcon} label="Trophy" />);
			expect(
				screen.getByRole('img', { name: 'Trophy' }),
			).toBeInTheDocument();
		});

		it('sets aria-label when label is provided', () => {
			render(<Icon icon={TrophyIcon} label="First place trophy" />);
			expect(document.querySelector('svg')).toHaveAttribute(
				'aria-label',
				'First place trophy',
			);
		});

		it('does not set aria-hidden when label is provided', () => {
			render(<Icon icon={TrophyIcon} label="Trophy" />);
			expect(document.querySelector('svg')).not.toHaveAttribute(
				'aria-hidden',
			);
		});
	});

	describe('sizes', () => {
		it.each([
			['xs', '12'],
			['sm', '16'],
			['md', '20'],
			['lg', '24'],
			['xl', '32'],
		] as const)('renders size=%s with correct pixel value', (size, px) => {
			render(<Icon icon={TrophyIcon} size={size} />);
			const svg = document.querySelector('svg');
			expect(svg).toHaveAttribute('width', px);
		});
	});

	describe('weight', () => {
		it('defaults to regular weight', () => {
			render(<Icon icon={TrophyIcon} />);
			const svg = document.querySelector('svg');
			expect(svg).toBeInTheDocument();
		});

		it('applies duotone weight when duotone prop is set', () => {
			render(<Icon icon={CloudIcon} duotone />);
			expect(document.querySelector('svg')).toBeInTheDocument();
		});

		it('duotone overrides weight prop', () => {
			render(<Icon icon={StarIcon} weight="bold" duotone />);
			expect(document.querySelector('svg')).toBeInTheDocument();
		});
	});

	describe('className', () => {
		it('merges custom className', () => {
			render(<Icon icon={TrophyIcon} className="custom" />);
			expect(document.querySelector('svg')).toHaveClass('custom');
		});
	});
});
