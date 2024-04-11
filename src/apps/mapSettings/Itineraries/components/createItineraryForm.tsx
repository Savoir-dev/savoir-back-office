import { Button, Flex, Grid, Text, TextField } from '@radix-ui/themes'
import { InterestPointSelectableCard } from '../../components/interestPointSelectableCard'
import { FC } from 'react'
import { space } from '../../../../styles/const'
import { InterestPointFromApi } from '../../../../services/types/interestPoints.type'

interface Props {
  translatedItinerary?: any
  setTitleByLanguage: any
  setSubtitleByLanguage: any
  setName: any
  setDuration: any
  name: string
  duration: string
  selectedInterestPoints: any
  setSelectedInterestPoints: any
  interestPoints: any
}

export const CreateItineraryForm: FC<Props> = ({
  translatedItinerary,
  setTitleByLanguage,
  interestPoints,
  setSubtitleByLanguage,
  setDuration,
  setName,
  name,
  duration,
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
            onChange={(e) => setTitleByLanguage(e.target.value)}
          />
        </Flex>

        <Flex direction="column">
          <Text size="2" weight="bold">
            Duration
          </Text>
          <TextField.Root
            placeholder="2h30"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
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
