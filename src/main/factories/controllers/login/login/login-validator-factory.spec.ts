import { Validator } from '../../../../../presentation/protocols'
import { EmailValidator } from '../../../../../validation/protocols/email-validator'
import { EmailValidation, RequiredFieldsValidator, ValidatorComposite } from '../../../../../validation/validators'
import { makeLoginValidator } from './login-validator-factory'

jest.mock('../../../../../validation/validators/validator-composite')

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
