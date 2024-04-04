import { Navigate, Route, Routes } from 'react-router-dom'
import { UsersApp } from '../../apps/users'
import {
  interestPoints,
  mapSettingsAppRoutes,
  usersAppRoutes,
  itineraries,
  generalSettingsAppRoutes,
} from '../internalRouter'
import { MapSettingsApp } from '../../apps/mapSettings'
import { InterestPointsApp } from '../../apps/mapSettings/interestPoints'
import { ItinerariesApp } from '../../apps/mapSettings/Itineraries'
import { GeneralSettingsApp } from '../../apps/generalSettings'

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path={generalSettingsAppRoutes.generalSettings()}
        element={<GeneralSettingsApp />}
      />
      <Route path={usersAppRoutes.users()} element={<UsersApp />} />
      <Route
        path={mapSettingsAppRoutes.mapSettings()}
        element={<MapSettingsApp />}
      >
        <Route index element={<ItinerariesApp />} />
        <Route path={itineraries} element={<ItinerariesApp />} />
        <Route path={interestPoints} element={<InterestPointsApp />} />
      </Route>
      <Route
        path="/"
        element={<Navigate replace to={usersAppRoutes.users()} />}
      />
    </Routes>
  )
}
