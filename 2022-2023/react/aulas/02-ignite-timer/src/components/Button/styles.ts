import { css, styled } from 'styled-components'

export type ButtonVariant = 'start' | 'stop'

export type ButtonContainerProps = {
  $variant: ButtonVariant
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;

  color: ${props => props.theme['gray-100']};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  ${props =>
    props.$variant === 'start'
      ? css`
          background: ${props.theme['green-500']};
          &:not(:disabled):hover {
            background: ${props.theme['green-700']};
          }
        `
      : css`
          background: ${props.theme['red-500']};
          &:not(:disabled):hover {
            background: ${props.theme['red-700']};
          }
        `};
`
