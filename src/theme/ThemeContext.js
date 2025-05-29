import React, { createContext, useContext } from 'react';

// Define your theme based on SynergyStyle (Document 3)
const theme = {
  colors: {
    background: '#F8F6F2', // Warm Off-White
    textPrimary: '#333333', // Deep Charcoal
    textSecondary: '#A0A0A0', // Soft Grey
    primaryAction: '#FF6F61', // Vibrant Coral
    secondaryAction: '#008080', // Teal Blue
    accentGold: '#B08D57', // Muted Gold
    white: '#FFFFFF',
    lightGrey: '#D1D1D1',
    // Add semantic colors as needed: success, error, warning
    success: '#4CAF50',
    error: '#F44336',
  },
  typography: {
    primaryFontFamily: 'Montserrat_400Regular', // Example, assuming you load this font
    secondaryFontFamily: 'OpenSans_400Regular', // Example
    h1: {
      // fontFamily: 'Montserrat_700Bold', // Example for bold variant
      fontSize: 32,
    },
    h2: {
      // fontFamily: 'Montserrat_600SemiBold',
      fontSize: 24,
    },
    body: {
      // fontFamily: 'OpenSans_400Regular',
      fontSize: 16,
    },
    button: {
      // fontFamily: 'Montserrat_500Medium',
      fontSize: 16,
    },
    // Add more text styles as needed
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
};

const ThemeContext = createContext(theme);

export const useAppTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};