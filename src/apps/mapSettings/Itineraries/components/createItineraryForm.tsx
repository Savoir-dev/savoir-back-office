import { Button, Flex, Grid, Text, TextField } from '@radix-ui/themes'
import { InterestPointSelectableCard } from '../../components/interestPointSelectableCard'
import { Dispatch, FC, SetStateAction } from 'react'
import { space } from '../../../../styles/const'
import { InterestPointFromApi } from '../../../../services/types/interestPoints.type'
import { ItineraryTranslations } from '../../../../services/types/itineraries.type'

interface Props {
  generalValues: {
    duration: string
    guide: string
    color: string
  }
  setGeneralValues: Dispatch<
    SetStateAction<{ duration: string; guide: string; color: string }>
  >
  translatedItinerary: ItineraryTranslations
  setTitleByLanguage: (language: string, title: string) => void
  setSubtitleByLanguage: (language: string, subtitle: string) => void
  selectedInterestPoints: InterestPointFromApi[]
  setSelectedInterestPoints: Dispatch<SetStateAction<InterestPointFromApi[]>>
  interestPoints: InterestPointFromApi[]
}

export const CreateItineraryForm: FC<Props> = ({
  generalValues,
  setGeneralValues,
  translatedItinerary,
  setTitleByLanguage,
  interestPoints,
  setSubtitleByLanguage,
  setSelectedInterestPoints,
  selectedInterestPoints,
}) => {
  const toggleInterestPointSelection = (
    interestPoint: InterestPointFromApi,
  ) => {
    if (isInterestPointSelected(interestPoint)) {
      setSelectedInterestPoints(
        selectedInterestPoints.filter(
          (selectedPoint) => selectedPoint.uid !== interestPoint.uid,
        ),
      )
    } else {
      setSelectedInterestPoints([...selectedInterestPoints, interestPoint])
    }
  }

  const isInterestPointSelected = (
    interestPoint: InterestPointFromApi,
  ): boolean => {
    return selectedInterestPoints.some(
      (selectedPoint) => selectedPoint.uid === interestPoint.uid,
    )
  }

  return (
    <>
      <Flex direction="column" gap="2">
        <Flex direction="column">
          <Text size="2" weight="bold">
            Title
          </Text>
          <TextField.Root
            placeholder="Title..."
            value={translatedItinerary.title}
            onChange={(e) =>
              setTitleByLanguage(translatedItinerary.language, e.target.value)
            }
          />
        </Flex>
        <Flex direction="column">
          <Text size="2" weight="bold">
            Subtitle
          </Text>
          <TextField.Root
            placeholder="Subtitle..."
            value={translatedItinerary.subtitle}
            onChange={(e) =>
              setSubtitleByLanguage(
                translatedItinerary.language,
                e.target.value,
              )
            }
          />
        </Flex>
        <Flex direction="column">
          <Text size="2" weight="bold">
            Guide
          </Text>
          <TextField.Root
            placeholder="Guide..."
            value={generalValues.guide}
            onChange={(e) => {
              setGeneralValues({ ...generalValues, guide: e.target.value })
            }}
          />
        </Flex>
        <Flex direction="column">
          <Text size="2" weight="bold">
            Duration
          </Text>
          <TextField.Root
            placeholder="2h30"
            value={generalValues.duration}
            onChange={(e) => {
              setGeneralValues({ ...generalValues, duration: e.target.value })
            }}
          />
        </Flex>
        <Flex direction="column">
          <Text size="2" weight="bold">
            Color
          </Text>
          <input
            type="color"
            value={generalValues.color}
            onChange={(e) => {
              setGeneralValues({ ...generalValues, color: e.target.value })
            }}
          />
        </Flex>
        <Text size="2" weight="bold">
          Interest points
        </Text>
        <Flex
          direction="column"
          style={{ overflowY: 'auto', maxHeight: '500px' }}
        >
          <Grid
            columns="2"
            gap="2"
            width="auto"
            style={{ padding: space[2], position: 'relative' }}
          >
            {interestPoints.map((interestPoint) => (
              <InterestPointSelectableCard
                key={interestPoint.uid}
                order={
                  selectedInterestPoints.findIndex(
                    (selectedPoint) => selectedPoint.uid === interestPoint.uid,
                  ) + 1
                }
                interestPoint={interestPoint}
                selected={isInterestPointSelected(interestPoint)}
                onSelect={() => toggleInterestPointSelection(interestPoint)}
              />
            ))}
          </Grid>
        </Flex>
      </Flex>
    </>
  )
}
