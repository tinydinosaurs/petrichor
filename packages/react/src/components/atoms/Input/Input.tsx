import React from 'react';
import styles from './Input.module.css';

export type InputType =
	| 'text'
	| 'email'
	| 'password'
	| 'number'
	| 'search'
	| 'tel'
	| 'url';
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	'size' | 'prefix'
> {
	label: string;
	size?: InputSize;
	helperText?: string;
	errorMessage?: string;
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
	hideLabel?: boolean;
	showCount?: boolean;
	type?: InputType;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			label,
			size = 'md',
			helperText,
			errorMessage,
			prefix,
			suffix,
			hideLabel = false,
			showCount = false,
			type = 'text',
			required,
			disabled,
			maxLength,
			value,
			defaultValue,
			className,
			onChange,
			...rest
		},
		ref,
	) => {
		const id = React.useId();
		const helperId = `${id}-helper`;
		const errorId = `${id}-error`;
		const countId = `${id}-count`;

		const [internalValue, setInternalValue] = React.useState(
			defaultValue?.toString() ?? '',
		);
		const [showPassword, setShowPassword] = React.useState(false);

		const isControlled = value !== undefined;
		const currentValue = isControlled
			? (value?.toString() ?? '')
			: internalValue;
		const charCount = currentValue.length;

		const isPassword = type === 'password';
		const resolvedType = isPassword && showPassword ? 'text' : type;

		const hasError = Boolean(errorMessage);
		const showCharCount = showCount || Boolean(maxLength);

		const describedByIds = [
			helperText && !hasError ? helperId : null,
			hasError ? errorId : null,
			showCharCount ? countId : null,
		]
			.filter(Boolean)
			.join(' ');

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			if (!isControlled) {
				setInternalValue(e.target.value);
			}
			onChange?.(e);
		};

		const wrapperClasses = [
			styles.wrapper,
			styles[size],
			hasError ? styles.hasError : '',
			disabled ? styles.disabled : '',
			className ?? '',
		]
			.filter(Boolean)
			.join(' ');

		const fieldClasses = [
			styles.field,
			prefix ? styles.hasPrefix : '',
			suffix || isPassword ? styles.hasSuffix : '',
		]
			.filter(Boolean)
			.join(' ');

		return (
			<div className={wrapperClasses}>
				<label
					htmlFor={id}
					className={hideLabel ? styles.srOnly : styles.label}
				>
					{label}
					{required && (
						<span className={styles.required} aria-hidden="true">
							{' '}
							*
						</span>
					)}
				</label>

				<div className={styles.inputRow}>
					{prefix && (
						<span className={styles.prefix} aria-hidden="true">
							{prefix}
						</span>
					)}

					<input
						ref={ref}
						id={id}
						type={resolvedType}
						value={isControlled ? value : internalValue}
						defaultValue={isControlled ? undefined : defaultValue}
						onChange={handleChange}
						required={required}
						disabled={disabled}
						maxLength={maxLength}
						aria-invalid={hasError ? true : undefined}
						aria-describedby={describedByIds || undefined}
						aria-required={required ? true : undefined}
						className={fieldClasses}
						{...rest}
					/>

					{isPassword && (
						<button
							type="button"
							className={styles.passwordToggle}
							onClick={() => setShowPassword((prev) => !prev)}
							aria-label={
								showPassword ? 'Hide password' : 'Show password'
							}
							aria-controls={id}
							tabIndex={0}
						>
							{showPassword ? <EyeOffIcon /> : <EyeIcon />}
						</button>
					)}

					{!isPassword && suffix && (
						<span className={styles.suffix} aria-hidden="true">
							{suffix}
						</span>
					)}
				</div>

				<div className={styles.footer}>
					{hasError ? (
						<span
							id={errorId}
							className={styles.errorMessage}
							role="alert"
						>
							{errorMessage}
						</span>
					) : helperText ? (
						<span id={helperId} className={styles.helperText}>
							{helperText}
						</span>
					) : (
						<span />
					)}

					{showCharCount && (
						<span
							id={countId}
							className={styles.charCount}
							aria-live="polite"
							aria-atomic="true"
						>
							{maxLength
								? `${charCount}/${maxLength}`
								: charCount}
						</span>
					)}
				</div>
			</div>
		);
	},
);

Input.displayName = 'Input';

const EyeIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		aria-hidden="true"
	>
		<path
			d="M8 3C4.5 3 1.5 5.5 1 8c.5 2.5 3.5 5 7 5s6.5-2.5 7-5c-.5-2.5-3.5-5-7-5z"
			stroke="currentColor"
			strokeWidth="1.25"
			strokeLinecap="round"
		/>
		<circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.25" />
	</svg>
);

const EyeOffIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		aria-hidden="true"
	>
		<path
			d="M2 2l12 12M6.5 6.6A2 2 0 0010.4 9.5M4.2 4.3C2.8 5.2 1.8 6.5 1.5 8c.5 2.5 3.5 5 6.5 5 1.3 0 2.5-.4 3.5-1M7 3.1C7.3 3 7.7 3 8 3c3.5 0 6.5 2.5 7 5-.2 1-.7 2-1.5 2.8"
			stroke="currentColor"
			strokeWidth="1.25"
			strokeLinecap="round"
		/>
	</svg>
);
