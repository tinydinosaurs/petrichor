import type { Preview, Decorator } from '@storybook/react';
import { addons } from '@storybook/preview-api';

import '@petrichor/tokens/css';
import '@petrichor/tokens/css/light';
import '@petrichor/tokens/css/brand/raindrop';
import '@petrichor/tokens/css/brand/dusk-rose';
import './docs.css';

// Apply brand/scheme to <html> at module load and on every globals change.
// This runs on all pages including pure MDX docs — not just story renders.
function applyTheme(brand: string, colorScheme: string) {
  document.documentElement.setAttribute('data-brand', brand);
  document.documentElement.setAttribute('data-color-scheme', colorScheme);
}

applyTheme('raindrop', 'dark');

addons.getChannel().on('globalsUpdated', ({ globals }: { globals: Record<string, string> }) => {
  applyTheme(globals.brand ?? 'raindrop', globals.colorScheme ?? 'dark');
});

const withBrandTheme: Decorator = (Story) => (
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
