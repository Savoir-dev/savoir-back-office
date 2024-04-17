import { Card, Dialog, Flex, Grid, Text } from '@radix-ui/themes'
import { AxiosResponse } from 'axios'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { space } from '../../../styles/const'
import {
  deleteNews,
  getNews,
} from '../../../services/routes/guidesAndNews/guidesAndNews.services'
import { News } from '../../../services/routes/guidesAndNews/guidesAndNews.type'
import { CreateNewsModal } from './createNewsModal'
import { Button } from '../../../components/atoms/button'

export const NewsList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const { data: newsData } = useQuery({
    queryKey: ['news'],
    queryFn: () => {
      return getNews()
    },
    select: (data): AxiosResponse<News[]> => data.data,
  })

  const news = newsData?.data || []

  const onCloseModal = () => {
    setIsDialogOpen(false)
  }

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (uid: string) => {
      return deleteNews(uid)
    },
    onSuccess: () => {
      setIsDialogOpen(false)
      queryClient.invalidateQueries({
        queryKey: ['news'],
      })
    },
  })

  const onDeleteNews = (uid: string) => {
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
        {news.map((item, index) => (
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
                  item.image instanceof File
                    ? URL.createObjectURL(item.image)
                    : item.image
                }
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
                  <Text>{item.translations[0].title}</Text>
                </Flex>
                <Flex direction="column">
                  <Text size="3" weight="bold">
                    Subtitle
                  </Text>
                  <Text>{item.translations[0].subtitle}</Text>
                </Flex>
              </Flex>
            </Flex>
            {isDialogOpen && isEditing ? (
              <CreateNewsModal close={onCloseModal} newsUid={item.uid} />
            ) : (
              <Dialog.Content onPointerDownOutside={onCloseModal}>
                <Dialog.Title>Delete News</Dialog.Title>
                <Dialog.Description>
                  Are you sure you want to delete this news?
                </Dialog.Description>
                <Card style={{ margin: `${space[4]} 0` }}>
                  <Flex justify="between">
                    <Flex direction="column">
                      <Text size="3" weight="bold">
                        Name
                      </Text>
                      <Text size="3">{item.translations[0].title}</Text>
                    </Flex>
                  </Flex>
                </Card>
                <Flex gap="2" justify="end" align="center">
                  <Button color="red" onClick={() => onDeleteNews(item.uid)}>
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
