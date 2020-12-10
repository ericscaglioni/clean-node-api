import { AccountModel } from '../../../domain/models/account'
import { Decrypter } from '../../protocols/criptography/decrypter'
import { LoadAccountByTokenRepository } from '../../protocols/db/account/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByTokenRepository {
  constructor (private readonly decrypter: Decrypter) {}
  
  async loadByToken (token: string, role?: string): Promise<AccountModel> {
    await this.decrypter.decrypt(token)
    return null
  }
}
