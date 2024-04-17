import { FC, useEffect } from 'react'

import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  getNewsByUid,
  postNews,
  putNews,
} from '../../../services/routes/guidesAndNews/guidesAndNews.services'

import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'

import { Dialog, Flex, Tabs, Text } from '@radix-ui/themes'

import {
  News,
  NewsTranslation,
} from '../../../services/routes/guidesAndNews/guidesAndNews.type'
import { CreateNewsForm } from './components/createNewsForm'
import { space } from '../../../styles/const'
import { Button } from '../../../components/atoms/button'
interface Props {
  newsUid?: News['uid']
  close: () => void
}

export const CreateNewsModal: FC<Props> = ({ close, newsUid }) => {
  const queryClient = useQueryClient()

  const { mutate, isLoading: isNewNewsPostLoading } = useMutation({
    mutationFn: (news: News) => {
      return newsUid ? putNews(newsUid, news) : postNews(news)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['news'],
      })
      queryClient.invalidateQueries({
        queryKey: ['newsPointByUid'],
      })
      close()
    },
  })

  const { data: newsData } = useQuery({
    queryKey: 'newsPointByUid',
    queryFn: () => getNewsByUid(newsUid),
    select: (data) => data.data,
    enabled: !!newsUid,
  })

  const newsById = newsData?.data

  const { control, handleSubmit, reset } = useForm<News>({
    defaultValues: {
      image: '',
      translations: [
        {
          language: 'en',
          title: '',
          subtitle: '',
          shortDesc: '',
          longDesc: '',
        },
        {
          language: 'fr',
          title: '',
          subtitle: '',
          shortDesc: '',
          longDesc: '',
        },
        {
          language: 'es',
          title: '',
          subtitle: '',
          shortDesc: '',
          longDesc: '',
        },
      ],
    },
  })

  useEffect(() => {
    if (newsData) {
      reset({
        image: newsById.image ? new File([], newsById.image) : undefined,
        translations: newsById.translations.map((t: NewsTranslation) => ({
          ...t,
        })),
      })
    }
  }, [newsData, reset])

  const { fields } = useFieldArray({
    control,
    name: 'translations',
  })

  const onSubmit: SubmitHandler<News> = (data) => {
    mutate(data)
  }

  return (
    <Dialog.Content onPointerDownOutside={close}>
      <Flex direction="column" gap="2">
        <Tabs.Root defaultValue="en">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap="4">
              <Dialog.Title>
                {newsUid ? 'Edit' : 'Create'} new news
              </Dialog.Title>
              <Tabs.List color="orange" style={{ marginBottom: space[2] }}>
                <Flex align="center">
                  {['en', 'fr', 'es']?.map((language) => {
                    return (
                      <Tabs.Trigger
                        value={language}
                        key={language}
                        style={{ marginRight: space[2] }}
                      >
                        <Text>{language}</Text>
                      </Tabs.Trigger>
                    )
                  })}
                </Flex>
              </Tabs.List>
              {fields.map((field, index) => (
                <Tabs.Content key={field.id} value={field.language}>
                  <CreateNewsForm
                    index={index}
                    control={control}
                    newsTranslation={field}
                  />
                </Tabs.Content>
              ))}
              <Flex style={{ marginTop: space[2] }} justify="end" gap="2">
                <Dialog.Close>
                  <Button
                    variant="outline"
                    onClick={() => {
                      close()
                    }}
                  >
                    Cancel
                  </Button>
                </Dialog.Close>
                <Button
                  disabled={!!isNewNewsPostLoading}
                  type="submit"
                  color="orange"
                >
                  {newsUid ? 'Edit' : 'Create'}
                </Button>
              </Flex>
            </Flex>
          </form>
        </Tabs.Root>
      </Flex>
    </Dialog.Content>
  )
}
