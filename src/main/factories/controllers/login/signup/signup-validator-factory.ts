import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'
import { Validator } from '@/presentation/protocols'
import { CompareFieldsValidator, EmailValidation, RequiredFieldsValidator, ValidatorComposite } from '@/validation/validators'

export const makeSignUpValidator = (): ValidatorComposite => {
  const validators: Validator[] = []
  const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
  validators.push(new RequiredFieldsValidator(requiredFields))
  validators.push(new CompareFieldsValidator('password', 'passwordConfirmation'))
  validators.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidatorComposite(validators)
}
