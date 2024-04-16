import { Button, Card, Dialog, Flex, Grid, Text } from '@radix-ui/themes'
import { space } from '../../../styles/const'
import { useQuery } from 'react-query'
import { getGuides } from '../../../services/routes/guidesAndNews/guidesAndNews.services'
import { Guide } from '../../../services/routes/guidesAndNews/guidesAndNews.type'
import { AxiosResponse } from 'axios'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { CreateGuideModal } from './createGuideModal'

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
    setIsDialogOpen(false)
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
              <Dialog.Content></Dialog.Content>
            )}
          </Card>
        ))}
      </Grid>
    </Dialog.Root>
  )
}
