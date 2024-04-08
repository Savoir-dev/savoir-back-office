import { Navigate } from "react-router-dom";

import { authAppRoutes } from "../internalRouter";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = Boolean(localStorage.getItem("jwtAuthenticated"));

  if (!isAuthenticated) {
    return <Navigate to={authAppRoutes.login()} replace />;
  }

  return children;
};
