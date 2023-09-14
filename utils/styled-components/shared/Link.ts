import styled from "styled-components"

type StyleProps = {
  small?: boolean
}

const Link = styled.span<StyleProps>`
  font-size: ${({ small }) => (small ? "12px" : "14px")};
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export default Link
