import SignUpController from '../../presentation/controllers/signup/signup'
import { DbAddAccount } from './../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from './../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from './../../infra/db/mongodb/account-repository/account'
import { Controller } from './../../presentation/protocols/controller'
import { EmailValidatorAdapter } from './../../utils/email-validator-adapter'
import { LogControllerDecorator } from './../decorators/log'

export const makeSignupController = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount)
  return new LogControllerDecorator(signUpController)
}
