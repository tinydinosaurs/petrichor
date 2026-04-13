import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
	stories: [
		'../../../packages/react/src/**/*.stories.@(ts|tsx)',
		'../../../packages/react/src/**/*.docs.mdx',
	],
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-a11y',
	],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
	viteFinal: async (config) => {
		const { mergeConfig } = await import('vite');
		const tokensDir = path.resolve(__dirname, '../../tokens/dist/css');
		return mergeConfig(config, {
			resolve: {
				alias: {
					'@petrichor/tokens/css/brand/dusk-rose': path.join(
						tokensDir,
						'brand.dusk-rose.css',
					),
					'@petrichor/tokens/css/brand/raindrop': path.join(
						tokensDir,
						'brand.raindrop.css',
					),
					'@petrichor/tokens/css/light': path.join(
						tokensDir,
						'light.css',
					),
					'@petrichor/tokens/css': path.join(tokensDir, 'base.css'),
					'@petrichor/tokens': path.resolve(
						__dirname,
						'../../tokens/dist/js/tokens.js',
					),
				},
			},
		});
	},
};

export default config;
