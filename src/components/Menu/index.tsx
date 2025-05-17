import { HistoryIcon, SettingsIcon, SunIcon, TimerIcon } from 'lucide-react'
import styles from './styles.module.css'

export function Menu() {

  return (
    <nav className={styles.menu}>
      <a className={styles.menuLink} href="#">
        <TimerIcon size={64} />
      </a>
      <a className={styles.menuLink} href="#">
        <HistoryIcon size={64} />
      </a>
      <a className={styles.menuLink} href="#">
        <SettingsIcon size={64} />
      </a>
      <a className={styles.menuLink} href="#">
        <SunIcon size={64} />
      </a>
    </nav>
  )
}