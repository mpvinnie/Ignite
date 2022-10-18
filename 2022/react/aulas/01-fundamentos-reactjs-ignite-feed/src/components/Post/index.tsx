import { Avatar } from '../Avatar'
import { Comment } from '../Comment'
import styles from './styles.module.css'

export function Post() {
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src="https://github.com/mpvinnie.png" />
          <div className={styles.authorInfo}>
            <strong>Vinicius Peres</strong>
            <span>Web developer</span>
          </div>
        </div>

        <time title="17 de Novembro às 80:15h"  dateTime='2022-10-17 08:15:40'>
          Publicado há 1h
        </time>
      </header>

      <div className={styles.content}>
        <p>Falaaa galera!</p>

        <p>Acabei de subir mais um projeto no meu portifa. É um projeto que fiz sozinho.</p> 

        <p><a href="">mpvinnie/rohs</a></p>

        <p><a href="">#novoprojeto #soeu #soumaiseurapaz</a></p>
      </div>

      <form className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          placeholder='Deixe um comentário'
        />

        <footer>
          <button type='submit'>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        <Comment />
        <Comment />
        <Comment />
      </div>
    </article>
  )
}