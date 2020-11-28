import { EmailValidation, RequiredFieldsValidator, ValidatorComposite } from '../../../presentation/helpers/validators'
import { Validator } from '../../../presentation/protocols'
import { EmailValidatorAdapter } from '../../adapters/validators/email-validator-adapter'

export const makeLoginValidator = (): ValidatorComposite => {
  const validators: Validator[] = []
  const requiredFields = ['email', 'password']
  validators.push(new RequiredFieldsValidator(requiredFields))
  validators.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidatorComposite(validators)
}
