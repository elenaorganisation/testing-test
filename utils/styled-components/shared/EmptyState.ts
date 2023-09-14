import styled from "styled-components"

type StyleProps = {
  normalTextWidth?: boolean
  padding?: string
}

const EmptyState = styled.div<StyleProps>`
  font-weight: ${({ normalTextWidth }) => (normalTextWidth ? 400 : 700)};
  font-size: 14px;
  text-align: center;
  padding: ${({ padding }) => (padding ? padding : "72px 0")};
`

export default EmptyState
