import styles from './styles.module.css'

interface AvatarProps {
  src: string
  hasBorder?: boolean
}

export function Avatar({ src, hasBorder = true }: AvatarProps) {
  return (
    <img
      className={
        hasBorder ? styles.avatarWithBorder : styles.avatar
      }
      src={src}
    />
  )
}