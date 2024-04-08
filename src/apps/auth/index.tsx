import { Navigate, Route, Routes } from "react-router-dom";
import { authAppRoutes } from "../../navigation/internalRouter";
import { LoginPage } from "./pages/login";

export const AuthApp = () => {
  return (
    <Routes>
      <Route path={authAppRoutes.login()} element={<LoginPage />} />
      <Route path="*" element={<Navigate to={authAppRoutes.login()} />} />
    </Routes>
  );
};
