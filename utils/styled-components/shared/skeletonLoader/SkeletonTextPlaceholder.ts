import styled from "styled-components"
import skeletonLoaderAnimation from "./skeletonLoaderAnimation"

type StyleProps = {
  small?: boolean
  height?: string
  maxWidth?: string
  marginTop?: string
  marginBottom?: string
  marginLeft?: string
  marginRight?: string
}

const SkeletonTextPlaceholder = styled.div<StyleProps>`
  position: relative;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth && maxWidth};
  border-radius: 4px;
  height: ${({ small, height }) => (small ? "16px" : height ? height : "20px")};
  background-color: ${({ theme }) =>
    theme.colors.skeletonLoader.textPlaceholder};
  margin-top: ${({ marginTop }) => marginTop};
  margin-bottom: ${({ marginBottom }) => marginBottom};
  margin-left: ${({ marginLeft }) => marginLeft};
  margin-right: ${({ marginRight }) => marginRight};

  ${skeletonLoaderAnimation};
`

export default SkeletonTextPlaceholder
