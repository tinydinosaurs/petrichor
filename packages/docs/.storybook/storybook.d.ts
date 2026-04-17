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
