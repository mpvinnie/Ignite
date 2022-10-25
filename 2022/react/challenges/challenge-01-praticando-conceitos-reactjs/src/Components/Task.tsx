import { Check, Trash } from 'phosphor-react'
import styles from './Task.module.css'

interface TaskProps {
  id: string
  content: string
  completed: boolean
}

export function Task({ id, content, completed }: TaskProps) {
  return (
    <div className={completed ? styles.checkedContainer : styles.uncheckedContainer}>
      <div>
        <button className={completed ? styles.checkedCheckbox : styles.uncheckedCheckbox}>
          {completed && <Check weight='bold' />}
        </button>
      </div>
      <p className={completed ? styles.checkedContent : styles.uncheckedContent}>
        {content}
      </p>
      <button className={styles.delete}>
        <Trash weight='bold' />
      </button>
    </div>
  )
}