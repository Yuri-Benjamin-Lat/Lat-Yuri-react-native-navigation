import React, { createContext, useContext, useState } from "react";

type Theme = {
  background: string;
  text: string;
  accent: string;
};

const lightTheme: Theme = {
  background: "#f8f4e6",
  text: "#060030",
  accent: "#e9462a",
};

const darkTheme: Theme = {
  background: "#000c18",
  text: "#f8f4e6",
  accent: "#e76616",
};

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDark: false,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme: isDark ? darkTheme : lightTheme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
