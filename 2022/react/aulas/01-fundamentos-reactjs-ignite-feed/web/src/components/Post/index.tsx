import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { FormEvent, useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { api } from '../../api'

import { Avatar } from '../Avatar'
import { Comment, CommentProps } from '../Comment'
import styles from './styles.module.css'

interface IPostProps {
  id: number
  user: {
    avatar_url: string
    name: string
    role: string
  }
  content: string
  publishedAt: Date
}

export function Post({ id, user, content, publishedAt }: IPostProps) {
  const [comments, setComments] = useState<CommentProps[]>([])

  useEffect(() => {
    async function loadComments() {
      const response = await api.get<CommentProps[]>(`/comments?post_id=${id}`)

      const serializedComments = response.data.map(comment => {
        return {
          ...comment,
          created_at: new Date(comment.created_at)
        }
      })

      setComments(serializedComments)
    }

    loadComments()
  }, [id])

  const [newCommentText, setNewCommentText] = useState('')

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  })

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  // function handleCreateNewComment(event: FormEvent) {
  //   event.preventDefault()

  //   setComments([...comments, newCommentText])
  //   setNewCommentText('')
  // }

  function handleNewCommentChange(event: any) {
    event.preventDefault()

    setNewCommentText(event.target.value)

  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={user.avatar_url} />
          <div className={styles.authorInfo}>
            <strong>{user.name}</strong>
            <span>{user.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted}  dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {ReactHtmlParser(content)}
      </div>

      <form className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name="comment"
          placeholder='Deixe um comentário'
          value={newCommentText}
          onChange={handleNewCommentChange}
        />

        <footer>
          <button type='submit'>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => (
          <Comment
            key={comment.id}
            id={comment.id}
            content={comment.content}
            user={comment.user}
            created_at={comment.created_at}
            _count={comment._count}
            userHasApplauded={comment.userHasApplauded}
          />
        ))}
      </div>
    </article>
  )
}