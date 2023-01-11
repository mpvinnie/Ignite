import { PencilLine } from 'phosphor-react'
import { useAuth } from '../../hooks/AuthContext'
import { Avatar } from '../Avatar'
import styles from './styles.module.css'

export function Sidebar() {
  const { user } = useAuth()

  return (
    <aside className={styles.sidebar}>
      <img
        className={styles.cover}
        src={user.banner_url}
      />
    
      <div className={styles.profile}>
        <Avatar src={user.avatar_url} />

        <strong>{user.name}</strong>
        <span>{user.role}</span>
      </div>

      <footer>
        <a href="#">
          <PencilLine size={20} />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  )
}