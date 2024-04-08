export type UriType = string;

// Users settings pages
export const users = "/app/users";
class UsersAppRoutes {
  users = () => `${users}`;
}
export const usersAppRoutes = new UsersAppRoutes();

// Map settings pages
export const mapSettings = "/app/map-settings";
export const itineraries = "itineraries";
export const interestPoints = "interest-points";
class InterestPointsAppRoutes {
  mapSettings = () => mapSettings;
  itineraries = () => `${mapSettings}/${itineraries}`;
  interestPoints = () => `${mapSettings}/${interestPoints}`;
}
export const mapSettingsAppRoutes = new InterestPointsAppRoutes();

// General settings pages
export const generalSettings = "/app/general-settings";
class GeneralSettingsAppRoutes {
  generalSettings = () => generalSettings;
}
export const generalSettingsAppRoutes = new GeneralSettingsAppRoutes();

// Auth pages
export const auth = "/auth";
export const login = "login";
export const register = "register";
export const forgetPassword = "forget-password";

class AuthAppRoutes {
  auth = () => auth;
  login = () => `${auth}/${login}`;
  forgetPassword = () => `${auth}/${forgetPassword}`;
}

export const authAppRoutes = new AuthAppRoutes();
