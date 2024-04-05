import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  Text,
} from '@radix-ui/themes'
import { InterestPointFromApi } from '../../../../services/types/interestPoints/interestPoints.type'
import { space } from '../../../../styles/const'
import AudioPlayer from 'react-h5-audio-player'
import styled from 'styled-components'
import { MapPin, Trash } from 'lucide-react'
import { useState } from 'react'

export const InterestPointCard = ({
  interestPoint,
}: {
  interestPoint: InterestPointFromApi
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const onCloseDialog = () => {
    setIsEditing(false)
    setIsDialogOpen(false)
  }

  return (
    <Dialog.Root open={isDialogOpen}>
      <Card key={interestPoint.title}>
        <Flex
          gap="2"
          position="absolute"
          style={{ zIndex: 1, top: space[5], left: space[5] }}
        >
          <Button size="1" color="red" onClick={() => setIsDialogOpen(true)}>
            <Trash size={16} />
          </Button>
          <Button
            size="1"
            color="orange"
            onClick={() => {
              setIsEditing(true)
              setIsDialogOpen(true)
            }}
          >
            Edit
          </Button>
        </Flex>
        <AspectRatio ratio={14 / 7}>
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
          <Flex align="center" gap="1">
            <MapPin color={interestPoint.color} size={16} />
            <Text size="4" weight="bold">
              {interestPoint.title}
            </Text>
          </Flex>
          <Text>
            {interestPoint.latitude}, {interestPoint.longitude}
          </Text>
          <Text size="2" weight="bold">
            {interestPoint.subtitle}
          </Text>
          <Text size="2" style={{ textDecoration: 'underline' }}>
            {interestPoint.type}
          </Text>
          <Text size="2">{interestPoint.shortDesc}</Text>
          <Flex gap="1">
            {interestPoint.tags.map((tag, index) => (
              <Badge color="orange" key={index}>
                {tag}
              </Badge>
            ))}
          </Flex>
          <CustomAudioStyled src={interestPoint.audio} />
          <Text size="2">By {interestPoint.guide}</Text>
        </Flex>
      </Card>
      <Dialog.Content onPointerDownOutside={onCloseDialog}>
        <Card>
          <Text size="4" weight="bold">
            {interestPoint.title}
          </Text>
          <Text size="2">{interestPoint.longDesc}</Text>
          <Text size="2">{interestPoint.information}</Text>
        </Card>
      </Dialog.Content>
    </Dialog.Root>
  )
}

const CustomAudioStyled = styled(AudioPlayer)`
  box-shadow: none;
`
