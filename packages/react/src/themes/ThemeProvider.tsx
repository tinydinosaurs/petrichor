import React, { createContext, useContext, useEffect, useState } from 'react';

export type Brand = 'raindrop' | 'dusk-rose';
export type ColorScheme = 'light' | 'dark';

const BRAND_DEFAULTS: Record<Brand, ColorScheme> = {
  raindrop: 'light',
  'dusk-rose': 'dark',
};

export interface ThemeContextValue {
  brand: Brand;
  colorScheme: ColorScheme;
  setBrand: (brand: Brand) => void;
  setColorScheme: (colorScheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  children,
  defaultBrand = 'raindrop',
  defaultColorScheme,
}: {
  children: React.ReactNode;
  defaultBrand?: Brand;
  defaultColorScheme?: ColorScheme;
}) {
  const [brand, setBrand] = useState<Brand>(defaultBrand);
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    defaultColorScheme ?? BRAND_DEFAULTS[defaultBrand],
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-brand', brand);
    document.documentElement.setAttribute('data-color-scheme', colorScheme);
  }, [brand, colorScheme]);

  return (
    <ThemeContext.Provider value={{ brand, colorScheme, setBrand, setColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeContext must be used within ThemeProvider');
  return ctx;
}
