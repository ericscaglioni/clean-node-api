import { AccountModel } from '@/domain/models/account'
import { AuthenticationModel } from '@/domain/models/authentication'
import { mockAccountModel } from '@/domain/test'
import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-account'
import { AuthenticationParams, Authenticator } from '@/domain/usecases/account/authenticator'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel> {
      return new Promise(resolve => resolve(mockAccountModel()))
    }
  }
  return new AddAccountStub()
}

export const mockAuthenticator = (): Authenticator => {
  class AuthenticatorStub implements Authenticator {
    async auth (authentication: AuthenticationParams): Promise<AuthenticationModel> {
      return {
        accessToken: 'any_token',
        name: 'any_name'
      }
    }
  }
  return new AuthenticatorStub()
}

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async loadByToken (accessToken: string): Promise<AccountModel> {
      return mockAccountModel()
    }
  }
  return new LoadAccountByTokenStub()
}
