import { AspectRatio, Badge, Flex, Text } from '@radix-ui/themes'
import styled from 'styled-components'
import { FC } from 'react'

import { colors, space } from '../../../styles/const'
import { InterestPointFromApi } from '../../../services/types/interestPoints.type'

interface Props {
  interestPoint: InterestPointFromApi
  selected: boolean
  order: number
  onSelect: () => void
}

export const InterestPointSelectableCard: FC<Props> = ({
  interestPoint,
  selected,
  order,
  onSelect,
}) => {
  return (
    <div style={{ position: 'relative' }}>
      {selected && <OrderNumber>{order}</OrderNumber>}
      <Card
        key={interestPoint.translations[0].uid}
        style={{ cursor: 'pointer' }}
        $isSelected={selected}
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
            {interestPoint.translations[0].title}
          </Text>
          <Text size="2" weight="bold">
            {interestPoint.translations[0].subtitle}
          </Text>
          <Text size="2" style={{ textDecoration: 'underline' }}>
            {interestPoint.type ? 'Walking tour' : 'What is this ?'}
          </Text>
          <Text size="2">{interestPoint.translations[0].shortDesc}</Text>
          <Flex gap="1">
            {interestPoint.translations[0].tags.map((tag, index) => (
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

const Card = styled.div<{ $isSelected: boolean }>`
  padding: ${space[3]};
  border-radius: ${space[2]};
  border: ${(props) => (props.$isSelected ? 'orange' : colors.lightSmoke)} 1px
    solid;
  background-color: white;
  display: flex;
  flex-direction: column;
`
