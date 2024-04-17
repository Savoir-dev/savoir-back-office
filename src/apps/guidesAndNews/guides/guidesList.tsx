import { Card, Dialog, Flex, Grid, Text } from '@radix-ui/themes'
import { space } from '../../../styles/const'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  deleteGuide,
  getGuides,
} from '../../../services/routes/guidesAndNews/guidesAndNews.services'
import { Guide } from '../../../services/routes/guidesAndNews/guidesAndNews.type'
import { AxiosResponse } from 'axios'
import { useState } from 'react'
import { CreateGuideModal } from './createGuideModal'
import { Button } from '../../../components/atoms/button'

export const GuidesList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const { data: guidesData } = useQuery({
    queryKey: ['guides'],
    queryFn: () => {
      return getGuides()
    },
    select: (data): AxiosResponse<Guide[]> => data.data,
  })

  const guides = guidesData?.data || []

  const onCloseModal = () => {
    setIsEditing(false)
    setIsDialogOpen(false)
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

  const onDeleteGuide = (uid: string) => {
    mutate(uid)
  }

  return (
    <Dialog.Root open={isDialogOpen}>
      <Grid
        columns="3"
        gap="3"
        width="auto"
        style={{
          marginTop: space[3],
        }}
      >
        {guides.map((guide, index) => (
          <Card key={index}>
            <Flex
              gap="2"
              position="absolute"
              style={{ zIndex: 1, top: space[5], left: space[5] }}
            >
              <Button
                size="1"
                color="red"
                onClick={() => setIsDialogOpen(true)}
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
                src={
                  guide.image instanceof File
                    ? URL.createObjectURL(guide.image)
                    : guide.image
                }
                alt="guide image"
                style={{
                  objectFit: 'cover',
                  width: '200px',
                  borderRadius: space[1],
                }}
              />
              <Flex direction="column">
                <Flex direction="column">
                  <Text size="3" weight="bold">
                    Short description
                  </Text>
                  <Text>test</Text>
                </Flex>
                <Flex direction="column">
                  <Text size="3" weight="bold">
                    Long description
                  </Text>
                  <Text>test</Text>
                </Flex>
              </Flex>
            </Flex>
            {isDialogOpen && isEditing ? (
              <CreateGuideModal
                close={onCloseModal}
                guide={guide}
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
                  <Button
                    color="orange"
                    variant="outline"
                    onClick={onCloseModal}
                  >
                    Cancel
                  </Button>
                </Flex>
              </Dialog.Content>
            )}
          </Card>
        ))}
      </Grid>
    </Dialog.Root>
  )
}
