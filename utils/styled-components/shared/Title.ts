import styled, { css } from "styled-components"

type StyleProps = {
  small?: boolean
  large?: boolean
  margin?: string
  marginBottom?: string
  divider?: boolean
}

// Divider (line) under title
const divider = css`
  &::after {
    content: "";
    display: block;
    margin-top: 16px;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.purple95};
    width: 100%;
  }
`

// To render as different HTML element (h2, h3, h4,...) use as prop (e.g. as="h2")
const Title = styled.h1<StyleProps>`
  font-size: ${({ small, large }) =>
    small ? "0.7em" : large ? "1.2em" : "0.8em"};
  font-weight: 700;
  margin: ${({ margin }) => margin && margin};
  margin-bottom: ${({ marginBottom }) => marginBottom && marginBottom};
  ${props => props.divider && divider};

  @media (${({ theme }) => theme.mediaQueries.xl}) {
    font-size: ${({ small, large }) =>
      small ? "0.7em" : large ? "1.07em" : "0.8em"};
  }
`

export default Title
