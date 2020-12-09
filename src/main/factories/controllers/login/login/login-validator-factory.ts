import { EmailValidation, RequiredFieldsValidator, ValidatorComposite } from '../../../../../validation/validators'
import { Validator } from '../../../../../presentation/protocols'
import { EmailValidatorAdapter } from '../../../../../infra/validators/email-validator-adapter'

export const makeLoginValidator = (): ValidatorComposite => {
  const validators: Validator[] = []
  const requiredFields = ['email', 'password']
  validators.push(new RequiredFieldsValidator(requiredFields))
  validators.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidatorComposite(validators)
}
