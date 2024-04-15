import { Grid } from '@radix-ui/themes'
import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'

import { getInterestPoints } from '../../../services/interestPoints/interestPoints.services'
import { InterestPointFromApi } from '../../../services/types/interestPoints.type'

import { InterestPointCard } from './components/interestPointCard'
import { useState } from 'react'

export const InterestPointList = () => {
  const [selectedInterestPointUid, setSelectedInterestPointUid] = useState<
    string | null
  >(null)

  const { data: interestPointsData } = useQuery({
    queryKey: 'interestPoints',
    queryFn: () => getInterestPoints(),
    select: (data): AxiosResponse<InterestPointFromApi[]> => data.data,
  })

  const interestPoints = interestPointsData?.data || []

  return (
    <Grid columns="3" gap="3" width="auto">
      {interestPoints.map((item, index) => (
        <InterestPointCard
          interestPoint={item}
          key={index}
          selectedInterestPointUid={selectedInterestPointUid}
          setSelectedInterestPointUid={setSelectedInterestPointUid}
        />
      ))}
    </Grid>
  )
}
