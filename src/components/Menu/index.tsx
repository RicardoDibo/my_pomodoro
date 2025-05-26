import { HistoryIcon, MoonIcon, SettingsIcon, SunIcon, TimerIcon } from 'lucide-react'
import styles from './styles.module.css'
import { useEffect, useState } from 'react';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    // Check localStorage for saved theme
    const storageTheme = localStorage.getItem('theme') as AvailableThemes || 'dark';
    return storageTheme;
  });

  const nextThemeIcon = {
    dark: <SunIcon size={64} />,
    light: <MoonIcon size={64} />
  }

  function handleThemeChange(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault(); // don't follow the link

    setTheme(prevTheme =>{
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return newTheme;
    });
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme); // Save theme to localStorage

    // Cleanup function to reset theme if needed
    // return () => {}
  }, [theme]);

  return (
    <nav className={styles.menu}>
      <a 
        className={styles.menuLink} 
        href="#" 
        aria-label='Go to Home' 
        title='Go to Home'
      >
        <TimerIcon size={64} />
      </a>
      <a 
        className={styles.menuLink} 
        href="#" 
        aria-label='Go to History'
        title='Go to History'
      >
        <HistoryIcon size={64} />
      </a>
      <a 
        className={styles.menuLink} 
        href="#" 
        aria-label='Go to Settings'
        title='Go to Settings'
      >
        <SettingsIcon size={64} />
      </a>
      <a 
        className={styles.menuLink} 
        href="#" 
        aria-label='Change Theme' 
        title='Change Theme'
        onClick={handleThemeChange}
      >
        {nextThemeIcon[theme]}
      </a>
    </nav>
  )
}