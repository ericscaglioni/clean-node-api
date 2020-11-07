import { EmailValidation, RequiredFieldsValidator, Validator, ValidatorComposite } from '../../../presentation/helpers/validators'
import { EmailValidatorAdapter } from '../../../utils'

export const makeLoginValidator = (): ValidatorComposite => {
  const validators: Validator[] = []
  const requiredFields = ['email', 'password']
  validators.push(new RequiredFieldsValidator(requiredFields))
  validators.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidatorComposite(validators)
}
