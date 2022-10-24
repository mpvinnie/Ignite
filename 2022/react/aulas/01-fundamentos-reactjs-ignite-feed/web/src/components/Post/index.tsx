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

  const [newCommentText, setNewCommentText] = useState('')

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  })

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

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

  async function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()

    const response = await api.post('/comments', {
      content: newCommentText,
      post_id: id
    })

    const serializedComment = {
      ...response.data,
      created_at: new Date(response.data.created_at)
    }

    setComments([serializedComment, ...comments])
    setNewCommentText('')
  }

  function handleNewCommentChange(event: any) {
    event.preventDefault()
    setNewCommentText(event.target.value)
  }

  async function handleDeleteComment(comment_id: number) {
    await api.delete(`/comments/${comment_id}`)

    const commentsWithoutDeletedOne = comments.filter(comment => comment.id !== comment_id)
    setComments(commentsWithoutDeletedOne)
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

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
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
            user_id={comment.user_id}
            content={comment.content}
            user={comment.user}
            created_at={comment.created_at}
            _count={comment._count}
            userHasApplauded={comment.userHasApplauded}
            onDelete={handleDeleteComment}
          />
        ))}
      </div>
    </article>
  )
}