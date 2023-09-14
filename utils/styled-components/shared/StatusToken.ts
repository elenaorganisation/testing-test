import styled from "styled-components"

const StatusToken = styled.span`
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  padding: 4px 12px;
  background: ${({ theme }) => theme.colors.purple90};
  border-radius: 100px;
`

export default StatusToken
