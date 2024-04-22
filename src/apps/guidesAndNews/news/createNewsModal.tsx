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
  isEditing?: boolean
}

export const CreateNewsModal: FC<Props> = ({ close, newsUid, isEditing }) => {
  const queryClient = useQueryClient()

  const { data: newsById, isLoading: isNewsDataLoading } = useQuery({
    queryKey: ['newsPointByUid', newsUid],
    queryFn: () => getNewsByUid(newsUid),
    enabled: !!newsUid,
  })

  const { control, handleSubmit, reset, watch, setValue, getValues } = useForm<
    News
  >({
    defaultValues: {
      image: null,
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

  const { fields } = useFieldArray({
    control,
    name: 'translations',
  })

  useEffect(() => {
    if (newsById && isEditing) {
      reset({
        image: null,
        imageUrl: newsById?.imageUrl,
        translations: newsById?.translations.map((t: NewsTranslation) => ({
          ...t,
        })),
      })
    }
  }, [newsById, reset])

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

  const onSubmit: SubmitHandler<News> = (data) => {
    mutate(data)
  }

  if (isNewsDataLoading) return <div>Loading...</div>

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
                    getValues={getValues}
                    setValue={setValue}
                    watch={watch}
                    isOriginal={field.language === 'en'}
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
