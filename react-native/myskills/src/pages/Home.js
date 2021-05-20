import React, { useState, useEffect } from 'react'

import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList
} from 'react-native'

import { Button } from '../components/Button'
import { SkillCard } from '../components/SkillCard'

export function Home() {
  const [newSkill, setNewSkill] = useState('')
  const [mySkills, setMySkills] = useState([])
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const currentHour = new Date().getHours() - 4
    
    if(currentHour < 12) {
      setGreeting('Good morning')
    } else if (currentHour < 18) {
      setGreeting('Good afternoon')
    } else {
      setGreeting('Good night')
    }
  }, [])

  function handleAddNewSkill() {
    setMySkills(oldState => [...oldState, newSkill])
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome, Vinicius</Text>

      <Text style={styles.greetings}>
        {greeting}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />

      <Button onPress={handleAddNewSkill} />

      <Text style={[styles.title, { marginVertical: 50 }]}>
        My Skills
      </Text>

      <FlatList
        data={mySkills}
        keyExtractor={item => item}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <SkillCard skill={item} />
        )}
      />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 70,
    paddingHorizontal: 30
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  greetings: {
    color: '#fff'
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7
  }
})