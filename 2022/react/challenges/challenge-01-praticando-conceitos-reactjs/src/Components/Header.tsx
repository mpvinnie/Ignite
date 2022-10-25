import styles from './Header.module.css'

import { RocketLogo } from './RocketLogo'

export function Header() {
  return (
    <header className={styles.container}>
      <RocketLogo />

      <strong>to</strong>
      <strong>do</strong>
    </header>
  )
}