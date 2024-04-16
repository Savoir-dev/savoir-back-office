import { FC, useEffect } from 'react'

import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  getNewsByUid,
  postNews,
} from '../../../services/routes/guidesAndNews/guidesAndNews.services'

import {
  Controller,
  useForm,
  SubmitHandler,
  useFieldArray,
} from 'react-hook-form'

import { FilePicker } from '../../../components/atoms/FilePicker'
import { Button, Dialog, Flex, Tabs, Text, TextArea } from '@radix-ui/themes'
import { Image } from 'lucide-react'

import {
  Guide,
  News,
  NewsPost,
} from '../../../services/routes/guidesAndNews/guidesAndNews.type'
import { CreateNewsForm } from './components/createNewsForm'
import { space } from '../../../styles/const'
interface Props {
  close: () => void
  news?: News
  isEditing?: boolean
}

export const CreateNewsModal: FC<Props> = ({ close, news, isEditing }) => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (news: NewsPost) => {
      return postNews(news)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['news'],
      })
      close()
    },
  })

  const { data: newsData, isLoading: isNewsDataLoading } = useQuery({
    queryKey: 'newsPointByUid',
    queryFn: () => getNewsByUid(news?.uid),
    select: (data) => data.data,
    enabled: !!news?.uid,
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
        translations: newsById.translations.map((t) => ({
          ...t,
        })),
      })
    }
  }, [newsData, reset])

  const { fields } = useFieldArray({
    control,
    name: 'translations',
  })

  const onSubmit: SubmitHandler<Guide> = (data) => {
    mutate(data)
  }

  return (
    <Dialog.Content>
      <Flex direction="column" gap="2">
        <Tabs.Root defaultValue="en">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap="4">
              <Dialog.Title>Create new news</Dialog.Title>
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
                    isOriginal={index === 0}
                  />
                </Tabs.Content>
              ))}
              <Flex justify="end" gap="2">
                <Dialog.Close>
                  <Button variant="outline">Cancel</Button>
                </Dialog.Close>
                <Button type="submit" color="orange">
                  Submit
                </Button>
              </Flex>
            </Flex>
          </form>
        </Tabs.Root>
      </Flex>
    </Dialog.Content>
  )
}
