"use client";

import { ReactNode, useEffect, useState, createContext } from 'react';
import '../app/globals.css';
import ThemeToggle from '@/components/ThemeToggle';

interface LayoutProps {
  children: ReactNode;
}

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: handleToggleTheme }}>
      <html lang="en" className={theme}>
        <body>
          <div>
            <header className="flex justify-between p-4 bg-gray-100 dark:bg-gray-800 h-[8vh]">
              <h1 className="text-xl font-bold ml-[3.5vw] ">Online Code Editor</h1>
              <ThemeToggle theme={theme} onToggleTheme={handleToggleTheme} />
            </header>
            <main>{children}</main>
          </div>
        </body>
      </html>
    </ThemeContext.Provider>
  );
};

export default Layout;

