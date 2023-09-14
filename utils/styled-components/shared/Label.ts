import styled from "styled-components"

type StyleProps = {
  small?: boolean
  large?: boolean
  margin?: string
  marginBottom?: string
}

// To render as different HTML element (h2, h3, h4,...) use as prop (e.g. as="h2")
const Label = styled.div<StyleProps>`
  font-size: ${({ small, large }) =>
    small ? "0.55em" : large ? "0.7em" : "0.6em"};
  font-weight: 700;
  margin: ${({ margin }) => margin && margin};
  margin-bottom: ${({ marginBottom }) => marginBottom && marginBottom};
`

export default Label
