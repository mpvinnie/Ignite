import './global.css'

import { Header } from "./components/Header"

import styles from './App.module.css'
import { Sidebar } from './components/Sidebar'
import { Post } from './Post'

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <Post
            author='Vinicius'
            content='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam consequatur optio delectus molestiae libero deserunt aut? Fugiat minima harum, repellendus odit repellat omnis sequi, voluptatibus, quasi magni laboriosam assumenda eligendi?'
          />
          <Post
            author='Vinicius'
            content='Um conteúdo qualquer'
          />
          <Post
            author='Vinicius'
            content='Um conteúdo qualquer'
          />
        </main>
      </div>
    </div>
  )
}
