import styled from 'styled-components'
import { FontSizeKey, colors, fontSize } from '../../styles/const'

interface Props {
  children: React.ReactNode
  size: FontSizeKey
  fontWeight?: string
  color?: string
  textAlign?: string
  onClick?: () => void
}

export const Text = ({
  children,
  size,
  color,
  fontWeight,
  textAlign,
  onClick,
  ...props
}: Props) => {
  return (
    <MainTextStyled
      onClick={onClick}
      size={size}
      color={color}
      textAlign={textAlign}
      fontWeight={fontWeight}
      {...props}
    >
      {children}
    </MainTextStyled>
  )
}

const MainTextStyled = styled.p<{
  size: FontSizeKey
  fontWeight?: string
  className?: string
  color?: string
  textAlign?: string
}>`
  font-size: ${(props) => `${fontSize[props.size]}`};
  color: ${(props) => (props.color ? props.color : colors.deepBlack)};
  font-weight: ${(props) => props.fontWeight || 'regular'};
  text-align: ${(props) => props.textAlign || 'left'};
`
