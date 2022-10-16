import React, { useState } from 'react';

import { Header } from '../../components/Header';
import { MyTasksList } from '../../components/MyTasksList';
import { TodoInput } from '../../components/TodoInput';

import { Container } from './styles'

interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface HomeProps {
  toggleTheme: () => void
}

export function Home({ toggleTheme }: HomeProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const task: Task = Object.assign({
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    })

    setTasks(state => [...state, task])
  }

  function handleMarkTaskAsDone(id: number) {
    const task = tasks.find(currentTask => currentTask.id === id)

    if (!task)
      return

    const newTasksWithTaskDone = tasks.map(currentTask => {
      if (currentTask === task) {
        currentTask.done = !currentTask.done
      }

      return currentTask
    })

    setTasks(newTasksWithTaskDone)
  }

  function handleRemoveTask(id: number) {
    const newTask = tasks.filter(task => task.id !== id)

    setTasks(newTask)
  }

  return (
    <Container>
      <Header toggleTheme={toggleTheme} />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList 
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onLongPress={handleRemoveTask} 
        />
    </Container>
  )
}