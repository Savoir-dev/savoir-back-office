import { Card, Flex, Grid, Text } from '@radix-ui/themes'
import { space } from '../../../styles/const'
import { useQuery } from 'react-query'
import { getNews } from '../../../services/guidesAndNews/guidesAndNews.services'
import { News } from '../../../services/guidesAndNews/guidesAndNews.type'
import { AxiosResponse } from 'axios'

export const NewsList = () => {
  const { data: newsData } = useQuery({
    queryKey: ['news'],
    queryFn: () => {
      return getNews()
    },
    select: (data): AxiosResponse<News[]> => data.data,
  })

  const news = newsData?.data || []

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
        <Card key={index}>
          <Flex direction="column" gap="2">
            <img
              src={item.image}
              alt="interest point image"
              style={{
                objectFit: 'cover',
                width: '200px',
                borderRadius: space[1],
              }}
            />
            <Flex direction="column">
              <Flex direction="column">
                <Text size="3" weight="bold">
                  Short description
                </Text>
                <Text>{item.shortDesc}</Text>
              </Flex>
              <Flex direction="column">
                <Text size="3" weight="bold">
                  Long description
                </Text>
                <Text>{item.longDesc}</Text>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      ))}
    </Grid>
  )
}
