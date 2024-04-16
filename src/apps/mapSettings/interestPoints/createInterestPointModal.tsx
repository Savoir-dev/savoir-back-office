import { Button, Dialog, Flex, Tabs, Text } from '@radix-ui/themes'
import { useEffect, useState, FC } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useFieldArray, useForm } from 'react-hook-form'

import { space } from '../../../styles/const'
import {
  getInterestPointByInterestPointId,
  postInterestPoint,
  putInterestPoint,
} from '../../../services/routes/interestPoints/interestPoints.services'
import { InterestPoint } from '../../../services/types/interestPoints.type'

import { CreateInterestPointForm } from './components/createInterestPointForm'

const formKey = 'interestPointFormState'

interface InterestPointForm {
  isEditing?: boolean
  interestPoint?: InterestPoint
  close: () => void
}

export const CreateInterestPointModal: FC<InterestPointForm> = ({
  isEditing,
  interestPoint,
  close,
}) => {
  const queryClient = useQueryClient()
  const {
    data: interestPointData,
    isLoading: interestPointDataLoading,
  } = useQuery({
    queryKey: 'interestPointByUid',
    queryFn: () => getInterestPointByInterestPointId(interestPoint?.uid),
    enabled: !!interestPoint?.uid,
  })

  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 41.38879,
    lng: 2.15899,
  })

  const { control, handleSubmit, reset, watch, setValue, getValues } = useForm<
    InterestPoint
  >({
    defaultValues: {
      duration: '',
      type: '',
      color: '',
      guide: '',
      latitude: '',
      longitude: '',
      image: undefined,
      translations: [
        { language: 'en', tags: [], title: '', audio: undefined },
        { language: 'fr', tags: [], title: '', audio: undefined },
        { language: 'es', tags: [], title: '', audio: undefined },
      ],
    },
  })

  useEffect(() => {
    if (interestPointData) {
      reset({
        duration: interestPointData.duration,
        type: interestPointData.type,
        color: interestPointData.color,
        guide: interestPointData.guide,
        latitude: interestPointData.latitude.toString(),
        longitude: interestPointData.longitude.toString(),
        image: interestPointData.image
          ? new File([], interestPointData.image)
          : undefined,
        translations: interestPointData.translations.map((t) => ({
          ...t,
          audio: t.audio ? new File([], t.audio) : undefined,
        })),
      })
    }
  }, [interestPointData, reset])

  const { fields } = useFieldArray({
    control,
    name: 'translations',
  })

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: InterestPoint) => {
      console.log(data)
      return isEditing
        ? putInterestPoint(data, interestPoint?.uid)
        : postInterestPoint(data)
    },
    onSuccess: () => {
      sessionStorage.removeItem(formKey)

      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.includes('interestPoints') ||
          query.queryKey.includes('interestPointsByWalkingTour'),
      })

      close()
    },
  })

  const onSubmit = (data: InterestPoint) => {
    const adjustedData = {
      ...data,
      latitude: location.lat.toString(),
      longitude: location.lng.toString(),
    }

    mutate(adjustedData)
  }

  useEffect(() => {
    const savedFormState = sessionStorage.getItem(formKey)
    if (savedFormState) {
      reset({ ...JSON.parse(savedFormState), image: null })
    }
  }, [reset])

  useEffect(() => {
    const subscription = watch((value) => {
      sessionStorage.setItem(formKey, JSON.stringify(value))
    })
    return () => subscription.unsubscribe()
  }, [watch])

  if (interestPointDataLoading) return <div>Loading...</div>

  return (
    <Dialog.Content onPointerDownOutside={close} maxWidth={'1200px'}>
      <Dialog.Title>
        {isEditing ? 'Edit' : 'Create'} a new interest point
      </Dialog.Title>
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
              <CreateInterestPointForm
                index={index}
                control={control}
                interestPointTranslation={field}
                isOriginal={index === 0}
                setLocation={setLocation}
                getValues={getValues}
                setValue={setValue}
                location={location}
              />
            </Tabs.Content>
          ))}
          <Flex style={{ marginTop: space[4] }} justify="end" gap="2">
            <Button variant="outline" onClick={close}>
              Close
            </Button>
            <Button
              type="submit"
              color="orange"
              loading={isLoading}
              disabled={isLoading}
            >
              {isEditing ? 'Edit' : 'Create'}
            </Button>
          </Flex>
        </form>
      </Tabs.Root>
    </Dialog.Content>
  )
}
