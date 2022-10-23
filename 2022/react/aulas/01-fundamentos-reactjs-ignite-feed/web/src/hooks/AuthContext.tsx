import { createContext, ReactNode, useContext, useState } from 'react'
import { api } from '../api'

type User = {
    id: number
    banner_url: string
    avatar_url: string
    name: string
    role: string
}

type AuthContextData = {
  signIn(id: number): Promise<void>
  user: User
}

type AuthProviderProps = {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState({} as User)

  async function signIn(id: number) {
    try {
      api.defaults.headers.id = id

      const response = await api.get('/users')

      setUser(response.data)
    } catch (err: any) {
      return alert(err.response.data.message)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  ) 
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}