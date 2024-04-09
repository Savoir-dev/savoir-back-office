export type UriType = string

class AppRoute {
  basePath: UriType

  constructor(basePath: UriType) {
    this.basePath = basePath
  }

  generatePath(subPath: string = ''): UriType {
    return `${this.basePath}/${subPath}`.replace(/\/+$/, '')
  }
}

class UsersAppRoutes extends AppRoute {
  constructor() {
    super('/app/users')
  }

  users(): UriType {
    return this.generatePath()
  }
}

class MapSettingsAppRoutes extends AppRoute {
  constructor() {
    super('/app/map-settings')
  }

  itineraries(): UriType {
    return this.generatePath('itineraries')
  }

  interestPoints(): UriType {
    return this.generatePath('interest-points')
  }
}

class GeneralSettingsAppRoutes extends AppRoute {
  constructor() {
    super('/app/general-settings')
  }

  generalSettings(): UriType {
    return this.generatePath()
  }
}

class GuideAndNewsAppRoutes extends AppRoute {
  constructor() {
    super('/app/guides-and-news')
  }

  guides(): UriType {
    return this.generatePath('guide')
  }

  news(): UriType {
    return this.generatePath('news')
  }
}

class AuthAppRoutes extends AppRoute {
  constructor() {
    super('/auth')
  }

  login(): UriType {
    return this.generatePath('login')
  }

  forgetPassword(): UriType {
    return this.generatePath('forget-password')
  }
}

export const usersAppRoutes = new UsersAppRoutes()
export const mapSettingsAppRoutes = new MapSettingsAppRoutes()
export const generalSettingsAppRoutes = new GeneralSettingsAppRoutes()
export const authAppRoutes = new AuthAppRoutes()
export const guideAndNewsAppRoutes = new GuideAndNewsAppRoutes()
