import { interestPointsFakeData } from '../interestPoints/interestPointList'
import { ItineraryCard } from './components/itineraryCard'

export const itinerariesFakeData = [
  {
    title: 'Itinerary 1',
    length: 2,
    interestPoints: interestPointsFakeData,
  },
  {
    title: 'Itinerary 2',
    length: 2,
    interestPoints: interestPointsFakeData,
  },
  {
    title: 'Itinerary 4',
    length: 2,
    interestPoints: interestPointsFakeData,
  },
  {
    title: 'Itinerary 5',
    length: 2,
    interestPoints: interestPointsFakeData,
  },
  {
    title: 'Itinerary 6',
    length: 2,
    interestPoints: interestPointsFakeData,
  },
]

export const ItinerariesList = () => {
  return (
    <>
      {itinerariesFakeData.map((itinerary, index) => {
        return <ItineraryCard key={index} itinerary={itinerary} />
      })}
    </>
  )
}
