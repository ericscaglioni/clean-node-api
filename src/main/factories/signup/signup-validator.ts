import { CompareFieldsValidator, EmailValidation, RequiredFieldsValidator, ValidatorComposite } from '../../../presentation/helpers/validators'
import { Validator } from '../../../presentation/protocols'
import { EmailValidatorAdapter } from '../../../utils'

export const makeSignUpValidator = (): ValidatorComposite => {
  const validators: Validator[] = []
  const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
  validators.push(new RequiredFieldsValidator(requiredFields))
  validators.push(new CompareFieldsValidator('password', 'passwordConfirmation'))
  validators.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidatorComposite(validators)
}