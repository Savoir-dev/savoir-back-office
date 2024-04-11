import { Button, Dialog, Flex, Tabs, Text, TextField } from '@radix-ui/themes'
import { useEffect, useState, FC } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useForm } from 'react-hook-form'

import { space } from '../../../styles/const'
import {
  getInterestPointByInterestPointId,
  postInterestPoint,
  putInterestPoint,
} from '../../../services/interestPoints/interestPoints.services'
import {
  InterestPoint,
  InterestPointFromApi,
  InterestPointTranslation,
} from '../../../services/types/interestPoints.type'
import { CreateInterestPointForm } from './components/createInterestPointForm'

const formKey = 'interestPointFormState'

const convertToFormInterestPoint = (
  ip: InterestPointFromApi,
): InterestPoint => ({
  ...ip,
  latitude: ip.latitude.toString(),
  longitude: ip.longitude.toString(),
  image: undefined,
  interestPointTranslation: [],
})

interface InterestPointForm {
  isEditing?: boolean
  interestPoint?: InterestPointFromApi
  close: () => void
}

export const CreateInterestPointModal: FC<InterestPointForm> = ({
  isEditing,
  interestPoint,
  close,
}) => {
  console.log('interestPoint', interestPoint)

  const [translatedInterestPoints, setTranslatedInterestPoints] = useState<
    InterestPointTranslation[]
  >([
    {
      uid: interestPoint?.translations[0].uid || '',
      language: 'en',
      title: interestPoint?.translations[0].title || '',
      subtitle: interestPoint?.translations[0].subtitle || '',
      shortDesc: interestPoint?.translations[0].shortDesc || '',
      longDesc: interestPoint?.translations[0].longDesc || '',
      audioDesc: interestPoint?.translations[0].audioDesc || '',
      tags: interestPoint?.translations[0].tags || [],
      information: interestPoint?.translations[0].information || '',
      audio_en: interestPoint?.translations[0].audio || '',
      interestPointId: '',
    },
    {
      uid: interestPoint?.translations[1]?.uid || '',
      language: 'fr',
      title: interestPoint?.translations[1]?.title || '',
      subtitle: interestPoint?.translations[1]?.subtitle || '',
      shortDesc: interestPoint?.translations[1]?.shortDesc || '',
      longDesc: interestPoint?.translations[1]?.longDesc || '',
      audioDesc: interestPoint?.translations[1]?.audioDesc || '',
      tags: interestPoint?.translations[1]?.tags || [],
      information: interestPoint?.translations[1]?.information || '',
      audio_fr: interestPoint?.translations[1]?.audio || '',
      interestPointId: '',
    },
    {
      uid: interestPoint?.translations[2]?.uid || '',
      language: 'es',
      title: interestPoint?.translations[2]?.title || '',
      subtitle: interestPoint?.translations[2]?.subtitle || '',
      shortDesc: interestPoint?.translations[2]?.shortDesc || '',
      longDesc: interestPoint?.translations[2]?.longDesc || '',
      audioDesc: interestPoint?.translations[2]?.audioDesc || '',
      tags: interestPoint?.translations[2]?.tags || [],
      information: interestPoint?.translations[2]?.information || '',
      audio_es: interestPoint?.translations[2]?.audio || '',
      interestPointId: '',
    },
  ])

  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 41.38879,
    lng: 2.15899,
  })

  const { control: controlMainSettings, handleSubmit, reset, watch } = useForm<
    InterestPoint
  >({
    defaultValues: interestPoint
      ? convertToFormInterestPoint(interestPoint)
      : {
          duration: '',
          type: '',
          color: '',
          image: undefined,
          latitude: '',
          longitude: '',
        },
  })

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: InterestPoint) => {
      return isEditing ? putInterestPoint(data) : postInterestPoint(data)
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

  const handleInterestPointTranslation = (
    newTranslation: InterestPointTranslation,
  ) => {
    setTranslatedInterestPoints((prev) => {
      return prev.map((translation) => {
        return translation.language == newTranslation.language
          ? { ...newTranslation }
          : translation
      })
    })
  }

  const onSubmit = (data: InterestPoint) => {
    console.log('data-->', data)
    const adjustedData = {
      ...data,
      latitude: location.lat.toString(),
      longitude: location.lng.toString(),
      interestPointTranslation: translatedInterestPoints,
    }
    console.log('adjustedData-->', adjustedData)

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

  // const { data: interestPointByIdData } = useQuery({
  //   queryKey: ['interestPoints'],
  //   queryFn: () =>
  //     interestPoint && getInterestPointByInterestPointId(interestPoint?.uid),
  //   select: (data): InterestPointFromApi => data?.data,
  // })

  return (
    <Dialog.Content onPointerDownOutside={close} maxWidth={'1200px'}>
      <Dialog.Title>
        {isEditing ? 'Edit' : 'Create'} a new interest point
      </Dialog.Title>
      <Tabs.Root defaultValue="en">
        <Tabs.List color="orange" style={{ marginBottom: space[2] }}>
          <Flex align="center">
            {translatedInterestPoints?.map((interestPointTranslation) => {
              return (
                <Tabs.Trigger
                  value={interestPointTranslation.language}
                  key={interestPointTranslation.language}
                  style={{ marginRight: space[2] }}
                >
                  <Text>{interestPointTranslation.language}</Text>
                </Tabs.Trigger>
              )
            })}
          </Flex>
        </Tabs.List>
        <form onSubmit={handleSubmit(onSubmit)}>
          {translatedInterestPoints?.map((interestPointTranslation, i) => {
            return (
              <Tabs.Content
                key={interestPointTranslation.language}
                value={interestPointTranslation.language}
              >
                <CreateInterestPointForm
                  local={interestPointTranslation.language}
                  handleSubmit={handleInterestPointTranslation}
                  isOriginal={i === 0}
                  setLocation={setLocation}
                  location={location}
                  controlMainSettings={controlMainSettings}
                  interestPointTranslation={interestPointTranslation}
                />
              </Tabs.Content>
            )
          })}
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
