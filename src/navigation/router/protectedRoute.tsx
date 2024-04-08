import { Navigate } from "react-router-dom";

import { authAppRoutes } from "../internalRouter";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = Boolean(localStorage.getItem("token")); // Ou votre logique d'authentification

  if (!isAuthenticated) {
    // Rediriger vers la page de connexion si non authentifié
    return <Navigate to={authAppRoutes.login()} replace />;
  }

  return children;
};
