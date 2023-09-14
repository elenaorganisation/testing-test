import styled, { css } from "styled-components"

function getWidth(size: number, axis: string): number {
  return axis === "vertical" ? 1 : size
}

function getHeight(size: number, axis: string): number {
  return axis === "horizontal" ? 1 : size
}

type StyleProps = {
  size?: number
  axis?: string
  // To specify
  when?: any
}

const Spacer = styled.span<StyleProps>`
  display: block;
  width: ${({ size, axis }) => getWidth(size, axis)}px;
  min-width: ${({ size, axis }) => getWidth(size, axis)}px;
  height: ${({ size, axis }) => getHeight(size, axis)}px;
  min-height: ${({ size, axis }) => getHeight(size, axis)}px;

  ${({ theme, axis, when }) =>
    when &&
    when.sm &&
    css`
      @media (${theme.mediaQueries.sm}) {
        width: ${getWidth(when.sm, axis)}px;
        min-width: ${getWidth(when.sm, axis)}px;
        height: ${getHeight(when.sm, axis)}px;
        min-height: ${getHeight(when.sm, axis)}px;
      }
    `}

  ${({ theme, axis, when }) =>
    when &&
    when.md &&
    css`
      @media (${theme.mediaQueries.md}) {
        width: ${getWidth(when.md, axis)}px;
        min-width: ${getWidth(when.md, axis)}px;
        height: ${getHeight(when.md, axis)}px;
        min-height: ${getHeight(when.md, axis)}px;
      }
    `}

    ${({ theme, axis, when }) =>
    when &&
    when.lg &&
    css`
      @media (${theme.mediaQueries.lg}) {
        width: ${getWidth(when.lg, axis)}px;
        min-width: ${getWidth(when.lg, axis)}px;
        height: ${getHeight(when.lg, axis)}px;
        min-height: ${getHeight(when.lg, axis)}px;
      }
    `}

    ${({ theme, axis, when }) =>
    when &&
    when.xl &&
    css`
      @media (${theme.mediaQueries.xl}) {
        width: ${getWidth(when.xl, axis)}px;
        min-width: ${getWidth(when.xl, axis)}px;
        height: ${getHeight(when.xl, axis)}px;
        min-height: ${getHeight(when.xl, axis)}px;
      }
    `}
`
export default Spacer
