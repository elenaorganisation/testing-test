import styled from "styled-components"

const Input = styled.input`
  padding: 12px 16px;
  border: none;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.input.background};
  outline: none;
  max-width: 320px;
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.grey};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.input.backgroundHover};
  }

  &:focus {
    background: ${({ theme }) => theme.colors.input.backgroundFocus};

    &::placeholder {
      color: transparent;
    }
  }

  /* Hide arrows for number input */
  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }
`

export default Input
