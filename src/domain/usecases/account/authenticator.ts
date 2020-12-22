export type AuthenticationParams = {
  email: string
  password: string
}

export interface Authenticator {
  auth (authentication: AuthenticationParams): Promise<string>
}
