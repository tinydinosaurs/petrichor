#!/usr/bin/env node

/**
 * Petrichor Token Audit Script
 *
 * Scans CSS module files for hardcoded values that should use --ptr-* tokens.
 * Run before committing. Zero errors required.
 *
 * Usage:
 *   node scripts/token-audit.js
 *   node scripts/token-audit.js --warn-only   (exit 0 even with errors)
 *   node scripts/token-audit.js --verbose      (show passing files too)
 *
 * Exit codes:
 *   0 — no errors (warnings are ok)
 *   1 — one or more errors found
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const SCAN_DIR = join(ROOT, 'packages/react/src');

const args = process.argv.slice(2);
const WARN_ONLY = args.includes('--warn-only');
const VERBOSE = args.includes('--verbose');

// ============================================================
// VIOLATION RULES
// ============================================================

const ERRORS = [
	{
		id: 'hex-color',
		pattern: /(?<![a-zA-Z0-9_-])#([0-9a-fA-F]{3,8})(?![a-zA-Z0-9_-])/,
		message: (match) => `Hardcoded hex color: ${match}`,
		suggestion: 'Use a --ptr-color-* token instead',
	},
	{
		id: 'oklch-color',
		pattern: /oklch\s*\(/,
		message: (match) => `Hardcoded oklch color: ${match.trim()}`,
		suggestion: 'Use a --ptr-color-* token instead',
	},
	{
		id: 'rgb-color',
		pattern: /rgba?\s*\(/,
		message: (match) => `Hardcoded rgb/rgba color: ${match.trim()}`,
		suggestion: 'Use a --ptr-color-* token instead',
	},
	{
		id: 'hsl-color',
		pattern: /hsla?\s*\(/,
		message: (match) => `Hardcoded hsl/hsla color: ${match.trim()}`,
		suggestion: 'Use a --ptr-color-* token instead',
	},
	{
		id: 'raw-padding',
		pattern:
			/(?:^|\s)padding(?:-(?:top|right|bottom|left|inline|block)(?:-(?:start|end))?)?\s*:\s*(?!0(?:px)?[\s;,]|var\()[^;{}\n]+(?<!\s)(?:px|rem|em)(?=[\s;,])/,
		message: (match) => `Hardcoded padding value: ${match.trim()}`,
		suggestion:
			'Use a --ptr-spacing-* token: var(--ptr-spacing-sm) = 16px, var(--ptr-spacing-md) = 24px',
	},
	{
		id: 'raw-margin',
		pattern:
			/(?:^|\s)margin(?:-(?:top|right|bottom|left|inline|block)(?:-(?:start|end))?)?\s*:\s*(?!0(?:px)?[\s;,]|var\()[^;{}\n]+(?<!\s)(?:px|rem|em)(?=[\s;,])/,
		message: (match) => `Hardcoded margin value: ${match.trim()}`,
		suggestion:
			'Use a --ptr-spacing-* token. Note: avoid margin on component root elements.',
	},
	{
		id: 'raw-gap',
		pattern:
			/(?:^|\s)gap\s*:\s*(?!0(?:px)?[\s;,]|var\()[^;{}\n]+(?<!\s)(?:px|rem|em)(?=[\s;,])/,
		message: (match) => `Hardcoded gap value: ${match.trim()}`,
		suggestion:
			'Use a --ptr-spacing-* token: var(--ptr-spacing-3xs) = 4px, var(--ptr-spacing-2xs) = 8px',
	},
	{
		id: 'raw-font-size',
		pattern: /font-size\s*:\s*(?!var\()\d+(?:px|rem|em)/,
		message: (match) => `Hardcoded font-size: ${match.trim()}`,
		suggestion:
			'Use a --ptr-typography-size-* token: var(--ptr-typography-size-sm) = 13px, var(--ptr-typography-size-base) = 16px',
	},
	{
		id: 'raw-font-weight',
		pattern: /font-weight\s*:\s*(?!var\()(?:normal|bold|\d{3})/,
		message: (match) => `Hardcoded font-weight: ${match.trim()}`,
		suggestion:
			'Use a --ptr-typography-weight-* token: var(--ptr-typography-weight-body) = 400, var(--ptr-typography-weight-label) = 500',
	},
	{
		id: 'raw-border-radius',
		pattern:
			/border-radius\s*:\s*(?!var\(|0(?:px)?[\s;,])[^;{}\n]*(?:px|rem|em|%)/,
		message: (match) => `Hardcoded border-radius: ${match.trim()}`,
		suggestion:
			'Use --ptr-radius-component-* for components, or --ptr-radius-* for general use',
	},
	{
		id: 'raw-font-family',
		pattern:
			/font-family\s*:\s*(?!var\()(?!inherit|initial|unset|system-ui|-apple-system)['"a-zA-Z]/,
		message: (match) => `Hardcoded font-family: ${match.trim()}`,
		suggestion:
			'Use a --ptr-typography-font-* token: var(--ptr-typography-font-ui), var(--ptr-typography-font-mono)',
	},
];

const WARNINGS = [
	{
		id: 'raw-transition',
		pattern: /transition\s*:\s*(?!var\(|none|inherit)[^;{}\n]+(?:ms|s)\b/,
		message: (match) => `Hardcoded transition: ${match.trim()}`,
		suggestion:
			'Consider using a --ptr-motion-* token: var(--ptr-motion-micro), var(--ptr-motion-appear)',
	},
	{
		id: 'raw-line-height',
		pattern:
			/line-height\s*:\s*(?!var\(|normal|inherit|initial)\d+(?:\.\d+)?(?!\w)/,
		message: (match) => `Hardcoded line-height: ${match.trim()}`,
		suggestion: 'Consider using a --ptr-typography-line-height-* token',
	},
	{
		id: 'raw-opacity',
		pattern: /opacity\s*:\s*(?!var\()[01]?\.\d+/,
		message: (match) => `Hardcoded opacity: ${match.trim()}`,
		suggestion:
			'Consider using a semantic token if this opacity has meaning (e.g. disabled = 0.38)',
	},
	{
		id: 'raw-z-index',
		pattern: /z-index\s*:\s*(?!var\()\d+/,
		message: (match) => `Hardcoded z-index: ${match.trim()}`,
		suggestion:
			'Consider adding a --ptr-z-index-* token for layering values',
	},
	{
		id: 'wrong-spacing-namespace',
		pattern: /var\(--ptr-space-(?!less)/,
		message: (match) => `Non-canonical spacing token: ${match.trim()}`,
		suggestion:
			'Use --ptr-spacing-* not --ptr-space-* (deprecated namespace)',
	},
	{
		id: 'wrong-radius-namespace',
		pattern: /var\(--ptr-border-radius-/,
		message: (match) => `Non-canonical radius token: ${match.trim()}`,
		suggestion:
			'Use --ptr-radius-* not --ptr-border-radius-* (deprecated namespace)',
	},
	{
		id: 'wrong-shadow-namespace',
		pattern: /var\(--ptr-shadow-(?:sm|md|lg)/,
		message: (match) => `Non-canonical shadow token: ${match.trim()}`,
		suggestion:
			'Use --ptr-elevation-* not --ptr-shadow-* (deprecated namespace)',
	},
	{
		id: 'wrong-status-namespace',
		pattern: /var\(--ptr-status-(?!color)/,
		message: (match) => `Non-canonical status token: ${match.trim()}`,
		suggestion:
			'Use --ptr-color-status-* not --ptr-status-* (deprecated namespace)',
	},
];

// ============================================================
// LINE-LEVEL SKIP CONDITIONS
// ============================================================

const shouldSkipLine = (line) => {
	const trimmed = line.trim();

	// Empty lines and comments
	if (
		!trimmed ||
		trimmed.startsWith('/*') ||
		trimmed.startsWith('*') ||
		trimmed.startsWith('//')
	)
		return true;

	// Explicit escape hatch — add /* audit-ignore */ to intentional exceptions
	if (trimmed.includes('audit-ignore')) return true;

	// Lines that are only selectors or at-rules
	if (trimmed.endsWith('{') || trimmed === '}') return true;

	// Lines already using var() — the value IS a token
	// (still check for mixed lines that have both var() and hardcoded values)

	// Keyframe percentage lines
	if (/^\d+%\s*\{/.test(trimmed)) return true;

	// Property names only (no value)
	if (/^[a-zA-Z-]+\s*:?\s*$/.test(trimmed)) return true;

	return false;
};

