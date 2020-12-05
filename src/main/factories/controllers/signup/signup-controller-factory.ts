import { LogMongoRepository } from '../../../../infra/db/mongodb/log/log-mongo-repository'
import SignUpController from '../../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeDbAddAccount } from '../../usecases/add-account/db-add-account-factory'
import { makeDbAuthentication } from '../../usecases/authenticator/db-authentication-factory'
import { makeSignUpValidator } from './signup-validator-factory'

export const makeSignupController = (): Controller => {
  const signUpController = new SignUpController(
    makeDbAddAccount(),
    makeSignUpValidator(),
    makeDbAuthentication()
  )
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
