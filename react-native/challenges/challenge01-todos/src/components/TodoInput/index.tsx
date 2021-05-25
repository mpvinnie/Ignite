import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';

import { Container, Input, AddButton } from './styles'

import checkIcon from '../../assets/icons/Check.png';

interface TodoInputProps {
  addTask: (task: string) => void;
}

export function TodoInput({ addTask }: TodoInputProps) {
  const [task, setTask] = useState('');

  function handleAddNewTask() {
    if (task === '')
      return

    addTask(task)
    setTask('')
  }

  return (
    <Container>
      <Input 
        placeholder="Adicionar novo todo..."
        returnKeyType="send"
        value={task}
        onChangeText={setTask}
        onSubmitEditing={handleAddNewTask}
      />
      <AddButton
        testID="add-new-task-button"
        activeOpacity={0.7}
        onPress={handleAddNewTask}
      >
        <Image source={checkIcon} />
      </AddButton>
    </Container>
  )
}