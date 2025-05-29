// SmartVazi/src/theme/ThemeContext.js

import React, { createContext, useContext } from 'react';

const theme = {
  colors: {
    // ... (your existing colors) ...
    background: '#FFFFFF',
    textPrimary: '#333333',
    textSecondary: '#A0A0A0',
    primaryAction: '#FF6F61',
    secondaryAction: '#008080',
    accentGold: '#B08D57',
    white: '#FFFFFF',
    lightGrey: '#D1D1D1',
    success: '#4CAF50',
    error: '#F44336',
  },
  typography: {
    fontFamily: { // Define base font families
      primary: 'Montserrat-Regular', // Default primary font
      secondary: 'OpenSans-Regular', // Default secondary font
      primaryBold: 'Montserrat-Bold',
      primaryMedium: 'Montserrat-Medium',
      primarySemiBold: 'Montserrat-SemiBold',
      secondaryBold: 'OpenSans-Bold',
    },
    h1: {
      fontFamily: 'Montserrat-Bold', // Use the key from useFonts
      fontSize: 32,
    },
    h2: {
      fontFamily: 'Montserrat-SemiBold', // Use the key from useFonts
      fontSize: 24,
    },
    body: {
      fontFamily: 'OpenSans-Regular', // Use the key from useFonts
      fontSize: 16,
    },
    button: {
      fontFamily: 'Montserrat-Medium', // Use the key from useFonts
      fontSize: 16,
    },
    // You can add more specific text styles here
    // e.g., paragraph: { fontFamily: 'OpenSans-Regular', fontSize: 16, lineHeight: 24 },
    // label: { fontFamily: 'Montserrat-Medium', fontSize: 14 },
  },
  spacing: {
    // ... (your existing spacing) ...
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