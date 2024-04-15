import { Button, Dialog, Flex, Tabs, Text, TextField } from '@radix-ui/themes'
import { useEffect, useState, FC } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { set, useForm } from 'react-hook-form'

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
import { AxiosResponse } from 'axios'

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
  selectedInterestPointUid?: string
  close: () => void
}

export const CreateInterestPointModal: FC<InterestPointForm> = ({
  isEditing,
  interestPoint,
  selectedInterestPointUid,
  close,
}) => {
  const { data: interestPointData, refetch: refetchInterestPoint } = useQuery({
    queryKey: 'interestPointByUid',
    queryFn: () => getInterestPointByInterestPointId(interestPoint?.uid),
    select: (data): AxiosResponse<InterestPointFromApi[]> => data.data,
    enabled: !!selectedInterestPointUid,
  })

  const editableInterestPoint = interestPointData?.data

  const enEditableInterestPoint = editableInterestPoint?.find((i) => {
    return i.language === 'en'
  })

  const frEditableInterestPoint = editableInterestPoint?.find((i) => {
    return i.language === 'fr'
  })

  const esEditableInterestPoint = editableInterestPoint?.find((i) => {
    return i.language === 'es'
  })

  const [translatedInterestPoints, setTranslatedInterestPoints] = useState<
    InterestPointTranslation[]
  >([
    {
      uid: '',
      language: 'en',
      title: '',
      subtitle: '',
      shortDesc: '',
      longDesc: '',
      audioDesc: '',
      tags: [],
      information: '',
      audio_en: '',
      interestPointId: '',
    },
    {
      uid: '',
      language: 'fr',
      title: '',
      subtitle: '',
      shortDesc: '',
      longDesc: '',
      audioDesc: '',
      tags: [],
      information: '',
      audio_fr: '',
      interestPointId: '',
    },
    {
      uid: '',
      language: 'es',
      title: '',
      subtitle: '',
      shortDesc: '',
      longDesc: '',
      audioDesc: '',
      tags: [],
      information: '',
      audio_es: '',
      interestPointId: '',
    },
  ])

  useEffect(() => {
    refetchInterestPoint()
    setTranslatedInterestPoints([
      {
        uid: enEditableInterestPoint?.interestPointId || '',
        language: 'en',
        title: enEditableInterestPoint?.title || '',
        subtitle: enEditableInterestPoint?.subtitle || '',
        shortDesc: enEditableInterestPoint?.shortDesc || '',
        longDesc: enEditableInterestPoint?.longDesc || '',
        audioDesc: enEditableInterestPoint?.audioDesc || '',
        tags: enEditableInterestPoint?.tags || [],
        information: enEditableInterestPoint?.information || '',
        audio_en: enEditableInterestPoint?.audio || '',
        interestPointId: '',
      },
      {
        uid: frEditableInterestPoint?.interestPointId || '',
        language: 'fr',
        title: frEditableInterestPoint?.title || '',
        subtitle: frEditableInterestPoint?.subtitle || '',
        shortDesc: frEditableInterestPoint?.shortDesc || '',
        longDesc: frEditableInterestPoint?.longDesc || '',
        audioDesc: frEditableInterestPoint?.audioDesc || '',
        tags: frEditableInterestPoint?.tags || [],
        information: frEditableInterestPoint?.information || '',
        audio_fr: frEditableInterestPoint?.audio || '',
        interestPointId: '',
      },
      {
        uid: esEditableInterestPoint?.interestPointId || '',
        language: 'es',
        title: esEditableInterestPoint?.title || '',
        subtitle: esEditableInterestPoint?.subtitle || '',
        shortDesc: esEditableInterestPoint?.shortDesc || '',
        longDesc: esEditableInterestPoint?.longDesc || '',
        audioDesc: esEditableInterestPoint?.audioDesc || '',
        tags: esEditableInterestPoint?.tags || [],
        information: esEditableInterestPoint?.information || '',
        audio_es: esEditableInterestPoint?.audio || '',
        interestPointId: '',
      },
    ])
  }, [selectedInterestPointUid])

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
    const adjustedData = {
      ...data,
      latitude: location.lat.toString(),
      longitude: location.lng.toString(),
      interestPointTranslation: translatedInterestPoints,
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
