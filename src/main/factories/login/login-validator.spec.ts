import { EmailValidation, RequiredFieldsValidator, Validator, ValidatorComposite } from '../../../presentation/helpers/validators'
import { EmailValidator } from '../../../presentation/protocols'
import { makeLoginValidator } from './login-validator'

jest.mock('../../../presentation/helpers/validators/validator-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('LoginValidator Factory', () => {
  test('Should call ValidatorComposite with all validators', () => {
    makeLoginValidator()
    const validators: Validator[] = []

    const requiredFields = ['email', 'password']
    validators.push(new RequiredFieldsValidator(requiredFields))

    validators.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidatorComposite).toHaveBeenCalledWith(validators)
  })
})
