import { CompareFieldsValidator, EmailValidation, RequiredFieldsValidator, ValidatorComposite } from '../../../presentation/helpers/validators'
import { EmailValidator, Validator } from '../../../presentation/protocols'
import { makeSignUpValidator } from './signup-validator-factory'

jest.mock('../../../presentation/helpers/validators/validator-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUpValidator Factory', () => {
  test('Should call ValidatorComposite with all validators', () => {
    makeSignUpValidator()
    const validators: Validator[] = []

    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    validators.push(new RequiredFieldsValidator(requiredFields))

    validators.push(new CompareFieldsValidator('password', 'passwordConfirmation'))
    validators.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidatorComposite).toHaveBeenCalledWith(validators)
  })
})
