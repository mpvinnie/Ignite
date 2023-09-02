import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Post } from './components/Post'

import './global.css'
import styles from './App.module.css'

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />

        <main>
          <Post
            author="Vinicius Peres"
            content="
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde incidunt, eligendi quo autem ipsum accusamus"
          />
          <Post
            author="Vinicius Peres"
            content="
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde incidunt, eligendi quo autem ipsum accusamus"
          />
          <Post
            author="Vinicius Peres"
            content="
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde incidunt, eligendi quo autem ipsum accusamus"
          />
        </main>
      </div>
    </div>
  )
}
