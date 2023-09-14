import { css } from "styled-components"

const skeletonLoaderAnimation = css`
  animation: skeleton-loading 1s linear infinite alternate;

  @keyframes skeleton-loading {
    0% {
      background-color: hsl(0, 0%, 92%);
    }
    100% {
      background-color: hsl(0, 0%, 85%);
    }
  }
`

export default skeletonLoaderAnimation
