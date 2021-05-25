import styled from 'styled-components/native'

interface TaskDoneProps {
  isDone: boolean
}

export const Header = styled.Text`
  color: ${props => props.theme.colors.title};
  font-size: 24px;
  font-family: 'Poppins-SemiBold';
`

export const TaskContainer = styled.TouchableOpacity<TaskDoneProps>`
  flex: 1;
  padding: 12px 10px;
  margin-bottom: 4px;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;

  background: ${props => props.isDone ? props.theme.colors.task_background : 'transparent'};
`

export const Marker = styled.View<TaskDoneProps>`
  height: 16px;
  width: 16px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${props => props.theme.colors.text};
  margin-right: 10px;

  background: ${props => props.isDone ? props.theme.colors.tertiary : 'transparent'};
`

export const TaskText = styled.Text<TaskDoneProps>`
  color: ${props => props.isDone ? props.theme.colors.gray : props.theme.colors.text};
  text-decoration-line: ${props => props.isDone ? 'line-through' : 'none'};
`