import { CompareFieldsValidator, RequiredFieldsValidator, Validator, ValidatorComposite } from './../../presentation/helpers/validators'

export const makeSignUpValidator = (): ValidatorComposite => {
  const validators: Validator[] = []
  const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
  validators.push(new RequiredFieldsValidator(requiredFields))
  validators.push(new CompareFieldsValidator('password', 'passwordConfirmation'))
  return new ValidatorComposite(validators)
}
