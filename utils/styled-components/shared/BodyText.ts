import styled from "styled-components"

type StyleProps = {
  small?: boolean
  large?: boolean
  margin?: string
  marginBottom?: string
}

const BodyText = styled.div<StyleProps>`
  font-size: ${({ small, large }) =>
    small ? "0.6em" : large ? "0.8em" : "0.7em"};
  font-weight: 400;
  margin: ${({ margin }) => margin && margin};
  margin-bottom: ${({ marginBottom }) => marginBottom && marginBottom};
`

export default BodyText
