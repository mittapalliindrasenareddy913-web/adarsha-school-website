import React, { createContext, useContext, useState, useEffect } from 'react';
import { themesData } from '../data/themesData';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // ADARSHA HIGH SCHOOL — INSTITUTIONAL NAVY & AMBER DESIGN
  const defaultThemeId = 'institutional-navy';

  const [activeThemeId] = useState(defaultThemeId);
  const [switcherHidden] = useState(true);

  const activeTheme = themesData.find(t => t.id === activeThemeId) || themesData[0];

  useEffect(() => {
    localStorage.setItem('adarsha_selected_theme', activeTheme.id);
  }, [activeTheme]);

  const changeTheme = () => {
    // Single institutional brand identity active
  };

  const toggleSwitcherVisibility = () => {};

  return (
    <ThemeContext.Provider
      value={{
        activeThemeId: activeTheme.id,
        activeTheme,
        themes: themesData,
        changeTheme,
        switcherHidden,
        toggleSwitcherVisibility,
        setSwitcherHidden: () => {}
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
