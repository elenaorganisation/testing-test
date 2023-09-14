import styled from "styled-components"

type StyleProps = {
  lightPurple?: boolean
  bottom?: string
  right?: string
}

const VersionLabel = styled.div<StyleProps>`
  position: absolute;
  font-weight: ${({ lightPurple }) => (lightPurple ? 400 : 700)};
  font-size: 14px;
  line-height: 20px;
  border: none;
  padding: 12px 20px;
  color: ${({ theme, lightPurple }) =>
    lightPurple ? theme.colors.purpleSecondary40 : theme.colors.middleGrey};
  bottom: ${({ bottom }) => bottom || "50px"};
  right: ${({ right }) => right || "unset"};
`

export default VersionLabel
