import { TooltipDemo } from '~widgets/tooltip-demo';
import { DeleteDemo } from '~widgets/delete-demo';
import styles from './PortalShowcase.module.css';

export const PortalShowcase = () => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={theme}>
      <main className={`${styles.page} ${themeStyles[theme]}`}>
        <button
          type="button"
          className={styles.themeButton}
          onClick={toggleTheme}
        >
          {theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему'}
        </button>
        <div className={styles.card}>
          <TooltipDemo />
          <DeleteDemo />
        </div>
      </main>
    </ThemeContext.Provider>
  );
};
import { useState } from 'react';
import { ThemeContext, themeStyles, type Theme } from '~shared/lib/theme';
