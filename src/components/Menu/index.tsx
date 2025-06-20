import { HistoryIcon, MoonIcon, SettingsIcon, SunIcon, TimerIcon } from 'lucide-react'
import styles from './styles.module.css'
import { useEffect, useState } from 'react';
import { RouterLink } from '../RouterLink';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const storageTheme = localStorage.getItem('theme') as AvailableThemes || 'dark';
    return storageTheme;
  });

  const nextThemeIcon = {
    dark: <SunIcon size={64} />,
    light: <MoonIcon size={64} />
  }

  function handleThemeChange(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    setTheme(prevTheme =>{
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return newTheme;
    });
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <nav className={styles.menu}>
      <RouterLink
        className={styles.menuLink} 
        href="/" 
        aria-label='Go to Home' 
        title='Go to Home'
      >
        <TimerIcon size={64} />
      </RouterLink>
      <RouterLink
        className={styles.menuLink} 
        href="/history/" 
        aria-label='Go to History'
        title='Go to History'
      >
        <HistoryIcon size={64} />
      </RouterLink>
      <RouterLink
        className={styles.menuLink} 
        href="settings/" 
        aria-label='Go to Settings'
        title='Go to Settings'
      >
        <SettingsIcon size={64} />
      </RouterLink>
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