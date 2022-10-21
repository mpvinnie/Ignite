import './global.css'

import { Header } from "./components/Header"

import styles from './App.module.css'
import { Post } from './components/Post'
import { Sidebar } from './components/Sidebar'

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/mpvinnie.png',
      name: 'Vinicius Peres',
      role: 'Developer at Zenvia'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa!!' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. Confere lá!' },
      { type: 'link', content: 'mpvinnie/rohs '}
    ],
    publishedAt: new Date('2022-10-18 09:14:12')
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/Gabriel-biel.png',
      name: 'Gabriel Lima',
      role: 'Student'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa!!' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. Confere lá!' },
      { type: 'link', content: 'Gabriel-biel/rohs '}
    ],
    publishedAt: new Date('2022-06-18 10:30:12')
  }, 
  {
    id: 3,
    author: {
      avatarUrl: 'https://github.com/SamuelAndradesmn4.png',
      name: 'Samuel Andrade',
      role: 'Developer at Salcomp'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa!!' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. Confere lá!' },
      { type: 'link', content: 'SamuelAndradesmn4/rohs '}
    ],
    publishedAt: new Date('2022-10-06 21:03:16')
  }
]

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => (
            <Post
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
            />
          ))}
        </main>
      </div>
    </div>
  )
}
