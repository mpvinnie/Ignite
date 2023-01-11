import { Check, Trash } from 'phosphor-react'
import styles from './Task.module.css'

interface TaskProps {
  id: string
  content: string
  completed: boolean
  onCheck: (id: string) => void
  onDelete: (id: string) => void
}

export function Task({ id, content, completed, onCheck, onDelete }: TaskProps) {
  function handleCheckTask(id: string) {
    onCheck(id)
  }

  function handleOnDelete(id: string) {
    onDelete(id)
  }

  return (
    <div className={completed ? styles.checkedContainer : styles.uncheckedContainer}>
      <div>
        <button onClick={() => handleCheckTask(id)} className={completed ? styles.checkedCheckbox : styles.uncheckedCheckbox}>
          {completed && <Check weight='bold' />}
        </button>
      </div>
      <p className={completed ? styles.checkedContent : styles.uncheckedContent}>
        {content}
      </p>
      <button onClick={() => handleOnDelete(id)} className={styles.delete}>
        <Trash weight='bold' />
      </button>
    </div>
  )
}