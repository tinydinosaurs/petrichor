import { create } from '@storybook/theming';

// =============================================================================
// Petrichor Storybook Manager Themes
// =============================================================================
// Storybook's theming API requires static hex values — CSS custom properties and
// oklch() are not supported. Each value below is annotated with its source token.
//
// OKLCH → hex conversions were computed from the token CSS files:
//   packages/tokens/dist/css/base.css          (dark defaults)
//   packages/tokens/dist/css/light.css          (light overrides)
//   packages/tokens/dist/css/brand.raindrop.css
//   packages/tokens/dist/css/brand.dusk-rose.css
// =============================================================================

type Brand = 'raindrop' | 'dusk-rose';
type ColorScheme = 'dark' | 'light';

// -- Shared surface / text colors (brand-independent) -------------------------

const dark = {
	appBg: '#07090d', // --ptr-color-bg-page        oklch(14% 0.01 258)
	appContentBg: '#0f1216', // --ptr-color-bg-surface     oklch(18% 0.01 258)
	appBorderColor: '#15181d', // --ptr-color-border-subtle  oklch(21% 0.01 258)
	textColor: '#e0e5eb', // --ptr-color-text-primary   oklch(92% 0.01 258)
	textMutedColor: '#b0b8c4', // --ptr-color-text-secondary oklch(78% 0.02 258)
	barBg: '#0f1216', // --ptr-color-bg-surface     oklch(18% 0.01 258)
	inputBg: '#0f1216', // --ptr-color-bg-input       oklch(18% 0.01 258)
	inputBorder: '#23272b', // --ptr-color-border-default oklch(27% 0.01 258)
	inputTextColor: '#e0e5eb', // --ptr-color-text-primary   oklch(92% 0.01 258)
	barTextColor: '#b0b8c4', // --ptr-color-text-secondary oklch(78% 0.02 258)
	buttonBg: '#23272b', // --ptr-color-bg-elevated    oklch(27% 0.01 258)
	buttonBorder: '#23272b', // --ptr-color-border-default oklch(27% 0.01 258)
	booleanBg: '#23272b', // --ptr-color-bg-elevated    oklch(27% 0.01 258)
	booleanSelectedBg: '#15181d', // --ptr-color-border-subtle  oklch(21% 0.01 258)
	appPreviewBg: '#07090d', // --ptr-color-bg-page        oklch(14% 0.01 258)
} as const;

const light = {
	appBg: '#fcf8f1', // --ptr-color-bg-page        oklch(98% 0.01 80)
	appContentBg: '#f5f1ea', // --ptr-color-bg-surface     oklch(96% 0.01 80)
	appBorderColor: '#ded6c9', // --ptr-color-border-subtle  oklch(88% 0.02 80)
	textColor: '#201a10', // --ptr-color-text-primary   oklch(22% 0.02 80)
	textMutedColor: '#484137', // --ptr-color-text-secondary oklch(38% 0.02 80)
	barBg: '#f5f1ea', // --ptr-color-bg-surface     oklch(96% 0.01 80)
	inputBg: '#f5f1ea', // --ptr-color-bg-input       oklch(96% 0.01 80)
	inputBorder: '#c5bdb0', // --ptr-color-border-default oklch(80% 0.02 80)
	inputTextColor: '#201a10', // --ptr-color-text-primary   oklch(22% 0.02 80)
	barTextColor: '#484137', // --ptr-color-text-secondary oklch(38% 0.02 80)
	buttonBg: '#efe7d9', // --ptr-color-bg-elevated    oklch(93% 0.02 80)
	buttonBorder: '#c5bdb0', // --ptr-color-border-default oklch(80% 0.02 80)
	booleanBg: '#efe7d9', // --ptr-color-bg-elevated    oklch(93% 0.02 80)
	booleanSelectedBg: '#ded6c9', // --ptr-color-border-subtle  oklch(88% 0.02 80)
	appPreviewBg: '#fcf8f1', // --ptr-color-bg-page        oklch(98% 0.01 80)
} as const;

const schemes = { dark, light } as const;

// -- Brand-specific accent colors + fonts -------------------------------------

const brands = {
	raindrop: {
		colorPrimary: '#005e93', // --ptr-color-brand-primary      oklch(46% 0.12 240)
		colorSecondary: '#4897cb', // --ptr-color-brand-primary-mid  oklch(65% 0.11 240)
		barSelectedColor: '#4897cb', // --ptr-color-brand-primary-mid  oklch(65% 0.11 240)
		barHoverColor: '#88bfe6', // --ptr-color-brand-primary-light oklch(78% 0.08 240)
		fontBase: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
		fontCode: '"JetBrains Mono", "Fira Code", monospace',
		appBorderRadius: 4, // --ptr-radius-component-card (raindrop)
	},
	'dusk-rose': {
		colorPrimary: '#862c56', // --ptr-color-brand-primary      oklch(44% 0.13 355)
		colorSecondary: '#b0597e', // --ptr-color-brand-primary-mid  oklch(58% 0.12 355)
		barSelectedColor: '#b0597e', // --ptr-color-brand-primary-mid  oklch(58% 0.12 355)
		barHoverColor: '#dd90ae', // --ptr-color-brand-primary-light oklch(74% 0.10 355)
		fontBase: '"Epilogue", -apple-system, sans-serif',
		fontCode: '"JetBrains Mono", "Fira Code", monospace',
		appBorderRadius: 8, // --ptr-radius-component-card (dusk-rose)
	},
} as const;

// -- Theme factory ------------------------------------------------------------

export function getTheme(brand: Brand, colorScheme: ColorScheme) {
	const scheme = schemes[colorScheme];
	const accent = brands[brand];

	return create({
		base: colorScheme,
		brandTitle: 'Petrichor',
		brandUrl: '/',

		// Colors
		colorPrimary: accent.colorPrimary,
		colorSecondary: accent.colorSecondary,

		// UI chrome
		appBg: scheme.appBg,
		appContentBg: scheme.appContentBg,
		appBorderColor: scheme.appBorderColor,
		appBorderRadius: accent.appBorderRadius,
		appPreviewBg: scheme.appPreviewBg,

		// Typography
		fontBase: accent.fontBase,
		fontCode: accent.fontCode,
		textColor: scheme.textColor,
		textMutedColor: scheme.textMutedColor,

		// Toolbar
		barBg: scheme.barBg,
		barTextColor: scheme.barTextColor,
		barSelectedColor: accent.barSelectedColor,
		barHoverColor: accent.barHoverColor,

		// Form inputs
		inputBg: scheme.inputBg,
		inputBorder: scheme.inputBorder,
		inputTextColor: scheme.inputTextColor,
		inputBorderRadius: brand === 'raindrop' ? 2 : 4,

		// Misc controls
		buttonBg: scheme.buttonBg,
		buttonBorder: scheme.buttonBorder,
		booleanBg: scheme.booleanBg,
		booleanSelectedBg: scheme.booleanSelectedBg,
	});
}

// Pre-built default for static config (before globals are available)
export const defaultTheme = getTheme('raindrop', 'dark');
