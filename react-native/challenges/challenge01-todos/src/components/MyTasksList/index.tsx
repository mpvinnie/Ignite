import React from 'react';
import { FlatList, View, } from 'react-native';

import { Header, TaskContainer, Marker, TaskText } from './styles'

function FlatListHeaderComponent() {
  return (
    <View>
      <Header>Minhas tasks</Header>
    </View>
  )
}

interface MyTasksListProps {
  tasks: {
    id: number;
    title: string;
    done: boolean;
  }[];
  onPress: (id: number) => void;
  onLongPress: (id: number) => void;
}

export function MyTasksList({ tasks, onLongPress, onPress }: MyTasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      renderItem={({ item, index }) => {
        return (
          <TaskContainer
            testID={`button-${index}`}
            isDone={item.done}
            activeOpacity={0.7}
            onPress={() => onPress(item.id)}
            onLongPress={() => onLongPress(item.id)}
          >
            <Marker 
              testID={`marker-${index}`}
              isDone={item.done}
            />
            <TaskText 
              isDone={item.done}
            >
              {item.title}
            </TaskText>
          </TaskContainer>
        )
      }}
      ListHeaderComponent={<FlatListHeaderComponent />}
      ListHeaderComponentStyle={{
        marginBottom: 20
      }}
      style={{
        marginHorizontal: 24,
        marginTop: 32
      }}
    />
  )
}