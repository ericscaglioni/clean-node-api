import { DbAuthentication } from '../../../data/usecases/authenticator/db-authenticator'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { Controller } from '../../../presentation/protocols'
import env from '../../config/env'
import { BcryptAdapter } from './../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from './../../../infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from './../../../infra/db/mongodb/account/account-mongo-repository'
import { LoginController } from './../../../presentation/controllers/login/login-controller'
import { LogControllerDecorator } from './../../decorators/log-controller-decorator'
import { makeLoginValidator } from './login-validator-factory'

export const makeLoginController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAuthenticator = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
  const loginController = new LoginController(dbAuthenticator, makeLoginValidator())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoRepository)
}
