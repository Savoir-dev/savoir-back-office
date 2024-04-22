import { Grid } from '@radix-ui/themes'
import { useQuery } from 'react-query'

import { space } from '../../../styles/const'
import { getNews } from '../../../services/routes/guidesAndNews/guidesAndNews.services'
import { NewsCard } from './components/newsCard'

export const NewsList = () => {
  const { data: newsData } = useQuery({
    queryKey: 'news',
    queryFn: () => {
      return getNews()
    },
  })

  const news = newsData || []

  return (
    <Grid
      columns="3"
      gap="3"
      width="auto"
      style={{
        marginTop: space[3],
      }}
    >
      {news.map((item, index) => (
        <NewsCard item={item} key={index} />
      ))}
    </Grid>
  )
}
