import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  Spinner,
  Text,
} from '@radix-ui/themes'
import { InterestPointFromApi } from '../../../../services/types/interestPoints/interestPoints.type'
import { space } from '../../../../styles/const'
import AudioPlayer from 'react-h5-audio-player'
import styled from 'styled-components'
import { MapPin, Trash } from 'lucide-react'
import { useState } from 'react'
import { CreateInterestPointModal } from '../createInterestPointModal'
import { deleteInterestPointByInterestPointId } from '../../../../services/interestPoints/interestPoints.services'
import { useMutation } from 'react-query'

export const InterestPointCard = ({
  interestPoint,
}: {
  interestPoint: InterestPointFromApi
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)

  const onCloseDialog = () => {
    setIsEditing(false)
    setIsDialogOpen(false)
  }

  const mutate = useMutation({
    mutationFn: (id: number) => {
      console.log('test')
      return deleteInterestPointByInterestPointId(id)
    },
    onSuccess: () => {
      setIsDeleteLoading(false)
      setIsDialogOpen(false)
    },
  })

  const deleteInterestPoint = (id: number) => {
    setIsDeleteLoading(true)
    mutate.mutate(id)
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
      {isEditing ? (
        <CreateInterestPointModal interestPoint={interestPoint} />
      ) : (
        <Dialog.Content onPointerDownOutside={onCloseDialog}>
          <Dialog.Title>Delete user</Dialog.Title>
          <Dialog.Description>
            Are you sure you want to delete this user?
          </Dialog.Description>
          <Card style={{ margin: `${space[4]} 0` }}>
            <Flex justify="between">
              <Flex direction="column">
                <Text size="3" weight="bold">
                  Name
                </Text>
                <Text size="3">{interestPoint.title}</Text>
              </Flex>
            </Flex>
          </Card>
          <Flex gap="2" justify="end" align="center">
            {isDeleteLoading && <Spinner />}
            <Button
              disabled={isDeleteLoading}
              color="red"
              onClick={() => deleteInterestPoint(interestPoint.id)}
            >
              Delete
            </Button>
            <Button variant="outline" onClick={onCloseDialog}>
              Cancel
            </Button>
          </Flex>
        </Dialog.Content>
      )}
    </Dialog.Root>
  )
}

const CustomAudioStyled = styled(AudioPlayer)`
  box-shadow: none;
`
