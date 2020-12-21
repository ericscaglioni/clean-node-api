import { AddAccountRepository } from '../../../protocols/db/account/add-account-repository'
import { AccountModel, AddAccount, AddAccountModel, Hasher, LoadAccountByEmailRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    let account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (!account) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      account = await this.addAccountRepository.add({ ...accountData, password: hashedPassword })
      return account
    }
    return null
  }
}
