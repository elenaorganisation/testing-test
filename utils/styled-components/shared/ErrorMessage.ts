import styled from "styled-components"

const ErrorMessage = styled.div`
  padding: 16px;
  width: 100%;
  background: ${({ theme }) => theme.colors.errorMessage.background};
  box-shadow: ${({ theme }) => theme.boxShadows.loFiDefault};
  border-radius: 4px;
  font-size: 14px;
  text-align: left;
  margin-top: 8px;
`

export default ErrorMessage
