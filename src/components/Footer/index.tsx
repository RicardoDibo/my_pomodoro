import styles from './styles.module.css'
import { RouterLink } from '../RouterLink'

export function Footer() {

  return (
    <footer className={styles.footer}>
      <RouterLink href="/about-pomodoro/">How it works</RouterLink>
      <RouterLink href="/">Timer &copy; {new Date().getFullYear()} Mabe with React</RouterLink>
    </footer>
  )
}