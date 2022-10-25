import styles from './App.module.css'
import { Header } from './Components/Header'
import { Todo } from './Components/Todo'
import './global.css'

export function App() {
  return (
    <div className={styles.container}>
      <Header />
      <main>
        <Todo />
      </main>
    </div>
  )
}