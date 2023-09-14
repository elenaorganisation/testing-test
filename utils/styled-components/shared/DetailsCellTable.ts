import styled from "styled-components"

type StyleProps = {
  columns?: number | string
}

const DetailsCellTable = styled.div<StyleProps>`
  display: grid;
  grid-template-columns: repeat(${({ columns = 2 }) => columns}, 1fr);
  grid-gap: 28px;
`

export default DetailsCellTable
