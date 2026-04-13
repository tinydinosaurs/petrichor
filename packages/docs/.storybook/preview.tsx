import React from 'react';
import type { Preview, Decorator } from '@storybook/react';

// @ts-ignore
import '../../tokens/dist/css/base.css';
// @ts-ignore
import '../../tokens/dist/css/light.css';
// @ts-ignore
import '../../tokens/dist/css/brand.raindrop.css';
// @ts-ignore
import '../../tokens/dist/css/brand.dusk-rose.css';

const withBrandTheme: Decorator = (Story, context) => {
	const brand = context.globals.brand ?? 'raindrop';
	const colorScheme = context.globals.colorScheme ?? 'dark';

	React.useEffect(() => {
		const root = document.documentElement;
		root.setAttribute('data-brand', brand);
		root.setAttribute('data-color-scheme', colorScheme);
	}, [brand, colorScheme]);

	return (
		<div
			style={{
				padding: '2rem',
				background: 'var(--ptr-color-bg-page)',
				color: 'var(--ptr-color-text-primary)',
			}}
		>
			<Story />
		</div>
	);
};

const preview: Preview = {
	globalTypes: {
		brand: {
			description: 'Petrichor brand theme',
			toolbar: {
				title: 'Brand',
				icon: 'paintbrush',
				items: [
					{ value: 'raindrop', title: 'Raindrop', icon: 'lightning' },
					{ value: 'dusk-rose', title: 'Dusk Rose', icon: 'star' },
				],
				dynamicTitle: true,
			},
		},
		colorScheme: {
			description: 'Color scheme',
			toolbar: {
				title: 'Theme',
				icon: 'circlehollow',
				items: [
					{ value: 'dark', title: 'Dark', icon: 'moon' },
					{ value: 'light', title: 'Light', icon: 'sun' },
				],
				dynamicTitle: true,
			},
		},
	},
	initialGlobals: {
		brand: 'raindrop',
		colorScheme: 'dark',
	},
	decorators: [withBrandTheme],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		backgrounds: { disable: true },
	},
};

export default preview;
