import { HandsClapping, Trash } from 'phosphor-react'
import { Avatar } from '../Avatar'
import styles from './styles.module.css'

interface CommentProps {
  content: string
}

export function Comment({ content }: CommentProps) {
  return (
    <div className={styles.comment}>
      <Avatar
        hasBorder={false}
        src="https://github.com/mpvinnie.png"
      />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Vinicius Peres</strong>
              <time title='18 de Outubro às 05:18' dateTime='2022-10-18 05:18:13'>Cerca de 1h atrás</time>
            </div>
            <button title='Deletar comentário'>
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>
        <footer>
          <button>
            <HandsClapping size={20} />
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  )
}