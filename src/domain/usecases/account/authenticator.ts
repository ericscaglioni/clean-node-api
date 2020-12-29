import { AuthenticationModel } from '@/domain/models/authentication'

export type AuthenticationParams = {
  email: string
  password: string
}

export interface Authenticator {
  auth (authentication: AuthenticationParams): Promise<AuthenticationModel>
}
