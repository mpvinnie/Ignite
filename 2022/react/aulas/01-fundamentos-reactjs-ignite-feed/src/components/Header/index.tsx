import styles from './styles.module.css'

import { IgniteFeedLogo } from '../IgniteFeedLogo'

export function Header() {
  return (
    <header className={styles.header}>
      <IgniteFeedLogo />
    </header>
  )
}