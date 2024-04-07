import { Navigate, Route, Routes } from 'react-router-dom'
import { authAppRoutes } from '../../navigation/internalRouter'
import { LoginPage } from './pages/login'
import { RegisterPage } from './pages/register'

export const AuthApp = () => {
  return (
    <Routes>
      <Route path={authAppRoutes.login()} element={<LoginPage />} />
      <Route path={authAppRoutes.register()} element={<RegisterPage />} />
      <Route path="*" element={<Navigate to={authAppRoutes.login()} />} />
    </Routes>
  )
}
