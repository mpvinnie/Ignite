import { PlusCircle } from 'phosphor-react'

import styles from './Todo.module.css'

export function Todo() {
  return (
    <div className={styles.container}>
      <form className={styles.searchContainer}>
        <input type="text" placeholder='Adicione uma nova tarefa' />
        <button type="submit">
          Criar
          <PlusCircle />
        </button>
      </form>

      <div>
        TESTE
      </div>
    </div>
  )
}