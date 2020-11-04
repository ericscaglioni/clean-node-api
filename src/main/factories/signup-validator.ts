import { RequiredFieldsValidator } from './../../presentation/helpers/validators/required-fields-validator'
import { ValidatorComposite } from './../../presentation/helpers/validators/validator-composite'

export const makeSignUpValidator = (): ValidatorComposite => {
  const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
  return new ValidatorComposite([
    new RequiredFieldsValidator(requiredFields)
  ])
}
