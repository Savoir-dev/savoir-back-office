import { Grid } from '@radix-ui/themes'
import { useQuery } from 'react-query'

import { getInterestPoints } from '../../../services/routes/interestPoints/interestPoints.services'

import { InterestPointCard } from './components/interestPointCard'

export const InterestPointList = () => {
  const { data: interestPointsData } = useQuery({
    queryKey: 'interestPoints',
    queryFn: () => getInterestPoints(),
  })

  const interestPoints = interestPointsData || []

  console.log('interestPoints', interestPoints)

  return (
    <Grid columns="3" gap="3" width="auto">
      {interestPoints.map((item, index) => (
        <InterestPointCard interestPoint={item} key={index} />
      ))}
    </Grid>
  )
}
