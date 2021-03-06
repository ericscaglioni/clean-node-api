import SignUpController from '@/presentation/controllers/login/signup/signup-controller'
import { Controller } from '@/presentation/protocols/controller'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbAddAccount } from '../../../usecases/account/add-account/db-add-account-factory'
import { makeDbAuthentication } from '../../../usecases/account/authenticator/db-authentication-factory'
import { makeSignUpValidator } from './signup-validator-factory'

export const makeSignupController = (): Controller => {
  const signUpController = new SignUpController(
    makeDbAddAccount(),
    makeSignUpValidator(),
    makeDbAuthentication()
  )
  return makeLogControllerDecorator(signUpController)
}
