import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => {
    const savedTheme = localStorage.getItem("themeMode") || "dark";
    document.documentElement.className = savedTheme;
    return savedTheme;
  });

  const switchTheme = (theme) => {
    setThemeMode(theme);
    document.documentElement.className = theme;
    localStorage.setItem("themeMode", theme);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  return useContext(ThemeContext);
};

export { ThemeProvider, useTheme };

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
