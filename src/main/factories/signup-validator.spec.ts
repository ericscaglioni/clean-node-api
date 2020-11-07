import { EmailValidator } from '../../presentation/protocols'
import { CompareFieldsValidator, RequiredFieldsValidator, Validator, ValidatorComposite } from './../../presentation/helpers/validators'
import { makeSignUpValidator } from './signup-validator'
import { EmailValidation } from '../../presentation/helpers/validators'

jest.mock('./../../presentation/helpers/validators/validator-composite')

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
