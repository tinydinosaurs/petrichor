import React from 'react';
import { addons, types, useGlobals } from '@storybook/manager-api';
import { IconButton } from '@storybook/components';
import { SunIcon, MoonIcon } from '@storybook/icons';

const ADDON_ID = 'petrichor/color-scheme-toggle';
const TOOL_ID = `${ADDON_ID}/tool`;

function ColorSchemeToggle() {
  const [globals, updateGlobals] = useGlobals();
  const isDark = (globals.colorScheme ?? 'dark') === 'dark';

  return React.createElement(
    IconButton,
    {
      key: TOOL_ID,
      title: isDark ? 'Switch to light mode' : 'Switch to dark mode',
      onClick: () => updateGlobals({ colorScheme: isDark ? 'light' : 'dark' }),
    },
    React.createElement(isDark ? SunIcon : MoonIcon, null),
  );
}

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: 'Color scheme',
    match: () => true,
    render: ColorSchemeToggle,
  });
});
