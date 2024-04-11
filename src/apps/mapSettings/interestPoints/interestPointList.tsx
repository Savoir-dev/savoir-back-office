import { Grid } from '@radix-ui/themes'
import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'

import { getInterestPoints } from '../../../services/interestPoints/interestPoints.services'
import { InterestPointFromApi } from '../../../services/types/interestPoints.type'

import { InterestPointCard } from './components/interestPointCard'

export const InterestPointList = () => {
  const { data: interestPointsData } = useQuery({
    queryKey: 'interestPoints',
    queryFn: () => getInterestPoints(),
    select: (data): AxiosResponse<InterestPointFromApi[]> => data.data,
  })

  const interestPoints = interestPointsData?.data || []

  return (
    <Grid columns="3" gap="3" width="auto">
      {interestPoints.map((item, index) => (
        <InterestPointCard interestPoint={item} key={index} />
      ))}
    </Grid>
  )
}
