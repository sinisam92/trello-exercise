import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(() => {
    const savedTheme = localStorage.getItem('themeMode') || 'dark';
    document.documentElement.className = savedTheme;
    return savedTheme;
  });

  const switchTheme = (theme) => {
    setThemeMode(theme);
    document.documentElement.className = theme;
    localStorage.setItem('themeMode', theme);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}