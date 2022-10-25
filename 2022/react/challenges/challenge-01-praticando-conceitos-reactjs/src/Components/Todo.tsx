import { PlusCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent, InputHTMLAttributes, useState } from 'react'
import { v4 as uuid } from 'uuid'

import clipboardImage from '../assets/clipboard.png'
import { Task } from './Task'
import styles from './Todo.module.css'

interface Task {
  id: string
  content: string
  completed: boolean
}

export function Todo() {
  const [newTask, setNewTask] = useState('')
  const [totalTasks, setTotalTasks] = useState(0)
  const [tasks, setTasks] = useState<Task[]>([])
  const [completedTasks, setCompletedTasks] = useState(0)

  function handleChangeTaskInput(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value)
  }

  function handleCreateTask(event: FormEvent) {
    event.preventDefault()

    setTasks((state) => {
      setTotalTasks(state.length + 1)

      return [{
        id: uuid(),
        content: newTask,
        completed: false
      }, ...state]
    })

    setNewTask('')
  }

  function checkTask(id: string) {
    let sumCompletedTasks = 0

    const tasksWithCheckedTask = tasks.map(task => {
      let currentTask = task

      if (task.id === id) {
        currentTask = {
          ...task,
          completed: !task.completed
        }
      }

      if (currentTask.completed) {
        sumCompletedTasks = sumCompletedTasks + 1
      }

      return currentTask
    })

    setCompletedTasks(sumCompletedTasks)
    setTasks(tasksWithCheckedTask)
  }



  return (
    <div className={styles.container}>
      <form onSubmit={handleCreateTask} className={styles.searchContainer}>
        <input
          type="text"
          placeholder='Adicione uma nova tarefa'
          onChange={handleChangeTaskInput}
          value={newTask}
          required
        />
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
        {totalTasks > 0
          ? <div className={styles.tasks}>
            {tasks.map(task => 
              <Task
                key={task.id}
                id={task.id}
                content={task.content}
                completed={task.completed}
                onCheck={checkTask}
              />
            )}
          </div>
          : (
            <div className={styles.emptyTasks}>
              <img src={clipboardImage} alt="" />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
          )
        }
      </div>
    </div>
  )
}