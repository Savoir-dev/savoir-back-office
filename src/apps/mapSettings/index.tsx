import styled from 'styled-components'
import { PageHeader } from '../../components/molecules/pageHeader'
import { space } from '../../styles/const'
import { isLocation } from '../../utils/isLocation'
import {
  interestPoints,
  itineraries,
  mapSettings,
  mapSettingsAppRoutes,
} from '../../navigation/internalRouter'
import { Outlet } from 'react-router-dom'

export const MapSettingsApp = () => {
  const isInterestPoints = isLocation(`${mapSettings}/${interestPoints}`)

  const isItineraries =
    isLocation(`${mapSettings}/${itineraries}`) ||
    (isLocation(`${mapSettings}`) && !isInterestPoints)

  const navigation = [
    {
      label: 'Itineraries',
      path: mapSettingsAppRoutes.itineraries(),
      isActive: isItineraries,
    },
    {
      label: 'Interest points',
      path: mapSettingsAppRoutes.interestPoints(),
      isActive: isInterestPoints,
    },
  ]

  return (
    <>
      <PageHeader title="Map settings" subNavigation={navigation} />
      <InterestPointsAppWrapper>
        <Outlet />
      </InterestPointsAppWrapper>
    </>
  )
}

const InterestPointsAppWrapper = styled.div`
  margin: ${space[3]};
`
