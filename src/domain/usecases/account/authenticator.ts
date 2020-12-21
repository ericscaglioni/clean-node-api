export type AuthenticationModel = {
  email: string
  password: string
}

export interface Authenticator {
  auth (authentication: AuthenticationModel): Promise<string>
}
