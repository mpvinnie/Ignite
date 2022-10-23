import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { HandsClapping, Trash } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { api } from '../../api'
import { Avatar } from '../Avatar'
import styles from './styles.module.css'

export interface CommentProps {
  id: string
  content: string
  created_at: Date
  user: {
    avatar_url: string
    name: string
  }
  _count: {
    comment_applause: number
  }
  userHasApplauded: boolean
}

export function Comment({ id, content, user, created_at, _count, userHasApplauded }: CommentProps) {
  const [commentApplaudedByUser, setCommentApplaudedByUser] = useState(userHasApplauded)
  const [totalApplause, setTotalApplause] = useState(_count.comment_applause)

  const publishedDateFormatted = format(created_at, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  })

  const publishedDateRelativeToNow = formatDistanceToNow(created_at, {
    locale: ptBR,
    addSuffix: true
  })

  async function toggleAplaudComment() {
    const response = await api.post(`/comments/applaud/${id}`)

    response.data.commentApplauded
      ? setTotalApplause(totalApplause + 1)
      : setTotalApplause(totalApplause - 1)

    setCommentApplaudedByUser(response.data.commentApplauded)
  }

  return (
    <div className={styles.comment}>
      <Avatar
        hasBorder={false}
        src={user.avatar_url}
      />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{user.name}</strong>
              <time title={publishedDateFormatted} dateTime='2022-10-18 05:18:13'>{publishedDateRelativeToNow}</time>
            </div>
            <button title='Deletar comentário'>
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>
        <footer>
          <button onClick={toggleAplaudComment} className={commentApplaudedByUser ? styles.applauded : styles.notApplauded}>
            <HandsClapping size={20} />
            Aplaudir <span>{totalApplause}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}