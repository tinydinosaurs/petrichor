import { addons } from '@storybook/manager-api';
import { defaultTheme, getTheme } from './petrichor-themes';

// Apply the default theme (raindrop dark) at load time
addons.setConfig({ theme: defaultTheme });

// Dynamically swap the manager theme when toolbar globals change
addons.register('petrichor/theme-switcher', (api) => {
	api.getChannel().on(
		'globalsUpdated',
		({ globals }: { globals: Record<string, string> }) => {
			const brand = (globals.brand ?? 'raindrop') as 'raindrop' | 'dusk-rose';
			const colorScheme = (globals.colorScheme ?? 'dark') as 'dark' | 'light';
			addons.setConfig({ theme: getTheme(brand, colorScheme) });
		},
	);
});
