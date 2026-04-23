import type { Preview, Decorator } from '@storybook/react';

import '@petrichor/tokens/css';
import '@petrichor/tokens/css/light';
import '@petrichor/tokens/css/brand/raindrop';
import '@petrichor/tokens/css/brand/raindrop/dark';
import '@petrichor/tokens/css/brand/dusk-rose';
import './docs.css';

// Set initial theme before any story renders.
// Raindrop defaults to light, so we must set dark explicitly.
document.documentElement.setAttribute('data-brand', 'raindrop');
document.documentElement.setAttribute('data-color-scheme', 'dark');

const withBrandTheme: Decorator = (Story, context) => {
  const { brand = 'raindrop', colorScheme = 'dark' } = context.globals;
  document.documentElement.setAttribute('data-brand', brand);
  document.documentElement.setAttribute('data-color-scheme', colorScheme);

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
    },
  },
  initialGlobals: {
    brand: 'raindrop',
    colorScheme: 'dark',
  },
  decorators: [withBrandTheme],
  parameters: {
    layout: 'padded',
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
