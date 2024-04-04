import { Grid } from '@radix-ui/themes'
import { InterestPointCard } from '../interestPoints/components/interestPointCard'

const interestPoints = [
  {
    image:
      'https://images.unsplash.com/photo-1558560354-c17a5af844d6?q=80&w=2599&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Title 1',
    isWalkingTour: false,
    subtitle: 'Subtitle 1',
    shortDescription: 'This is a short description.',
    longDescription:
      'This is a much longer description that goes into much more detail about the interest point.',
    tags: ['history', 'art'],
    geolocation: {
      latitude: 1.0,
      longitude: 1.0,
    },
    color: 'blue',
    audio: 'audio_url.mp3',
    audioDescription:
      'This is a description of what can be heard in the audio guide.',
    duration: 125,
    guide: 'Guide Name 1',
    information: 'Additional information about the interest point.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1558560354-c17a5af844d6?q=80&w=2599&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Title 2',
    isWalkingTour: true,
    subtitle: 'Subtitle 2',
    shortDescription: 'This is a short description.',
    longDescription:
      'This is a much longer description that goes into much more detail about the interest point.',
    tags: ['history', 'art'],
    geolocation: {
      latitude: 1.0,
      longitude: 1.0,
    },
    color: 'blue',
    audio: 'audio_url.mp3',
    audioDescription:
      'This is a description of what can be heard in the audio guide.',
    duration: 125,
    guide: 'Guide Name 2',
    information: 'Additional information about the interest point.',
  },

  {
    image:
      'https://images.unsplash.com/photo-1558560354-c17a5af844d6?q=80&w=2599&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Title 3',
    isWalkingTour: true,
    subtitle: 'Subtitle 3',
    shortDescription: 'This is a short description.',
    longDescription:
      'This is a much longer description that goes into much more detail about the interest point.',
    tags: ['history', 'art'],
    geolocation: {
      latitude: 1.0,
      longitude: 1.0,
    },
    color: 'blue',
    audio: 'audio_url.mp3',
    audioDescription:
      'This is a description of what can be heard in the audio guide.',
    duration: 125,
    guide: 'Guide Name 3',
    information: 'Additional information about the interest point.',
  },
]

export const InterestPointList = () => {
  return (
    <Grid columns="3" gap="3" width="auto">
      {interestPoints.map((item) => (
        <InterestPointCard interestPoint={item} />
      ))}
    </Grid>
  )
}
