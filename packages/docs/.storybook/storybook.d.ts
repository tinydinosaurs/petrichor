// Type declarations for Storybook config files

// Allow importing CSS files as side effects
declare module '*.css' {}

// @storybook/preview-api types resolve via storybook internals which pnpm
// doesn't hoist properly. Declare the minimal types we actually use.
declare module '@storybook/preview-api' {
	interface Channel {
		on<T = unknown>(event: string, callback: (data: T) => void): void;
		off<T = unknown>(event: string, callback: (data: T) => void): void;
		emit(event: string, data: unknown): void;
	}
	interface Addons {
		getChannel(): Channel;
	}
	export const addons: Addons;
}

// @storybook/manager-api — same hoisting issue as preview-api
declare module '@storybook/manager-api' {
	interface Channel {
		on<T = unknown>(event: string, callback: (data: T) => void): void;
		off<T = unknown>(event: string, callback: (data: T) => void): void;
		emit(event: string, data: unknown): void;
	}
	interface API {
		getChannel(): Channel;
	}
	interface Addons {
		setConfig(config: Record<string, unknown>): void;
		register(name: string, callback: (api: API) => void): void;
	}
	export const addons: Addons;
}

// @storybook/theming
declare module '@storybook/theming' {
	export function create(config: Record<string, unknown>): Record<string, unknown>;
}
