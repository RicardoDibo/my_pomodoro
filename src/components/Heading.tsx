import styles from './Heading.module.css'

export function Heading() {
    const classes = styles.heading
    const className = `${styles.heading} ${styles.cyan}`
    return (
      <>
        <h1 className={classes}>First Way</h1>
        <h1 className={styles.cyan}>Second Way</h1>
        <h1 className={className}>Third Way</h1>
      </>
    )
}

export default Heading