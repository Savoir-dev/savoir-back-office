import { FC, useEffect } from 'react'

import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  getGuideByUid,
  postGuide,
  putGuide,
} from '../../../services/routes/guidesAndNews/guidesAndNews.services'

import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'

import { Dialog, Flex, Tabs, Text } from '@radix-ui/themes'

import { Guide } from '../../../services/routes/guidesAndNews/guidesAndNews.type'
import { space } from '../../../styles/const'
import { CreateGuideForm } from './components/createGuideForm'
import { Button } from '../../../components/atoms/button'
interface Props {
  close: () => void
  isEditing?: boolean
  guide?: Guide
}

export const CreateGuideModal: FC<Props> = ({ close, guide }) => {
  const queryClient = useQueryClient()

  const { mutate, isLoading: isGuideDataLoading } = useMutation({
    mutationFn: (newGuide: Guide) => {
      return guide ? putGuide(guide.uid, newGuide) : postGuide(newGuide)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['guides'],
      })
      queryClient.invalidateQueries({
        queryKey: ['guideByUid'],
      })
      close()
    },
  })

  const { data: guideData } = useQuery({
    queryKey: 'guideByUid',
    queryFn: () => getGuideByUid(guide?.uid),
    select: (data) => data.data,
    enabled: !!guide?.uid,
  })

  const guideById = guideData?.data

  const { control, handleSubmit, reset } = useForm<Guide>({
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
    if (guideData) {
      reset({
        image: guideById.image ? new File([], guideById.image) : undefined,
        translations: guideById.translations.map((t: Guide) => ({
          ...t,
        })),
      })
    }
  }, [guideData, reset])

  const { fields } = useFieldArray({
    control,
    name: 'translations',
  })

  const onSubmit: SubmitHandler<Guide> = (data) => {
    mutate(data)
  }

  return (
    <Dialog.Content onPointerDownOutside={close}>
      <Flex direction="column" gap="2">
        <Flex direction="column" gap="4">
          <Dialog.Title>{guide ? 'Edit' : 'Create'} new Guide</Dialog.Title>
          <Tabs.Root defaultValue="en">
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
            <form onSubmit={handleSubmit(onSubmit)}>
              {fields.map((field, index) => (
                <Tabs.Content key={field.id} value={field.language}>
                  <CreateGuideForm
                    index={index}
                    control={control}
                    guideTranslation={field}
                  />
                </Tabs.Content>
              ))}
              <Flex style={{ marginTop: space[2] }} justify="end" gap="2">
                <Dialog.Close>
                  <Button variant="outline" onClick={close}>
                    Cancel
                  </Button>
                </Dialog.Close>
                <Button
                  disabled={!!isGuideDataLoading}
                  type="submit"
                  color="orange"
                >
                  {guide ? 'Edit' : 'Create'}
                </Button>
              </Flex>
            </form>
          </Tabs.Root>
        </Flex>
      </Flex>
    </Dialog.Content>
  )
}
