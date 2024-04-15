import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authAppRoutes, generalSettingsAppRoutes } from "../internalRouter";

export const DefaultRouteRedirect: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtAuthenticated");

    if (token) {
      navigate(generalSettingsAppRoutes.generalSettings());
    } else {
      navigate(authAppRoutes.login());
    }
  }, [navigate]);

  return null;
};
