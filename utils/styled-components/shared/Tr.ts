import styled from "styled-components"

type StyleProps = {
  noHeader?: boolean
}

const Tr = styled.tr<StyleProps>`
  visibility: ${({ noHeader }) => (noHeader ? "hidden" : "visible")};

  &:hover {
    background: ${({ theme }) => theme.colors.tableCell.backgroundHover};
  }

  &:active {
    background: ${({ theme }) => theme.colors.tableCell.backgroundActive};
  }
`

export default Tr
