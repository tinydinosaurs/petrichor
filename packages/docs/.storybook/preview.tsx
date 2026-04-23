import type { Preview, Decorator } from '@storybook/react';
import { ThemeProvider } from '@petrichor/react';

import '@petrichor/tokens/css';
import '@petrichor/tokens/css/light';
import '@petrichor/tokens/css/brand/raindrop';
import '@petrichor/tokens/css/brand/raindrop/dark';
import '@petrichor/tokens/css/brand/dusk-rose';
import './docs.css';

const withBrandTheme: Decorator = (Story, context) => {
  const { brand = 'raindrop', colorScheme = 'dark' } = context.globals;

  return (
    <ThemeProvider defaultBrand={brand} defaultColorScheme={colorScheme}>
      <Story />
    </ThemeProvider>
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
    layout: 'centered',
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
