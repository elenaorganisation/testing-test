import styled from "styled-components"

type StyleProps = {
  isLoading?: Boolean
}

const StyledSvg = styled.svg<StyleProps>`
  path {
    fill: ${({ isLoading, theme }) => isLoading && theme.colors.lightGrey};
  }
`

export default StyledSvg
