import styled from 'styled-components'
import { PageHeader } from '../../components/molecules/pageHeader'
import { space } from '../../styles/const'
import { isLocation } from '../../utils/isLocation'
import { guideAndNewsAppRoutes } from '../../navigation/internalRouter'
import { Outlet } from 'react-router-dom'

export const GuideAndNewsApp = () => {
  const isGuides = isLocation(guideAndNewsAppRoutes.guides())
  const isNews =
    isLocation(guideAndNewsAppRoutes.news()) ||
    (isLocation(guideAndNewsAppRoutes.basePath) && !isGuides)

  const navigation = [
    {
      label: 'News',
      path: guideAndNewsAppRoutes.news(),
      isActive: isNews,
    },
    {
      label: 'Guides',
      path: guideAndNewsAppRoutes.guides(),
      isActive: isGuides,
    },
  ]

  return (
    <>
      <PageHeader title="Guides & News" subNavigation={navigation} />
      <InterestPointsAppWrapper>
        <Outlet />
      </InterestPointsAppWrapper>
    </>
  )
}

const InterestPointsAppWrapper = styled.div`
  margin: ${space[3]};
`
