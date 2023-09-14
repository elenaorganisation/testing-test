import styled, { css } from "styled-components"

const secondaryButton = css`
  background: ${({ theme }) => theme.colors.secondaryButton.background};
  color: ${({ theme }) => theme.colors.secondaryButton.color};

  path {
    fill: ${({ theme }) => theme.colors.text};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.secondaryButton.backgroundHover};
  }

  &:active {
    background: ${({ theme }) => theme.colors.secondaryButton.backgroundActive};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.standardButton.color};
    background: ${({ theme }) =>
      theme.colors.secondaryButton.backgroundDisabled};
  }
`

type StyleProps = {
  secondary?: boolean
}

const Button = styled.button<StyleProps>`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.standardButton.background};
  color: ${({ theme }) => theme.colors.standardButton.color};
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  border: none;
  padding: 12px 20px;
  border-radius: 100px;
  min-width: 145px;
  cursor: pointer;
  text-decoration: none;

  path {
    fill: ${({ theme }) => theme.colors.white};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.standardButton.backgroundHover};
    text-decoration: none;
  }

  &:active {
    background: ${({ theme }) => theme.colors.standardButton.backgroundActive};
  }

  &:disabled {
    background: ${({ theme }) =>
      theme.colors.standardButton.backgroundDisabled};
  }

  ${({ secondary }) => secondary && secondaryButton};
`

export default Button
