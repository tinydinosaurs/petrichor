import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  describe('rendering', () => {
    it('renders a text input by default', () => {
      render(<Input label="Email" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with a visible label', () => {
      render(<Input label="Email address" />);
      expect(screen.getByText('Email address')).toBeInTheDocument();
    });

    it('associates label with input via htmlFor/id', () => {
      render(<Input label="Email" />);
      const input = screen.getByRole('textbox');
      const label = screen.getByText('Email');
      expect(label).toHaveAttribute('for', input.id);
    });

    it('renders helper text', () => {
      render(<Input label="Email" helperText="We'll never share your email" />);
      expect(screen.getByText("We'll never share your email")).toBeInTheDocument();
    });

    it('renders required indicator', () => {
      render(<Input label="Email" required />);
      expect(screen.getByRole('textbox')).toHaveAttribute('required');
    });

    it('label is visually hidden but still accessible', () => {
      render(<Input label="Search" hideLabel />);
      // Label exists in DOM for screen readers
      expect(screen.getByText('Search')).toBeInTheDocument();
      // Input is still labelled correctly
      expect(screen.getByLabelText('Search')).toBeInTheDocument();
    });

    it('forwards ref correctly', () => {
      const ref = vi.fn();
      render(<Input label="Email" ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });

    it('spreads additional props onto the input', () => {
      render(<Input label="Email" data-testid="my-input" />);
      expect(screen.getByTestId('my-input')).toBeInTheDocument();
    });
  });

  describe('types', () => {
    it.each(['text', 'email', 'tel', 'url'] as const)('renders type=%s correctly', (type) => {
      render(<Input label="Field" type={type} />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders type=search correctly', () => {
      render(<Input label="Field" type="search" />);
      expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });

    it('renders type=number correctly', () => {
      render(<Input label="Field" type="number" />);
      expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    });

    it('renders password input with visibility toggle', () => {
      render(<Input label="Password" type="password" />);
      expect(screen.getByLabelText('Show password')).toBeInTheDocument();
    });

    it('toggles password visibility when toggle is clicked', async () => {
      const user = userEvent.setup();
      render(<Input label="Password" type="password" />);
      const input = screen.getByLabelText('Password');
      const toggle = screen.getByLabelText('Show password');

      expect(input).toHaveAttribute('type', 'password');
      await user.click(toggle);
      expect(input).toHaveAttribute('type', 'text');
      expect(screen.getByLabelText('Hide password')).toBeInTheDocument();
      await user.click(screen.getByLabelText('Hide password'));
      expect(input).toHaveAttribute('type', 'password');
    });
  });

  describe('sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('renders size=%s without error', (size) => {
      render(<Input label="Field" size={size} />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });
  });

  describe('error state', () => {
    it('shows error message', () => {
      render(<Input label="Email" errorMessage="Invalid email address" />);
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    });

    it('sets aria-invalid when error message is present', () => {
      render(<Input label="Email" errorMessage="Required" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not set aria-invalid without error message', () => {
      render(<Input label="Email" />);
      expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');
    });

    it('links error message via aria-describedby', () => {
      render(<Input label="Email" errorMessage="Invalid email" />);
      const input = screen.getByRole('textbox');
      const errorId = input.getAttribute('aria-describedby');
      expect(errorId).toBeTruthy();
      expect(document.getElementById(errorId!)).toHaveTextContent('Invalid email');
    });

    it('replaces helper text with error message when both provided', () => {
      render(<Input label="Email" helperText="Enter your email" errorMessage="Invalid email" />);
      expect(screen.queryByText('Enter your email')).not.toBeInTheDocument();
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });
  });

  describe('disabled state', () => {
    it('is disabled when disabled prop is true', () => {
      render(<Input label="Email" disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });
  });

  describe('character count', () => {
    it('shows character count when maxLength is set', () => {
      render(<Input label="Bio" maxLength={160} />);
      expect(screen.getByText('0/160')).toBeInTheDocument();
    });

    it('updates character count as user types', async () => {
      const user = userEvent.setup();
      render(<Input label="Bio" maxLength={160} />);
      await user.type(screen.getByRole('textbox'), 'Hello');
      expect(screen.getByText('5/160')).toBeInTheDocument();
    });

    it('shows count without limit when showCount is true', () => {
      render(<Input label="Bio" showCount />);
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  describe('prefix and suffix', () => {
    it('renders prefix', () => {
      render(<Input label="Amount" prefix={<span>$</span>} />);
      expect(screen.getByText('$')).toBeInTheDocument();
    });

    it('renders suffix', () => {
      render(<Input label="Weight" suffix={<span>kg</span>} />);
      expect(screen.getByText('kg')).toBeInTheDocument();
    });
  });

  describe('controlled and uncontrolled', () => {
    it('works as uncontrolled with defaultValue', () => {
      render(<Input label="Name" defaultValue="John" />);
      expect(screen.getByRole('textbox')).toHaveValue('John');
    });

    it('works as controlled', () => {
      const handleChange = vi.fn();
      render(<Input label="Name" value="John" onChange={handleChange} />);
      expect(screen.getByRole('textbox')).toHaveValue('John');
    });

    it('fires onChange when typing', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Input label="Name" onChange={handleChange} />);
      await user.type(screen.getByRole('textbox'), 'a');
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('links helper text via aria-describedby', () => {
      render(<Input label="Email" helperText="We'll never share your email" />);
      const input = screen.getByRole('textbox');
      const describedById = input.getAttribute('aria-describedby');
      expect(describedById).toBeTruthy();
      expect(document.getElementById(describedById!)).toHaveTextContent(
        "We'll never share your email",
      );
    });

    it('sets aria-required when required', () => {
      render(<Input label="Email" required />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
    });

    it('is keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<Input label="Email" />);
      await user.tab();
      expect(screen.getByRole('textbox')).toHaveFocus();
    });
  });
});
