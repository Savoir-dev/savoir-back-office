import { Grid } from '@radix-ui/themes'
import { space } from '../../../styles/const'
import { useQuery } from 'react-query'
import { getGuides } from '../../../services/routes/guidesAndNews/guidesAndNews.services'
import { GuideCard } from './components/guideCard'

export const GuidesList = () => {
  const { data: guides } = useQuery({
    queryKey: ['guides'],
    queryFn: () => {
      return getGuides()
    },
  })

  return (
    <Grid
      columns="3"
      gap="3"
      width="auto"
      style={{
        marginTop: space[3],
      }}
    >
      {guides?.map((guide, index) => (
        <GuideCard guide={guide} key={index} />
      ))}
    </Grid>
  )
}
