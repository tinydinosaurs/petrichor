import React, { createContext, useContext, useState } from 'react';

export type Brand = 'raindrop' | 'dusk-rose';

export interface ThemeContextValue {
	brand: Brand;
	setBrand: (brand: Brand) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
	children,
	defaultBrand = 'raindrop',
}: {
	children: React.ReactNode;
	defaultBrand?: Brand;
}) {
	const [brand, setBrand] = useState<Brand>(defaultBrand);

	return (
		<ThemeContext.Provider value={{ brand, setBrand }}>
			<div data-brand={brand}>{children}</div>
		</ThemeContext.Provider>
	);
}

export function useThemeContext() {
	const ctx = useContext(ThemeContext);
	if (!ctx)
		throw new Error('useThemeContext must be used within ThemeProvider');
	return ctx;
}
