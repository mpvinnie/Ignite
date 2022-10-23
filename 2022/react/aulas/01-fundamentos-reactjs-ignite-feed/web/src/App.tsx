import './global.css'

import { Header } from "./components/Header"

import { useEffect, useState } from 'react'
import { api } from './api'
import styles from './App.module.css'
import { Post } from './components/Post'
import { Sidebar } from './components/Sidebar'
import { useAuth } from './hooks/AuthContext'

type Post = {
  id: number
  content: string
  created_at: Date,
  user: {
    avatar_url: string
    name: string
    role: string
  }
}

export function App() {
  const { signIn } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    signIn(1)
  }, [])

  useEffect(() => {
    async function loadPost() {
      const { data } = await api.get<Post[]>('/posts')

      const serializedPosts = data.map(post => {
        return {
          ...post,
          created_at: new Date(post.created_at)
        }
      })

      setPosts(serializedPosts)
    }

    loadPost()
  }, [])

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => (
            <Post
              key={post.id}
              user={post.user}
              content={post.content}
              publishedAt={post.created_at}
            />
          ))}
        </main>
      </div>
    </div>
  )
}
