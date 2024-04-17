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
    queryKey: ['interestPointByUid', interestPoint?.uid],
    queryFn: () => getInterestPointByInterestPointId(interestPoint?.uid),
    enabled: !!interestPoint?.uid,
  })

  const [location, setLocation] = useState<{ lat: string; lng: string }>({
    lat: '41.38879',
    lng: '2.15899',
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
      image: null,
      translations: ['en', 'fr', 'es'].map((lang) => ({
        uid: '',
        language: lang,
        title: '',
        subtitle: '',
        shortDesc: '',
        longDesc: '',
        audioDesc: '',
        tags: [],
        information: '',
        audio: null,
        audioUrl: '',
        interestPointId: '',
      })),
    },
  })

  const { fields, append } = useFieldArray({
    control,
    name: 'translations',
  })

  useEffect(() => {
    if (interestPointData && isEditing) {
      setLocation({
        lat: interestPointData.latitude.toString(),
        lng: interestPointData.longitude.toString(),
      })

      reset({
        duration: interestPointData.duration,
        type: interestPointData.type,
        color: interestPointData.color,
        guide: interestPointData.guide,
        latitude: interestPointData.latitude.toString(),
        longitude: interestPointData.longitude.toString(),
        image: null,
        imageUrl: interestPointData.imageUrl,
        translations: [],
      })

      interestPointData.translations.forEach((t) => {
        append({
          uid: t.uid,
          language: t.language,
          title: t.title,
          subtitle: t.subtitle,
          shortDesc: t.shortDesc,
          longDesc: t.longDesc,
          audioDesc: t.audioDesc,
          tags: t.tags,
          information: t.information,
          audio: null,
          audioUrl: t.audioUrl,
        })
      })
    }
  }, [interestPointData, reset])

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: InterestPoint) => {
      return isEditing
        ? putInterestPoint(data, interestPoint?.uid)
        : postInterestPoint(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey.includes('interestPoints') ||
          query.queryKey.includes('interestPointByUid') ||
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

  if (interestPointDataLoading) return <div>Loading...</div>

  return (
    <Dialog.Content onPointerDownOutside={close} maxWidth={'1200px'}>
      <Dialog.Title>
        {isEditing ? 'Edit' : 'Create'} a new interest point
      </Dialog.Title>
      <Tabs.Root defaultValue="en">
        <Tabs.List color="orange" style={{ marginBottom: space[2] }}>
          <Flex align="center">
            {['en', 'fr', 'es'].map((language) => {
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
                isLinkedToItinerary={interestPoint?.isLinkedToItinerary}
                index={index}
                control={control}
                interestPointTranslation={field}
                isOriginal={field.language === 'en'}
                setLocation={setLocation}
                getValues={getValues}
                setValue={setValue}
                watch={watch}
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
