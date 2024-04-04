import { AspectRatio, Badge, Flex, Text } from '@radix-ui/themes'
import { colors, space } from '../../../styles/const'
import { InterestPoint } from '../../../services/types/interestPoints/interestPoints.type'
import styled from 'styled-components'

interface Props {
  interestPoint: InterestPoint
  selected: boolean
  order: number
  onSelect: () => void
}

export const InterestPointSelectableCard = ({
  interestPoint,
  selected,
  order,
  onSelect,
}: Props) => {
  return (
    <div style={{ position: 'relative' }}>
      {selected && <OrderNumber>{order}</OrderNumber>}
      <Card
        key={interestPoint.title}
        style={{ cursor: 'pointer' }}
        isSelected={selected}
        onClick={onSelect}
      >
        <AspectRatio ratio={12 / 5}>
          <img
            src={interestPoint.image}
            alt="interest point image"
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              borderRadius: space[1],
            }}
          />
        </AspectRatio>
        <Flex style={{ marginTop: space[2] }} direction="column" gap="1">
          <Text size="4" weight="bold">
            {interestPoint.title}
          </Text>
          <Text size="2" weight="bold">
            {interestPoint.subtitle}
          </Text>
          <Text size="2" style={{ textDecoration: 'underline' }}>
            {interestPoint.isWalkingTour ? 'Walking tour' : 'What is this ?'}
          </Text>
          <Text size="2">{interestPoint.shortDescription}</Text>
          <Flex gap="1">
            {interestPoint.tags.map((tag, index) => (
              <Badge color="orange" key={index}>
                {tag}
              </Badge>
            ))}
          </Flex>
          <Text size="2">By {interestPoint.guide}</Text>
        </Flex>
      </Card>
    </div>
  )
}

const OrderNumber = styled.div`
  position: absolute;
  display: flex;
  font-weight: bold;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  font-size: 16px;
  background-color: orange;
  color: white;
  border-radius: ${space[2]} 0 ${space[2]} 0;
  z-index: 1;
`

const Card = styled.div<{ isSelected: boolean }>`
  padding: ${space[3]};
  border-radius: ${space[2]};
  border: ${(props) => (props.isSelected ? 'orange' : colors.lightSmoke)} 1px
    solid;
  background-color: white;
  display: flex;
  flex-direction: column;
`
