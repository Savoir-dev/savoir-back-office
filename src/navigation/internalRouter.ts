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