// Values that are always acceptable without a token
const ALLOWED_VALUES = [
	/:\s*0(?:px)?\s*[;,]?$/, // zero values
	/:\s*auto\s*[;,]?$/,
	/:\s*none\s*[;,]?$/,
	/:\s*inherit\s*[;,]?$/,
	/:\s*initial\s*[;,]?$/,
	/:\s*transparent\s*[;,]?$/,
	/:\s*currentColor\s*[;,]?$/,
	/:\s*100%\s*[;,]?$/,
	/:\s*fit-content\s*[;,]?$/,
	/:\s*min-content\s*[;,]?$/,
	/:\s*max-content\s*[;,]?$/,
	/content\s*:/, // content property values
	/cursor\s*:/, // cursor values
	/display\s*:/, // display values
	/position\s*:/, // position values
	/overflow\s*:/, // overflow values
	/pointer-events\s*:/, // pointer-events values
	/white-space\s*:/, // white-space values
	/box-sizing\s*:/, // box-sizing values
	/flex(?:-(?:direction|wrap|grow|shrink|basis))?\s*:/, // flex values
	/align-(?:items|self|content)\s*:/, // alignment
	/justify-(?:content|items|self)\s*:/, // justification
	/text-(?:align|transform|decoration|overflow)\s*:/, // text props
	/vertical-align\s*:/,
	/object-fit\s*:/,
	/appearance\s*:/,
	/outline\s*:\s*none/, // outline: none is allowed (we handle focus rings via box-shadow)
	/resize\s*:/,
	/animation-/, // animation sub-properties
	/grid-/, // grid layout properties
	/clip\s*:/,
	/visibility\s*:/,
	/user-select\s*:/,
	/will-change\s*:/,
	/@keyframes/,
	/@media/,
	/@supports/,
	// Intentional sr-only pattern — negative margin is a well-known accessibility technique
	/margin\s*:\s*-1px/,
	// Intentional shimmer keyframe opacities
	/opacity\s*:\s*(?:0\.4|0\.8)\s*[;,]?$/,
	// line-height: 1 is a valid CSS reset, not a spacing value
	/line-height\s*:\s*1\s*[;,]?$/,
	// Calculated prefix/suffix offsets in Input — intentional math, not spacing tokens
	/\.(?:sm|md|lg)\s+\.field\.has(?:Prefix|Suffix)\s*\{/,
];

const isAllowedValue = (line) =>
	ALLOWED_VALUES.some((pattern) => pattern.test(line));

// ============================================================
// FILE SCANNER
// ============================================================

const findCssModules = (dir) => {
	const results = [];
	const entries = readdirSync(dir);

	for (const entry of entries) {
		const fullPath = join(dir, entry);
		const stat = statSync(fullPath);

		if (stat.isDirectory()) {
			results.push(...findCssModules(fullPath));
		} else if (entry.endsWith('.module.css')) {
			results.push(fullPath);
		}
	}

	return results;
};

const auditFile = (filePath) => {
	const content = readFileSync(filePath, 'utf8');
	const lines = content.split('\n');
	const violations = [];

	lines.forEach((line, index) => {
		if (shouldSkipLine(line)) return;
		if (isAllowedValue(line)) return;

		for (const rule of ERRORS) {
			const match = line.match(rule.pattern);
			if (match) {
				violations.push({
					severity: 'error',
					line: index + 1,
					col: match.index + 1,
					code: line.trim(),
					message: rule.message(match[0]),
					suggestion: rule.suggestion,
					id: rule.id,
				});
			}
		}

		for (const rule of WARNINGS) {
			const match = line.match(rule.pattern);
			if (match) {
				violations.push({
					severity: 'warning',
					line: index + 1,
					col: match.index + 1,
					code: line.trim(),
					message: rule.message(match[0]),
					suggestion: rule.suggestion,
					id: rule.id,
				});
			}
		}
	});

	return violations;
};

// ============================================================
// REPORTING
// ============================================================

const RESET = '\x1b[0m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const GREEN = '\x1b[32m';
const CYAN = '\x1b[36m';
const DIM = '\x1b[2m';
const BOLD = '\x1b[1m';

const formatSeverity = (severity) =>
	severity === 'error' ? `${RED}error${RESET}` : `${YELLOW}warn${RESET}`;

// ============================================================
// MAIN
// ============================================================

const files = findCssModules(SCAN_DIR);
let totalErrors = 0;
let totalWarnings = 0;
let filesWithViolations = 0;

console.log(`\n${BOLD}Petrichor Token Audit${RESET}`);
console.log(
	`${DIM}Scanning ${files.length} CSS module files in packages/react/src/${RESET}\n`,
);

for (const filePath of files) {
	const violations = auditFile(filePath);
	const relPath = relative(ROOT, filePath);

	const errors = violations.filter((v) => v.severity === 'error');
	const warnings = violations.filter((v) => v.severity === 'warning');

	if (violations.length === 0) {
		if (VERBOSE) {
			console.log(`${GREEN}✓${RESET} ${DIM}${relPath}${RESET}`);
		}
		continue;
	}

	filesWithViolations++;
	totalErrors += errors.length;
	totalWarnings += warnings.length;

	console.log(`${CYAN}${relPath}${RESET}`);

	for (const v of violations) {
		console.log(
			`  ${formatSeverity(v.severity)} ${DIM}${v.line}:${v.col}${RESET}  ${v.message}`,
		);
		console.log(`  ${DIM}${v.code}${RESET}`);
		console.log(`  ${DIM}→ ${v.suggestion}${RESET}`);
		console.log();
	}
}

// Summary
console.log('─'.repeat(60));

if (totalErrors === 0 && totalWarnings === 0) {
	console.log(
		`\n${GREEN}${BOLD}✓ Zero violations — token usage is clean${RESET}\n`,
	);
	process.exit(0);
}

if (totalErrors === 0) {
	console.log(
		`\n${YELLOW}${BOLD}${totalWarnings} warning${totalWarnings === 1 ? '' : 's'} in ${filesWithViolations} file${filesWithViolations === 1 ? '' : 's'}${RESET}`,
	);
	console.log(`${DIM}No errors — warnings are advisory${RESET}\n`);
	process.exit(0);
}

console.log(
	`\n${RED}${BOLD}${totalErrors} error${totalErrors === 1 ? '' : 's'}, ${totalWarnings} warning${totalWarnings === 1 ? '' : 's'} in ${filesWithViolations} file${filesWithViolations === 1 ? '' : 's'}${RESET}`,
);
console.log(
	`${DIM}Fix all errors before committing. Warnings are advisory.${RESET}\n`,
);

process.exit(WARN_ONLY ? 0 : 1);
