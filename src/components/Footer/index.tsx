import styles from './styles.module.css'

export function Footer() {

  return (
    <footer className={styles.footer}>
      <a href="#">How it works</a>
      <a href="#">Timer &copy; {new Date().getFullYear()} Mabe with React</a>
    </footer>
  )
}