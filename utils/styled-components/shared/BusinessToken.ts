import styled from "styled-components"

const BusinessToken = styled.div`
  background: ${({ theme }) => theme.colors.bluePrimary};
  color: ${({ theme }) => theme.colors.textLight};
  height: 20px;
  width: 20px;
  font-weight: 700;
  font-size: 11px;
  line-height: 20px;
  border-radius: 4px;
  text-align: center;
`

export default BusinessToken
