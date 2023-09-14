import styled from "styled-components"

const getDirection = (direction: Direction) => {
  switch (direction) {
    case Direction.UP:
      return -90
    case Direction.DOWN:
      return 90
    case Direction.LEFT:
      return -180
    default:
      return 0
  }
}

export enum Direction {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
}

export type StyleProps = {
  direction?: Direction
}

const IconWrapper = styled.div<StyleProps>`
  transform: rotate(
    ${({ direction = Direction.RIGHT }) => getDirection(direction)}deg
  );
  transition: transform 0.3s ease-out;
  cursor: pointer;
`

export default IconWrapper
