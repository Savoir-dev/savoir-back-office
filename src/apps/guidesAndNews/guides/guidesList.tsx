import { Card, Flex, Grid, Text } from '@radix-ui/themes'
import { space } from '../../../styles/const'

const guidesFakeData = [
  {
    image: 'https://via.placeholder.com/150',
    title: 'Guide 1',
    shortDesc: 'Short description of guide 1',
    longDesc: 'Long description of guide 1',
  },
  {
    image: 'https://via.placeholder.com/150',
    title: 'Guide 2',
    shortDesc: 'Short description of guide 2',
    longDesc: 'Long description of guide 2',
  },
  {
    image: 'https://via.placeholder.com/150',
    title: 'Guide 3',
    shortDesc: 'Short description of guide 3',
    longDesc: 'Long description of guide 3',
  },
]

export const GuidesList = () => {
  return (
    <Grid
      columns="3"
      gap="3"
      width="auto"
      style={{
        marginTop: space[3],
      }}
    >
      {guidesFakeData.map((guide, index) => (
        <Card key={index}>
          <Flex direction="column" gap="2">
            <img
              src={guide.image}
              alt="interest point image"
              style={{
                objectFit: 'cover',
                width: '200px',
                borderRadius: space[1],
              }}
            />
            <Flex direction="column">
              <Text weight="bold">{guide.title}</Text>
              <Text>{guide.shortDesc}</Text>
              <Text>{guide.longDesc}</Text>
            </Flex>
          </Flex>
        </Card>
      ))}
    </Grid>
  )
}
