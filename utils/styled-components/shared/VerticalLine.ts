import styled from "styled-components"

const VerticalLine = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.purpleSecondary};
  width: calc(100% + (2 * 16px));
  margin: 0 -16px;
`

export default VerticalLine
