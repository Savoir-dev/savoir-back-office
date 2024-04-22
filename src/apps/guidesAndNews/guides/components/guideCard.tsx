import { Card, Dialog, Flex, Text } from '@radix-ui/themes'
import { Button } from '../../../../components/atoms/button'
import { space } from '../../../../styles/const'
import { CreateGuideModal } from '../createGuideModal'
import { FC, useState } from 'react'
import { Guide } from '../../../../services/routes/guidesAndNews/guidesAndNews.type'
import { useMutation, useQueryClient } from 'react-query'
import { deleteGuide } from '../../../../services/routes/guidesAndNews/guidesAndNews.services'

interface Props {
  guide: Guide
}

export const GuideCard: FC<Props> = ({ guide }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const onCloseModal = () => {
    setIsEditing(false)
    setIsDialogOpen(false)
  }

  const onDeleteGuide = (uid: string) => {
    mutate(uid)
  }

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (uid: string) => {
      return deleteGuide(uid)
    },
    onSuccess: () => {
      setIsDialogOpen(false)
      queryClient.invalidateQueries({
        queryKey: ['guides'],
      })
    },
  })

  return (
    <Dialog.Root open={isDialogOpen}>
      <Card>
        <Flex
          gap="2"
          position="absolute"
          style={{ zIndex: 1, top: space[5], left: space[5] }}
        >
          <Button
            size="1"
            color="red"
            onClick={() => {
              setIsEditing(false)
              setIsDialogOpen(true)
            }}
          >
            <Text>Delete</Text>
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
        <Flex direction="column" gap="2">
          <img
            src={guide.imageUrl}
            alt="news image"
            style={{
              objectFit: 'cover',
              width: '200px',
              borderRadius: space[1],
            }}
          />
          <Flex direction="column">
            <Flex direction="column">
              <Text size="3" weight="bold">
                Title
              </Text>
              <Text>{guide.translations[0].title}</Text>
            </Flex>
            <Flex direction="column">
              <Text size="3" weight="bold">
                Subtitle
              </Text>
              <Text>{guide.translations[0].subtitle}</Text>
            </Flex>
          </Flex>
        </Flex>
        {isDialogOpen && isEditing ? (
          <CreateGuideModal
            close={onCloseModal}
            guideUid={guide.uid}
            isEditing={isEditing}
          />
        ) : (
          <Dialog.Content onPointerDownOutside={onCloseModal}>
            <Dialog.Title>Delete Guide</Dialog.Title>
            <Dialog.Description>
              Are you sure you want to delete this guide?
            </Dialog.Description>
            <Card style={{ margin: `${space[4]} 0` }}>
              <Flex justify="between">
                <Flex direction="column">
                  <Text size="3" weight="bold">
                    Name
                  </Text>
                  <Text size="3">{guide.translations[0].title}</Text>
                </Flex>
              </Flex>
            </Card>
            <Flex gap="2" justify="end" align="center">
              <Button color="red" onClick={() => onDeleteGuide(guide.uid)}>
                Delete
              </Button>
              <Button color="orange" variant="outline" onClick={onCloseModal}>
                Cancel
              </Button>
            </Flex>
          </Dialog.Content>
        )}
      </Card>
    </Dialog.Root>
  )
}
