import { Flex, Grid, Text, TextField } from '@radix-ui/themes'
import { InterestPointSelectableCard } from '../../components/interestPointSelectableCard'
import { Dispatch, FC, SetStateAction } from 'react'
import { space } from '../../../../styles/const'
import { InterestPointFromApi } from '../../../../services/types/interestPoints.type'
import { Itinerary } from '../../../../services/types/itineraries.type'
import { Control, Controller } from 'react-hook-form'

interface Props {
  index: number
  control: Control<Itinerary>
  setSelectedInterestPoints: Dispatch<SetStateAction<InterestPointFromApi[]>>
  selectedInterestPoints: InterestPointFromApi[]
  interestPoints: InterestPointFromApi[]
}

export const CreateItineraryForm: FC<Props> = ({
  index,
  control,
  selectedInterestPoints,
  setSelectedInterestPoints,
  interestPoints,
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
          <Controller
            control={control}
            name={`translations.${index}.title`}
            render={({ field: { onChange, value } }) => (
              <TextField.Root
                style={{ width: '100%' }}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </Flex>
        <Flex direction="column">
          <Text size="2" weight="bold">
            Subtitle
          </Text>
          <Controller
            control={control}
            name={`translations.${index}.subtitle`}
            render={({ field: { onChange, value } }) => (
              <TextField.Root
                style={{ width: '100%' }}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </Flex>
        <Flex direction="column">
          <Text size="2" weight="bold">
            Guide
          </Text>
          <Controller
            control={control}
            name={`guide`}
            render={({ field: { onChange, value } }) => (
              <TextField.Root
                style={{ width: '100%' }}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </Flex>
        <Flex direction="column">
          <Text size="2" weight="bold">
            Duration
          </Text>
          <Controller
            control={control}
            name={`duration`}
            render={({ field: { onChange, value } }) => (
              <TextField.Root
                style={{ width: '100%' }}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </Flex>
        <Flex direction="column">
          <Text size="2" weight="bold">
            Color
          </Text>
          <Controller
            control={control}
            name="color"
            render={({ field: { onChange, value } }) => (
              <input type="color" value={value} onChange={onChange} />
            )}
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
