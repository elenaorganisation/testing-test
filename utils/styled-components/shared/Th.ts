import styled from "styled-components"

type StyleProps = {
  isLoading?: boolean
  isSorting?: boolean
}

const Th = styled.th<StyleProps>`
  pointer-events: ${({ isLoading }) => (isLoading ? "none" : "auto")};
  text-align: left;
  font-size: 14px;
  line-height: 20px;
  padding: 21px 16px;
  border-radius: 4px 4px 0px 0px;
  background: ${({ isSorting, theme }) =>
    isSorting ? theme.colors.tableCell.backgroundSelected : "transparent"};
  border-bottom: 1px solid ${({ theme }) => theme.colors.tableCell.border};

  &:hover {
    background: ${({ theme }) => theme.colors.tableCell.backgroundHover};
  }

  &:active {
    background: ${({ theme }) => theme.colors.tableCell.backgroundActive};
  }

  & svg {
    max-width: none;
  }

  & * {
    pointer-events: none;
  }
`

export default Th
