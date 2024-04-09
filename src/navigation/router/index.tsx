import { Route, Routes } from 'react-router-dom'

import { UsersApp } from '../../apps/users'
import {
  mapSettingsAppRoutes,
  usersAppRoutes,
  generalSettingsAppRoutes,
  authAppRoutes,
  guideAndNewsAppRoutes,
} from '../internalRouter'
import { MapSettingsApp } from '../../apps/mapSettings'
import { InterestPointsApp } from '../../apps/mapSettings/interestPoints'
import { ItinerariesApp } from '../../apps/mapSettings/Itineraries'
import { GeneralSettingsApp } from '../../apps/generalSettings'
import { AuthApp } from '../../apps/auth'

import { ProtectedRoute } from './protectedRoute'
import { DefaultRouteRedirect } from './DefaultRouteRedirect'
import { GuideAndNewsApp } from '../../apps/guidesAndNews'
import { NewsApp } from '../../apps/guidesAndNews/news/newsApp'
import { GuideApp } from '../../apps/guidesAndNews/guides/guidesApp'
export const AppRouter = () => {
  return (
    <Routes>
      <Route path={authAppRoutes.login()} element={<AuthApp />} />
      <Route
        path={generalSettingsAppRoutes.generalSettings()}
        element={
          <ProtectedRoute>
            <GeneralSettingsApp />
          </ProtectedRoute>
        }
      />
      <Route
        path={usersAppRoutes.users()}
        element={
          <ProtectedRoute>
            <UsersApp />
          </ProtectedRoute>
        }
      />
      <Route
        path={guideAndNewsAppRoutes.basePath}
        element={
          <ProtectedRoute>
            <GuideAndNewsApp />
          </ProtectedRoute>
        }
      >
        <Route index element={<NewsApp />} />
        <Route path={guideAndNewsAppRoutes.news()} element={<NewsApp />} />
        <Route path={guideAndNewsAppRoutes.guides()} element={<GuideApp />} />
      </Route>
      <Route
        path={mapSettingsAppRoutes.basePath}
        element={
          <ProtectedRoute>
            <MapSettingsApp />
          </ProtectedRoute>
        }
      >
        <Route index element={<ItinerariesApp />} />
        <Route
          path={mapSettingsAppRoutes.itineraries()}
          element={<ItinerariesApp />}
        />
        <Route
          path={mapSettingsAppRoutes.interestPoints()}
          element={<InterestPointsApp />}
        />
      </Route>
      <Route path="/" element={<DefaultRouteRedirect />} />
    </Routes>
  )
}
