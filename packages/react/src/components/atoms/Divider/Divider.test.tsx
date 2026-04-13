import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Divider } from './Divider';

describe('Divider', () => {
	describe('rendering', () => {
		it('renders an hr element', () => {
			const { container } = render(<Divider />);
			expect(container.querySelector('hr')).toBeInTheDocument();
		});

		it('is aria-hidden by default', () => {
			const { container } = render(<Divider />);
			expect(container.querySelector('hr')).toHaveAttribute(
				'aria-hidden',
				'true',
			);
		});

		it('forwards ref', () => {
			const ref = { current: null };
			render(<Divider ref={ref} />);
			expect(ref.current).not.toBeNull();
		});

		it('merges custom className', () => {
			const { container } = render(<Divider className="custom" />);
			expect(container.querySelector('hr')).toHaveClass('custom');
		});

		it('spreads additional props', () => {
			const { container } = render(<Divider data-testid="divider" />);
			expect(
				container.querySelector('[data-testid="divider"]'),
			).toBeInTheDocument();
		});
	});

	describe('orientation', () => {
		it('renders horizontal by default', () => {
			const { container } = render(<Divider />);
			expect(container.querySelector('hr')).toHaveClass('horizontal');
		});

		it('renders vertical orientation', () => {
			const { container } = render(<Divider orientation="vertical" />);
			expect(container.querySelector('hr')).toHaveClass('vertical');
		});
	});

	describe('spacing', () => {
		it('has no spacing by default', () => {
			const { container } = render(<Divider />);
			const hr = container.querySelector('hr');
			expect(hr).not.toHaveClass('spacing-sm');
			expect(hr).not.toHaveClass('spacing-md');
			expect(hr).not.toHaveClass('spacing-lg');
		});

		it.each(['sm', 'md', 'lg'] as const)(
			'applies spacing-%s class',
			(spacing) => {
				const { container } = render(<Divider spacing={spacing} />);
				expect(container.querySelector('hr')).toHaveClass(
					`spacing-${spacing}`,
				);
			},
		);
	});
});
