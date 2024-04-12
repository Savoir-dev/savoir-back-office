import { useState } from 'react'
import { Dialog, Flex, Grid, Tabs, Text, TextField } from '@radix-ui/themes'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { AxiosResponse } from 'axios'

import { InterestPointSelectableCard } from '../components/interestPointSelectableCard'
import { space } from '../../../styles/const'
import { InterestPointFromApi } from '../../../services/types/interestPoints.type'
import {
  Itinerary,
  ItineraryTranslations,
  PostItinerary,
} from '../../../services/types/itineraries.type'
import { Button } from '../../../components/atoms/button'
import { getInterestPointsByWalkingTour } from '../../../services/interestPoints/interestPoints.services'
import {
  postItinerary,
  putItinerary,
} from '../../../services/intineraries/itineraries.services'
import { CreateItineraryForm } from './components/createItineraryForm'
interface Props {
  close: () => void
  preSelectedInterestPoints?: InterestPointFromApi[]
  itinerary?: Itinerary
}

export const CreateItineraryModal = ({
  close,
  preSelectedInterestPoints = [],
  itinerary,
}: Props) => {
  const [generalValues, setGeneralValues] = useState({
    duration: itinerary?.duration || '',
    guide: itinerary?.guide || '',
    color: itinerary?.color || '',
  })
  const [translatedItineraries, setTranslatedItineraries] = useState<
    ItineraryTranslations[]
  >([
    {
      language: 'en',
      title: itinerary?.translations[0].title || '',
      subtitle: itinerary?.translations[0].subtitle || '',
    },
    {
      language: 'fr',
      title: itinerary?.translations[2]?.title || '',
      subtitle: itinerary?.translations[2]?.subtitle || '',
    },
    {
      language: 'es',
      title: itinerary?.translations[1]?.title || '',
      subtitle: itinerary?.translations[1]?.subtitle || '',
    },
  ])

  const [selectedInterestPoints, setSelectedInterestPoints] = useState<
    InterestPointFromApi[]
  >(preSelectedInterestPoints)

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (data: PostItinerary | Itinerary) => {
      console.log('foo')
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

  const handleSubmit = () => {
    console.log('generalValues', generalValues)
    mutate({
      duration: generalValues.duration,
      color: generalValues.color,
      guide: generalValues.guide,
      translations: translatedItineraries,
      interestPoints: selectedInterestPoints,
    })
  }

  const setTitleByLanguage = (language: string, newTitle: string) => {
    const updatedItineraries = translatedItineraries.map(
      (translatedItinerary) => {
        if (translatedItinerary.language === language) {
          return { ...translatedItinerary, title: newTitle }
        }
        return translatedItinerary
      },
    )

    setTranslatedItineraries(updatedItineraries)
  }

  const setSubtitleByLanguage = (language: string, newSubtitle: string) => {
    const updatedItineraries = translatedItineraries.map(
      (translatedItinerary) => {
        if (translatedItinerary.language === language) {
          return { ...translatedItinerary, subtitle: newSubtitle }
        }
        return translatedItinerary
      },
    )

    setTranslatedItineraries(updatedItineraries)
  }

  const interestPoints = interestPointsData?.data || []

  return (
    <Dialog.Content onPointerDownOutside={close}>
      <Dialog.Title>
        {itinerary ? 'Edit' : 'Create'} a new itinerary
      </Dialog.Title>
      <Tabs.Root defaultValue="en">
        <Tabs.List style={{ marginBottom: space[2] }} color="orange">
          {translatedItineraries?.map((translatedItinerary) => {
            return (
              <Tabs.Trigger
                value={translatedItinerary.language}
                key={translatedItinerary.language}
                style={{ marginRight: space[2] }}
              >
                <Text>{translatedItinerary.language}</Text>
              </Tabs.Trigger>
            )
          })}
        </Tabs.List>
        {translatedItineraries.map((translatedItinerary) => {
          return (
            <Tabs.Content
              value={translatedItinerary.language}
              key={translatedItinerary.language}
            >
              <CreateItineraryForm
                generalValues={generalValues}
                setGeneralValues={setGeneralValues}
                key={translatedItinerary.language}
                translatedItinerary={translatedItinerary}
                setTitleByLanguage={setTitleByLanguage}
                setSubtitleByLanguage={setSubtitleByLanguage}
                selectedInterestPoints={selectedInterestPoints}
                setSelectedInterestPoints={setSelectedInterestPoints}
                interestPoints={interestPoints}
              />
            </Tabs.Content>
          )
        })}
        <Flex style={{ marginTop: space[4] }} justify="end" gap="2">
          <Button variant="outline" onClick={close}>
            Close
          </Button>
          <Button color="orange" onClick={handleSubmit}>
            {itinerary ? 'Edit' : 'Create'}
          </Button>
        </Flex>
      </Tabs.Root>
    </Dialog.Content>
  )
}
