import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
	describe('rendering', () => {
		it('renders a button element by default', () => {
			render(<Button>Click me</Button>);
			expect(
				screen.getByRole('button', { name: 'Click me' }),
			).toBeInTheDocument();
		});

		it('renders children correctly', () => {
			render(<Button>Save changes</Button>);
			expect(screen.getByText('Save changes')).toBeInTheDocument();
		});

		it('defaults to type="button"', () => {
			render(<Button>Click me</Button>);
			expect(screen.getByRole('button')).toHaveAttribute(
				'type',
				'button',
			);
		});

		it('accepts a custom type', () => {
			render(<Button type="submit">Submit</Button>);
			expect(screen.getByRole('button')).toHaveAttribute(
				'type',
				'submit',
			);
		});

		it('forwards ref correctly', () => {
			const ref = vi.fn();
			render(<Button ref={ref}>Click me</Button>);
			expect(ref).toHaveBeenCalled();
		});

		it('spreads additional props onto the button element', () => {
			render(<Button data-testid="my-button">Click me</Button>);
			expect(screen.getByTestId('my-button')).toBeInTheDocument();
		});

		it('merges custom className', () => {
			render(<Button className="custom-class">Click me</Button>);
			expect(screen.getByRole('button')).toHaveClass('custom-class');
		});
	});

	describe('variants', () => {
		it.each([
			'primary',
			'secondary',
			'ghost',
			'danger',
			'ghost-danger',
		] as const)('renders %s variant without error', (variant) => {
			render(<Button variant={variant}>Button</Button>);
			expect(screen.getByRole('button')).toBeInTheDocument();
		});
	});

	describe('sizes', () => {
		it.each(['sm', 'md', 'lg'] as const)(
			'renders %s size without error',
			(size) => {
				render(<Button size={size}>Button</Button>);
				expect(screen.getByRole('button')).toBeInTheDocument();
			},
		);
	});

	describe('disabled state', () => {
		it('is disabled when disabled prop is true', () => {
			render(<Button disabled>Click me</Button>);
			expect(screen.getByRole('button')).toBeDisabled();
		});

		it('does not fire onClick when disabled', () => {
			const onClick = vi.fn();
			render(
				<Button disabled onClick={onClick}>
					Click me
				</Button>,
			);
			fireEvent.click(screen.getByRole('button'));
			expect(onClick).not.toHaveBeenCalled();
		});

		it('sets aria-disabled when aria-disabled prop is provided', () => {
			render(<Button aria-disabled="true">Click me</Button>);
			expect(screen.getByRole('button')).toHaveAttribute(
				'aria-disabled',
				'true',
			);
		});
	});

	describe('loading state', () => {
		it('shows a spinner when loading', () => {
			render(<Button loading>Save</Button>);
			expect(document.querySelector('svg')).toBeInTheDocument();
		});

		it('sets aria-busy when loading', () => {
			render(<Button loading>Save</Button>);
			expect(screen.getByRole('button')).toHaveAttribute(
				'aria-busy',
				'true',
			);
		});

		it('is disabled when loading', () => {
			render(<Button loading>Save</Button>);
			expect(screen.getByRole('button')).toBeDisabled();
		});

		it('does not fire onClick when loading', () => {
			const onClick = vi.fn();
			render(
				<Button loading onClick={onClick}>
					Save
				</Button>,
			);
			fireEvent.click(screen.getByRole('button'));
			expect(onClick).not.toHaveBeenCalled();
		});
	});

	describe('icons', () => {
		it('renders iconStart', () => {
			render(
				<Button iconStart={<span data-testid="icon-start" />}>
					Save
				</Button>,
			);
			expect(screen.getByTestId('icon-start')).toBeInTheDocument();
		});

		it('renders iconEnd', () => {
			render(
				<Button iconEnd={<span data-testid="icon-end" />}>Next</Button>,
			);
			expect(screen.getByTestId('icon-end')).toBeInTheDocument();
		});

		it('hides iconStart when loading', () => {
			render(
				<Button loading iconStart={<span data-testid="icon-start" />}>
					Save
				</Button>,
			);
			expect(screen.queryByTestId('icon-start')).not.toBeInTheDocument();
		});

		it('requires aria-label when iconOnly', () => {
			render(
				<Button iconOnly aria-label="Close dialog">
					<span data-testid="icon" />
				</Button>,
			);
			expect(
				screen.getByRole('button', { name: 'Close dialog' }),
			).toBeInTheDocument();
		});
	});

	describe('interactions', () => {
		it('fires onClick when clicked', async () => {
			const user = userEvent.setup();
			const onClick = vi.fn();
			render(<Button onClick={onClick}>Click me</Button>);
			await user.click(screen.getByRole('button'));
			expect(onClick).toHaveBeenCalledTimes(1);
		});

		it('is keyboard accessible — activates on Enter', async () => {
			const user = userEvent.setup();
			const onClick = vi.fn();
			render(<Button onClick={onClick}>Click me</Button>);
			screen.getByRole('button').focus();
			await user.keyboard('{Enter}');
			expect(onClick).toHaveBeenCalledTimes(1);
		});

		it('is keyboard accessible — activates on Space', async () => {
			const user = userEvent.setup();
			const onClick = vi.fn();
			render(<Button onClick={onClick}>Click me</Button>);
			screen.getByRole('button').focus();
			await user.keyboard(' ');
			expect(onClick).toHaveBeenCalledTimes(1);
		});
	});

	describe('asChild', () => {
		it('renders as a child element when asChild is true', () => {
			render(
				<Button asChild>
					<a href="/home">Go home</a>
				</Button>,
			);
			expect(
				screen.getByRole('link', { name: 'Go home' }),
			).toBeInTheDocument();
			expect(screen.queryByRole('button')).not.toBeInTheDocument();
		});
	});
});
