import { useEffect, useState } from 'react'
import { Dialog, Flex, Tabs, Text } from '@radix-ui/themes'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { AxiosResponse } from 'axios'

import { space } from '../../../styles/const'
import { InterestPointFromApi } from '../../../services/types/interestPoints.type'
import {
  Itinerary,
  PostItinerary,
} from '../../../services/types/itineraries.type'
import { Button } from '../../../components/atoms/button'
import { getInterestPointsByWalkingTour } from '../../../services/routes/interestPoints/interestPoints.services'
import {
  getItineraryByUid,
  postItinerary,
  putItinerary,
} from '../../../services/routes/intineraries/itineraries.services'
import { CreateItineraryForm } from './components/createItineraryForm'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
interface Props {
  close: () => void
  preSelectedInterestPoints?: InterestPointFromApi[]
  itinerary?: Itinerary
  selectedItineraryUid?: string
}

export const CreateItineraryModal = ({
  close,
  preSelectedInterestPoints = [],
  itinerary,
}: Props) => {
  const { data: itineraryData, isLoading: itineraryIsLoading } = useQuery({
    queryKey: ['itineraryByUid', itinerary?.uid],
    queryFn: () => getItineraryByUid(itinerary?.uid),
    select: (data): AxiosResponse<Itinerary> => data.data,
    enabled: !!itinerary?.uid,
  })

  const itineraryById = itineraryData?.data

  console.log('itineraryById', itineraryById)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Itinerary>({
    defaultValues: {
      guide: '',
      duration: '',
      color: '',
      translations: [
        {
          language: 'en',
          title: '',
          subtitle: '',
        },
        {
          language: 'fr',
          title: '',
          subtitle: '',
        },
        {
          language: 'es',
          title: '',
          subtitle: '',
        },
      ],
    },
  })

  console.log(errors)

  useEffect(() => {
    if (itineraryById) {
      reset({
        color: itineraryById.color,
        guide: itineraryById.guide,
        duration: itineraryById.duration,
        translations: itineraryById.translations.map((t) => ({
          ...t,
        })),
      })
    }
  }, [itineraryById, reset])

  const { fields } = useFieldArray({
    control,
    name: 'translations',
  })

  const [selectedInterestPoints, setSelectedInterestPoints] = useState<
    InterestPointFromApi[]
  >(preSelectedInterestPoints)

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (data: PostItinerary | Itinerary) => {
      return itinerary
        ? putItinerary(itinerary.uid, data as Itinerary)
        : postItinerary(data as PostItinerary)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['itineraries'],
      })
      close()
    },
  })

  const { data: interestPointsData } = useQuery({
    queryKey: 'interestPointsByWalkingTour',
    queryFn: () => getInterestPointsByWalkingTour(),
    select: (data): AxiosResponse<InterestPointFromApi[]> => data.data,
  })

  const onSubmit: SubmitHandler<Itinerary> = (data) => {
    const adjustedData = {
      ...data,
      translations: data.translations.map((t) => ({
        language: t.language,
        title: t.title,
        subtitle: t.subtitle,
      })),
      interestPoints: selectedInterestPoints,
    }

    mutate(adjustedData)
  }

  const interestPoints = interestPointsData?.data || []

  return (
    <Dialog.Content onPointerDownOutside={close}>
      <Dialog.Title>
        {itinerary ? 'Edit' : 'Create'} a new itinerary
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
              <CreateItineraryForm
                index={index}
                control={control}
                setSelectedInterestPoints={setSelectedInterestPoints}
                interestPoints={interestPoints}
                selectedInterestPoints={selectedInterestPoints}
              />
            </Tabs.Content>
          ))}
          <Flex style={{ marginTop: space[4] }} justify="end" gap="2">
            <Button variant="outline" onClick={close}>
              Close
            </Button>
            <Button disabled={itineraryIsLoading} color="orange">
              {itinerary ? 'Edit' : 'Create'}
            </Button>
          </Flex>
        </form>
      </Tabs.Root>
    </Dialog.Content>
  )
}
