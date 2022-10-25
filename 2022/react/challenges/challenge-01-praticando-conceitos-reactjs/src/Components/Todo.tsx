import { PlusCircle } from 'phosphor-react'
import { useState } from 'react'

import styles from './Todo.module.css'

export function Todo() {
  const [totalTasks, setTotalTasks] = useState(0)
  const [completedTasks, setComplitedTasks] = useState(0)

  return (
    <div className={styles.container}>
      <form className={styles.searchContainer}>
        <input type="text" placeholder='Adicione uma nova tarefa' />
        <button type="submit">
          Criar
          <PlusCircle />
        </button>
      </form>

      <div className={styles.content}>
        <header>
          <div className={styles.createdTasks}>
            <strong>Tarefas criadas</strong>
            <span>{totalTasks}</span>
          </div>
          <div className={styles.completedTasks}>
            <strong>Concluídas</strong>
            {totalTasks > 0
              ? <span>{`${completedTasks} de ${totalTasks}`}</span>
              : <span>0</span>
            }
          </div>
        </header>
      </div>
    </div>
  )
}