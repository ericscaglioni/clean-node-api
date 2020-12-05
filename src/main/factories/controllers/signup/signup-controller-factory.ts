import SignUpController from '../../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbAddAccount } from '../../usecases/add-account/db-add-account-factory'
import { makeDbAuthentication } from '../../usecases/authenticator/db-authentication-factory'
import { makeSignUpValidator } from './signup-validator-factory'

export const makeSignupController = (): Controller => {
  const signUpController = new SignUpController(
    makeDbAddAccount(),
    makeSignUpValidator(),
    makeDbAuthentication()
  )
  return makeLogControllerDecorator(signUpController)
}
