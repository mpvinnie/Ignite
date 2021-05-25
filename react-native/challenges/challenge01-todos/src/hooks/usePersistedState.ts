import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Response<T> = [
  T,
  Dispatch<SetStateAction<T>>
]

export function usePersistedState<T>(key: string, initialState: T): Response<T> {
  
  const [state, setState] = useState(initialState)

  useEffect(() => {
    async function loadStorageTheme() {
      const theme = await AsyncStorage.getItem(key)

      if (theme) {
        setState(JSON.parse(theme))
      }
    }

    loadStorageTheme()
  }, []) 

  useEffect(() => {
    async function setAsyncStorage() {
      await AsyncStorage.setItem(key, JSON.stringify(state))
    }

    setAsyncStorage()
  }, [key, state])

  return [state, setState]
}