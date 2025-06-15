import { Link } from 'react-router'
import styles from './styles.module.css'

export function Footer() {

  return (
    <footer className={styles.footer}>
      <Link to="/about-pomodoro/">How it works</Link>
      <Link to="/">Timer &copy; {new Date().getFullYear()} Mabe with React</Link>
    </footer>
  )
}